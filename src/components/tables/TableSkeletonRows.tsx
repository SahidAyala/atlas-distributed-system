import { Skeleton, Td, Tr } from '@chakra-ui/react'

interface TableSkeletonRowsProps {
  rows?: number
  cols: number
}

/**
 * Generates placeholder skeleton rows for use inside <Tbody> during loading.
 * Matches DataTable's column count so the layout doesn't shift on load.
 */
export function TableSkeletonRows({ rows = 5, cols }: TableSkeletonRowsProps) {
  return (
    <>
      {Array.from({ length: rows }).map((_, r) => (
        <Tr key={r}>
          {Array.from({ length: cols }).map((_, c) => (
            <Td key={c}>
              <Skeleton h="12px" w={c === 0 ? '120px' : '80px'} borderRadius="sm" />
            </Td>
          ))}
        </Tr>
      ))}
    </>
  )
}
