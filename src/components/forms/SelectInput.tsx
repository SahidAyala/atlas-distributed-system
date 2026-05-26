import { Select, type SelectProps } from '@chakra-ui/react'
import { forwardRef } from 'react'

// Project-standard select: sm size, brand focus ring.
export const SelectInput = forwardRef<HTMLSelectElement, SelectProps>(function SelectInput(
  { size = 'sm', ...props },
  ref,
) {
  return <Select ref={ref} size={size} focusBorderColor="brand.500" {...props} />
})
