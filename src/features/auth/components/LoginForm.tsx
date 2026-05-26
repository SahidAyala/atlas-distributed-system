import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
  Alert,
  AlertIcon,
  AlertDescription,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface LoginFormProps {
  onSubmit: (email: string, password: string) => Promise<void>
  isLoading?: boolean
  error?: string
}

export function LoginForm({ onSubmit, isLoading, error }: LoginFormProps) {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [touched, setTouched] = useState({ email: false, password: false })

  const emailError = touched.email && !email ? 'Email is required' : ''
  const passwordError = touched.password && !password ? 'Password is required' : ''

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setTouched({ email: true, password: true })
    if (!email || !password) return
    await onSubmit(email, password)
  }

  return (
    <VStack as="form" spacing={4} onSubmit={handleSubmit} w="full">
      {error && (
        <Alert status="error" borderRadius="md" fontSize="sm">
          <AlertIcon />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <FormControl isInvalid={!!emailError}>
        <FormLabel fontSize="sm">{t('auth.email')}</FormLabel>
        <Input
          type="email"
          value={email}
          autoComplete="email"
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setTouched((p) => ({ ...p, email: true }))}
        />
        <FormErrorMessage fontSize="xs">{emailError}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!passwordError}>
        <FormLabel fontSize="sm">{t('auth.password')}</FormLabel>
        <Input
          type="password"
          value={password}
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() => setTouched((p) => ({ ...p, password: true }))}
        />
        <FormErrorMessage fontSize="xs">{passwordError}</FormErrorMessage>
      </FormControl>

      <Button type="submit" w="full" isLoading={isLoading} loadingText={t('auth.signingIn')}>
        {t('auth.signIn')}
      </Button>
    </VStack>
  )
}
