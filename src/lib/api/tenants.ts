import { apiClient } from './client'
import type { ApiListResponse, ApiResponse } from '@/types/api'
import type { Tenant, TenantListParams } from '@/types/tenant'

export const tenantsApi = {
  list: (params?: TenantListParams) =>
    apiClient
      .get<ApiListResponse<Tenant>>('/organizations', { params })
      .then((r) => r.data),

  get: (id: string) =>
    apiClient
      .get<ApiResponse<Tenant>>(`/organizations/${id}`)
      .then((r) => r.data),

  create: (body: Pick<Tenant, 'name' | 'slug' | 'plan' | 'adminEmail'>) =>
    apiClient
      .post<ApiResponse<Tenant>>('/organizations', body)
      .then((r) => r.data),

  update: (id: string, body: Partial<Pick<Tenant, 'name' | 'plan' | 'status'>>) =>
    apiClient
      .patch<ApiResponse<Tenant>>(`/organizations/${id}`, body)
      .then((r) => r.data),

  suspend: (id: string) =>
    apiClient
      .post<ApiResponse<Tenant>>(`/organizations/${id}/suspend`)
      .then((r) => r.data),
}
