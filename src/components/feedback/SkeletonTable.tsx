import { Table, Tbody, Td, Th, Thead, Tr, Skeleton, TableContainer } from '@chakra-ui/react'

interface SkeletonTableProps {
  rows?: number
  cols?: number
}

export function SkeletonTable({ rows = 5, cols = 4 }: SkeletonTableProps) {
  return (
    <TableContainer>
      <Table variant="simple" size="sm">
        <Thead>
          <Tr>
            {Array.from({ length: cols }).map((_, i) => (
              <Th key={i}>
                <Skeleton h="10px" w="80px" borderRadius="sm" />
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {Array.from({ length: rows }).map((_, r) => (
            <Tr key={r}>
              {Array.from({ length: cols }).map((_, c) => (
                <Td key={c}>
                  <Skeleton h="12px" w={c === 0 ? '120px' : '80px'} borderRadius="sm" />
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
