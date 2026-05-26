export type Role = 'admin' | 'operator' | 'viewer' | 'tenant_admin'

export type Permission =
  | 'events:read'
  | 'events:write'
  | 'workflows:read'
  | 'workflows:write'
  | 'workflows:cancel'
  | 'audit:read'
  | 'tenants:read'
  | 'tenants:write'
  | 'settings:read'
  | 'settings:write'

export interface User {
  id: string
  email: string
  name: string
  role: Role
  tenantId: string
  permissions: Permission[]
  createdAt: string
}

export interface AuthTokens {
  accessToken: string
  // Refresh token is stored in httpOnly cookie by the server; not returned in body.
  expiresIn: number
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  user: User
  tokens: AuthTokens
}
