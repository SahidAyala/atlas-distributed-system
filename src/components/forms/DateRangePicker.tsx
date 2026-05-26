import { HStack, Input, Text } from '@chakra-ui/react'

interface DateRangePickerProps {
  from?: string
  to?: string
  onFromChange: (value: string) => void
  onToChange: (value: string) => void
}

/**
 * Simple date range picker using native HTML date inputs.
 * For a more feature-rich picker, swap in a dedicated library and keep
 * this component's prop interface stable.
 */
export function DateRangePicker({ from, to, onFromChange, onToChange }: DateRangePickerProps) {
  return (
    <HStack spacing={2} align="center">
      <Input
        type="date"
        size="sm"
        value={from ?? ''}
        max={to ?? undefined}
        onChange={(e) => onFromChange(e.target.value)}
        focusBorderColor="brand.500"
        maxW="150px"
      />
      <Text fontSize="xs" color="text.muted">
        to
      </Text>
      <Input
        type="date"
        size="sm"
        value={to ?? ''}
        min={from ?? undefined}
        onChange={(e) => onToChange(e.target.value)}
        focusBorderColor="brand.500"
        maxW="150px"
      />
    </HStack>
  )
}
