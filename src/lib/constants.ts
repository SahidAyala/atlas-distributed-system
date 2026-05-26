export const APP_NAME = import.meta.env.VITE_APP_NAME ?? 'Atlas IaaS'
export const APP_VERSION = import.meta.env.VITE_APP_VERSION ?? '0.1.0'

export const ROUTES = {
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  EVENTS: '/events',
  EVENT_TIMELINE: '/events/timeline',
  WORKFLOWS: '/workflows',
  WORKFLOW_EXECUTION: '/workflows/:id',
  AUDIT: '/audit',
  TENANTS: '/tenants',
  SETTINGS: '/settings',
} as const

// Centralized query key factories — import these in hooks rather than
// defining inline strings, so cache invalidation stays consistent.
export const QUERY_KEYS = {
  dashboard: {
    all: ['dashboard'] as const,
    metrics: () => ['dashboard', 'metrics'] as const,
    eventSeries: () => ['dashboard', 'event-series'] as const,
  },
  events: {
    all: ['events'] as const,
    list: (params?: Record<string, unknown>) => ['events', 'list', params] as const,
    detail: (id: string) => ['events', 'detail', id] as const,
  },
  workflows: {
    all: ['workflows'] as const,
    list: (params?: Record<string, unknown>) => ['workflows', 'list', params] as const,
    detail: (id: string) => ['workflows', 'detail', id] as const,
  },
  audit: {
    all: ['audit'] as const,
    list: (params?: Record<string, unknown>) => ['audit', 'list', params] as const,
  },
  tenants: {
    all: ['tenants'] as const,
    list: (params?: Record<string, unknown>) => ['tenants', 'list', params] as const,
    detail: (id: string) => ['tenants', 'detail', id] as const,
  },
} as const

export const DEFAULT_PAGE_SIZE = 50
export const DEFAULT_STALE_TIME_MS = 30_000
export const RUNNING_POLL_INTERVAL_MS = 3_000
