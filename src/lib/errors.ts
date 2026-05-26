import axios from 'axios'

// Typed API error hierarchy — keeps error handling exhaustive and consistent.

export class ApiError extends Error {
  constructor(
    public readonly message: string,
    public readonly code: string,
    public readonly statusCode: number,
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

export class NotFoundError extends ApiError {
  constructor(resource: string) {
    super(`${resource} not found`, 'NOT_FOUND', 404)
    this.name = 'NotFoundError'
  }
}

export class UnauthorizedError extends ApiError {
  constructor() {
    super('You are not authorized', 'UNAUTHORIZED', 401)
    this.name = 'UnauthorizedError'
  }
}

export class ForbiddenError extends ApiError {
  constructor() {
    super('You do not have permission to perform this action', 'FORBIDDEN', 403)
    this.name = 'ForbiddenError'
  }
}

export class ValidationError extends ApiError {
  constructor(
    message: string,
    public readonly fields?: Record<string, string>,
  ) {
    super(message, 'VALIDATION_ERROR', 422)
    this.name = 'ValidationError'
  }
}

/**
 * Extracts a user-friendly error message from any thrown value.
 * Handles Axios errors, ApiError instances, and plain Error objects.
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof ApiError) return error.message

  if (axios.isAxiosError(error)) {
    const data = error.response?.data as { message?: string } | undefined
    if (data?.message) return data.message
    if (error.response?.status === 404) return 'Resource not found.'
    if (error.response?.status === 403) return 'You do not have permission.'
    if (error.response?.status === 401) return 'Session expired. Please sign in again.'
    if (error.code === 'ECONNABORTED') return 'Request timed out. Check your connection.'
    return 'An API error occurred.'
  }

  if (error instanceof Error) return error.message

  return 'An unexpected error occurred.'
}
