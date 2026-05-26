import { Badge, type BadgeProps } from '@chakra-ui/react'

// Covers all status values across events, workflows, and audit features.
// Add new statuses here — never scatter colorScheme logic across pages.
export type StatusVariant =
  | 'pending'
  | 'running'
  | 'processing'
  | 'completed'
  | 'success'
  | 'failed'
  | 'error'
  | 'critical'
  | 'warning'
  | 'cancelled'
  | 'info'
  | 'skipped'

const colorMap: Record<StatusVariant, string> = {
  pending: 'gray',
  running: 'blue',
  processing: 'blue',
  completed: 'green',
  success: 'green',
  failed: 'red',
  error: 'red',
  critical: 'red',
  warning: 'orange',
  cancelled: 'gray',
  info: 'cyan',
  skipped: 'gray',
}

export interface StatusBadgeProps extends Omit<BadgeProps, 'colorScheme'> {
  status: StatusVariant
  label?: string
}

export function StatusBadge({ status, label, ...props }: StatusBadgeProps) {
  return (
    <Badge
      colorScheme={colorMap[status] ?? 'gray'}
      variant="subtle"
      textTransform="capitalize"
      {...props}
    >
      {label ?? status}
    </Badge>
  )
}
