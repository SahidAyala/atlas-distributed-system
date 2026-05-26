import { VStack, Box, Flex, Text, Icon, useColorModeValue } from '@chakra-ui/react'
import { MdError, MdWarning, MdInfo } from 'react-icons/md'
import type { IconType } from 'react-icons'
import type { StreamEvent, EventSeverity } from '@/types/events'
import { formatRelative } from '@/lib/utils/date'
import { StatusBadge } from '@/components/ui/StatusBadge'
import type { StatusVariant } from '@/components/ui/StatusBadge'

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

interface EventTimelineProps {
  events: StreamEvent[]
}

export function EventTimeline({ events }: EventTimelineProps) {
  const connectorColor = useColorModeValue('gray.200', 'gray.700')
  const cardBg = useColorModeValue('white', 'gray.900')
  const border = useColorModeValue('gray.200', 'gray.700')

  return (
    <VStack align="stretch" spacing={0}>
      {events.map((event, index) => (
        <Flex key={event.id} gap={3}>
          {/* Timeline line + dot */}
          <Flex direction="column" align="center" w="20px" flexShrink={0}>
            <Box
              w="8px"
              h="8px"
              borderRadius="full"
              bg={severityColor[event.severity]}
              flexShrink={0}
              mt="14px"
            />
            {index < events.length - 1 && (
              <Box flex={1} w="1px" bg={connectorColor} mt={1} />
            )}
          </Flex>

          {/* Card */}
          <Box
            flex={1}
            bg={cardBg}
            border="1px"
            borderColor={border}
            borderRadius="md"
            p={3}
            mb={2}
          >
            <Flex justify="space-between" align="flex-start" gap={2}>
              <Flex align="center" gap={2}>
                <Icon
                  as={severityIcon[event.severity]}
                  color={severityColor[event.severity]}
                  boxSize={4}
                  flexShrink={0}
                />
                <Text fontSize="sm" fontWeight="500">
                  {event.type}
                </Text>
              </Flex>
              <Flex gap={2} align="center" flexShrink={0}>
                <StatusBadge status={event.status as StatusVariant} />
                <Text fontSize="xs" color="text.muted">
                  {formatRelative(event.createdAt)}
                </Text>
              </Flex>
            </Flex>
            <Text fontSize="xs" color="text.muted" mt={1}>
              {event.source} · {event.tenantId}
            </Text>
          </Box>
        </Flex>
      ))}
    </VStack>
  )
}
