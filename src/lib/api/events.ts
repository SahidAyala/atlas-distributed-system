import { apiClient } from './client'
import type { ApiListResponse, ApiResponse } from '@/types/api'
import type { StreamEvent, EventListParams } from '@/types/events'

export const eventsApi = {
  list: (params?: EventListParams) =>
    apiClient
      .get<ApiListResponse<StreamEvent>>('/events', { params })
      .then((r) => r.data),

  get: (id: string) =>
    apiClient
      .get<ApiResponse<StreamEvent>>(`/events/${id}`)
      .then((r) => r.data),
}
