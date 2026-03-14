export type NewsSource = 'x'

export interface NewsMetrics {
  likeCount?: number
  repostCount?: number
  replyCount?: number
  quoteCount?: number
}

export interface NewsItem {
  id: string
  source: NewsSource
  title: string
  summary: string
  url: string
  publishedAt: string
  authorName?: string
  authorHandle?: string
  tags: string[]
  metrics?: NewsMetrics
  rawText: string
}

export interface RankedNewsItem extends NewsItem {
  score: number
  scoreReasons: string[]
  dedupeKey: string
}

export interface GeneratedDraft {
  slug: string
  title: string
  markdown: string
  excerpt: string
  tags: string[]
}

export interface NewsDigestRunResult {
  mode: 'dry-run' | 'pull-request'
  branchName?: string
  pullRequestUrl?: string
  draftPath: string
  digestTitle: string
  selectedItems: RankedNewsItem[]
  skippedItems: RankedNewsItem[]
  markdown: string
}
