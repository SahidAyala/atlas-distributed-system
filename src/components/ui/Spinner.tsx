import { Spinner as ChakraSpinner, type SpinnerProps, Center } from '@chakra-ui/react'

interface CenteredSpinnerProps extends SpinnerProps {
  /** When true, wraps the spinner in a full-height centered container */
  centered?: boolean
}

export function Spinner({ centered, ...props }: CenteredSpinnerProps) {
  const spinner = (
    <ChakraSpinner size="sm" color="brand.500" thickness="2px" {...props} />
  )

  if (centered) {
    return <Center minH="200px">{spinner}</Center>
  }

  return spinner
}
