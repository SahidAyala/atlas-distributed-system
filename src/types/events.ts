export type EventSeverity = 'info' | 'warning' | 'error' | 'critical'
export type EventStatus = 'pending' | 'processing' | 'completed' | 'failed'

export interface StreamEvent {
  id: string
  type: string
  source: string
  severity: EventSeverity
  status: EventStatus
  payload: Record<string, unknown>
  tenantId: string
  correlationId?: string
  createdAt: string
  processedAt?: string
}

export interface EventListParams {
  page?: number
  limit?: number
  severity?: EventSeverity
  status?: EventStatus
  source?: string
  tenantId?: string
  from?: string
  to?: string
  search?: string
}
