import { Box, Flex, Heading, Text, type FlexProps } from '@chakra-ui/react'
import type { ReactNode } from 'react'

interface PageHeaderProps extends FlexProps {
  title: string
  description?: string
  actions?: ReactNode
}

export function PageHeader({ title, description, actions, ...rest }: PageHeaderProps) {
  return (
    <Flex align="flex-start" justify="space-between" gap={4} {...rest}>
      <Box>
        <Heading size="md" fontWeight="600">
          {title}
        </Heading>
        {description && (
          <Text fontSize="sm" color="text.muted" mt={1}>
            {description}
          </Text>
        )}
      </Box>
      {actions && <Flex gap={2} align="center" flexShrink={0}>{actions}</Flex>}
    </Flex>
  )
}
