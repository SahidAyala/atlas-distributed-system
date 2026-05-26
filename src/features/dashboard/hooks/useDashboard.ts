import { useQuery } from '@tanstack/react-query'
import { dashboardApi } from '@/lib/api/dashboard'
import type { DashboardMetrics, EventSeriesPoint } from '@/lib/api/dashboard'

// Query key factory pattern — keeps key strings centralized and prevents typos.
// Convention: ['feature', 'resource', ...params]
export const dashboardKeys = {
  all: ['dashboard'] as const,
  metrics: () => [...dashboardKeys.all, 'metrics'] as const,
  eventSeries: () => [...dashboardKeys.all, 'event-series'] as const,
}

export type { DashboardMetrics, EventSeriesPoint }

export function useDashboard() {
  const metrics = useQuery({
    queryKey: dashboardKeys.metrics(),
    queryFn: () => dashboardApi.getMetrics().then((r) => r.data),
  })

  const eventSeries = useQuery({
    queryKey: dashboardKeys.eventSeries(),
    queryFn: () => dashboardApi.getEventSeries().then((r) => r.data),
  })

  return {
    metrics: metrics.data,
    eventSeries: eventSeries.data ?? [],
    isLoading: metrics.isLoading || eventSeries.isLoading,
    isError: metrics.isError || eventSeries.isError,
  }
}
