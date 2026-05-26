import { useBreakpointValue } from '@chakra-ui/react'

// Named breakpoints that match the Chakra UI theme defaults.
// Use this hook instead of raw useBreakpointValue to keep breakpoint names consistent.
export function useBreakpoint() {
  const isMobile = useBreakpointValue({ base: true, md: false }) ?? false
  const isTablet = useBreakpointValue({ base: false, md: true, lg: false }) ?? false
  const isDesktop = useBreakpointValue({ base: false, lg: true }) ?? false

  return { isMobile, isTablet, isDesktop }
}
