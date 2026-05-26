import {
  Box,
  Flex,
  Text,
  Icon,
  VStack,
  Divider,
  useColorModeValue,
  Tooltip,
} from '@chakra-ui/react'
import { NavLink, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  MdDashboard,
  MdStream,
  MdAccountTree,
  MdHistory,
  MdBusiness,
  MdSettings,
} from 'react-icons/md'
import type { IconType } from 'react-icons'
import { useUIStore } from '@/store/ui'

interface NavItem {
  label: string
  to: string
  icon: IconType
}

const NAV_ITEMS: NavItem[] = [
  { label: 'nav.dashboard', to: '/dashboard', icon: MdDashboard },
  { label: 'nav.events', to: '/events', icon: MdStream },
  { label: 'nav.workflows', to: '/workflows', icon: MdAccountTree },
  { label: 'nav.audit', to: '/audit', icon: MdHistory },
  { label: 'nav.tenants', to: '/tenants', icon: MdBusiness },
]

const EXPANDED_WIDTH = '220px'
const COLLAPSED_WIDTH = '56px'

export function Sidebar() {
  const { t } = useTranslation()
  const location = useLocation()
  const collapsed = useUIStore((s) => s.sidebarCollapsed)

  const bg = useColorModeValue('white', 'gray.900')
  const border = useColorModeValue('gray.200', 'gray.800')
  const activeColor = 'brand.500'
  const activeBg = useColorModeValue('brand.50', 'whiteAlpha.100')

  const width = collapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH

  return (
    <Box
      w={width}
      minW={width}
      h="100vh"
      bg={bg}
      borderRight="1px"
      borderColor={border}
      display="flex"
      flexDirection="column"
      transition="width 0.2s ease"
      overflow="hidden"
    >
      {/* Wordmark */}
      <Flex h="56px" align="center" px={collapsed ? 3 : 4} flexShrink={0}>
        <Icon as={MdDashboard} color="brand.500" boxSize={5} />
        {!collapsed && (
          <Text ml={2} fontWeight="700" fontSize="sm" letterSpacing="tight" color="text.default">
            Atlas IaaS
          </Text>
        )}
      </Flex>

      <Divider borderColor={border} />

      {/* Navigation */}
      <VStack spacing={0} align="stretch" flex={1} pt={2} px={collapsed ? 2 : 3}>
        {NAV_ITEMS.map(({ label, to, icon }) => {
          const isActive = location.pathname.startsWith(to)
          return (
            <Tooltip
              key={to}
              label={collapsed ? t(label) : undefined}
              placement="right"
              hasArrow
            >
              <Flex
                as={NavLink}
                to={to}
                align="center"
                gap={3}
                px={collapsed ? 2 : 3}
                py={2}
                borderRadius="md"
                fontSize="sm"
                fontWeight={isActive ? '600' : '400'}
                color={isActive ? activeColor : 'text.muted'}
                bg={isActive ? activeBg : 'transparent'}
                _hover={{ bg: activeBg, color: activeColor }}
                transition="all 0.1s"
                mb={0.5}
              >
                <Icon as={icon} boxSize={4} flexShrink={0} />
                {!collapsed && <Text>{t(label)}</Text>}
              </Flex>
            </Tooltip>
          )
        })}
      </VStack>

      <Divider borderColor={border} />

      {/* Bottom: settings */}
      <Box px={collapsed ? 2 : 3} py={3}>
        <Tooltip label={collapsed ? t('nav.settings') : undefined} placement="right" hasArrow>
          <Flex
            as={NavLink}
            to="/settings"
            align="center"
            gap={3}
            px={collapsed ? 2 : 3}
            py={2}
            borderRadius="md"
            fontSize="sm"
            color="text.muted"
            _hover={{ bg: 'bg.subtle', color: 'text.default' }}
            transition="all 0.1s"
          >
            <Icon as={MdSettings} boxSize={4} flexShrink={0} />
            {!collapsed && <Text>{t('nav.settings')}</Text>}
          </Flex>
        </Tooltip>
      </Box>
    </Box>
  )
}
