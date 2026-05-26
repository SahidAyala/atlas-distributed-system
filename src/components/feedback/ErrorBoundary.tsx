import { Component, type ReactNode } from 'react'
import { VStack, Heading, Text, Button, Code, Box } from '@chakra-ui/react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  error: Error | null
}

// Class component — React error boundaries can only be class components as of React 18.
// Use <ErrorBoundary> at the route level in router.tsx for page-scoped recovery.
export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  reset = () => this.setState({ error: null })

  render() {
    const { error } = this.state
    if (!error) return this.props.children
    if (this.props.fallback) return this.props.fallback

    return (
      <VStack spacing={4} align="center" justify="center" minH="400px" p={8}>
        <Heading size="sm">Something went wrong</Heading>
        <Text color="text.muted" fontSize="sm">
          {error.message}
        </Text>
        {import.meta.env.DEV && (
          <Box maxW="600px" w="full">
            <Code
              display="block"
              whiteSpace="pre-wrap"
              fontSize="xs"
              p={3}
              borderRadius="md"
              overflow="auto"
              maxH="200px"
            >
              {error.stack}
            </Code>
          </Box>
        )}
        <Button size="sm" onClick={this.reset}>
          Try again
        </Button>
      </VStack>
    )
  }
}
