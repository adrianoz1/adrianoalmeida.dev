import type { NewsItem } from '../types'
import { assertXConfig, type NewsDigestConfig } from '../config'

interface XSearchResponse {
  data?: Array<{
    id: string
    text: string
    author_id?: string
    created_at: string
    public_metrics?: {
      like_count?: number
      retweet_count?: number
      reply_count?: number
      quote_count?: number
    }
  }>
  includes?: {
    users?: Array<{
      id: string
      name?: string
      username?: string
    }>
  }
}

const techTags = [
  'ai',
  'openai',
  'anthropic',
  'google',
  'apple',
  'meta',
  'microsoft',
  'vercel',
  'nextjs',
  'react',
  'typescript',
  'startup',
]

function extractTags(text: string): string[] {
  const loweredText = text.toLowerCase()

  return techTags.filter((tag) => {
    if (tag === 'nextjs') {
      return loweredText.includes('next.js') || loweredText.includes('nextjs')
    }

    return loweredText.includes(tag)
  })
}

function sanitizeText(text: string): string {
  return text.replace(/\s+/g, ' ').trim()
}

function buildTitle(text: string): string {
  const sanitized = sanitizeText(text).replace(/https?:\/\/\S+/g, '').trim()

  if (sanitized.length <= 110) {
    return sanitized
  }

  return `${sanitized.slice(0, 107).trimEnd()}...`
}

function buildSummary(text: string): string {
  const sanitized = sanitizeText(text)

  if (sanitized.length <= 220) {
    return sanitized
  }

  return `${sanitized.slice(0, 217).trimEnd()}...`
}

export async function collectNewsFromX(config: NewsDigestConfig): Promise<NewsItem[]> {
  assertXConfig(config)

  const searchUrl = new URL('https://api.x.com/2/tweets/search/recent')
  searchUrl.searchParams.set('query', config.xQuery)
  searchUrl.searchParams.set('max_results', String(Math.min(Math.max(config.xMaxResults, 10), 100)))
  searchUrl.searchParams.set('tweet.fields', 'created_at,public_metrics,author_id')
  searchUrl.searchParams.set('expansions', 'author_id')
  searchUrl.searchParams.set('user.fields', 'name,username')

  const response = await fetch(searchUrl.toString(), {
    headers: {
      Authorization: `Bearer ${config.xBearerToken}`,
    },
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`X API request failed (${response.status}): ${errorText}`)
  }

  const payload = (await response.json()) as XSearchResponse
  const usersById = new Map(payload.includes?.users?.map((user) => [user.id, user]) ?? [])

  return (payload.data ?? []).map((tweet) => {
    const author = tweet.author_id ? usersById.get(tweet.author_id) : undefined
    const rawText = sanitizeText(tweet.text)

    return {
      id: tweet.id,
      source: 'x',
      title: buildTitle(rawText),
      summary: buildSummary(rawText),
      url: `https://x.com/${author?.username ?? 'i'}/status/${tweet.id}`,
      publishedAt: tweet.created_at,
      authorName: author?.name,
      authorHandle: author?.username,
      tags: extractTags(rawText),
      metrics: {
        likeCount: tweet.public_metrics?.like_count,
        repostCount: tweet.public_metrics?.retweet_count,
        replyCount: tweet.public_metrics?.reply_count,
        quoteCount: tweet.public_metrics?.quote_count,
      },
      rawText,
    }
  })
}
