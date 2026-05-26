import { VStack, Icon, Heading, Text, Button } from '@chakra-ui/react'
import { MdErrorOutline } from 'react-icons/md'

import { getErrorMessage } from '@/lib/errors'

interface ErrorStateProps {
  error?: unknown
  message?: string
  onRetry?: () => void
}

/**
 * Full-area error display used when a query fails.
 * Place inside the page body, not the entire viewport.
 */
export function ErrorState({ error, message, onRetry }: ErrorStateProps) {
  const text = message ?? getErrorMessage(error)

  return (
    <VStack spacing={4} align="center" justify="center" minH="300px" p={8}>
      <Icon as={MdErrorOutline} boxSize={8} color="red.400" />
      <Heading size="sm">Something went wrong</Heading>
      <Text fontSize="sm" color="text.muted" textAlign="center" maxW="360px">
        {text}
      </Text>
      {onRetry && (
        <Button size="sm" variant="outline" onClick={onRetry}>
          Try again
        </Button>
      )}
    </VStack>
  )
}
