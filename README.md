# Atlas Platform UI

Operational dashboard for Atlas IaaS. Surfaces real-time data from the Event Streaming, Workflow Engine, and Multi-tenant SaaS Platform services.

Design inspired by Drata, Linear, Vercel, and Grafana — dense, readable, enterprise-grade operational UI.

---

## Local Development

### Prerequisites

- Node.js 20+
- pnpm 9+ (`npm i -g pnpm` or use corepack)

### Setup

```bash
# 1. Install dependencies
pnpm install

# 2. Configure environment
cp .env.example .env.local
# Edit .env.local — set VITE_API_BASE_URL if your backends run on non-default ports

# 3. Start dev server (http://localhost:3000)
pnpm dev
```

The dev server proxies `/api/*` to the respective Atlas backend services. Ports are configured in `vite.config.ts`.

---

## Bootstrap (first run)

Before the first login you need to create the initial admin user and tenant:

```bash
# Ensure backend API is running, then:
pnpm bootstrap

# Or using the shell wrapper:
./scripts/bootstrap.sh
```

This calls `POST /auth/bootstrap` with the credentials in `.env.local`. The script is idempotent — running it a second time exits cleanly.

---

## Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start Vite dev server with HMR |
| `pnpm build` | Type-check + production build |
| `pnpm preview` | Preview production build locally |
| `pnpm lint` | ESLint |
| `pnpm lint:fix` | ESLint with auto-fix |
| `pnpm format` | Prettier format |
| `pnpm type-check` | TypeScript check without emit |
| `pnpm test` | Vitest (single run) |
| `pnpm test:watch` | Vitest in watch mode |
| `pnpm test:coverage` | Vitest with coverage report |
| `pnpm bootstrap` | Create initial admin + tenant |

---

## Docker

```bash
# Development (hot reload)
docker compose up platform-ui

# Production preview
docker compose --profile preview up platform-ui-preview
```

The production image is a two-stage build: Node.js builder → nginx:alpine server. The nginx config handles SPA routing (all paths fall back to `index.html`).

---

## Architecture

### Why Chakra UI v2?

Chakra provides a full accessible component library with built-in dark mode, semantic color tokens, and a theming system that keeps light/dark parity maintainable. The density defaults are adjusted in `src/theme/` to match an operational dashboard rather than a consumer app.

### Why Zustand over Redux Toolkit?

Redux Toolkit is excellent but brings overhead (slices, reducers, actions, selectors) that isn't justified when almost all server state lives in React Query. Zustand stores are thin — only auth tokens and UI preferences that outlive the component tree.

### Why TanStack Query?

It handles cache, stale-while-revalidate, polling, mutations, and optimistic updates without custom infrastructure. Query key factories in each feature's hook file keep invalidation correct and typo-free.

### Why no Next.js?

This is an authenticated operational dashboard served from a static CDN or container. SSR/SSG provides no benefit and would add deployment complexity. Vite + React Router v6 keeps the stack lean and the dev loop fast.

### Source layout

```
src/
  app/          # Bootstrap: providers, router, ProtectedRoute, ErrorPage
  components/   # Shared UI primitives (no feature logic)
    charts/     # AreaChart, BarChart, LineChart, MetricCard, ChartSkeleton
    feedback/   # EmptyState, ErrorBoundary, ErrorState, LoadingOverlay, Toast
    forms/      # FormField, TextInput, SelectInput, DateRangePicker, SearchInput
    layout/     # AppShell, Sidebar, TopBar, PageHeader, PageContent
    status/     # StatusDot, StatusBadge, HealthIndicator
    tables/     # DataTable, TableToolbar, TablePagination, TableEmptyState
    ui/         # Button, Badge, Tag, Spinner, Divider, MetricCard, StatusBadge
  features/     # One directory per product domain
    auth/       # authApi, authStore, useAuth, ProtectedRoute, RoleGuard
    audit/      # hooks, pages
    dashboard/  # hooks, pages
    events/     # hooks, pages, components
    tenants/    # tenantStore, useTenant
    workflows/  # hooks, pages, components
  hooks/        # Shared React hooks (useDebounce, usePagination, etc.)
  lib/
    api/        # Axios client + per-feature typed API modules
    constants.ts  # ROUTES, QUERY_KEYS, APP_NAME
    errors.ts   # Typed API error classes
    i18n/       # i18next init + locale JSON files
    utils/      # date.ts, format.ts
    validators.ts # Shared Zod schemas
  pages/        # Standalone pages (NotFoundPage, SettingsPage, EventTimelinePage)
  services/     # apiClient proxy, queryClient singleton
  store/        # Zustand slices (auth, ui) + index
  theme/        # Chakra UI theme extension (colors, components, typography)
  types/        # Shared TypeScript interfaces
  test/         # Vitest setup, MSW mocks, renderWithProviders util
```

### State management rules

- **Server state** → TanStack Query (`useQuery`, `useMutation`)
- **Auth + UI preferences** → Zustand (persisted to localStorage)
- **Local component state** → `useState` — never hoisted unless shared

### Translations

All user-visible strings go through `useTranslation`. Namespace maps 1:1 to features:
`useTranslation('events')`, `useTranslation('workflows')`, etc.
Cross-cutting strings live in the `common` namespace.

### Adding a new feature

1. Create `src/features/<name>/` with `pages/`, `components/`, `hooks/`
2. Add `src/lib/api/<name>.ts` following the typed pattern
3. Add `src/lib/i18n/locales/en/<name>.json` and register in `src/lib/i18n/index.ts`
4. Register route in `src/app/router.tsx`
5. Add nav item in `src/components/layout/Sidebar.tsx`
