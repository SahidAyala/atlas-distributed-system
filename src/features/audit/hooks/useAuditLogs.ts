import { useQuery } from '@tanstack/react-query'
import { auditApi } from '@/lib/api/audit'
import type { AuditListParams } from '@/types/audit'

export const auditKeys = {
  all: ['audit'] as const,
  list: (params?: AuditListParams) => [...auditKeys.all, 'list', params] as const,
}

export function useAuditLogs(params?: AuditListParams) {
  return useQuery({
    queryKey: auditKeys.list(params),
    queryFn: () => auditApi.list(params),
  })
}
