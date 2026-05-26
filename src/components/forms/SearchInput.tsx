import { Input, InputGroup, InputLeftElement, Icon, type InputProps } from '@chakra-ui/react'
import { MdSearch } from 'react-icons/md'

interface SearchInputProps extends Omit<InputProps, 'size'> {
  size?: 'sm' | 'md'
}

export function SearchInput({ size = 'sm', placeholder = 'Search…', ...props }: SearchInputProps) {
  return (
    <InputGroup size={size}>
      <InputLeftElement pointerEvents="none">
        <Icon as={MdSearch} color="text.muted" boxSize={4} />
      </InputLeftElement>
      <Input
        pl={8}
        placeholder={placeholder}
        focusBorderColor="brand.500"
        {...props}
      />
    </InputGroup>
  )
}
