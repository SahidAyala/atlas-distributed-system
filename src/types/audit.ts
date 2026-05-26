export type AuditAction =
  | 'create'
  | 'update'
  | 'delete'
  | 'read'
  | 'login'
  | 'logout'
  | 'access_denied'

export interface AuditLog {
  id: string
  action: AuditAction
  resource: string
  resourceId: string
  actorId: string
  actorEmail: string
  tenantId: string
  ipAddress: string
  userAgent: string
  changes?: Record<string, { before: unknown; after: unknown }>
  createdAt: string
}

export interface AuditListParams {
  page?: number
  limit?: number
  action?: AuditAction
  resource?: string
  actorId?: string
  tenantId?: string
  from?: string
  to?: string
  search?: string
}
