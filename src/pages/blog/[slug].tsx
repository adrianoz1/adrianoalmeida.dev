import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import {
  Badge,
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Icon,
  Stack,
  Text,
} from '@chakra-ui/react'
import { RiArrowLeftLine } from 'react-icons/ri'
import { BlogPost, formatPostDate } from '../../lib/blog'

interface BlogPostPageProps {
  post: BlogPost
}

const articleStyles = {
  h2: {
    marginTop: '2.5rem',
    marginBottom: '1rem',
    fontSize: '1.875rem',
    fontWeight: 700,
    lineHeight: 1.1,
  },
  h3: {
    marginTop: '2rem',
    marginBottom: '0.75rem',
    fontSize: '1.5rem',
    fontWeight: 700,
  },
  p: {
    color: 'gray.300',
    lineHeight: 1.9,
    marginBottom: '1.25rem',
  },
  ul: {
    paddingLeft: '1.5rem',
    marginBottom: '1.25rem',
  },
  ol: {
    paddingLeft: '1.5rem',
    marginBottom: '1.25rem',
  },
  li: {
    color: 'gray.300',
    marginBottom: '0.5rem',
  },
  strong: {
    color: 'white',
  },
  a: {
    color: 'brand.300',
    textDecoration: 'underline',
  },
  blockquote: {
    paddingLeft: '1rem',
    borderLeft: '3px solid rgba(255,255,255,0.18)',
    color: 'gray.200',
    marginY: '1.5rem',
  },
  code: {
    background: 'rgba(255,255,255,0.08)',
    borderRadius: '0.4rem',
    paddingX: '0.35rem',
    paddingY: '0.15rem',
    fontSize: '0.95em',
  },
  pre: {
    background: 'rgba(0,0,0,0.28)',
    borderRadius: '1rem',
    padding: '1rem',
    overflowX: 'auto',
    marginBottom: '1.5rem',
  },
}

const BlogPostPage: NextPage<BlogPostPageProps> = ({ post }) => {
  return (
    <>
      <Head>
        <title>{post.title} | aa.dev</title>
        <meta name="description" content={post.excerpt} />
      </Head>

      <Container maxW="860px" px={{ base: 5, md: 8 }} py={{ base: 8, md: 12 }}>
        <Stack spacing="8">
          <Link href="/blog" passHref legacyBehavior>
            <Button
              as="a"
              alignSelf="flex-start"
              variant="ghost"
              leftIcon={<Icon as={RiArrowLeftLine} />}
              color="gray.200"
              _hover={{ bg: 'whiteAlpha.100' }}
            >
              Voltar para o blog
            </Button>
          </Link>

          <Box
            borderRadius="32px"
            p={{ base: 7, md: 10 }}
            bg="linear-gradient(135deg, rgba(255,184,0,0.18) 0%, rgba(9,30,35,0.92) 56%, rgba(255,255,255,0.04) 100%)"
            border="1px solid"
            borderColor="whiteAlpha.200"
          >
            <Stack spacing="5">
              <Badge alignSelf="flex-start" bg="whiteAlpha.180" color="brand.100" px="3" py="1.5" borderRadius="full">
                {post.coverTitle || 'Artigo'}
              </Badge>

              <Heading as="h1" fontSize={{ base: '4xl', md: '6xl' }} lineHeight={{ base: 1.05, md: 0.95 }}>
                {post.title}
              </Heading>

              <Text color="gray.200" fontSize={{ base: 'lg', md: 'xl' }} lineHeight="1.8">
                {post.excerpt}
              </Text>

              <HStack spacing="3" color="gray.300" fontSize="sm" wrap="wrap">
                <Text>{formatPostDate(post.date)}</Text>
                <Text>{post.author}</Text>
              </HStack>

              {post.tags && post.tags.length > 0 ? (
                <HStack spacing="2" wrap="wrap">
                  {post.tags.map((tag) => (
                    <Badge key={tag} bg="whiteAlpha.160" color="gray.100" px="2.5" py="1" borderRadius="full">
                      {tag}
                    </Badge>
                  ))}
                </HStack>
              ) : null}
            </Stack>
          </Box>

          <Box
            as="article"
            sx={articleStyles}
            borderRadius="28px"
            bg="rgba(255,255,255,0.04)"
            border="1px solid"
            borderColor="whiteAlpha.160"
            p={{ base: 6, md: 8 }}
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />
        </Stack>
      </Container>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { getPublishedPostSlugs } = await import('../../lib/blog.server')

  return {
    paths: getPublishedPostSlugs().map((slug) => ({
      params: { slug },
    })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<BlogPostPageProps> = async ({ params }) => {
  const { getPublishedPostBySlug } = await import('../../lib/blog.server')
  const slug = params?.slug

  if (typeof slug !== 'string') {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      post: await getPublishedPostBySlug(slug),
    },
  }
}

export default BlogPostPage
