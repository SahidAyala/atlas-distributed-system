import { Input, type InputProps } from '@chakra-ui/react'
import { forwardRef } from 'react'

// Project-standard text input: sm size, brand focus ring.
// Use inside <FormField> for label + error handling.
export const TextInput = forwardRef<HTMLInputElement, InputProps>(function TextInput(
  { size = 'sm', ...props },
  ref,
) {
  return <Input ref={ref} size={size} focusBorderColor="brand.500" {...props} />
})
