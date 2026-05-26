import { useAuthStore } from '@/store/auth'

/**
 * Convenience hook that exposes the most-used auth state and actions.
 * Wraps useAuthStore so callers don't need to import the store directly.
 */
export function useAuth() {
  const user = useAuthStore((s) => s.user)
  const token = useAuthStore((s) => s.token)
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const login = useAuthStore((s) => s.login)
  const logout = useAuthStore((s) => s.logout)

  return { user, token, isAuthenticated, login, logout }
}
