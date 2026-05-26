import { HStack, Button, Text, Select, Icon } from '@chakra-ui/react'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'

interface TablePaginationProps {
  page: number
  limit: number
  total: number
  onPageChange: (page: number) => void
  onLimitChange?: (limit: number) => void
}

export function TablePagination({
  page,
  limit,
  total,
  onPageChange,
  onLimitChange,
}: TablePaginationProps) {
  const totalPages = Math.max(1, Math.ceil(total / limit))
  const from = (page - 1) * limit + 1
  const to = Math.min(page * limit, total)

  return (
    <HStack justify="space-between" pt={3} flexWrap="wrap" gap={2}>
      <Text fontSize="xs" color="text.muted">
        {total > 0 ? `${from}–${to} of ${total.toLocaleString()}` : '0 results'}
      </Text>

      <HStack spacing={1}>
        {onLimitChange && (
          <Select
            size="xs"
            maxW="80px"
            value={limit}
            onChange={(e) => onLimitChange(Number(e.target.value))}
          >
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </Select>
        )}

        <Button
          size="xs"
          variant="ghost"
          isDisabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          aria-label="Previous page"
        >
          <Icon as={MdChevronLeft} />
        </Button>

        <Text fontSize="xs" px={1} color="text.muted">
          {page} / {totalPages}
        </Text>

        <Button
          size="xs"
          variant="ghost"
          isDisabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          aria-label="Next page"
        >
          <Icon as={MdChevronRight} />
        </Button>
      </HStack>
    </HStack>
  )
}
