import {
  VStack,
  HStack,
  Select,
  Input,
  Box,
  Text,
  Badge,
  Code,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Button,
  Icon,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MdRefresh } from 'react-icons/md'
import { PageHeader } from '@/components/layout/PageHeader'
import { DataTable, type ColumnDef } from '@/components/data/DataTable'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { useAuditLogs } from '../hooks/useAuditLogs'
import type { AuditLog, AuditAction } from '@/types/audit'
import type { StatusVariant } from '@/components/ui/StatusBadge'
import { formatDateTime } from '@/lib/utils/date'
import { labelCase } from '@/lib/utils/format'

// Maps audit actions to status badge variants for visual consistency with other pages.
const actionStatus: Partial<Record<AuditAction, StatusVariant>> = {
  create: 'success',
  update: 'info',
  delete: 'error',
  access_denied: 'error',
  login: 'info',
  logout: 'pending',
  read: 'pending',
}

const columns: ColumnDef<AuditLog>[] = [
  {
    key: 'action',
    header: 'Action',
    cell: (row) => (
      <StatusBadge
        status={(actionStatus[row.action] ?? 'info') as StatusVariant}
        label={labelCase(row.action)}
      />
    ),
    width: '120px',
  },
  {
    key: 'resource',
    header: 'Resource',
    cell: (row) => (
      <Box>
        <Text fontWeight="500">{row.resource}</Text>
        <Text fontSize="xs" color="text.muted" fontFamily="mono">
          {row.resourceId.slice(0, 12)}…
        </Text>
      </Box>
    ),
  },
  {
    key: 'actor',
    header: 'Actor',
    cell: (row) => (
      <Box>
        <Text>{row.actorEmail}</Text>
        <Text fontSize="xs" color="text.muted" fontFamily="mono">
          {row.ipAddress}
        </Text>
      </Box>
    ),
  },
  {
    key: 'tenant',
    header: 'Tenant',
    cell: (row) => row.tenantId,
  },
  {
    key: 'changes',
    header: 'Changes',
    cell: (row) =>
      row.changes ? (
        <Popover trigger="hover" placement="left">
          <PopoverTrigger>
            <Badge variant="outline" cursor="pointer" fontSize="xs">
              {Object.keys(row.changes).length} field
              {Object.keys(row.changes).length !== 1 ? 's' : ''}
            </Badge>
          </PopoverTrigger>
          <PopoverContent maxW="360px">
            <PopoverBody>
              <Code
                display="block"
                whiteSpace="pre-wrap"
                fontSize="xs"
                maxH="200px"
                overflow="auto"
              >
                {JSON.stringify(row.changes, null, 2)}
              </Code>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      ) : (
        <Text fontSize="xs" color="text.subtle">—</Text>
      ),
    width: '100px',
  },
  {
    key: 'createdAt',
    header: 'Timestamp',
    cell: (row) => (
      <Text fontSize="xs" fontFamily="mono" color="text.muted">
        {formatDateTime(row.createdAt)}
      </Text>
    ),
    width: '170px',
  },
]

export function AuditLogPage() {
  const { t } = useTranslation('audit')
  const [action, setAction] = useState<AuditAction | ''>('')
  const [resource, setResource] = useState('')
  const [search, setSearch] = useState('')

  const { data, isLoading, refetch } = useAuditLogs({
    action: action || undefined,
    resource: resource || undefined,
    search: search || undefined,
    limit: 100,
  })

  const logs = data?.data ?? []

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

      <HStack spacing={3} flexWrap="wrap">
        <Input
          placeholder="Search by actor, resource…"
          size="sm"
          maxW="240px"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select
          size="sm"
          maxW="160px"
          value={action}
          onChange={(e) => setAction(e.target.value as AuditAction | '')}
        >
          <option value="">All actions</option>
          <option value="create">Create</option>
          <option value="update">Update</option>
          <option value="delete">Delete</option>
          <option value="login">Login</option>
          <option value="logout">Logout</option>
          <option value="access_denied">Access Denied</option>
        </Select>
        <Input
          placeholder="Filter by resource…"
          size="sm"
          maxW="180px"
          value={resource}
          onChange={(e) => setResource(e.target.value)}
        />
      </HStack>

      <DataTable<AuditLog>
        columns={columns}
        data={logs}
        isLoading={isLoading}
        keyExtractor={(row) => row.id}
        emptyMessage="No audit records found."
      />
    </VStack>
  )
}
