import { Tag as ChakraTag, type TagProps as ChakraTagProps } from '@chakra-ui/react'

// Colored label tag, typically used for categories or resource identifiers.
export interface TagProps extends ChakraTagProps {
  label: string
}

export function Tag({ label, size = 'sm', colorScheme = 'brand', ...props }: TagProps) {
  return (
    <ChakraTag size={size} colorScheme={colorScheme} {...props}>
      {label}
    </ChakraTag>
  )
}
