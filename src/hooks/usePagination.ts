import { useState } from 'react'

import { DEFAULT_PAGE_SIZE } from '@/lib/constants'

interface PaginationState {
  page: number
  limit: number
}

interface UsePaginationReturn extends PaginationState {
  setPage: (page: number) => void
  setLimit: (limit: number) => void
  reset: () => void
  nextPage: () => void
  prevPage: () => void
}

export function usePagination(initialLimit = DEFAULT_PAGE_SIZE): UsePaginationReturn {
  const [state, setState] = useState<PaginationState>({ page: 1, limit: initialLimit })

  return {
    ...state,
    setPage: (page) => setState((s) => ({ ...s, page })),
    setLimit: (limit) => setState({ page: 1, limit }),
    reset: () => setState({ page: 1, limit: state.limit }),
    nextPage: () => setState((s) => ({ ...s, page: s.page + 1 })),
    prevPage: () => setState((s) => ({ ...s, page: Math.max(1, s.page - 1) })),
  }
}
