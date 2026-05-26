import {
  VStack,
  HStack,
  Select,
  Box,
  Heading,
  Text,
  Flex,
  Badge,
  Button,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MdRefresh } from 'react-icons/md'
import { PageHeader } from '@/components/layout/PageHeader'
import { DataTable, type ColumnDef } from '@/components/data/DataTable'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { ExecutionSteps } from '../components/ExecutionSteps'
import { useWorkflowExecutions, useCancelExecution } from '../hooks/useWorkflows'
import type { WorkflowExecution, WorkflowStatus } from '@/types/workflows'
import type { StatusVariant } from '@/components/ui/StatusBadge'
import { formatDateTime, formatRelative, formatDuration } from '@/lib/utils/date'

export function WorkflowExecutionPage() {
  const { t } = useTranslation('workflows')
  const [statusFilter, setStatusFilter] = useState<WorkflowStatus | ''>('')
  const [selected, setSelected] = useState<WorkflowExecution | null>(null)
  const drawer = useDisclosure()
  const cancelMutation = useCancelExecution()

  const { data, isLoading, refetch } = useWorkflowExecutions({
    status: statusFilter || undefined,
    limit: 50,
  })

  const executions = data?.data ?? []

  const cardBg = useColorModeValue('white', 'gray.900')
  const border = useColorModeValue('gray.200', 'gray.700')

  const handleRowClick = (row: WorkflowExecution) => {
    setSelected(row)
    drawer.onOpen()
  }

  const columns: ColumnDef<WorkflowExecution>[] = [
    {
      key: 'workflow',
      header: 'Workflow',
      cell: (row) => (
        <Box>
          <Text fontWeight="500">{row.workflowName}</Text>
          <Text fontSize="xs" color="text.muted" fontFamily="mono">
            {row.id.slice(0, 8)}
          </Text>
        </Box>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      cell: (row) => <StatusBadge status={row.status as StatusVariant} />,
      width: '110px',
    },
    {
      key: 'triggeredBy',
      header: 'Triggered By',
      cell: (row) => row.triggeredBy,
    },
    {
      key: 'tenant',
      header: 'Tenant',
      cell: (row) => row.tenantId,
    },
    {
      key: 'duration',
      header: 'Duration',
      cell: (row) =>
        row.durationMs !== undefined ? formatDuration(row.durationMs) : '—',
      width: '90px',
    },
    {
      key: 'startedAt',
      header: 'Started',
      cell: (row) => (
        <span title={formatDateTime(row.startedAt)}>{formatRelative(row.startedAt)}</span>
      ),
      width: '130px',
    },
  ]

  return (
    <VStack align="stretch" spacing={5}>
      <PageHeader
        title={t('title')}
        description={t('description')}
        actions={
          <Button
            size="sm"
            variant="outline"
            leftIcon={<Icon as={MdRefresh} />}
            onClick={() => refetch()}
            isLoading={isLoading}
          >
            Refresh
          </Button>
        }
      />

      <HStack spacing={3}>
        <Select
          size="sm"
          maxW="180px"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as WorkflowStatus | '')}
        >
          <option value="">All statuses</option>
          <option value="pending">Pending</option>
          <option value="running">Running</option>
          <option value="completed">Completed</option>
          <option value="failed">Failed</option>
          <option value="cancelled">Cancelled</option>
        </Select>
      </HStack>

      <DataTable<WorkflowExecution>
        columns={columns}
        data={executions}
        isLoading={isLoading}
        keyExtractor={(row) => row.id}
        onRowClick={handleRowClick}
        emptyMessage="No executions found."
      />

      {/* Execution detail drawer */}
      <Drawer isOpen={drawer.isOpen} onClose={drawer.onClose} size="md" placement="right">
        <DrawerOverlay />
        <DrawerContent bg={cardBg}>
          <DrawerCloseButton />
          <DrawerHeader borderBottom="1px" borderColor={border} pb={4}>
            <Text fontSize="sm" fontWeight="600">{selected?.workflowName}</Text>
            <Text fontSize="xs" color="text.muted" fontFamily="mono" mt={0.5}>
              {selected?.id}
            </Text>
          </DrawerHeader>
          <DrawerBody pt={4}>
            {selected && (
              <VStack align="stretch" spacing={4}>
                <Flex gap={3} wrap="wrap">
                  <StatusBadge status={selected.status as StatusVariant} />
                  {selected.durationMs !== undefined && (
                    <Badge variant="outline" fontSize="xs">
                      {formatDuration(selected.durationMs)}
                    </Badge>
                  )}
                </Flex>

                <Box>
                  <Text fontSize="xs" color="text.muted" mb={1}>Started</Text>
                  <Text fontSize="sm">{formatDateTime(selected.startedAt)}</Text>
                </Box>
                {selected.completedAt && (
                  <Box>
                    <Text fontSize="xs" color="text.muted" mb={1}>Completed</Text>
                    <Text fontSize="sm">{formatDateTime(selected.completedAt)}</Text>
                  </Box>
                )}

                {selected.status === 'running' && (
                  <Button
                    size="sm"
                    colorScheme="red"
                    variant="outline"
                    isLoading={cancelMutation.isPending}
                    onClick={() => cancelMutation.mutate(selected.id)}
                  >
                    Cancel execution
                  </Button>
                )}

                <Box>
                  <Heading size="xs" mb={3} color="text.muted" textTransform="uppercase" letterSpacing="wider">
                    Steps
                  </Heading>
                  <ExecutionSteps steps={selected.steps} />
                </Box>
              </VStack>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </VStack>
  )
}
