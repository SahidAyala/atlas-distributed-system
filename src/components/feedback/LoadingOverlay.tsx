import { Box, Center } from '@chakra-ui/react'

import { Spinner } from '@/components/ui/Spinner'

interface LoadingOverlayProps {
  /** When true, renders a full-viewport overlay. Defaults to container-relative. */
  fullScreen?: boolean
}

/**
 * Semi-transparent loading overlay. Use when an async action blocks interaction
 * on an existing content area (e.g., a form submission).
 */
export function LoadingOverlay({ fullScreen }: LoadingOverlayProps) {
  return (
    <Box
      position={fullScreen ? 'fixed' : 'absolute'}
      inset={0}
      bg="blackAlpha.300"
      zIndex={10}
      borderRadius="inherit"
    >
      <Center h="full">
        <Spinner size="md" color="brand.500" />
      </Center>
    </Box>
  )
}
