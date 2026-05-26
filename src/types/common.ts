export type ID = string

export type Timestamp = string

export type SortOrder = 'asc' | 'desc'

export interface PaginationParams {
  page?: number
  limit?: number
  sortBy?: string
  sortDir?: SortOrder
}

export interface SelectOption<T = string> {
  label: string
  value: T
}

export type Nullable<T> = T | null

export type Optional<T> = T | undefined
