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
  RiCodeBoxLine,
  RiGithubFill,
  RiInstagramFill,
  RiLightbulbFlashLine,
  RiMailFill,
  RiVideoLine,
  RiWhatsappFill,
  RiYoutubeFill,
} from 'react-icons/ri'
import { NewsletterSignup } from '../components/NewsletterSignup'

const channelHighlights = [
  {
    name: 'YouTube',
    handle: '@aa2dev',
    href: 'https://www.youtube.com/@aa2dev',
    icon: RiYoutubeFill,
    eyebrow: 'Videoaulas e análises',
    description:
      'Conteúdo aprofundado sobre desenvolvimento, carreira, arquitetura e ferramentas que realmente ajudam a entregar software melhor.',
  },
  {
    name: 'Instagram',
    handle: '@aa2dev',
    href: 'https://www.instagram.com/aa2dev',
    icon: RiInstagramFill,
    eyebrow: 'Cortes, bastidores e dicas',
    description:
      'Pílulas rápidas com insights de programação, rotina de dev, produtividade e decisões práticas do dia a dia em tecnologia.',
  },
  {
    name: 'TikTok',
    handle: '@aa2dev',
    href: 'https://www.tiktok.com/@aa2dev',
    icon: RiVideoLine,
    eyebrow: 'Tech em formato curto',
    description:
      'Vídeos objetivos para explicar conceitos, tendências e atalhos de quem quer aprender mais rápido sem conteúdo enrolado.',
  },
]

const focusAreas = [
  {
    title: 'Programação com contexto',
    text: 'Conteúdo feito para quem quer sair do tutorial raso e entender trade-offs, produto e manutenção de software.',
    icon: RiCodeBoxLine,
  },
  {
    title: 'Tecnologia aplicada',
    text: 'React, TypeScript, arquitetura, ferramentas modernas e decisões que geram impacto real em produto e negócio.',
    icon: RiLightbulbFlashLine,
  },
  {
    title: 'Consistência de produção',
    text: 'Vídeos, posts e cortes pensados para educar, compartilhar experiência prática e fortalecer a comunidade dev.',
    icon: RiVideoLine,
  },
]

const stats = [
  '12+ anos atuando como programador',
  'Conteúdo sobre programação e tecnologia',
  'Presença ativa em YouTube, Instagram e TikTok',
]

const Home: NextPage = () => {
  const pageBorder = useColorModeValue('gray.200', 'borderSubtle')
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
    <Box>
      <Container maxW="1200px" px={{ base: 5, md: 8 }} py={{ base: 6, md: 8 }}>
        <Flex
          as="header"
          align="center"
          justify="space-between"
          gap="4"
          py="4"
          mb={{ base: 10, md: 14 }}
          wrap="wrap"
        >
          <VStack align="flex-start" spacing="0">
            <Text fontSize="2xl" fontWeight="700" letterSpacing="-0.04em">
              aa<Text as="span" color="brand.400">.</Text>dev
            </Text>
            <Text color={mutedText} fontSize="sm">
              programador e produtor de conteudo com visao pratica
            </Text>
          </VStack>

          <HStack spacing={{ base: 2, md: 3 }} flexWrap="wrap" justify="flex-end">
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
            <Stack spacing="7">
              <HStack spacing="3" wrap="wrap">
                <Badge bg={subtleBadgeBg} color={accentText} px="3" py="1.5" borderRadius="full">
                  Programador e criador de conteudo tech
                </Badge>
                <Badge bg={subtleBadgeBg} color={mutedText} px="3" py="1.5" borderRadius="full">
                  @aa2dev
                </Badge>
              </HStack>

              <Stack spacing="5">
                <Heading
                  as="h1"
                  fontSize={{ base: '4xl', md: '6xl' }}
                  lineHeight={{ base: 1.05, md: 0.96 }}
                  letterSpacing="-0.05em"
                  maxW="10ch"
                >
                  Programacao e tecnologia com linguagem clara e execucao real.
                </Heading>

                <Text fontSize={{ base: 'lg', md: 'xl' }} color={mutedText} maxW="2xl" lineHeight="1.8">
                  Sou Adriano Almeida, programador com mais de 12 anos de experiencia e produtor de conteudo sobre
                  programacao e tecnologia. Transformo vivencia pratica em conteudo para ajudar devs a pensar melhor,
                  codar com mais clareza e acompanhar a evolucao da area sem hype vazio.
                </Text>
              </Stack>

              <HStack spacing="4" wrap="wrap">
                <NextLink href="/blog" passHref legacyBehavior>
                  <Button
                    as="a"
                    size="lg"
                    variant="outline"
                    color={primaryText}
                    borderColor={pageBorder}
                    px="8"
                    _hover={{ bg: outlineBgHover }}
                  >
                    Ler o blog
                  </Button>
                </NextLink>
                <Link href="https://www.youtube.com/@aa2dev" isExternal>
                  <Button
                    size="lg"
                    bg="brand.400"
                    color="gray.900"
                    px="8"
                    _hover={{ bg: 'brand.300' }}
                    rightIcon={<Icon as={RiArrowRightUpLine} />}
                  >
                    Ver conteudos
                  </Button>
                </Link>
                <Link href="mailto:contato@a2dev.com.br">
                  <Button
                    size="lg"
                    variant="outline"
                    color={primaryText}
                    borderColor={pageBorder}
                    px="8"
                    _hover={{ bg: outlineBgHover }}
                  >
                    Falar comigo
                  </Button>
                </Link>
              </HStack>

              <SimpleGrid columns={{ base: 1, md: 3 }} spacing="4" maxW="3xl">
                {stats.map((stat) => (
                  <Box
                    key={stat}
                    p="4"
                    borderRadius="2xl"
                    bg={cardBg}
                    border="1px solid"
                    borderColor={pageBorder}
                    boxShadow={solidShadow}
                  >
                    <Text color={primaryText} fontWeight="500">
                      {stat}
                    </Text>
                  </Box>
                ))}
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
                      Perfil
                    </Text>
                    <Heading as="h2" fontSize={{ base: '2xl', md: '3xl' }}>
                      Adriano Almeida
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

                <Text color={mutedText} lineHeight="1.9">
                  Atuo como programador e produtor de conteudo, criando materiais para quem quer evoluir como dev e
                  entender tecnologia de um jeito aplicavel: programacao, ferramentas, arquitetura, carreira e visao
                  de produto.
                </Text>

                <SimpleGrid columns={2} spacing="4">
                  <Box p="4" borderRadius="24px" bg={altCardBg} border="1px solid" borderColor={pageBorder}>
                    <Text color={mutedText} fontSize="sm">
                      Formato
                    </Text>
                    <Text fontSize="lg" fontWeight="600">
                      videos, posts e cortes
                    </Text>
                  </Box>
                  <Box p="4" borderRadius="24px" bg={altCardBg} border="1px solid" borderColor={pageBorder}>
                    <Text color={mutedText} fontSize="sm">
                      Tema central
                    </Text>
                    <Text fontSize="lg" fontWeight="600">
                      programacao e tecnologia
                    </Text>
                  </Box>
                </SimpleGrid>

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

        <NewsletterSignup />

        <Box mt={{ base: 20, md: 28 }}>
          <Stack spacing="4" mb="8">
            <Text color={accentText} fontWeight="600" letterSpacing="0.12em" textTransform="uppercase" fontSize="sm">
              Producao de conteudo
            </Text>
            <Heading fontSize={{ base: '3xl', md: '5xl' }} maxW="12ch">
              Onde acompanhar os conteudos do @aa2dev
            </Heading>
            <Text color={mutedText} maxW="2xl" lineHeight="1.8">
              Cada rede tem um papel diferente: profundidade no YouTube, ritmo e bastidores no Instagram, e videos
              rapidos no TikTok para aprender em poucos minutos.
            </Text>
          </Stack>

          <SimpleGrid columns={{ base: 1, lg: 3 }} spacing="6">
            {channelHighlights.map((channel) => (
              <Box
                key={channel.name}
                p={{ base: 6, md: 7 }}
                borderRadius="28px"
                bg={cardBg}
                border="1px solid"
                borderColor={pageBorder}
                boxShadow={solidShadow}
              >
                <Stack spacing="5">
                  <HStack spacing="4" align="flex-start">
                    <Flex
                      width="12"
                      height="12"
                      borderRadius="2xl"
                      align="center"
                      justify="center"
                      bg={altCardBg}
                      color="brand.400"
                      flexShrink={0}
                    >
                      <Icon as={channel.icon} boxSize="6" />
                    </Flex>
                    <Box>
                      <Heading as="h3" fontSize="2xl">
                        {channel.name}
                      </Heading>
                      <Text color={mutedText}>{channel.handle}</Text>
                    </Box>
                  </HStack>

                  <Text color={accentText} fontWeight="600" fontSize="sm" textTransform="uppercase" letterSpacing="0.1em">
                    {channel.eyebrow}
                  </Text>

                  <Text color={mutedText} lineHeight="1.8">
                    {channel.description}
                  </Text>

                  <Link href={channel.href} isExternal alignSelf="flex-start">
                    <Button
                      variant="outline"
                      borderColor={pageBorder}
                      color={primaryText}
                      rightIcon={<Icon as={RiArrowRightUpLine} />}
                      _hover={{ bg: outlineBgHover }}
                    >
                      Acessar canal
                    </Button>
                  </Link>
                </Stack>
              </Box>
            ))}
          </SimpleGrid>
        </Box>

        <Box mt={{ base: 20, md: 28 }}>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing="6">
            {focusAreas.map((item) => (
              <Box
                key={item.title}
                p="6"
                borderRadius="28px"
                bg={cardBg}
                border="1px solid"
                borderColor={pageBorder}
                boxShadow={solidShadow}
              >
                <Stack spacing="4">
                  <Flex
                    width="12"
                    height="12"
                    borderRadius="2xl"
                    align="center"
                    justify="center"
                    bg="brand.400"
                    color="gray.900"
                  >
                    <Icon as={item.icon} boxSize="6" />
                  </Flex>
                  <Heading as="h3" fontSize="2xl">
                    {item.title}
                  </Heading>
                  <Text color={mutedText} lineHeight="1.8">
                    {item.text}
                  </Text>
                </Stack>
              </Box>
            ))}
          </SimpleGrid>
        </Box>

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
              Bora construir algo relevante
            </Text>
            <Heading fontSize={{ base: '3xl', md: '5xl' }} maxW="12ch">
              Tecnologia, conteudo e conversa boa no mesmo lugar.
            </Heading>
            <Text color={mutedText} maxW="2xl" lineHeight="1.9">
              Se voce quer acompanhar meu trabalho, trocar ideia sobre projetos ou falar sobre conteudo em tecnologia,
              me chama por e-mail, WhatsApp ou nas redes do @aa2dev.
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
  )
}

export default Home
