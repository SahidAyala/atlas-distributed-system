import {
  VStack,
  Box,
  Heading,
  Text,
  Divider,
  HStack,
  Switch,
  FormControl,
  FormLabel,
  useColorMode,
  Badge,
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { PageHeader } from '@/components/layout/PageHeader'
import { APP_NAME, APP_VERSION } from '@/lib/constants'
import { useAuth } from '@/features/auth/useAuth'

export function SettingsPage() {
  const { t } = useTranslation()
  const { user } = useAuth()
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <VStack align="stretch" spacing={6} maxW="640px">
      <PageHeader title={t('nav.settings')} description="Platform preferences and account details." />

      {/* Appearance */}
      <Box
        bg="bg.surface"
        border="1px"
        borderColor="border.default"
        borderRadius="lg"
        p={5}
      >
        <Heading size="xs" fontWeight="600" mb={4} color="text.muted" textTransform="uppercase" letterSpacing="wider">
          Appearance
        </Heading>
        <FormControl display="flex" alignItems="center" justifyContent="space-between">
          <FormLabel mb={0} fontSize="sm">
            Dark mode
          </FormLabel>
          <Switch
            isChecked={colorMode === 'dark'}
            onChange={toggleColorMode}
            colorScheme="brand"
          />
        </FormControl>
      </Box>

      {/* Account */}
      <Box
        bg="bg.surface"
        border="1px"
        borderColor="border.default"
        borderRadius="lg"
        p={5}
      >
        <Heading size="xs" fontWeight="600" mb={4} color="text.muted" textTransform="uppercase" letterSpacing="wider">
          Account
        </Heading>
        <VStack align="stretch" spacing={3} divider={<Divider borderColor="border.default" />}>
          <HStack justify="space-between">
            <Text fontSize="sm" color="text.muted">Email</Text>
            <Text fontSize="sm">{user?.email ?? '—'}</Text>
          </HStack>
          <HStack justify="space-between">
            <Text fontSize="sm" color="text.muted">Name</Text>
            <Text fontSize="sm">{user?.name ?? '—'}</Text>
          </HStack>
          <HStack justify="space-between">
            <Text fontSize="sm" color="text.muted">Role</Text>
            <Badge colorScheme="brand" variant="subtle" textTransform="capitalize">
              {user?.role ?? '—'}
            </Badge>
          </HStack>
          <HStack justify="space-between">
            <Text fontSize="sm" color="text.muted">Tenant</Text>
            <Text fontSize="sm" fontFamily="mono">
              {user?.tenantId ?? '—'}
            </Text>
          </HStack>
        </VStack>
      </Box>

      {/* About */}
      <Box
        bg="bg.surface"
        border="1px"
        borderColor="border.default"
        borderRadius="lg"
        p={5}
      >
        <Heading size="xs" fontWeight="600" mb={4} color="text.muted" textTransform="uppercase" letterSpacing="wider">
          About
        </Heading>
        <HStack justify="space-between">
          <Text fontSize="sm" color="text.muted">{APP_NAME}</Text>
          <Text fontSize="sm" color="text.muted" fontFamily="mono">
            v{APP_VERSION}
          </Text>
        </HStack>
      </Box>
    </VStack>
  )
}
