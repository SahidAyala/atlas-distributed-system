import { Box, type BoxProps } from '@chakra-ui/react'

import type { StatusVariant } from '@/components/ui/StatusBadge'

const dotColor: Record<StatusVariant, string> = {
  pending: 'gray.400',
  running: 'blue.400',
  processing: 'blue.400',
  completed: 'green.400',
  success: 'green.400',
  failed: 'red.400',
  error: 'red.400',
  critical: 'red.500',
  warning: 'orange.400',
  cancelled: 'gray.400',
  info: 'cyan.400',
  skipped: 'gray.400',
}

interface StatusDotProps extends Omit<BoxProps, 'status'> {
  status: StatusVariant
  size?: number
}

/**
 * Small colored dot indicator for inline status representation.
 * Use in tight spaces where a full Badge doesn't fit.
 */
export function StatusDot({ status, size = 8, ...props }: StatusDotProps) {
  return (
    <Box
      display="inline-block"
      w={`${size}px`}
      h={`${size}px`}
      borderRadius="full"
      bg={dotColor[status] ?? 'gray.400'}
      flexShrink={0}
      {...props}
    />
  )
}
