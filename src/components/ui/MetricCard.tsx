import {
  Box,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Skeleton,
  SkeletonText,
} from '@chakra-ui/react'

export interface MetricCardProps {
  label: string
  value?: string | number
  change?: number
  helpText?: string
  isLoading?: boolean
}

export function MetricCard({ label, value, change, helpText, isLoading }: MetricCardProps) {
  return (
    <Box
      bg="bg.surface"
      border="1px"
      borderColor="border.default"
      borderRadius="lg"
      p={5}
    >
      <Stat>
        <StatLabel
          color="text.muted"
          fontSize="xs"
          textTransform="uppercase"
          letterSpacing="wider"
          fontWeight="600"
        >
          {label}
        </StatLabel>
        {isLoading ? (
          <>
            <Skeleton h="28px" w="60%" mt={2} borderRadius="sm" />
            <SkeletonText noOfLines={1} skeletonHeight="10px" w="40%" mt={2} />
          </>
        ) : (
          <>
            <StatNumber fontSize="2xl" fontWeight="600" mt={1}>
              {value ?? '—'}
            </StatNumber>
            {(change !== undefined || helpText) && (
              <StatHelpText mb={0} mt={1} fontSize="xs" color="text.muted">
                {change !== undefined && (
                  <StatArrow type={change >= 0 ? 'increase' : 'decrease'} />
                )}
                {helpText}
              </StatHelpText>
            )}
          </>
        )}
      </Stat>
    </Box>
  )
}
