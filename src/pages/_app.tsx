import { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../styles/theme'
import { roboto, spaceGrotesk } from '../styles/fonts'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={`${roboto.variable} ${spaceGrotesk.variable}`}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </div>
  )
}

export default MyApp
