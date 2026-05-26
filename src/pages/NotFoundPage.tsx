import { VStack, Heading, Text, Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { ROUTES } from '@/lib/constants'

export function NotFoundPage() {
  const { t } = useTranslation()

  return (
    <VStack spacing={4} align="center" justify="center" minH="60vh" p={8}>
      <Text fontSize="5xl" fontWeight="700" color="text.subtle" lineHeight="1">
        404
      </Text>
      <Heading size="md" fontWeight="600">
        {t('errors.notFound')}
      </Heading>
      <Text fontSize="sm" color="text.muted">
        The page you are looking for does not exist or has been moved.
      </Text>
      <Button as={Link} to={ROUTES.DASHBOARD} size="sm" mt={2}>
        Back to Dashboard
      </Button>
    </VStack>
  )
}
