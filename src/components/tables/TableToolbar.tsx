import { Flex, HStack } from '@chakra-ui/react'
import type { ReactNode } from 'react'

interface TableToolbarProps {
  /** Left side: search input, filters */
  left?: ReactNode
  /** Right side: export button, column visibility, etc. */
  right?: ReactNode
}

/**
 * Standardized row above data tables containing search, filter, and action slots.
 * Use `left` for filter controls and `right` for export/config actions.
 */
export function TableToolbar({ left, right }: TableToolbarProps) {
  return (
    <Flex
      justify="space-between"
      align="center"
      gap={3}
      flexWrap="wrap"
      mb={3}
    >
      <HStack spacing={2} flexWrap="wrap">
        {left}
      </HStack>
      {right && (
        <HStack spacing={2} flexShrink={0}>
          {right}
        </HStack>
      )}
    </Flex>
  )
}
