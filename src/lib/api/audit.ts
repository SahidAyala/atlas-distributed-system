import { apiClient } from './client'
import type { ApiListResponse } from '@/types/api'
import type { AuditLog, AuditListParams } from '@/types/audit'

export const auditApi = {
  list: (params?: AuditListParams) =>
    apiClient
      .get<ApiListResponse<AuditLog>>('/audit/events', { params })
      .then((r) => r.data),
}
