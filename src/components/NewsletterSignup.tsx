import { FormEvent, useState } from 'react'
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'

export function NewsletterSignup(): JSX.Element {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const cardBg = useColorModeValue('white', 'surfaceBg')
  const borderColor = useColorModeValue('gray.200', 'borderSubtle')
  const mutedText = useColorModeValue('gray.600', 'textMuted')

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()
    setStatus('loading')
    setMessage('')

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const payload = (await response.json()) as { ok?: boolean; message?: string; error?: string }

      if (!response.ok || !payload.ok) {
        throw new Error(payload.error || 'Nao foi possivel concluir sua inscricao.')
      }

      setStatus('success')
      setMessage(payload.message || 'Inscricao confirmada.')
      setEmail('')
    } catch (error) {
      setStatus('error')
      setMessage(error instanceof Error ? error.message : 'Nao foi possivel concluir sua inscricao.')
    }
  }

  return (
    <Box
      mt={{ base: 12, md: 16 }}
      p={{ base: 6, md: 8 }}
      bg={cardBg}
      border="1px solid"
      borderColor={borderColor}
      borderRadius="32px"
    >
      <Stack spacing="5">
        <Text fontSize="sm" textTransform="uppercase" letterSpacing="0.18em" color={mutedText}>
          Newsletter
        </Text>
        <Heading as="h2" fontSize={{ base: '2xl', md: '4xl' }} letterSpacing="-0.04em" maxW="18ch">
          Cadastre seu email para acompanhar as proximas novidades do blog.
        </Heading>
        <Text color={mutedText} maxW="2xl" lineHeight="1.8">
          Guardamos seu contato para a proxima etapa do projeto, sem disparo automatico de emails por enquanto.
        </Text>

        <form onSubmit={handleSubmit}>
          <Stack direction={{ base: 'column', md: 'row' }} spacing="4" align={{ md: 'flex-end' }}>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="voce@exemplo.com"
                size="lg"
              />
            </FormControl>

            <Button
              type="submit"
              size="lg"
              bg="brand.400"
              color="gray.900"
              _hover={{ bg: 'brand.300' }}
              isLoading={status === 'loading'}
            >
              Quero me cadastrar
            </Button>
          </Stack>
        </form>

        {status === 'success' ? (
          <Alert status="success" borderRadius="xl">
            <AlertIcon />
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        ) : null}

        {status === 'error' ? (
          <Alert status="error" borderRadius="xl">
            <AlertIcon />
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        ) : null}
      </Stack>
    </Box>
  )
}
