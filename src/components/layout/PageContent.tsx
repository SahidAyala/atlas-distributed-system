import { Box, type BoxProps } from '@chakra-ui/react'
import type { ReactNode } from 'react'

interface PageContentProps extends BoxProps {
  children: ReactNode
}

/**
 * Max-width constrained content wrapper used inside authenticated pages.
 * Wrap page body content in this to prevent lines from stretching too wide
 * on ultra-wide screens.
 */
export function PageContent({ children, maxW = '1400px', ...props }: PageContentProps) {
  return (
    <Box maxW={maxW} w="full" mx="auto" {...props}>
      {children}
    </Box>
  )
}
