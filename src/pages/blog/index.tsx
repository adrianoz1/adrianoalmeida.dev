import type { GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import {
  Badge,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react'
import { RiArrowLeftLine, RiArrowRightUpLine, RiArticleLine, RiDraftLine } from 'react-icons/ri'
import { BlogPostSummary, formatPostDate } from '../../lib/blog'

interface BlogIndexPageProps {
  posts: BlogPostSummary[]
}

const BlogIndexPage: NextPage<BlogIndexPageProps> = ({ posts }) => {
  return (
    <Container maxW="1100px" px={{ base: 5, md: 8 }} py={{ base: 8, md: 12 }}>
      <Stack spacing="10">
        <Stack spacing="5">
          <Link href="/" passHref legacyBehavior>
            <Button
              as="a"
              alignSelf="flex-start"
              variant="ghost"
              leftIcon={<Icon as={RiArrowLeftLine} />}
              color="gray.200"
              _hover={{ bg: 'whiteAlpha.100' }}
            >
              Voltar para a home
            </Button>
          </Link>

          <Badge alignSelf="flex-start" bg="whiteAlpha.180" color="brand.100" px="3" py="1.5" borderRadius="full">
            Blog em Markdown
          </Badge>

          <Heading as="h1" fontSize={{ base: '4xl', md: '6xl' }} lineHeight={{ base: 1.05, md: 0.95 }} maxW="10ch">
            Artigos publicados direto do repositório.
          </Heading>

          <Text color="gray.300" fontSize={{ base: 'lg', md: 'xl' }} maxW="3xl" lineHeight="1.8">
            Esta área do site renderiza posts em Markdown versionados no GitHub. A próxima etapa do projeto vai
            adicionar rascunhos automáticos revisados por Pull Request antes da publicação.
          </Text>
        </Stack>

        <Box
          borderRadius="28px"
          border="1px solid"
          borderColor="whiteAlpha.200"
          bg="rgba(255,255,255,0.05)"
          p={{ base: 6, md: 8 }}
        >
          <HStack spacing="4" align="flex-start">
            <Flex
              width="12"
              height="12"
              borderRadius="2xl"
              align="center"
              justify="center"
              bg="brand.400"
              color="gray.900"
              flexShrink={0}
            >
              <Icon as={RiDraftLine} boxSize="6" />
            </Flex>
            <Stack spacing="2">
              <Heading as="h2" fontSize="2xl">
                Fluxo editorial preparado para rascunhos
              </Heading>
              <Text color="gray.300" lineHeight="1.8">
                Os rascunhos automáticos vão viver em `content/blog/drafts`, enquanto os posts aprovados ficam em
                `content/blog/published`. Esta PR prepara a camada pública e o modelo de conteúdo para esse fluxo.
              </Text>
            </Stack>
          </HStack>
        </Box>

        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing="6">
          {posts.map((post) => (
            <Box
              key={post.slug}
              p={{ base: 6, md: 7 }}
              borderRadius="28px"
              bg="rgba(255,255,255,0.06)"
              border="1px solid"
              borderColor="whiteAlpha.200"
            >
              <Stack spacing="5">
                <HStack spacing="3" color="gray.400" fontSize="sm" wrap="wrap">
                  <HStack spacing="2">
                    <Icon as={RiArticleLine} />
                    <Text>{formatPostDate(post.date)}</Text>
                  </HStack>
                  <Text>{post.author}</Text>
                </HStack>

                <Stack spacing="3">
                  <Heading as="h2" fontSize={{ base: '2xl', md: '3xl' }}>
                    {post.title}
                  </Heading>
                  <Text color="gray.300" lineHeight="1.8">
                    {post.excerpt}
                  </Text>
                </Stack>

                {post.tags && post.tags.length > 0 ? (
                  <HStack spacing="2" wrap="wrap">
                    {post.tags.map((tag) => (
                      <Badge key={tag} bg="whiteAlpha.160" color="gray.100" px="2.5" py="1" borderRadius="full">
                        {tag}
                      </Badge>
                    ))}
                  </HStack>
                ) : null}

                <Link href={`/blog/${post.slug}`} passHref legacyBehavior>
                  <Button
                    as="a"
                    alignSelf="flex-start"
                    variant="outline"
                    borderColor="whiteAlpha.300"
                    color="gray.100"
                    rightIcon={<Icon as={RiArrowRightUpLine} />}
                    _hover={{ bg: 'whiteAlpha.100' }}
                  >
                    Ler artigo
                  </Button>
                </Link>
              </Stack>
            </Box>
          ))}
        </SimpleGrid>
      </Stack>
    </Container>
  )
}

export const getStaticProps: GetStaticProps<BlogIndexPageProps> = async () => {
  const { getSortedPublishedPosts } = await import('../../lib/blog.server')

  return {
    props: {
      posts: getSortedPublishedPosts(),
    },
  }
}

export default BlogIndexPage
