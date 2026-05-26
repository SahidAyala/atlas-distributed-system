import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom'
import { VStack, Heading, Text, Button, Code } from '@chakra-ui/react'

// Rendered by React Router when a route or its loader throws.
// Placed at the root route so it catches all unhandled navigation errors.
export function ErrorPage() {
  const error = useRouteError()

  const title = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : 'Unexpected error'

  const message = isRouteErrorResponse(error)
    ? error.data
    : error instanceof Error
    ? error.message
    : 'An unknown error occurred.'

  return (
    <VStack spacing={4} align="center" justify="center" minH="100vh" p={8}>
      <Heading size="lg">{title}</Heading>
      <Text color="gray.500" fontSize="sm">
        {message}
      </Text>
      {import.meta.env.DEV && error instanceof Error && error.stack && (
        <Code
          display="block"
          whiteSpace="pre-wrap"
          fontSize="xs"
          p={3}
          borderRadius="md"
          maxW="600px"
          w="full"
          overflow="auto"
          maxH="200px"
        >
          {error.stack}
        </Code>
      )}
      <Button as={Link} to="/dashboard" size="sm">
        Go to Dashboard
      </Button>
    </VStack>
  )
}
