import { useTenantStore } from './tenantStore'

/**
 * Convenience hook for reading and setting the active tenant.
 * Components that need the tenant ID for API scoping use this instead of
 * accessing the store directly.
 */
export function useTenant() {
  const activeTenant = useTenantStore((s) => s.activeTenant)
  const setActiveTenant = useTenantStore((s) => s.setActiveTenant)

  return {
    activeTenant,
    activeTenantId: activeTenant?.id ?? null,
    setActiveTenant,
    clearTenant: () => setActiveTenant(null),
  }
}
