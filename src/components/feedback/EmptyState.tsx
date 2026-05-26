import { VStack, Icon, Text, Button } from '@chakra-ui/react'
import { MdInbox } from 'react-icons/md'
import type { IconType } from 'react-icons'

interface EmptyStateProps {
  message?: string
  description?: string
  icon?: IconType
  action?: { label: string; onClick: () => void }
}

export function EmptyState({
  message = 'No results found',
  description,
  icon = MdInbox,
  action,
}: EmptyStateProps) {
  return (
    <VStack spacing={3} py={12} color="text.muted">
      <Icon as={icon} boxSize={8} />
      <Text fontWeight="500">{message}</Text>
      {description && (
        <Text fontSize="sm" color="text.subtle" textAlign="center" maxW="280px">
          {description}
        </Text>
      )}
      {action && (
        <Button size="sm" variant="outline" mt={1} onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </VStack>
  )
}
