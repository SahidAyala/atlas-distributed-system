export type WorkflowStatus = 'pending' | 'running' | 'completed' | 'failed' | 'cancelled'
export type StepStatus = 'pending' | 'running' | 'completed' | 'failed' | 'skipped'

export interface WorkflowExecution {
  id: string
  workflowId: string
  workflowName: string
  status: WorkflowStatus
  triggeredBy: string
  tenantId: string
  startedAt: string
  completedAt?: string
  durationMs?: number
  steps: WorkflowStep[]
  metadata: Record<string, unknown>
}

export interface WorkflowStep {
  id: string
  name: string
  type: string
  status: StepStatus
  startedAt?: string
  completedAt?: string
  durationMs?: number
  output?: Record<string, unknown>
  error?: string
  retryCount?: number
}

export interface WorkflowListParams {
  page?: number
  limit?: number
  status?: WorkflowStatus
  workflowId?: string
  tenantId?: string
  from?: string
  to?: string
}
