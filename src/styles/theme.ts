import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
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
  fonts: {
    heading: 'var(--font-space-grotesk), sans-serif',
    body: 'var(--font-roboto), sans-serif'
  },
  styles: {
    global: {
      'html, body': {
        background: 'linear-gradient(180deg, #081113 0%, #111827 45%, #181B23 100%)',
      },
      body: {
        bg: 'gray.900',
        color: 'gray.50'
      }
    }
  }
})
