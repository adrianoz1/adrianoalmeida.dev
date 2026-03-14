import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  colors: {
    brand: {
      50: '#fff6db',
      100: '#ffe6a0',
      200: '#ffd45c',
      300: '#ffc93b',
      400: '#ffb800',
      500: '#e49a00',
    },
    teal: {
      900: '#041a1d',
      800: '#0a2b31',
      700: '#103d46',
      600: '#16505b',
      500: '#1d6672',
    },
    gray: {
      "900": "#181B23",
      "800": "#1F2029",
      "700": "#353646",
      "600": "#4B4D63",
      "500": "#616480",
      "400": "#797D9A",
      "300": "#9699B0",
      "200": "#B3B5C6",
      "100": "#D1D2DC",
      "50": "#EEEEF2",
    }
  },
  semanticTokens: {
    colors: {
      pageBg: {
        default: '#0b0b0f',
        _light: '#ffffff',
      },
      surfaceBg: {
        default: '#121317',
        _light: '#ffffff',
      },
      surfaceAltBg: {
        default: '#1a1b21',
        _light: '#f3f4f7',
      },
      borderSubtle: {
        default: '#292b33',
        _light: '#d9dde5',
      },
      textPrimary: {
        default: '#f5f3ef',
        _light: '#14151a',
      },
      textMuted: {
        default: '#a6a8b5',
        _light: '#5d6475',
      },
      linkAccent: {
        default: '#ffd45c',
        _light: '#b87a00',
      },
      tocMuted: {
        default: '#8f93a5',
        _light: '#697082',
      },
    },
  },
  fonts: {
    heading: 'var(--font-space-grotesk), sans-serif',
    body: 'var(--font-roboto), sans-serif'
  },
  styles: {
    global: {
      'html, body': {
        bg: 'pageBg',
      },
      body: {
        bg: 'pageBg',
        color: 'textPrimary'
      }
    }
  }
})
