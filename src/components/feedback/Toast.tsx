import { useToast, type UseToastOptions } from '@chakra-ui/react'

export type ToastVariant = 'success' | 'error' | 'warning' | 'info'

const statusMap: Record<ToastVariant, UseToastOptions['status']> = {
  success: 'success',
  error: 'error',
  warning: 'warning',
  info: 'info',
}

/**
 * Typed toast hook. Returns show functions for each variant so callers
 * don't need to remember the Chakra toast option shape.
 */
export function useTypedToast() {
  const toast = useToast()

  const show = (variant: ToastVariant, title: string, description?: string) => {
    toast({
      title,
      description,
      status: statusMap[variant],
      duration: 4000,
      isClosable: true,
      position: 'top-right',
    })
  }

  return {
    success: (title: string, description?: string) => show('success', title, description),
    error: (title: string, description?: string) => show('error', title, description),
    warning: (title: string, description?: string) => show('warning', title, description),
    info: (title: string, description?: string) => show('info', title, description),
  }
}
