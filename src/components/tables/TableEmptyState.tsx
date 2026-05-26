import { Td, Tr } from '@chakra-ui/react'

import { EmptyState } from '@/components/feedback/EmptyState'

interface TableEmptyStateProps {
  colSpan: number
  message?: string
}

/**
 * An empty state row for use inside <Tbody> when there is no data.
 * Renders the shared EmptyState component spanning all columns.
 */
export function TableEmptyState({ colSpan, message }: TableEmptyStateProps) {
  return (
    <Tr>
      <Td colSpan={colSpan} border="none">
        <EmptyState message={message ?? 'No results found'} />
      </Td>
    </Tr>
  )
}
