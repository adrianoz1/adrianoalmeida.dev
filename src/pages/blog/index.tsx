import type { GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Icon,
  Stack,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
import { RiArrowLeftLine } from 'react-icons/ri'
import { Seo } from '../../components/Seo'
import { StructuredData } from '../../components/StructuredData'
import { BlogPostSummary, formatPostMonth, getPostMonthKey } from '../../lib/blog'
import { getAbsoluteUrl, siteConfig } from '../../lib/seo'

interface BlogIndexPageProps {
  posts: BlogPostSummary[]
}

interface PostGroup {
  key: string
  label: string
  posts: BlogPostSummary[]
}

function groupPostsByMonth(posts: BlogPostSummary[]): PostGroup[] {
  const groups = new Map<string, PostGroup>()

  for (const post of posts) {
    const key = getPostMonthKey(post.date)
    const currentGroup = groups.get(key)

    if (currentGroup) {
      currentGroup.posts.push(post)
      continue
    }

    groups.set(key, {
      key,
      label: formatPostMonth(post.date),
      posts: [post],
    })
  }

  return Array.from(groups.values())
}

const BlogIndexPage: NextPage<BlogIndexPageProps> = ({ posts }) => {
  const groupedPosts = groupPostsByMonth(posts)
  const pageTitle = 'Blog | aa.dev'
  const pageDescription = 'Posts sobre programacao, tecnologia, arquitetura, ferramentas e carreira publicados no aa.dev.'
  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Blog aa.dev',
    description: pageDescription,
    url: getAbsoluteUrl('/blog'),
    inLanguage: 'pt-BR',
    author: {
      '@type': 'Person',
      name: siteConfig.author,
    },
  }
  const borderColor = useColorModeValue('borderSubtle', 'borderSubtle')
  const primaryText = useColorModeValue('textPrimary', 'textPrimary')
  const mutedText = useColorModeValue('tocMuted', 'tocMuted')
  const ghostHover = useColorModeValue('gray.100', 'gray.700')
  const linkColor = useColorModeValue('brand.500', 'linkAccent')

  return (
    <>
      <Seo
        title={pageTitle}
        description={pageDescription}
        path="/blog"
        image={getAbsoluteUrl('/api/og?title=Blog%20aa.dev&subtitle=Posts%20sobre%20programacao%20e%20tecnologia')}
      />
      <StructuredData data={blogSchema} />
      <Container maxW="1380px" px={{ base: 5, md: 8 }} py={{ base: 8, md: 12 }}>
      <Stack spacing={{ base: 10, md: 14 }}>
        <Stack spacing="5" align="center" textAlign="center">
          <Link href="/" passHref legacyBehavior>
            <Button
              as="a"
              variant="ghost"
              leftIcon={<Icon as={RiArrowLeftLine} />}
              color={primaryText}
              _hover={{ bg: ghostHover }}
            >
              Voltar para a home
            </Button>
          </Link>

          <Heading
            as="h1"
            fontSize={{ base: '4xl', md: '6xl' }}
            fontWeight="700"
            letterSpacing="-0.05em"
            lineHeight={{ base: 1.05, md: 0.96 }}
          >
            Blog aa<Text as="span" color="brand.400">.</Text>dev
          </Heading>

          <Text color={mutedText} maxW="2xl" fontSize={{ base: 'lg', md: 'xl' }} lineHeight="1.8">
            Posts em Markdown publicados direto do repositorio.
          </Text>
        </Stack>

        <Box display={{ base: 'block', xl: 'flex' }} alignItems="flex-start">
          <Box flex="1" minW={0} pr={{ xl: 16 }}>
            <Stack spacing={{ base: 12, md: 16 }}>
              {groupedPosts.map((group) => (
                <Box key={group.key} id={group.key} scrollMarginTop="6rem">
                  <Heading
                    as="h2"
                    fontSize={{ base: '3xl', md: '5xl' }}
                    fontWeight="700"
                    letterSpacing="-0.04em"
                    mb="4"
                  >
                    {group.label}
                  </Heading>

                  <Box borderTop="1px solid" borderColor={borderColor} pt="6">
                    <Stack as="ul" spacing="5" pl={{ base: 5, md: 7 }} sx={{ listStyleType: 'disc' }}>
                      {group.posts.map((post) => (
                        <Box as="li" key={post.slug} color={mutedText}>
                          <Link href={`/blog/${post.slug}`} passHref legacyBehavior>
                            <Text
                              as="a"
                              fontSize={{ base: '2xl', md: '3xl' }}
                              color={linkColor}
                              lineHeight="1.5"
                              textDecoration="underline"
                              _hover={{ color: 'brand.300' }}
                            >
                              {post.title}
                            </Text>
                          </Link>
                        </Box>
                      ))}
                    </Stack>
                  </Box>
                </Box>
              ))}
            </Stack>
          </Box>

          <Box
            width={{ base: '100%', xl: '240px' }}
            position={{ base: 'static', xl: 'sticky' }}
            top="2rem"
            flexShrink={0}
            mt={{ base: 10, xl: 0 }}
          >
            <VStack
              align="stretch"
              spacing="4"
              borderLeft={{ base: 'none', xl: '1px solid' }}
              borderTop={{ base: '1px solid', xl: 'none' }}
              borderColor={borderColor}
              pt={{ base: 6, xl: 0 }}
              pl={{ base: 0, xl: 6 }}
            >
              <Text fontSize="md" fontWeight="700" color={primaryText}>
                Nesta pagina
              </Text>

              <Stack spacing="2">
                {groupedPosts.map((group) => (
                  <Link key={group.key} href={`/blog#${group.key}`} passHref legacyBehavior>
                    <Text as="a" color={mutedText} fontSize="sm" _hover={{ color: primaryText }}>
                      {group.label}
                    </Text>
                  </Link>
                ))}
              </Stack>
            </VStack>
          </Box>
        </Box>
      </Stack>
    </Container>
    </>
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
