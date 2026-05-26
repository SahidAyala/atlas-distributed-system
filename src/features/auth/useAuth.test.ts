import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import { useAuthStore } from '@/store/auth'

import { useAuth } from './useAuth'

// Reset Zustand store state between tests to prevent cross-test contamination.
afterEach(() => {
  useAuthStore.getState().logout()
})

describe('useAuth', () => {
  it('returns isAuthenticated false initially', () => {
    const { result } = renderHook(() => useAuth())
    expect(result.current.isAuthenticated).toBe(false)
    expect(result.current.user).toBeNull()
  })

  it('returns isAuthenticated true after login', () => {
    const { result } = renderHook(() => useAuth())

    act(() => {
      result.current.login(
        {
          id: 'usr-001',
          email: 'admin@atlas.local',
          name: 'Admin',
          tenantId: 'tenant-001',
          role: 'admin',
        },
        'mock-token',
      )
    })

    expect(result.current.isAuthenticated).toBe(true)
    expect(result.current.user?.email).toBe('admin@atlas.local')
    expect(result.current.token).toBe('mock-token')
  })

  it('clears state after logout', () => {
    const { result } = renderHook(() => useAuth())

    act(() => {
      result.current.login(
        {
          id: 'usr-001',
          email: 'admin@atlas.local',
          name: 'Admin',
          tenantId: 'tenant-001',
          role: 'admin',
        },
        'mock-token',
      )
    })

    act(() => {
      result.current.logout()
    })

    expect(result.current.isAuthenticated).toBe(false)
    expect(result.current.user).toBeNull()
    expect(result.current.token).toBeNull()
  })
})
