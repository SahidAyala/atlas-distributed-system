import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type { Tenant } from '@/types/tenant'

interface TenantState {
  // The tenant the operator is currently viewing. Null = global/all tenants view.
  activeTenant: Tenant | null
  setActiveTenant: (tenant: Tenant | null) => void
}

// Persisted so the selected tenant survives page reloads.
// The API client reads activeTenant.id to set the X-Tenant-ID header.
export const useTenantStore = create<TenantState>()(
  persist(
    (set) => ({
      activeTenant: null,
      setActiveTenant: (tenant) => set({ activeTenant: tenant }),
    }),
    {
      name: 'atlas-tenant',
      partialize: (state) => ({ activeTenant: state.activeTenant }),
    },
  ),
)
