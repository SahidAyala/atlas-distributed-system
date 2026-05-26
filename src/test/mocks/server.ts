import { setupServer } from 'msw/node'

import { handlers } from './handlers'

// Node server for Vitest (jsdom) — started/stopped in setup.ts.
export const server = setupServer(...handlers)
