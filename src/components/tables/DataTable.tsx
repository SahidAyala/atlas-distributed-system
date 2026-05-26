import {
  Box,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Icon,
} from '@chakra-ui/react'
import type { ReactNode } from 'react'
import { MdArrowUpward, MdArrowDownward } from 'react-icons/md'

import { EmptyState } from '@/components/feedback/EmptyState'
import { SkeletonTable } from '@/components/feedback/SkeletonTable'

// Column definition is generic over the row type T.
// `cell` renders any React node — keeps column logic co-located with the page.
export interface ColumnDef<T> {
  key: string
  header: string
  cell: (row: T) => ReactNode
  width?: string
  sortable?: boolean
}

interface DataTableProps<T> {
  columns: ColumnDef<T>[]
  data: T[]
  isLoading?: boolean
  emptyMessage?: string
  keyExtractor: (row: T) => string
  onRowClick?: (row: T) => void
  sortKey?: string
  sortDir?: 'asc' | 'desc'
  onSort?: (key: string) => void
}

export function DataTable<T>({
  columns,
  data,
  isLoading,
  emptyMessage,
  keyExtractor,
  onRowClick,
  sortKey,
  sortDir,
  onSort,
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
                <Th
                  key={col.key}
                  w={col.width}
                  cursor={col.sortable && onSort ? 'pointer' : undefined}
                  _hover={col.sortable && onSort ? { color: 'text.default' } : undefined}
                  onClick={col.sortable && onSort ? () => onSort(col.key) : undefined}
                  userSelect="none"
                >
                  <Box as="span" display="inline-flex" alignItems="center" gap={1}>
                    {col.header}
                    {col.sortable && sortKey === col.key && (
                      <Icon
                        as={sortDir === 'asc' ? MdArrowUpward : MdArrowDownward}
                        boxSize={3}
                        color="brand.400"
                      />
                    )}
                  </Box>
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
