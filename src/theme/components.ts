import { ComponentStyleConfig } from '@chakra-ui/react'

// Component-level overrides are co-located here instead of per-component files
// so theme changes don't require hunting across the codebase.

const Button: ComponentStyleConfig = {
  defaultProps: { colorScheme: 'brand' },
  baseStyle: {
    fontWeight: '500',
    borderRadius: 'md',
    _focus: { boxShadow: 'none' },
    _focusVisible: { boxShadow: 'outline' },
  },
  sizes: {
    sm: { h: '30px', fontSize: 'sm', px: 3 },
    md: { h: '34px', fontSize: 'sm', px: 4 },
  },
}

const Badge: ComponentStyleConfig = {
  baseStyle: { borderRadius: 'md', fontWeight: '500', fontSize: '11px' },
}

const Table: ComponentStyleConfig = {
  variants: {
    simple: {
      th: {
        fontSize: '11px',
        textTransform: 'uppercase',
        letterSpacing: 'wider',
        fontWeight: '600',
        color: 'gray.500',
        borderColor: 'border.default',
        py: 3,
      },
      td: {
        fontSize: 'sm',
        borderColor: 'border.default',
        py: 3,
      },
    },
  },
}

const Menu: ComponentStyleConfig = {
  baseStyle: {
    list: { borderRadius: 'lg', border: '1px', borderColor: 'border.default', shadow: 'lg' },
    item: { fontSize: 'sm' },
  },
}

const Input: ComponentStyleConfig = {
  defaultProps: { focusBorderColor: 'brand.500' },
  sizes: { md: { field: { h: '34px', fontSize: 'sm' } } },
}

const Select: ComponentStyleConfig = {
  defaultProps: { focusBorderColor: 'brand.500' },
  sizes: { md: { field: { h: '34px', fontSize: 'sm' } } },
}

export const components = { Button, Badge, Table, Menu, Input, Select }
