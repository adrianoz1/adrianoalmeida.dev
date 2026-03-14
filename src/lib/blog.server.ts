import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import gfm from 'remark-gfm'
import type { BlogPost, BlogPostFrontmatter, BlogPostSummary } from './blog'

const publishedPostsDirectory = path.join(process.cwd(), 'content/blog/published')

function assertFrontmatter(data: Record<string, unknown>, slug: string): BlogPostFrontmatter {
  const title = typeof data.title === 'string' ? data.title : slug
  const excerpt = typeof data.excerpt === 'string' ? data.excerpt : ''
  const date = typeof data.date === 'string' ? data.date : new Date().toISOString().slice(0, 10)
  const author = typeof data.author === 'string' ? data.author : 'Adriano Almeida'
  const coverTitle = typeof data.coverTitle === 'string' ? data.coverTitle : undefined
  const tags = Array.isArray(data.tags) ? data.tags.filter((tag): tag is string => typeof tag === 'string') : []

  return {
    title,
    excerpt,
    date,
    author,
    tags,
    coverTitle,
  }
}

export function getPublishedPostSlugs(): string[] {
  if (!fs.existsSync(publishedPostsDirectory)) {
    return []
  }

  return fs
    .readdirSync(publishedPostsDirectory)
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => fileName.replace(/\.md$/, ''))
}

export function getSortedPublishedPosts(): BlogPostSummary[] {
  const posts = getPublishedPostSlugs().map((slug) => {
    const fullPath = path.join(publishedPostsDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data } = matter(fileContents)

    return {
      slug,
      ...assertFrontmatter(data, slug),
    }
  })

  return posts.sort((firstPost, secondPost) => {
    if (firstPost.date < secondPost.date) {
      return 1
    }

    if (firstPost.date > secondPost.date) {
      return -1
    }

    return 0
  })
}

export async function getPublishedPostBySlug(slug: string): Promise<BlogPost> {
  const fullPath = path.join(publishedPostsDirectory, `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  const processedContent = await remark().use(gfm).use(html).process(content)

  return {
    slug,
    contentHtml: processedContent.toString(),
    ...assertFrontmatter(data, slug),
  }
}
