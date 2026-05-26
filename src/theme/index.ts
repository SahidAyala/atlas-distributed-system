import { extendTheme, type ThemeConfig } from '@chakra-ui/react'
import { colors } from './colors'
import { components } from './components'

// Prefer system preference; user can override via the UI store.
const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: true,
}

export const theme = extendTheme({
  config,
  colors,
  fonts: {
    heading: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`,
    body: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`,
    mono: `'JetBrains Mono', 'Fira Code', monospace`,
  },
  fontSizes: {
    xs: '11px',
    sm: '12px',
    md: '13px',
    lg: '14px',
    xl: '16px',
    '2xl': '18px',
    '3xl': '20px',
    '4xl': '24px',
    '5xl': '30px',
  },
  radii: {
    sm: '4px',
    md: '6px',
    lg: '8px',
    xl: '12px',
    '2xl': '16px',
  },
  // Semantic tokens let components stay color-mode-agnostic.
  // Add new tokens here; never hard-code light/dark pairs inside components.
  semanticTokens: {
    colors: {
      'bg.page': { default: '#FAFAFA', _dark: 'gray.950' },
      'bg.surface': { default: 'white', _dark: 'gray.900' },
      'bg.subtle': { default: 'gray.50', _dark: 'gray.800' },
      'border.default': { default: 'gray.200', _dark: 'gray.700' },
      'text.default': { default: 'gray.900', _dark: 'gray.50' },
      'text.muted': { default: 'gray.500', _dark: 'gray.400' },
      'text.subtle': { default: 'gray.400', _dark: 'gray.500' },
    },
  },
  styles: {
    global: {
      'html, body': {
        bg: 'bg.page',
        color: 'text.default',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
      },
      '*:focus': { outline: 'none' },
      '*:focus-visible': { boxShadow: '0 0 0 2px var(--chakra-colors-brand-500)' },
    },
  },
  components,
})
