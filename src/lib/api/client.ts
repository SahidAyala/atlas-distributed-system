import axios, { type InternalAxiosRequestConfig } from 'axios'

import { useAuthStore } from '@/store/auth'

// Single axios instance for all Atlas API calls.
// Feature modules (events.ts, workflows.ts, etc.) import this and call typed methods.
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 15_000,
  withCredentials: true, // Sends httpOnly refresh-token cookie on every request
})

// Attach JWT + tenant ID on every outgoing request.
// Reads from Zustand outside of React — getState() is always safe outside the component tree.
apiClient.interceptors.request.use((config) => {
  const { token } = useAuthStore.getState()
  if (token) config.headers.Authorization = `Bearer ${token}`

  // Lazy import to avoid circular dependency at module load time.
  // tenantStore is only available after zustand initialises.
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { useTenantStore } = require('@/features/tenants/tenantStore') as {
      useTenantStore: { getState: () => { activeTenant: { id: string } | null } }
    }
    const tenantId = useTenantStore.getState().activeTenant?.id
    if (tenantId) config.headers['X-Tenant-ID'] = tenantId
  } catch {
    // tenantStore not yet initialised — skip header
  }

  return config
})

// Track whether a refresh is already in-flight to prevent parallel refresh races.
let isRefreshing = false
let pendingQueue: Array<{
  resolve: (token: string) => void
  reject: (err: unknown) => void
}> = []

function flushQueue(token: string | null, error?: unknown) {
  pendingQueue.forEach(({ resolve, reject }) => {
    if (token) resolve(token)
    else reject(error)
  })
  pendingQueue = []
}

// 401 handling with single-flight refresh.
// If the token has expired, attempt to refresh once, then replay all queued requests.
// If refresh fails, clear auth and redirect to /login.
apiClient.interceptors.response.use(
  (res) => res,
  async (error: unknown) => {
    if (!axios.isAxiosError(error)) return Promise.reject(error)

    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean }

    // Only attempt refresh on 401s that haven't already been retried.
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error)
    }

    // Don't refresh if the failed request *was* the refresh endpoint.
    if (originalRequest.url?.includes('/auth/refresh')) {
      useAuthStore.getState().logout()
      window.location.replace('/login')
      return Promise.reject(error)
    }

    if (isRefreshing) {
      // Queue this request until the in-flight refresh completes.
      return new Promise<unknown>((resolve, reject) => {
        pendingQueue.push({
          resolve: (token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`
            resolve(apiClient(originalRequest))
          },
          reject,
        })
      })
    }

    isRefreshing = true
    originalRequest._retry = true

    try {
      const { data } = await axios.post<{ accessToken: string }>(
        `${import.meta.env.VITE_API_BASE_URL ?? '/api'}/auth/refresh`,
        {},
        { withCredentials: true },
      )
      const newToken = data.accessToken
      useAuthStore.getState().setToken(newToken)
      flushQueue(newToken)
      originalRequest.headers.Authorization = `Bearer ${newToken}`
      return apiClient(originalRequest)
    } catch (refreshError) {
      flushQueue(null, refreshError)
      useAuthStore.getState().logout()
      window.location.replace('/login')
      return Promise.reject(refreshError)
    } finally {
      isRefreshing = false
    }
  },
)
