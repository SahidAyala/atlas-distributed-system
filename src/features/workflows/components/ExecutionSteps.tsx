import {
  VStack,
  Box,
  Flex,
  Text,
  Icon,
  Code,
  Collapse,
  useDisclosure,
  useColorModeValue,
} from '@chakra-ui/react'
import {
  MdCheckCircle,
  MdError,
  MdHourglassEmpty,
  MdPlayArrow,
  MdSkipNext,
  MdExpandMore,
  MdExpandLess,
} from 'react-icons/md'
import type { IconType } from 'react-icons'
import type { WorkflowStep, StepStatus } from '@/types/workflows'
import { formatDuration, formatDateTime } from '@/lib/utils/date'

const stepIcon: Record<StepStatus, IconType> = {
  pending: MdHourglassEmpty,
  running: MdPlayArrow,
  completed: MdCheckCircle,
  failed: MdError,
  skipped: MdSkipNext,
}

const stepColor: Record<StepStatus, string> = {
  pending: 'gray.400',
  running: 'blue.400',
  completed: 'green.400',
  failed: 'red.400',
  skipped: 'gray.400',
}

interface StepRowProps {
  step: WorkflowStep
}

function StepRow({ step }: StepRowProps) {
  const { isOpen, onToggle } = useDisclosure()
  const bg = useColorModeValue('white', 'gray.900')
  const border = useColorModeValue('gray.200', 'gray.700')
  const hasDetail = !!(step.error || step.output)

  return (
    <Box border="1px" borderColor={border} borderRadius="md" bg={bg} overflow="hidden">
      <Flex
        align="center"
        gap={3}
        p={3}
        cursor={hasDetail ? 'pointer' : undefined}
        onClick={hasDetail ? onToggle : undefined}
        _hover={hasDetail ? { bg: 'bg.subtle' } : undefined}
        transition="background 0.1s"
      >
        <Icon as={stepIcon[step.status]} color={stepColor[step.status]} boxSize={4} flexShrink={0} />
        <Text fontSize="sm" fontWeight="500" flex={1}>
          {step.name}
        </Text>
        <Text fontSize="xs" color="text.muted">
          {step.type}
        </Text>
        {step.durationMs !== undefined && (
          <Text fontSize="xs" color="text.muted" minW="50px" textAlign="right">
            {formatDuration(step.durationMs)}
          </Text>
        )}
        {step.startedAt && (
          <Text fontSize="xs" color="text.subtle" minW="140px" textAlign="right" display={{ base: 'none', md: 'block' }}>
            {formatDateTime(step.startedAt)}
          </Text>
        )}
        {hasDetail && (
          <Icon as={isOpen ? MdExpandLess : MdExpandMore} color="text.muted" boxSize={4} />
        )}
      </Flex>

      {hasDetail && (
        <Collapse in={isOpen}>
          <Box borderTop="1px" borderColor={border} p={3} bg="bg.subtle">
            {step.error && (
              <Box mb={step.output ? 3 : 0}>
                <Text fontSize="xs" fontWeight="600" color="red.400" mb={1}>
                  Error
                </Text>
                <Code fontSize="xs" display="block" p={2} borderRadius="sm" whiteSpace="pre-wrap">
                  {step.error}
                </Code>
              </Box>
            )}
            {step.output && (
              <Box>
                <Text fontSize="xs" fontWeight="600" color="text.muted" mb={1}>
                  Output
                </Text>
                <Code fontSize="xs" display="block" p={2} borderRadius="sm" whiteSpace="pre-wrap" maxH="200px" overflow="auto">
                  {JSON.stringify(step.output, null, 2)}
                </Code>
              </Box>
            )}
          </Box>
        </Collapse>
      )}
    </Box>
  )
}

interface ExecutionStepsProps {
  steps: WorkflowStep[]
}

export function ExecutionSteps({ steps }: ExecutionStepsProps) {
  return (
    <VStack align="stretch" spacing={2}>
      {steps.map((step) => (
        <StepRow key={step.id} step={step} />
      ))}
    </VStack>
  )
}
