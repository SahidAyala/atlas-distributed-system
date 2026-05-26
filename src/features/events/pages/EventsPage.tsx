import { VStack, HStack, Select, Input, Button, Icon, Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MdRefresh } from 'react-icons/md'
import { PageHeader } from '@/components/layout/PageHeader'
import { DataTable, type ColumnDef } from '@/components/data/DataTable'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { EventTimeline } from '../components/EventTimeline'
import { useEvents } from '../hooks/useEvents'
import type { StreamEvent, EventSeverity, EventStatus } from '@/types/events'
import type { StatusVariant } from '@/components/ui/StatusBadge'
import { formatDateTime, formatRelative } from '@/lib/utils/date'
import { truncate } from '@/lib/utils/format'

const columns: ColumnDef<StreamEvent>[] = [
  {
    key: 'type',
    header: 'Type',
    cell: (row) => truncate(row.type, 40),
    width: '200px',
  },
  {
    key: 'source',
    header: 'Source',
    cell: (row) => row.source,
  },
  {
    key: 'severity',
    header: 'Severity',
    cell: (row) => <StatusBadge status={row.severity as StatusVariant} />,
    width: '100px',
  },
  {
    key: 'status',
    header: 'Status',
    cell: (row) => <StatusBadge status={row.status as StatusVariant} />,
    width: '110px',
  },
  {
    key: 'tenant',
    header: 'Tenant',
    cell: (row) => row.tenantId,
  },
  {
    key: 'createdAt',
    header: 'Created',
    cell: (row) => (
      <span title={formatDateTime(row.createdAt)}>{formatRelative(row.createdAt)}</span>
    ),
    width: '130px',
  },
]

export function EventsPage() {
  const { t } = useTranslation('events')
  const [severity, setSeverity] = useState<EventSeverity | ''>('')
  const [status, setStatus] = useState<EventStatus | ''>('')
  const [search, setSearch] = useState('')

  const { data, isLoading, refetch } = useEvents({
    severity: severity || undefined,
    status: status || undefined,
    search: search || undefined,
    limit: 50,
  })

  const events = data?.data ?? []

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

      {/* Filters */}
      <HStack spacing={3} flexWrap="wrap">
        <Input
          placeholder="Search by type or source…"
          size="sm"
          maxW="240px"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select
          size="sm"
          maxW="160px"
          value={severity}
          onChange={(e) => setSeverity(e.target.value as EventSeverity | '')}
        >
          <option value="">All severities</option>
          <option value="info">Info</option>
          <option value="warning">Warning</option>
          <option value="error">Error</option>
          <option value="critical">Critical</option>
        </Select>
        <Select
          size="sm"
          maxW="160px"
          value={status}
          onChange={(e) => setStatus(e.target.value as EventStatus | '')}
        >
          <option value="">All statuses</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="completed">Completed</option>
          <option value="failed">Failed</option>
        </Select>
      </HStack>

      {/* Table / Timeline tabs */}
      <Tabs variant="line" size="sm" colorScheme="brand">
        <TabList>
          <Tab>Table</Tab>
          <Tab>Timeline</Tab>
        </TabList>
        <TabPanels>
          <TabPanel px={0} pt={4}>
            <DataTable<StreamEvent>
              columns={columns}
              data={events}
              isLoading={isLoading}
              keyExtractor={(row) => row.id}
              emptyMessage="No events found. Try adjusting your filters."
            />
          </TabPanel>
          <TabPanel px={0} pt={4}>
            <EventTimeline events={events} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </VStack>
  )
}
