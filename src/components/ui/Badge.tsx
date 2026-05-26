import { Badge as ChakraBadge, type BadgeProps as ChakraBadgeProps } from '@chakra-ui/react'

// Status-aware badge that maps semantic status strings to Chakra colorSchemes.
export type BadgeStatus = 'success' | 'warning' | 'error' | 'info' | 'neutral'

const statusColorMap: Record<BadgeStatus, string> = {
  success: 'green',
  warning: 'orange',
  error: 'red',
  info: 'blue',
  neutral: 'gray',
}

export interface BadgeProps extends Omit<ChakraBadgeProps, 'colorScheme'> {
  status?: BadgeStatus
}

export function Badge({ status, variant = 'subtle', ...props }: BadgeProps) {
  const colorScheme = status ? statusColorMap[status] : 'gray'
  return <ChakraBadge colorScheme={colorScheme} variant={variant} {...props} />
}
