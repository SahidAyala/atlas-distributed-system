import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
} from '@chakra-ui/react'
import type { ReactNode } from 'react'
import type { FieldError } from 'react-hook-form'

interface FormFieldProps {
  label?: string
  error?: FieldError
  helperText?: string
  isRequired?: boolean
  children: ReactNode
}

/**
 * Wraps React Hook Form fields in Chakra's FormControl with error/helper text.
 * Pass the `field` from useController directly to the input child.
 */
export function FormField({ label, error, helperText, isRequired, children }: FormFieldProps) {
  return (
    <FormControl isInvalid={!!error} isRequired={isRequired}>
      {label && <FormLabel fontSize="sm">{label}</FormLabel>}
      {children}
      {error?.message ? (
        <FormErrorMessage fontSize="xs">{error.message}</FormErrorMessage>
      ) : helperText ? (
        <FormHelperText fontSize="xs">{helperText}</FormHelperText>
      ) : null}
    </FormControl>
  )
}
