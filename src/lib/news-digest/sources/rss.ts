import type { NewsItem, NewsSource } from '../types'
import type { NewsDigestConfig } from '../config'

interface FeedDefinition {
  source: NewsSource
  url: string
  defaultTags: string[]
}

const techKeywords = [
  'ai',
  'artificial intelligence',
  'openai',
  'anthropic',
  'google',
  'apple',
  'meta',
  'microsoft',
  'vercel',
  'react',
  'next.js',
  'nextjs',
  'typescript',
  'startup',
  'security',
  'cloud',
  'nvidia',
]

function decodeXmlEntities(value: string): string {
  return value
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&')
  }

function stripHtml(value: string): string {
  return decodeXmlEntities(value)
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function getTagValues(itemXml: string, tagName: string): string[] {
  const pattern = new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, 'gi')
  const values: string[] = []
  let match: RegExpExecArray | null

  match = pattern.exec(itemXml)

  while (match) {
    values.push(stripHtml(match[1]))
    match = pattern.exec(itemXml)
  }

  return values
}

function getFirstTagValue(itemXml: string, tagNames: string[]): string | undefined {
  for (const tagName of tagNames) {
    const pattern = new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, 'i')
    const match = pattern.exec(itemXml)

    if (match?.[1]) {
      return stripHtml(match[1])
    }
  }

  return undefined
}

function extractTags(text: string, categories: string[], defaultTags: string[]): string[] {
  const lowered = text.toLowerCase()
  const matchedKeywords = techKeywords.filter((keyword) => lowered.includes(keyword))

  return Array.from(
    new Set(
      defaultTags
        .concat(categories.map((category) => category.toLowerCase()))
        .concat(matchedKeywords)
    )
  ).slice(0, 8)
}

function buildSummary(description: string, title: string): string {
  const candidate = description || title

  if (candidate.length <= 240) {
    return candidate
  }

  return `${candidate.slice(0, 237).trimEnd()}...`
}

function normalizeLink(link?: string): string | undefined {
  if (!link) {
    return undefined
  }

  try {
    return new URL(link).toString()
  } catch {
    return undefined
  }
}

function parseRssItems(feedXml: string, definition: FeedDefinition): NewsItem[] {
  const itemMatches = feedXml.match(/<item\b[\s\S]*?<\/item>/gi) ?? []
  const items: NewsItem[] = []

  for (const itemXml of itemMatches) {
    const title = getFirstTagValue(itemXml, ['title'])
    const link = normalizeLink(getFirstTagValue(itemXml, ['link']))
    const description = getFirstTagValue(itemXml, ['description', 'content:encoded']) ?? ''
    const publishedAt = getFirstTagValue(itemXml, ['pubDate', 'dc:date', 'published'])
    const authorName = getFirstTagValue(itemXml, ['dc:creator', 'author'])
    const categories = getTagValues(itemXml, 'category')

    if (!title || !link || !publishedAt) {
      continue
    }

    const summary = buildSummary(description, title)
    const rawText = `${title} ${summary}`.trim()

    items.push({
      id: link,
      source: definition.source,
      title,
      summary,
      url: link,
      publishedAt: new Date(publishedAt).toISOString(),
      authorName,
      tags: extractTags(rawText, categories, definition.defaultTags),
      rawText,
    })
  }

  return items
}

async function fetchFeed(definition: FeedDefinition): Promise<NewsItem[]> {
  const response = await fetch(definition.url, {
    headers: {
      Accept: 'application/rss+xml, application/xml, text/xml;q=0.9',
    },
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`RSS feed request failed for ${definition.source} (${response.status}): ${errorText}`)
  }

  const feedXml = await response.text()
  return parseRssItems(feedXml, definition)
}

export async function collectNewsFromRss(config: NewsDigestConfig): Promise<NewsItem[]> {
  const feeds: FeedDefinition[] = [
    {
      source: 'techcrunch',
      url: config.rssTechCrunchFeed,
      defaultTags: ['techcrunch', 'startups', 'technology'],
    },
    {
      source: 'ars-technica',
      url: config.rssArsTechnicaFeed,
      defaultTags: ['ars-technica', 'technology', 'analysis'],
    },
    {
      source: 'wired',
      url: config.rssWiredFeed,
      defaultTags: ['wired', 'ai', 'technology'],
    },
  ]

  const results = await Promise.all(feeds.map((feed) => fetchFeed(feed)))
  return results.flat()
}
