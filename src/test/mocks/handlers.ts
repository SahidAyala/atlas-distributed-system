import { http, HttpResponse } from 'msw'

import type { ApiListResponse, ApiResponse } from '@/types/api'
import type { StreamEvent } from '@/types/events'
import type { WorkflowExecution } from '@/types/workflows'
import type { AuditLog } from '@/types/audit'

const BASE = '/api'

// Shared mock data fixtures — kept minimal but structurally complete.
const mockEvent: StreamEvent = {
  id: 'evt-001',
  type: 'user.created',
  source: 'auth-service',
  severity: 'info',
  status: 'completed',
  payload: { userId: 'usr-001', email: 'test@atlas.local' },
  tenantId: 'tenant-001',
  correlationId: 'corr-abc',
  createdAt: new Date(Date.now() - 60_000).toISOString(),
  processedAt: new Date().toISOString(),
}

const mockWorkflow: WorkflowExecution = {
  id: 'exec-001',
  workflowId: 'wf-001',
  workflowName: 'User Onboarding',
  status: 'completed',
  triggeredBy: 'event:user.created',
  tenantId: 'tenant-001',
  startedAt: new Date(Date.now() - 30_000).toISOString(),
  completedAt: new Date().toISOString(),
  durationMs: 30_000,
  steps: [
    {
      id: 'step-001',
      name: 'Send welcome email',
      type: 'http',
      status: 'completed',
      startedAt: new Date(Date.now() - 30_000).toISOString(),
      completedAt: new Date(Date.now() - 25_000).toISOString(),
      durationMs: 5_000,
      output: { statusCode: 200 },
    },
    {
      id: 'step-002',
      name: 'Create default resources',
      type: 'task',
      status: 'completed',
      startedAt: new Date(Date.now() - 25_000).toISOString(),
      completedAt: new Date().toISOString(),
      durationMs: 25_000,
    },
  ],
  metadata: {},
}

const mockAuditLog: AuditLog = {
  id: 'audit-001',
  action: 'create',
  resource: 'User',
  resourceId: 'usr-001',
  actorId: 'actor-001',
  actorEmail: 'admin@atlas.local',
  tenantId: 'tenant-001',
  ipAddress: '127.0.0.1',
  userAgent: 'Mozilla/5.0',
  createdAt: new Date().toISOString(),
}

const paginationMeta = { total: 1, page: 1, limit: 50, hasNext: false }

export const handlers = [
  // Auth
  http.post(`${BASE}/auth/login`, () => {
    return HttpResponse.json({
      user: {
        id: 'usr-001',
        email: 'admin@atlas.local',
        name: 'Platform Admin',
        tenantId: 'tenant-001',
        role: 'admin',
        permissions: [],
      },
      tokens: { accessToken: 'mock-token', expiresIn: 3600 },
    })
  }),

  http.post(`${BASE}/auth/logout`, () => {
    return new HttpResponse(null, { status: 204 })
  }),

  // Dashboard
  http.get(`${BASE}/dashboard/metrics`, () => {
    return HttpResponse.json({
      data: {
        totalEvents: 1_248,
        activeWorkflows: 3,
        failedExecutions: 2,
        tenantCount: 7,
        eventsTrend: 12.5,
        failedTrend: -8.3,
      },
    })
  }),

  http.get(`${BASE}/dashboard/event-series`, () => {
    const series = Array.from({ length: 7 }, (_, i) => ({
      time: `Day ${i + 1}`,
      events: Math.round(100 + Math.random() * 200),
      failures: Math.round(Math.random() * 10),
    }))
    return HttpResponse.json({ data: series })
  }),

  // Events
  http.get(`${BASE}/events`, () => {
    const response: ApiListResponse<StreamEvent> = {
      data: [mockEvent],
      meta: paginationMeta,
    }
    return HttpResponse.json(response)
  }),

  http.get(`${BASE}/events/:id`, ({ params }) => {
    const response: ApiResponse<StreamEvent> = { data: { ...mockEvent, id: params.id as string } }
    return HttpResponse.json(response)
  }),

  // Workflows
  http.get(`${BASE}/workflows/executions`, () => {
    const response: ApiListResponse<WorkflowExecution> = {
      data: [mockWorkflow],
      meta: paginationMeta,
    }
    return HttpResponse.json(response)
  }),

  http.get(`${BASE}/workflows/executions/:id`, ({ params }) => {
    const response: ApiResponse<WorkflowExecution> = {
      data: { ...mockWorkflow, id: params.id as string },
    }
    return HttpResponse.json(response)
  }),

  http.post(`${BASE}/workflows/executions/:id/cancel`, ({ params }) => {
    const response: ApiResponse<WorkflowExecution> = {
      data: { ...mockWorkflow, id: params.id as string, status: 'cancelled' },
    }
    return HttpResponse.json(response)
  }),

  // Audit
  http.get(`${BASE}/audit`, () => {
    const response: ApiListResponse<AuditLog> = {
      data: [mockAuditLog],
      meta: paginationMeta,
    }
    return HttpResponse.json(response)
  }),
]
