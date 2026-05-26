import type { ReactNode } from 'react'

import { useAuthStore } from '@/store/auth'
import type { Role } from '@/types/auth'

interface RoleGuardProps {
  /** Render children only when the current user has one of these roles */
  roles: Role[]
  children: ReactNode
  /** Optional fallback rendered when access is denied. Defaults to null. */
  fallback?: ReactNode
}

/**
 * Renders children only when the authenticated user holds one of the given roles.
 * Use for showing/hiding UI elements — not a substitute for server-side authorization.
 */
export function RoleGuard({ roles, children, fallback = null }: RoleGuardProps) {
  const user = useAuthStore((s) => s.user)

  if (!user) return <>{fallback}</>

  const userRole = user.role as Role
  if (!roles.includes(userRole)) return <>{fallback}</>

  return <>{children}</>
}
