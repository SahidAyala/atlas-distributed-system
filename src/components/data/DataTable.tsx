import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
} from '@chakra-ui/react'
import type { ReactNode } from 'react'
import { SkeletonTable } from '@/components/feedback/SkeletonTable'
import { EmptyState } from '@/components/feedback/EmptyState'

// Column definition is generic over the row type T.
// `cell` renders any React node — keeps column logic co-located with the page.
export interface ColumnDef<T> {
  key: string
  header: string
  cell: (row: T) => ReactNode
  width?: string
}

interface DataTableProps<T> {
  columns: ColumnDef<T>[]
  data: T[]
  isLoading?: boolean
  emptyMessage?: string
  keyExtractor: (row: T) => string
  onRowClick?: (row: T) => void
}

export function DataTable<T>({
  columns,
  data,
  isLoading,
  emptyMessage,
  keyExtractor,
  onRowClick,
}: DataTableProps<T>) {
  if (isLoading) {
    return <SkeletonTable rows={6} cols={columns.length} />
  }

  if (data.length === 0) {
    return <EmptyState message={emptyMessage ?? 'No results found'} />
  }

  return (
    <Box border="1px" borderColor="border.default" borderRadius="lg" overflow="hidden">
      <TableContainer>
        <Table variant="simple" size="sm">
          <Thead bg="bg.subtle">
            <Tr>
              {columns.map((col) => (
                <Th key={col.key} w={col.width}>
                  {col.header}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {data.map((row) => (
              <Tr
                key={keyExtractor(row)}
                cursor={onRowClick ? 'pointer' : undefined}
                _hover={{ bg: 'bg.subtle' }}
                transition="background 0.1s"
                onClick={() => onRowClick?.(row)}
              >
                {columns.map((col) => (
                  <Td key={col.key}>{col.cell(row)}</Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  )
}
