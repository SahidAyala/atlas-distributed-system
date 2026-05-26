import { Box, Skeleton } from '@chakra-ui/react'

interface ChartSkeletonProps {
  height?: number
}

export function ChartSkeleton({ height = 280 }: ChartSkeletonProps) {
  return (
    <Box h={`${height}px`} position="relative">
      <Skeleton h="full" borderRadius="md" />
    </Box>
  )
}
