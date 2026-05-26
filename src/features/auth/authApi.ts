import { apiClient } from '@/lib/api/client'
import type { LoginRequest, LoginResponse } from '@/types/auth'

export const authApi = {
  login: (body: LoginRequest) =>
    apiClient.post<LoginResponse>('/auth/login', body).then((r) => r.data),

  logout: () => apiClient.post<void>('/auth/logout').then((r) => r.data),

  // Refresh token lives in httpOnly cookie — server reads it automatically.
  refresh: () =>
    apiClient.post<{ accessToken: string; expiresIn: number }>('/auth/refresh').then((r) => r.data),

  // Bootstrap endpoint — creates the initial admin user and tenant.
  // Idempotent: returns 200 if already exists with a message field.
  bootstrap: (body: {
    email: string
    password: string
    name: string
    tenantName: string
  }) => apiClient.post<{ message: string }>('/auth/bootstrap', body).then((r) => r.data),
}
