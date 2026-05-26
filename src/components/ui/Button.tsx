import { Button as ChakraButton, type ButtonProps as ChakraButtonProps } from '@chakra-ui/react'
import type { ReactNode } from 'react'

// Wrapper that enforces project size/variant defaults without
// restricting the full Chakra API surface.
export interface ButtonProps extends ChakraButtonProps {
  children: ReactNode
}

export function Button({ size = 'sm', colorScheme = 'brand', ...props }: ButtonProps) {
  return <ChakraButton size={size} colorScheme={colorScheme} {...props} />
}
