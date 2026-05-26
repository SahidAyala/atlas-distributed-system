import { Box, Skeleton, SkeletonText, VStack } from '@chakra-ui/react'

interface SkeletonCardProps {
  count?: number
}

export function SkeletonCard({ count = 1 }: SkeletonCardProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <Box
          key={i}
          p={5}
          borderRadius="lg"
          border="1px"
          borderColor="border.default"
          bg="bg.surface"
        >
          <VStack align="stretch" spacing={3}>
            <Skeleton h="12px" w="40%" borderRadius="sm" />
            <Skeleton h="28px" w="60%" borderRadius="sm" />
            <SkeletonText noOfLines={1} skeletonHeight="10px" w="50%" />
          </VStack>
        </Box>
      ))}
    </>
  )
}
