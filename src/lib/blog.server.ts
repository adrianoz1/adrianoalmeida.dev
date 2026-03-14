import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import gfm from 'remark-gfm'
import type { BlogPost, BlogPostFrontmatter, BlogPostHeading, BlogPostSummary } from './blog'

const publishedPostsDirectory = path.join(process.cwd(), 'content/blog/published')

function slugifyHeading(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

function extractHeadings(content: string): BlogPostHeading[] {
  const seenIds = new Map<string, number>()
  const headings: BlogPostHeading[] = []
  const lines = content.split('\n')

  for (const line of lines) {
    const match = /^(#{2,3})\s+(.+)$/.exec(line.trim())

    if (!match) {
      continue
    }

    const level = match[1].length as 2 | 3
    const rawText = match[2].trim().replace(/\[(.*?)\]\(.*?\)/g, '$1').replace(/[*_`~]/g, '')
    const baseId = slugifyHeading(rawText)
    const occurrences = seenIds.get(baseId) ?? 0
    const id = occurrences === 0 ? baseId : `${baseId}-${occurrences + 1}`

    seenIds.set(baseId, occurrences + 1)
    headings.push({
      id,
      text: rawText,
      level,
    })
  }

  return headings
}

function injectHeadingIds(contentHtml: string, headings: BlogPostHeading[]): string {
  let headingIndex = 0

  return contentHtml.replace(/<h([23])>(.*?)<\/h\1>/g, (match, level) => {
    const heading = headings[headingIndex]

    if (!heading || Number(level) !== heading.level) {
      return match
    }

    headingIndex += 1
    return `<h${level} id="${heading.id}">${match.replace(/^<h[23]>|<\/h[23]>$/g, '')}</h${level}>`
  })
}

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
  const headings = extractHeadings(content)
  const contentHtml = injectHeadingIds(processedContent.toString(), headings)

  return {
    slug,
    contentHtml,
    headings,
    ...assertFrontmatter(data, slug),
  }
}
