import { apiClient } from './client'
import type { ApiResponse } from '@/types/api'

export interface DashboardMetrics {
  totalEvents: number
  activeWorkflows: number
  failedExecutions: number
  tenantCount: number
  eventsTrend: number
  failedTrend: number
}

export interface EventSeriesPoint {
  time: string
  events: number
  failures: number
  [key: string]: unknown
}

export const dashboardApi = {
  getMetrics: () =>
    apiClient.get<ApiResponse<DashboardMetrics>>('/dashboard/metrics').then((r) => r.data),
  getEventSeries: () =>
    apiClient.get<ApiResponse<EventSeriesPoint[]>>('/dashboard/event-series').then((r) => r.data),
}
