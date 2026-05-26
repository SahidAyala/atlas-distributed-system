import { HStack, Text, type StackProps } from '@chakra-ui/react'

import { StatusDot } from './StatusDot'
import type { StatusVariant } from '@/components/ui/StatusBadge'

interface HealthIndicatorProps extends Omit<StackProps, 'status'> {
  status: StatusVariant
  label?: string
}

/**
 * System health chip: colored dot + optional label.
 * Used in the dashboard and monitoring views to show at-a-glance health.
 */
export function HealthIndicator({ status, label, ...props }: HealthIndicatorProps) {
  const defaultLabel: Record<string, string> = {
    completed: 'Healthy',
    success: 'Healthy',
    running: 'Running',
    processing: 'Processing',
    failed: 'Degraded',
    error: 'Error',
    critical: 'Critical',
    warning: 'Warning',
    pending: 'Pending',
    cancelled: 'Stopped',
  }

  return (
    <HStack spacing={1.5} {...props}>
      <StatusDot status={status} />
      <Text fontSize="xs" fontWeight="500" color="text.muted">
        {label ?? defaultLabel[status] ?? status}
      </Text>
    </HStack>
  )
}
