import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Icon,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { RiArrowLeftLine } from 'react-icons/ri'
import { PostToc } from '../../components/blog/PostToc'
import { Seo } from '../../components/Seo'
import { StructuredData } from '../../components/StructuredData'
import { BlogPost, formatPostDate } from '../../lib/blog'
import { getAbsoluteUrl, siteConfig, stripHtmlTags } from '../../lib/seo'

interface BlogPostPageProps {
  post: BlogPost
}

const articleStyles = {
  h2: {
    marginTop: '2.75rem',
    marginBottom: '1rem',
    fontSize: '2rem',
    fontWeight: 700,
    letterSpacing: '-0.03em',
    lineHeight: 1.1,
    borderBottom: '1px solid',
    borderColor: 'borderSubtle',
    paddingBottom: '0.7rem',
  },
  h3: {
    marginTop: '2.25rem',
    marginBottom: '0.75rem',
    fontSize: '1.5rem',
    fontWeight: 700,
  },
  p: {
    color: 'textMuted',
    lineHeight: 1.9,
    marginBottom: '1.35rem',
    fontSize: '1.12rem',
  },
  ul: {
    paddingLeft: '1.5rem',
    marginBottom: '1.4rem',
  },
  ol: {
    paddingLeft: '1.5rem',
    marginBottom: '1.4rem',
  },
  li: {
    color: 'textMuted',
    marginBottom: '0.6rem',
    lineHeight: 1.8,
    fontSize: '1.05rem',
  },
  strong: {
    color: 'textPrimary',
  },
  a: {
    color: 'linkAccent',
    textDecoration: 'underline',
    textUnderlineOffset: '0.15em',
  },
  blockquote: {
    paddingLeft: '1.25rem',
    borderLeft: '3px solid',
    borderColor: 'borderSubtle',
    color: 'textPrimary',
    marginY: '1.6rem',
  },
  code: {
    background: 'surfaceAltBg',
    borderRadius: '0.4rem',
    paddingInline: '0.35rem',
    paddingBlock: '0.15rem',
    fontSize: '0.95em',
  },
  pre: {
    background: 'surfaceAltBg',
    borderRadius: '1rem',
    padding: '1rem',
    overflowX: 'auto',
    marginBottom: '1.5rem',
  },
}

const BlogPostPage: NextPage<BlogPostPageProps> = ({ post }) => {
  const primaryText = useColorModeValue('textPrimary', 'textPrimary')
  const description = post.excerpt || stripHtmlTags(post.contentHtml).slice(0, 160)
  const publishedTime = new Date(`${post.date}T00:00:00`).toISOString()
  const canonicalPath = `/blog/${post.slug}`
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description,
    datePublished: publishedTime,
    dateModified: publishedTime,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Person',
      name: siteConfig.author,
    },
    mainEntityOfPage: getAbsoluteUrl(canonicalPath),
    url: getAbsoluteUrl(canonicalPath),
    inLanguage: 'pt-BR',
  }
  const mutedText = useColorModeValue('textMuted', 'textMuted')
  const ghostHover = useColorModeValue('gray.100', 'gray.700')

  return (
    <>
      <Seo
        title={post.title}
        description={description}
        path={canonicalPath}
        type="article"
        publishedTime={publishedTime}
        author={post.author}
        image={getAbsoluteUrl(`/api/og?title=${encodeURIComponent(post.title)}&subtitle=${encodeURIComponent(description)}`)}
      />
      <StructuredData data={articleSchema} />

      <Container maxW="1380px" px={{ base: 5, md: 8 }} py={{ base: 8, md: 12 }}>
        <Flex align="flex-start" gap={{ base: 12, xl: 16 }} direction={{ base: 'column', xl: 'row' }}>
          <Box flex="1" minW={0} maxW="900px">
            <Stack spacing="8">
              <Link href="/blog" passHref legacyBehavior>
                <Button
                  as="a"
                  variant="ghost"
                  leftIcon={<Icon as={RiArrowLeftLine} />}
                  color={primaryText}
                  _hover={{ bg: ghostHover }}
                >
                  Voltar para o blog
                </Button>
              </Link>

              <Stack spacing="4" align="center" textAlign="center" pb="6">
                <Heading
                  as="h1"
                  fontSize={{ base: '4xl', md: '6xl' }}
                  lineHeight={{ base: 1.05, md: 0.98 }}
                  letterSpacing="-0.05em"
                  maxW="12ch"
                >
                  {post.title}
                </Heading>

                <HStack spacing="3" color={mutedText} fontSize={{ base: 'sm', md: 'md' }} wrap="wrap" justify="center">
                  <Text>{formatPostDate(post.date)}</Text>
                  <Text>{post.author}</Text>
                </HStack>
              </Stack>

              <Box as="article" sx={articleStyles} maxW="820px" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
            </Stack>
          </Box>

          <Box width={{ base: '100%', xl: '240px' }} display={{ base: 'none', lg: 'block' }} flexShrink={0}>
            <PostToc headings={post.headings} />
          </Box>
        </Flex>
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
