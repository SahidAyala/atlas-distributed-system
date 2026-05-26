// Shared API envelope types used by every feature's query hooks.
// Backend services return { data, meta } for lists and { data } for single items.

export interface ApiResponse<T> {
  data: T
}

export interface ApiListResponse<T> {
  data: T[]
  meta: PaginationMeta
}

export interface PaginationMeta {
  total: number
  page: number
  limit: number
  hasNext: boolean
}

export interface ApiError {
  message: string
  code: string
  statusCode: number
}

export interface ListParams {
  page?: number
  limit?: number
  search?: string
  sortBy?: string
  sortDir?: 'asc' | 'desc'
}
