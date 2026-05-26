export type TenantPlan = 'free' | 'starter' | 'pro' | 'enterprise'
export type TenantStatus = 'active' | 'suspended' | 'provisioning' | 'deprovisioned'

export interface Tenant {
  id: string
  name: string
  slug: string
  plan: TenantPlan
  status: TenantStatus
  adminEmail: string
  createdAt: string
  updatedAt: string
  metadata: Record<string, unknown>
}

export interface TenantListParams {
  page?: number
  limit?: number
  status?: TenantStatus
  plan?: TenantPlan
  search?: string
}
