import { createBrowserRouter, Navigate } from 'react-router-dom'

import { AppShell } from '@/components/layout/AppShell'
import { AuditLogPage } from '@/features/audit/pages/AuditLogPage'
import { LoginPage } from '@/features/auth/pages/LoginPage'
import { DashboardPage } from '@/features/dashboard/pages/DashboardPage'
import { EventsPage } from '@/features/events/pages/EventsPage'
import { WorkflowExecutionPage } from '@/features/workflows/pages/WorkflowExecutionPage'
import { EventTimelinePage } from '@/pages/events/EventTimelinePage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { SettingsPage } from '@/pages/settings/SettingsPage'

import { ErrorPage } from './ErrorPage'
import { ProtectedRoute } from './ProtectedRoute'

// createBrowserRouter (data router) instead of <BrowserRouter> so route-level
// loaders / actions can be added in the future without restructuring the tree.
export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <AppShell />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'events', element: <EventsPage /> },
      { path: 'events/timeline', element: <EventTimelinePage /> },
      { path: 'workflows', element: <WorkflowExecutionPage /> },
      { path: 'audit', element: <AuditLogPage /> },
      { path: 'settings', element: <SettingsPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
