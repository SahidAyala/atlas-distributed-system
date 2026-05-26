import { Flex, Box } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'
import { ErrorBoundary } from '@/components/feedback/ErrorBoundary'

// AppShell wraps all authenticated routes.
// Sidebar + TopBar are layout-level, not page-level — they never remount during navigation.
export function AppShell() {
  return (
    <Flex h="100vh" overflow="hidden">
      <Sidebar />
      <Flex flex={1} direction="column" overflow="hidden" minW={0}>
        <TopBar />
        <Box flex={1} overflow="auto" p={6} bg="bg.page">
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
        </Box>
      </Flex>
    </Flex>
  )
}
