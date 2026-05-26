import { Divider as ChakraDivider, type DividerProps } from '@chakra-ui/react'

// Thin semantic wrapper. Applies the `border.default` semantic token as default borderColor.
export function Divider(props: DividerProps) {
  return <ChakraDivider borderColor="border.default" {...props} />
}
