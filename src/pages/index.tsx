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
  VStack,
} from '@chakra-ui/react'
import {
  RiArrowRightUpLine,
  RiCodeBoxLine,
  RiGithubFill,
  RiInstagramFill,
  RiLightbulbFlashLine,
  RiMailFill,
  RiPlayCircleLine,
  RiVideoLine,
  RiWhatsappFill,
  RiYoutubeFill,
} from 'react-icons/ri'

const channelHighlights = [
  {
    name: 'YouTube',
    handle: '@aa2dev',
    href: 'https://www.youtube.com/@aa2dev',
    icon: RiYoutubeFill,
    accent: 'red.400',
    eyebrow: 'Videoaulas e análises',
    description:
      'Conteúdo aprofundado sobre desenvolvimento, carreira, arquitetura e ferramentas que realmente ajudam a entregar software melhor.',
  },
  {
    name: 'Instagram',
    handle: '@aa2dev',
    href: 'https://www.instagram.com/aa2dev',
    icon: RiInstagramFill,
    accent: 'pink.300',
    eyebrow: 'Cortes, bastidores e dicas',
    description:
      'Pílulas rápidas com insights de programação, rotina de dev, produtividade e decisões práticas do dia a dia em tecnologia.',
  },
  {
    name: 'TikTok',
    handle: '@aa2dev',
    href: 'https://www.tiktok.com/@aa2dev',
    icon: RiVideoLine,
    accent: 'cyan.300',
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
  return (
    <Box position="relative" overflow="hidden">
      <Box
        position="absolute"
        top="-8rem"
        right="-6rem"
        width="22rem"
        height="22rem"
        bg="brand.400"
        opacity={0.16}
        filter="blur(90px)"
        borderRadius="full"
      />
      <Box
        position="absolute"
        top="22rem"
        left="-8rem"
        width="26rem"
        height="26rem"
        bg="teal.600"
        opacity={0.18}
        filter="blur(110px)"
        borderRadius="full"
      />

      <Container maxW="1200px" px={{ base: 5, md: 8 }} py={{ base: 6, md: 8 }} position="relative">
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
            <Text color="gray.400" fontSize="sm">
              programador e produtor de conteúdo com visão prática
            </Text>
          </VStack>

          <HStack spacing={{ base: 2, md: 3 }} flexWrap="wrap" justify="flex-end">
            <NextLink href="/blog" passHref legacyBehavior>
              <Button as="a" variant="ghost" color="gray.100" _hover={{ bg: 'whiteAlpha.100' }}>
                Blog
              </Button>
            </NextLink>
            <Link href="https://www.youtube.com/@aa2dev" isExternal>
              <Button leftIcon={<Icon as={RiYoutubeFill} />} variant="ghost" color="gray.100" _hover={{ bg: 'whiteAlpha.100' }}>
                YouTube
              </Button>
            </Link>
            <Link href="https://www.instagram.com/aa2dev" isExternal>
              <Button leftIcon={<Icon as={RiInstagramFill} />} variant="ghost" color="gray.100" _hover={{ bg: 'whiteAlpha.100' }}>
                Instagram
              </Button>
            </Link>
            <Link href="https://www.tiktok.com/@aa2dev" isExternal>
              <Button leftIcon={<Icon as={RiVideoLine} />} variant="ghost" color="gray.100" _hover={{ bg: 'whiteAlpha.100' }}>
                TikTok
              </Button>
            </Link>
          </HStack>
        </Flex>

        <Grid templateColumns={{ base: '1fr', lg: '1.15fr 0.85fr' }} gap={{ base: 10, lg: 8 }} alignItems="center">
          <GridItem>
            <Stack spacing="7">
              <HStack spacing="3" wrap="wrap">
                <Badge bg="whiteAlpha.180" color="brand.100" px="3" py="1.5" borderRadius="full">
                  Programador e criador de conteúdo tech
                </Badge>
                <Badge bg="teal.700" color="teal.50" px="3" py="1.5" borderRadius="full">
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
                  Programação e tecnologia com linguagem clara e execução real.
                </Heading>

                <Text fontSize={{ base: 'lg', md: 'xl' }} color="gray.300" maxW="2xl" lineHeight="1.8">
                  Sou Adriano Almeida, programador com mais de 12 anos de experiência e produtor de conteúdo sobre
                  programação e tecnologia. Transformo vivência prática em conteúdo para ajudar devs a pensar melhor,
                  codar com mais clareza e acompanhar a evolução da área sem hype vazio.
                </Text>
              </Stack>

              <HStack spacing="4" wrap="wrap">
                <NextLink href="/blog" passHref legacyBehavior>
                  <Button
                    as="a"
                    size="lg"
                    variant="outline"
                    color="gray.100"
                    borderColor="whiteAlpha.300"
                    px="8"
                    _hover={{ bg: 'whiteAlpha.100' }}
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
                    _hover={{ bg: 'brand.300', transform: 'translateY(-1px)' }}
                    rightIcon={<Icon as={RiArrowRightUpLine} />}
                  >
                    Ver conteúdos
                  </Button>
                </Link>
                <Link href="mailto:contato@a2dev.com.br">
                  <Button
                    size="lg"
                    variant="outline"
                    color="gray.100"
                    borderColor="whiteAlpha.300"
                    px="8"
                    _hover={{ bg: 'whiteAlpha.100' }}
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
                    bg="whiteAlpha.100"
                    border="1px solid"
                    borderColor="whiteAlpha.200"
                    backdropFilter="blur(10px)"
                  >
                    <Text color="gray.100" fontWeight="500">
                      {stat}
                    </Text>
                  </Box>
                ))}
              </SimpleGrid>
            </Stack>
          </GridItem>

          <GridItem>
            <Box
              position="relative"
              borderRadius="32px"
              p={{ base: 5, md: 7 }}
              bg="linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)"
              border="1px solid"
              borderColor="whiteAlpha.200"
              backdropFilter="blur(14px)"
              boxShadow="0 30px 80px rgba(0,0,0,0.35)"
            >
              <Box
                position="absolute"
                inset="auto -2rem -2rem auto"
                width="10rem"
                height="10rem"
                bg="brand.400"
                opacity={0.18}
                filter="blur(60px)"
                borderRadius="full"
              />

              <Stack spacing="6" position="relative">
                <HStack justify="space-between" align="flex-start">
                  <VStack align="flex-start" spacing="1">
                    <Text color="gray.400" fontSize="sm" textTransform="uppercase" letterSpacing="0.16em">
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
                    borderColor="whiteAlpha.300"
                  />
                </HStack>

                <Text color="gray.300" lineHeight="1.9">
                  Atuo como programador e produtor de conteúdo, criando materiais para quem quer evoluir como dev e
                  entender tecnologia de um jeito aplicável: programação, ferramentas, arquitetura, carreira e visão
                  de produto.
                </Text>

                <SimpleGrid columns={2} spacing="4">
                  <Box p="4" borderRadius="24px" bg="blackAlpha.300" border="1px solid" borderColor="whiteAlpha.100">
                    <Text color="gray.400" fontSize="sm">
                      Formato
                    </Text>
                    <Text fontSize="lg" fontWeight="600">
                      vídeos, posts e cortes
                    </Text>
                  </Box>
                  <Box p="4" borderRadius="24px" bg="blackAlpha.300" border="1px solid" borderColor="whiteAlpha.100">
                    <Text color="gray.400" fontSize="sm">
                      Tema central
                    </Text>
                    <Text fontSize="lg" fontWeight="600">
                      programação e tecnologia
                    </Text>
                  </Box>
                </SimpleGrid>

                <HStack spacing="4" color="gray.300">
                  <Icon as={RiGithubFill} />
                  <Link href="https://www.github.com/adrianoz1" isExternal _hover={{ color: 'brand.300' }}>
                    github.com/adrianoz1
                  </Link>
                </HStack>
              </Stack>
            </Box>
          </GridItem>
        </Grid>

        <Box mt={{ base: 20, md: 28 }}>
          <Stack spacing="4" mb="8">
            <Text color="brand.300" fontWeight="600" letterSpacing="0.12em" textTransform="uppercase" fontSize="sm">
              Produção de conteúdo
            </Text>
            <Heading fontSize={{ base: '3xl', md: '5xl' }} maxW="12ch">
              Onde acompanhar os conteúdos do @aa2dev
            </Heading>
            <Text color="gray.300" maxW="2xl" lineHeight="1.8">
              Cada rede tem um papel diferente: profundidade no YouTube, ritmo e bastidores no Instagram, e vídeos
              rápidos no TikTok para aprender em poucos minutos.
            </Text>
          </Stack>

          <SimpleGrid columns={{ base: 1, lg: 3 }} spacing="6">
            {channelHighlights.map((channel) => (
              <Box
                key={channel.name}
                p={{ base: 6, md: 7 }}
                borderRadius="28px"
                bg="rgba(255,255,255,0.06)"
                border="1px solid"
                borderColor="whiteAlpha.200"
                backdropFilter="blur(10px)"
                transition="transform 0.2s ease, border-color 0.2s ease"
                _hover={{ transform: 'translateY(-4px)', borderColor: 'whiteAlpha.400' }}
              >
                <Stack spacing="5">
                  <Flex align="center" justify="space-between">
                    <HStack spacing="4">
                      <Flex
                        width="12"
                        height="12"
                        borderRadius="2xl"
                        align="center"
                        justify="center"
                        bg="whiteAlpha.120"
                        color={channel.accent}
                      >
                        <Icon as={channel.icon} boxSize="6" />
                      </Flex>
                      <Box>
                        <Heading as="h3" fontSize="2xl">
                          {channel.name}
                        </Heading>
                        <Text color="gray.400">{channel.handle}</Text>
                      </Box>
                    </HStack>
                    <Icon as={RiPlayCircleLine} boxSize="6" color="gray.500" />
                  </Flex>

                  <Text color="brand.300" fontWeight="600" fontSize="sm" textTransform="uppercase" letterSpacing="0.1em">
                    {channel.eyebrow}
                  </Text>

                  <Text color="gray.300" lineHeight="1.8">
                    {channel.description}
                  </Text>

                  <Link href={channel.href} isExternal alignSelf="flex-start">
                    <Button
                      variant="outline"
                      borderColor="whiteAlpha.300"
                      color="gray.100"
                      rightIcon={<Icon as={RiArrowRightUpLine} />}
                      _hover={{ bg: 'whiteAlpha.100' }}
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
                bg="blackAlpha.260"
                border="1px solid"
                borderColor="whiteAlpha.200"
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
                  <Text color="gray.300" lineHeight="1.8">
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
          bg="linear-gradient(135deg, rgba(255,184,0,0.18) 0%, rgba(9,30,35,0.92) 56%, rgba(255,255,255,0.04) 100%)"
          border="1px solid"
          borderColor="whiteAlpha.200"
        >
          <Stack spacing="6" align={{ base: 'flex-start', md: 'center' }} textAlign={{ base: 'left', md: 'center' }}>
            <Text color="gray.200" fontWeight="600" textTransform="uppercase" letterSpacing="0.12em" fontSize="sm">
              Bora construir algo relevante
            </Text>
            <Heading fontSize={{ base: '3xl', md: '5xl' }} maxW="12ch">
              Tecnologia, conteúdo e conversa boa no mesmo lugar.
            </Heading>
              <Text color="gray.200" maxW="2xl" lineHeight="1.9">
                Se você quer acompanhar meu trabalho, trocar ideia sobre projetos ou falar sobre conteúdo em tecnologia,
                me chama por e-mail, WhatsApp ou nas redes do @aa2dev.
              </Text>
              <HStack spacing="4" wrap="wrap">
              <Link href="mailto:contato@a2dev.com.br">
                <Button leftIcon={<Icon as={RiMailFill} />} size="lg" bg="gray.50" color="gray.900" _hover={{ bg: 'white' }}>
                  Enviar e-mail
                </Button>
              </Link>
              <Link href="https://wa.me/5551989100986" isExternal>
                <Button
                  leftIcon={<Icon as={RiWhatsappFill} />}
                  size="lg"
                  variant="outline"
                  borderColor="whiteAlpha.300"
                  color="gray.100"
                  _hover={{ bg: 'whiteAlpha.100' }}
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
