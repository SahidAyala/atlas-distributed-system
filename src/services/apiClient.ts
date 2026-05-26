// Re-export from lib/api/client so both import paths resolve.
// Components should use @/lib/api/client; this file lets the spec path @/services/apiClient also work.
export { apiClient } from '@/lib/api/client'
