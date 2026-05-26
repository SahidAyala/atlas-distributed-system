// Re-export all store slices for convenience.
// Server state lives in React Query — only global client state lives here.
export { useAuthStore } from './auth'
export type { AuthUser } from './auth'
export { useUIStore } from './ui'
