import { useAuthStore } from '@/store/auth'
import type { Permission } from '@/types/auth'

/**
 * Returns whether the authenticated user holds all of the requested permissions.
 * Admins implicitly pass all checks.
 */
export function usePermission(...required: Permission[]): boolean {
  const user = useAuthStore((s) => s.user)

  if (!user) return false
  if (user.role === 'admin') return true

  // The User type in store/auth.ts may not have permissions array — handle gracefully.
  const permissions = ('permissions' in user ? (user as { permissions?: Permission[] }).permissions : undefined) ?? []

  return required.every((p) => permissions.includes(p))
}
