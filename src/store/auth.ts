import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface AuthUser {
  id: string
  email: string
  name: string
  tenantId: string
  role: string
  permissions?: string[]
}

interface AuthState {
  user: AuthUser | null
  token: string | null
  isAuthenticated: boolean
  login: (user: AuthUser, token: string) => void
  logout: () => void
  // Used by the refresh interceptor in apiClient to swap in the new access token.
  setToken: (token: string) => void
}

// Zustand persist middleware keeps auth across page reloads.
// The API client reads token via getState() — no React context needed.
// Only user + token are persisted; isAuthenticated is derived on hydration.
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: (user, token) => set({ user, token, isAuthenticated: true }),
      logout: () => set({ user: null, token: null, isAuthenticated: false }),
      setToken: (token) => set({ token }),
    }),
    {
      name: 'atlas-auth',
      partialize: (state) => ({ user: state.user, token: state.token }),
      // Re-derive isAuthenticated when the store re-hydrates from storage.
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.isAuthenticated = !!(state.user && state.token)
        }
      },
    },
  ),
)
