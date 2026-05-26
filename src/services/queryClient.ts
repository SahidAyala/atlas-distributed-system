import axios from 'axios'
import { QueryClient } from '@tanstack/react-query'

import { DEFAULT_STALE_TIME_MS } from '@/lib/constants'

// Singleton QueryClient used by <Providers> — exported so tests can import it
// directly if they need to seed the cache or assert invalidation.
//
// staleTime: 30s — operational dashboards refresh frequently enough without hammering the API.
// retry: never retry on 4xx (client error); retry twice on 5xx / network issues.
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: DEFAULT_STALE_TIME_MS,
      retry: (failureCount, error) => {
        if (axios.isAxiosError(error) && error.response) {
          const { status } = error.response
          if (status >= 400 && status < 500) return false
        }
        return failureCount < 2
      },
    },
  },
})
