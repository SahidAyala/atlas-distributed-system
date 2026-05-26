import {
  VStack,
  HStack,
  Select,
  Input,
  Box,
  Flex,
  Text,
  Icon,
  Badge,
  Code,
  Collapse,
  useDisclosure,
  useColorModeValue,
  Button,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  MdRefresh,
  MdError,
  MdWarning,
  MdInfo,
  MdCheckCircle,
  MdExpandMore,
  MdExpandLess,
} from 'react-icons/md'
import type { IconType } from 'react-icons'

import { PageHeader } from '@/components/layout/PageHeader'
import { StatusBadge } from '@/components/ui/StatusBadge'
import type { StatusVariant } from '@/components/ui/StatusBadge'
import { SkeletonCard } from '@/components/feedback/SkeletonCard'
import { EmptyState } from '@/components/feedback/EmptyState'
import { useEvents } from '@/features/events/hooks/useEvents'
import type { StreamEvent, EventSeverity, EventStatus } from '@/types/events'
import { formatDateTime, formatRelative } from '@/lib/utils/date'

const severityIcon: Record<EventSeverity, IconType> = {
  info: MdInfo,
  warning: MdWarning,
  error: MdError,
  critical: MdError,
}

const severityColor: Record<EventSeverity, string> = {
  info: 'blue.400',
  warning: 'orange.400',
  error: 'red.400',
  critical: 'red.500',
}

interface TimelineItemProps {
  event: StreamEvent
  isLast: boolean
}

function TimelineItem({ event, isLast }: TimelineItemProps) {
  const { isOpen, onToggle } = useDisclosure()
  const connectorColor = useColorModeValue('gray.200', 'gray.700')
  const cardBg = useColorModeValue('white', 'gray.900')
  const border = useColorModeValue('gray.200', 'gray.700')

  return (
    <Flex gap={3}>
      {/* Timeline dot + connector */}
      <Flex direction="column" align="center" w="20px" flexShrink={0}>
        <Box
          w="8px"
          h="8px"
          borderRadius="full"
          bg={severityColor[event.severity]}
          flexShrink={0}
          mt="14px"
        />
        {!isLast && <Box flex={1} w="1px" bg={connectorColor} mt={1} />}
      </Flex>

      {/* Card */}
      <Box
        flex={1}
        bg={cardBg}
        border="1px"
        borderColor={border}
        borderRadius="md"
        mb={2}
        overflow="hidden"
      >
        <Flex
          p={3}
          justify="space-between"
          align="flex-start"
          gap={2}
          cursor="pointer"
          onClick={onToggle}
          _hover={{ bg: 'bg.subtle' }}
          transition="background 0.1s"
        >
          <Flex align="center" gap={2} minW={0}>
            <Icon
              as={severityIcon[event.severity]}
              color={severityColor[event.severity]}
              boxSize={4}
              flexShrink={0}
            />
            <Text fontSize="sm" fontWeight="500" noOfLines={1}>
              {event.type}
            </Text>
          </Flex>
          <Flex gap={2} align="center" flexShrink={0}>
            <StatusBadge status={event.status as StatusVariant} />
            <Badge colorScheme="gray" variant="subtle" fontSize="10px" textTransform="capitalize">
              {event.severity}
            </Badge>
            <Text fontSize="xs" color="text.muted">
              {formatRelative(event.createdAt)}
            </Text>
            <Icon as={isOpen ? MdExpandLess : MdExpandMore} color="text.muted" boxSize={4} />
          </Flex>
        </Flex>

        <Collapse in={isOpen}>
          <Box borderTop="1px" borderColor={border} p={3} bg="bg.subtle">
            <VStack align="stretch" spacing={2}>
              <HStack justify="space-between" fontSize="xs">
                <Text color="text.muted">Source</Text>
                <Text fontFamily="mono">{event.source}</Text>
              </HStack>
              <HStack justify="space-between" fontSize="xs">
                <Text color="text.muted">Tenant</Text>
                <Text fontFamily="mono">{event.tenantId}</Text>
              </HStack>
              {event.correlationId && (
                <HStack justify="space-between" fontSize="xs">
                  <Text color="text.muted">Correlation ID</Text>
                  <Text fontFamily="mono">{event.correlationId}</Text>
                </HStack>
              )}
              <HStack justify="space-between" fontSize="xs">
                <Text color="text.muted">Timestamp</Text>
                <Text fontFamily="mono">{formatDateTime(event.createdAt)}</Text>
              </HStack>
              <Box>
                <Text fontSize="xs" color="text.muted" mb={1}>
                  Payload
                </Text>
                <Code
                  display="block"
                  fontSize="xs"
                  p={2}
                  borderRadius="sm"
                  whiteSpace="pre-wrap"
                  maxH="200px"
                  overflow="auto"
                >
                  {JSON.stringify(event.payload, null, 2)}
                </Code>
              </Box>
            </VStack>
          </Box>
        </Collapse>
      </Box>
    </Flex>
  )
}

export function EventTimelinePage() {
  const { t } = useTranslation('events')
  const [severity, setSeverity] = useState<EventSeverity | ''>('')
  const [status, setStatus] = useState<EventStatus | ''>('')
  const [search, setSearch] = useState('')

  const { data, isLoading, refetch } = useEvents({
    severity: severity || undefined,
    status: status || undefined,
    search: search || undefined,
    limit: 100,
  })

  const events = data?.data ?? []

  return (
    <VStack align="stretch" spacing={5}>
      <PageHeader
        title="Event Timeline"
        description="Chronological view of domain events with expandable payloads."
        actions={
          <Button
            size="sm"
            variant="outline"
            leftIcon={<Icon as={MdRefresh} />}
            onClick={() => void refetch()}
            isLoading={isLoading}
          >
            {t('actions.refresh', { ns: 'common' })}
          </Button>
        }
      />

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

      {isLoading ? (
        <VStack align="stretch" spacing={2}>
          <SkeletonCard count={6} />
        </VStack>
      ) : events.length === 0 ? (
        <EmptyState
          message="No events found"
          description="Try adjusting your filters or refreshing the page."
          icon={MdCheckCircle}
        />
      ) : (
        <VStack align="stretch" spacing={0}>
          {events.map((event, index) => (
            <TimelineItem key={event.id} event={event} isLast={index === events.length - 1} />
          ))}
        </VStack>
      )}
    </VStack>
  )
}
