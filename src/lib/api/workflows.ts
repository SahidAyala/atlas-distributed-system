import { apiClient } from './client'
import type { ApiListResponse, ApiResponse } from '@/types/api'
import type { WorkflowExecution, WorkflowListParams } from '@/types/workflows'

export const workflowsApi = {
  list: (params?: WorkflowListParams) =>
    apiClient
      .get<ApiListResponse<WorkflowExecution>>('/workflows/executions', { params })
      .then((r) => r.data),

  get: (id: string) =>
    apiClient
      .get<ApiResponse<WorkflowExecution>>(`/workflows/executions/${id}`)
      .then((r) => r.data),

  cancel: (id: string) =>
    apiClient
      .post<ApiResponse<WorkflowExecution>>(`/workflows/executions/${id}/cancel`)
      .then((r) => r.data),
}
