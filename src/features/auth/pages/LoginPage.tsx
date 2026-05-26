import { Box, Flex, Heading, Text, useColorModeValue } from '@chakra-ui/react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { LoginForm } from '../components/LoginForm'
import { useAuthStore } from '@/store/auth'
import { apiClient } from '@/lib/api/client'
import type { AuthUser } from '@/store/auth'

interface LoginResponse {
  user: AuthUser
  token: string
}

export function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const login = useAuthStore((s) => s.login)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>()

  const from = (location.state as { from?: Location })?.from?.pathname ?? '/dashboard'

  const bg = useColorModeValue('bg.page', 'gray.950')
  const cardBg = useColorModeValue('white', 'gray.900')
  const border = useColorModeValue('gray.200', 'gray.700')

  const handleSubmit = async (email: string, password: string) => {
    setIsLoading(true)
    setError(undefined)
    try {
      const { data } = await apiClient.post<LoginResponse>('/auth/login', { email, password })
      login(data.user, data.token)
      navigate(from, { replace: true })
    } catch {
      setError('Invalid email or password.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Flex minH="100vh" align="center" justify="center" bg={bg}>
      <Box
        w="full"
        maxW="380px"
        px={8}
        py={10}
        bg={cardBg}
        border="1px"
        borderColor={border}
        borderRadius="xl"
        shadow="sm"
      >
        <Box mb={8} textAlign="center">
          <Heading size="md" fontWeight="700" mb={1}>
            Atlas IaaS
          </Heading>
          <Text fontSize="sm" color="text.muted">
            Sign in to your account
          </Text>
        </Box>
        <LoginForm onSubmit={handleSubmit} isLoading={isLoading} error={error} />
      </Box>
    </Flex>
  )
}
