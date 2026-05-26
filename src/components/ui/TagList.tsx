import { Wrap, WrapItem, Tag, type TagProps } from '@chakra-ui/react'

interface TagListProps extends Omit<TagProps, 'children'> {
  tags: string[]
  maxVisible?: number
}

export function TagList({ tags, maxVisible, size = 'sm', colorScheme = 'gray', ...props }: TagListProps) {
  const visible = maxVisible ? tags.slice(0, maxVisible) : tags
  const overflow = maxVisible ? tags.length - maxVisible : 0

  return (
    <Wrap spacing={1}>
      {visible.map((tag) => (
        <WrapItem key={tag}>
          <Tag size={size} colorScheme={colorScheme} {...props}>
            {tag}
          </Tag>
        </WrapItem>
      ))}
      {overflow > 0 && (
        <WrapItem>
          <Tag size={size} colorScheme="gray" variant="outline">
            +{overflow}
          </Tag>
        </WrapItem>
      )}
    </Wrap>
  )
}
