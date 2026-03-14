import { AppProps } from 'next/app'
import { Box, ChakraProvider } from '@chakra-ui/react'
import { theme } from '../styles/theme'
import { ThemeToggle } from '../components/ThemeToggle'
import { roboto, spaceGrotesk } from '../styles/fonts'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={`${roboto.variable} ${spaceGrotesk.variable}`}>
      <ChakraProvider theme={theme}>
        <Box position="fixed" top={{ base: 4, md: 6 }} right={{ base: 4, md: 6 }} zIndex={20}>
          <ThemeToggle />
        </Box>
        <Component {...pageProps} />
      </ChakraProvider>
    </div>
  )
}

export default MyApp
