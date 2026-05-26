# Atlas Platform UI — CLAUDE.md

Operational React SPA for Atlas IaaS. Surfaces Event Streaming, Workflow Engine, and Multi-tenant Platform data.

---

## Architecture at a glance

```
src/
  app/          # App bootstrap: providers, router, ProtectedRoute, ErrorPage
  components/   # Shared, feature-agnostic UI primitives
    data/       # DataTable, TimeSeriesChart, BarChart
    feedback/   # EmptyState, ErrorBoundary, SkeletonCard, SkeletonTable
    layout/     # AppShell, Sidebar, TopBar, PageHeader
    ui/         # StatusBadge, MetricCard, TagList
  features/     # One directory per product domain
    auth/
    dashboard/
    events/
    workflows/
    audit/
  lib/
    api/        # Axios client + per-feature API modules
    i18n/       # i18next setup + locale JSON files
    utils/      # date.ts, format.ts
  store/        # Zustand: auth.ts (persisted), ui.ts (persisted)
  theme/        # Chakra UI theme extension
  types/        # Shared TypeScript interfaces
  test/         # setup.ts + renderWithProviders util
```

## Key conventions

### Adding a new feature
1. Create `src/features/<name>/` with `pages/`, `components/`, `hooks/` subdirectories.
2. Add a locale file `src/lib/i18n/locales/en/<name>.json` and register it in `src/lib/i18n/index.ts`.
3. Add an API module `src/lib/api/<name>.ts` following the existing pattern.
4. Add query keys in the feature's hooks file: `export const <name>Keys = { all, list, detail }`.
5. Register the route in `src/app/router.tsx`.
6. Add the nav item in `src/components/layout/Sidebar.tsx`.

### Query hooks
- Query key format: `['feature', 'resource', params?]`
- Export key factories so other hooks can invalidate correctly.
- Use `refetchInterval` for polling live data (e.g. running workflow executions).
- Never fetch in useEffect — always use `useQuery`.

### State management
- **Server state** → React Query (`useQuery`, `useMutation`).
- **Client state** → Zustand stores in `src/store/`. Only add a store for state that outlives a component tree (auth token, sidebar collapse preference).
- **Local UI state** → `useState` inside the component. Do not hoist it unless shared.

### Styling
- Always use Chakra semantic tokens (`bg.surface`, `border.default`, `text.muted`) instead of hard-coded light/dark pairs inside components.
- Add new semantic tokens in `src/theme/index.ts`.
- Override component styles in `src/theme/components.ts`, not inline.
- Never use inline `style={{}}` except for dynamic values Chakra props can't express.

### Translations
- Every user-visible string goes through `useTranslation`. No string literals in JSX.
- Namespace maps to the feature: `useTranslation('events')`, `useTranslation('workflows')`, etc.
- `common` namespace holds cross-cutting strings (nav, actions, status labels, errors).

### Testing
- Import `render` from `@/test/utils` (not `@testing-library/react`) — it includes all providers.
- Mock API calls with `vi.fn()` or `msw`; never call the real API in tests.
- Test user-observable behavior, not internal implementation details.

### Status badges
All status/severity values route through `<StatusBadge status="..." />` in `src/components/ui/StatusBadge.tsx`. Extend the `StatusVariant` union and `colorMap` there when adding new statuses.

### API client
One axios instance in `src/lib/api/client.ts`. Auth token is injected via request interceptor. 401 responses clear auth and redirect to `/login`. Feature modules (`events.ts`, `workflows.ts`, `audit.ts`) export typed functions that call this client — pages never call `apiClient` directly.

### Error handling
- Route-level: `<ErrorBoundary>` wraps `<Outlet>` in `AppShell`. Catches render errors per page.
- Query errors: surface via `isError` from `useQuery` and show an empty/error state inline.
- Global 401: handled by the axios interceptor — no per-page handling needed.

## Getting started

```bash
pnpm install
cp .env.example .env.local   # edit service ports if needed
pnpm dev                     # → http://localhost:5173
pnpm test                    # run Vitest
pnpm typecheck               # tsc --noEmit
```

> **Package manager: pnpm only.** Never use npm or yarn — it will create a competing lockfile and break reproducible installs. The `packageManager` field in `package.json` and the `.npmrc` (`shamefully-hoist` for Chakra/emotion) are both required.

## Environment
```
VITE_API_BASE_URL=/api          # proxied by Vite in dev; set to full URL in production
VITE_ENABLE_DEVTOOLS=true       # show React Query devtools overlay
```
