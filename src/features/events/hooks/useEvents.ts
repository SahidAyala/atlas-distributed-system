import { useQuery } from '@tanstack/react-query'
import { eventsApi } from '@/lib/api/events'
import type { EventListParams } from '@/types/events'

export const eventKeys = {
  all: ['events'] as const,
  list: (params?: EventListParams) => [...eventKeys.all, 'list', params] as const,
  detail: (id: string) => [...eventKeys.all, 'detail', id] as const,
}

export function useEvents(params?: EventListParams) {
  return useQuery({
    queryKey: eventKeys.list(params),
    queryFn: () => eventsApi.list(params),
  })
}

export function useEvent(id: string) {
  return useQuery({
    queryKey: eventKeys.detail(id),
    queryFn: () => eventsApi.get(id),
    enabled: !!id,
  })
}
