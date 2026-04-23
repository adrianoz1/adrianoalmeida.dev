import type { NextPage } from 'next'
import NextLink from 'next/link'
import {
  Avatar,
  Badge,
  Box,
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Icon,
  Link,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
import {
  RiArrowRightUpLine,
  RiGithubFill,
  RiInstagramFill,
  RiMailFill,
  RiVideoLine,
  RiWhatsappFill,
  RiYoutubeFill,
} from 'react-icons/ri'
import { NewsletterSignup } from '../components/NewsletterSignup'
import { Seo } from '../components/Seo'
import { StructuredData } from '../components/StructuredData'
import { getAbsoluteUrl, siteConfig } from '../lib/seo'

const channelHighlights = [
  {
    name: 'YouTube',
    handle: '@aa2dev',
    href: 'https://www.youtube.com/@aa2dev',
    icon: RiYoutubeFill,
    eyebrow: 'Profundidade com contexto',
    description:
      'Videos para evoluir em programacao, arquitetura e carreira sem ficar preso em tutorial raso.',
  },
  {
    name: 'Instagram',
    handle: '@aa2dev',
    href: 'https://www.instagram.com/aa2dev',
    icon: RiInstagramFill,
    eyebrow: 'Bastidores e consistencia',
    description:
      'Dicas, cortes e insights rapidos para manter repertorio tecnico e ritmo de aprendizado.',
  },
  {
    name: 'TikTok',
    handle: '@aa2dev',
    href: 'https://www.tiktok.com/@aa2dev',
    icon: RiVideoLine,
    eyebrow: 'Aprendizado rapido',
    description:
      'Explicacoes curtas e diretas para aprender conceitos, tendencias e atalhos sem enrolacao.',
  },
]

const valuePoints = [
  {
    title: 'Programacao com contexto',
    text: 'Trade-offs, produto e manutencao de software sem teoria solta.',
  },
  {
    title: 'Ferramentas que valem o tempo',
    text: 'React, TypeScript, arquitetura, IA e processos que ajudam a entregar melhor.',
  },
  {
    title: 'Conteudo aplicavel',
    text: 'Videos, posts e cortes para usar no trabalho real e nao so consumir.',
  },
]

const stats = [
  {
    value: '12+',
    label: 'anos em projetos reais',
  },
  {
    value: 'Sem hype',
    label: 'conteudo direto e aplicavel',
  },
  {
    value: '3 formatos',
    label: 'blog, video e conteudo curto',
  },
]

const Home: NextPage = () => {
  const pageBorder = useColorModeValue('gray.200', 'borderSubtle')
  const pageTitle = 'Adriano Almeida | Programacao, tecnologia e conteudo dev'
  const pageDescription =
    'Conteudo direto para devs que querem pensar melhor, codar com mais clareza e acompanhar tecnologia sem hype nem enrolacao.'
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Adriano Almeida',
    alternateName: 'aa2dev',
    url: siteConfig.url,
    image: 'https://www.github.com/adrianoz1.png',
    sameAs: [
      'https://github.com/adrianoz1',
      'https://www.youtube.com/@aa2dev',
      'https://www.instagram.com/aa2dev',
      'https://www.tiktok.com/@aa2dev',
    ],
    jobTitle: 'Programador ',
  }
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: 'pt-BR',
  }
  const cardBg = useColorModeValue('white', 'surfaceBg')
  const altCardBg = useColorModeValue('gray.100', 'surfaceAltBg')
  const primaryText = useColorModeValue('gray.900', 'textPrimary')
  const mutedText = useColorModeValue('gray.600', 'textMuted')
  const ghostHover = useColorModeValue('gray.100', 'gray.700')
  const accentText = useColorModeValue('brand.500', 'brand.300')
  const subtleBadgeBg = useColorModeValue('gray.100', 'surfaceAltBg')
  const solidShadow = useColorModeValue('0 12px 32px rgba(17,24,39,0.08)', '0 14px 36px rgba(0,0,0,0.24)')
  const outlineBgHover = useColorModeValue('gray.100', 'gray.700')

  return (
    <>
      <Seo
        title={pageTitle}
        description={pageDescription}
        path="/"
        image={getAbsoluteUrl('/api/og?title=Adriano%20Almeida&subtitle=Programacao%2C%20tecnologia%20e%20conteudo%20dev')}
      />
      <StructuredData data={[personSchema, websiteSchema]} />
      <Box>
      <Container maxW="1200px" px={{ base: 5, md: 8 }} py={{ base: 6, md: 8 }}>
        <Flex
          as="header"
          align="center"
          justify={{ base: 'center', md: 'space-between' }}
          direction={{ base: 'column', md: 'row' }}
          gap="4"
          py="4"
          mb={{ base: 10, md: 14 }}
          wrap="wrap"
        >
          <VStack align={{ base: 'center', md: 'flex-start' }} spacing="0">
            <Text fontSize="2xl" fontWeight="700" letterSpacing="-0.04em">
              aa<Text as="span" color="brand.400">.</Text>dev
            </Text>
            <Text color={mutedText} fontSize="sm" textAlign={{ base: 'center', md: 'left' }}>
              
            </Text>
          </VStack>

          <HStack spacing={{ base: 2, md: 3 }} flexWrap="wrap" justify={{ base: 'center', md: 'flex-end' }}>
            <NextLink href="/blog" passHref legacyBehavior>
              <Button as="a" variant="ghost" color={primaryText} _hover={{ bg: ghostHover }}>
                Blog
              </Button>
            </NextLink>
            <Link href="https://www.youtube.com/@aa2dev" isExternal>
              <Button leftIcon={<Icon as={RiYoutubeFill} />} variant="ghost" color={primaryText} _hover={{ bg: ghostHover }}>
                YouTube
              </Button>
            </Link>
            <Link href="https://www.instagram.com/aa2dev" isExternal>
              <Button leftIcon={<Icon as={RiInstagramFill} />} variant="ghost" color={primaryText} _hover={{ bg: ghostHover }}>
                Instagram
              </Button>
            </Link>
            <Link href="https://www.tiktok.com/@aa2dev" isExternal>
              <Button leftIcon={<Icon as={RiVideoLine} />} variant="ghost" color={primaryText} _hover={{ bg: ghostHover }}>
                TikTok
              </Button>
            </Link>
          </HStack>
        </Flex>

        <Grid templateColumns={{ base: '1fr', lg: '1.15fr 0.85fr' }} gap={{ base: 10, lg: 8 }} alignItems="center">
          <GridItem>
            <Stack spacing="7" align={{ base: 'center', md: 'stretch' }}>
              <HStack spacing="3" wrap="wrap" justify={{ base: 'center', md: 'flex-start' }}>
                <Badge bg={subtleBadgeBg} color={accentText} px="3" py="1.5" borderRadius="full">
                  Programador 
                </Badge>
              </HStack>

              <Stack spacing="5">
                <Heading
                  as="h1"
                  fontSize={{ base: '4xl', md: '6xl' }}
                  lineHeight={{ base: 1.05, md: 0.96 }}
                  letterSpacing="-0.05em"
                  maxW="11ch"
                  mx={{ base: 'auto', md: '0' }}
                  textAlign={{ base: 'center', md: 'left' }}
                >
                  O que você encontra aqui

                </Heading>

                <Text
                  fontSize={{ base: 'lg', md: 'xl' }}
                  color={mutedText}
                  maxW="2xl"
                  lineHeight="1.8"
                  textAlign={{ base: 'center', md: 'left' }}
                >
                  Programação, arquitetura, ferramentas e carreira com visão prática.
                </Text>
              </Stack>

              <SimpleGrid columns={{ base: 1, md: 3 }} spacing="4" maxW="4xl" width="100%">
                <NextLink href="/blog" passHref legacyBehavior>
                  <Button
                    as="a"
                    size="lg"
                    
                    bg="brand.400"
                    color="gray.900"
                    borderColor={pageBorder}
                    width="100%"
                    minH="64px"
                    _hover={{ bg: 'brand.300' }}

                  >
                    Explorar blog
                  </Button>
                </NextLink>
               
               
              </SimpleGrid>


            </Stack>
          </GridItem>

          <GridItem>
            <Box
              borderRadius="32px"
              p={{ base: 5, md: 7 }}
              bg={cardBg}
              border="1px solid"
              borderColor={pageBorder}
              boxShadow={solidShadow}
            >
              <Stack spacing="6">
                <HStack justify="space-between" align="flex-start">
                  <VStack align="flex-start" spacing="1">
                    <Text color={mutedText} fontSize="sm" textTransform="uppercase" letterSpacing="0.16em">
                      Prática
                    </Text>
                    <Heading as="h2" fontSize={{ base: '2xl', md: '3xl' }}>
                      Meu github
                    </Heading>
                  </VStack>

                  <Avatar
                    src="https://www.github.com/adrianoz1.png"
                    name="Adriano Almeida"
                    size="2xl"
                    borderWidth="4px"
                    borderColor={pageBorder}
                    bg="brand.300"
                  />
                </HStack>

                <HStack spacing="4" color={mutedText}>
                  <Icon as={RiGithubFill} />
                  <Link href="https://www.github.com/adrianoz1" isExternal _hover={{ color: 'linkAccent' }}>
                    github.com/adrianoz1
                  </Link>
                </HStack>
              </Stack>
            </Box>
          </GridItem>
        </Grid>

       

        <Box
          mt={{ base: 20, md: 28 }}
          p={{ base: 7, md: 10 }}
          borderRadius="32px"
          bg={cardBg}
          border="1px solid"
          borderColor={pageBorder}
          boxShadow={solidShadow}
        >
          <Stack spacing="6" align={{ base: 'flex-start', md: 'center' }} textAlign={{ base: 'left', md: 'center' }}>
            <Text color={accentText} fontWeight="600" textTransform="uppercase" letterSpacing="0.12em" fontSize="sm">
              Vamos conversar
            </Text>
            <Heading fontSize={{ base: '3xl', md: '5xl' }} >
              Bora bate um papo?
            </Heading>
            <Text color={mutedText} maxW="2xl" lineHeight="1.9">
              Quer acompanhar meu trabalho, falar sobre um projeto ou trocar ideia sobre tecnologia?
            </Text>
            <HStack spacing="4" wrap="wrap">
              <Link href="mailto:contato@a2dev.com.br">
                <Button leftIcon={<Icon as={RiMailFill} />} size="lg" bg="brand.400" color="gray.900" _hover={{ bg: 'brand.300' }}>
                  Enviar e-mail
                </Button>
              </Link>
              <Link href="https://wa.me/5551989100986" isExternal>
                <Button
                  leftIcon={<Icon as={RiWhatsappFill} />}
                  size="lg"
                  variant="outline"
                  borderColor={pageBorder}
                  color={primaryText}
                  _hover={{ bg: outlineBgHover }}
                >
                  Chamar no WhatsApp
                </Button>
              </Link>
            </HStack>
          </Stack>
        </Box>
      </Container>
      </Box>
    </>
  )
}

export default Home
