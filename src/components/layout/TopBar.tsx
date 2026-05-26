import {
  Flex,
  IconButton,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Avatar,
  Text,
  Box,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'
import { MdMenu, MdLightMode, MdDarkMode, MdLogout, MdPerson } from 'react-icons/md'
import { useTranslation } from 'react-i18next'
import { useAuthStore } from '@/store/auth'
import { useUIStore } from '@/store/ui'

export function TopBar() {
  const { t } = useTranslation()
  const { toggleColorMode, colorMode } = useColorMode()
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)
  const toggleSidebar = useUIStore((s) => s.toggleSidebar)

  const bg = useColorModeValue('white', 'gray.900')
  const border = useColorModeValue('gray.200', 'gray.800')

  return (
    <Flex
      h="56px"
      align="center"
      justify="space-between"
      px={4}
      bg={bg}
      borderBottom="1px"
      borderColor={border}
      flexShrink={0}
    >
      <IconButton
        aria-label="Toggle sidebar"
        icon={<Icon as={MdMenu} />}
        variant="ghost"
        size="sm"
        onClick={toggleSidebar}
      />

      <Flex align="center" gap={2}>
        <IconButton
          aria-label="Toggle color mode"
          icon={<Icon as={colorMode === 'light' ? MdDarkMode : MdLightMode} />}
          variant="ghost"
          size="sm"
          onClick={toggleColorMode}
        />

        <Menu>
          <MenuButton>
            <Flex align="center" gap={2} cursor="pointer" px={1}>
              <Avatar size="xs" name={user?.name ?? user?.email} />
              <Box display={{ base: 'none', md: 'block' }}>
                <Text fontSize="sm" fontWeight="500" lineHeight="tight">
                  {user?.name ?? user?.email}
                </Text>
                <Text fontSize="xs" color="text.muted" lineHeight="tight">
                  {user?.tenantId}
                </Text>
              </Box>
            </Flex>
          </MenuButton>
          <MenuList>
            <MenuItem icon={<Icon as={MdPerson} />} fontSize="sm">
              Profile
            </MenuItem>
            <MenuDivider />
            <MenuItem
              icon={<Icon as={MdLogout} />}
              fontSize="sm"
              color="red.400"
              onClick={logout}
            >
              {t('auth.signOut')}
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  )
}
