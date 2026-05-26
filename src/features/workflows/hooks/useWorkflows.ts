import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { workflowsApi } from '@/lib/api/workflows'
import type { WorkflowListParams } from '@/types/workflows'

export const workflowKeys = {
  all: ['workflows'] as const,
  list: (params?: WorkflowListParams) => [...workflowKeys.all, 'list', params] as const,
  detail: (id: string) => [...workflowKeys.all, 'detail', id] as const,
}

export function useWorkflowExecutions(params?: WorkflowListParams) {
  return useQuery({
    queryKey: workflowKeys.list(params),
    queryFn: () => workflowsApi.list(params),
  })
}

export function useWorkflowExecution(id: string) {
  return useQuery({
    queryKey: workflowKeys.detail(id),
    queryFn: () => workflowsApi.get(id),
    enabled: !!id,
    // Poll running executions every 3s so status updates appear in real-time.
    refetchInterval: (query) =>
      query.state.data?.data.status === 'running' ? 3_000 : false,
  })
}

export function useCancelExecution() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => workflowsApi.cancel(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: workflowKeys.detail(id) })
      queryClient.invalidateQueries({ queryKey: workflowKeys.all })
    },
  })
}
