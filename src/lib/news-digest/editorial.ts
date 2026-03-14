import type { NewsItem, RankedNewsItem } from './types'

function dedupeText(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/https?:\/\/\S+/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function getHoursSincePublication(publishedAt: string): number {
  const published = new Date(publishedAt).getTime()
  const now = Date.now()

  return Math.max((now - published) / (1000 * 60 * 60), 0)
}

function scoreItem(item: NewsItem): { score: number; reasons: string[] } {
  let score = 0
  const reasons: string[] = []
  const likes = item.metrics?.likeCount ?? 0
  const reposts = item.metrics?.repostCount ?? 0
  const replies = item.metrics?.replyCount ?? 0
  const quotes = item.metrics?.quoteCount ?? 0
  const engagement = likes + reposts * 2 + quotes * 2 + replies
  const ageInHours = getHoursSincePublication(item.publishedAt)

  if (engagement >= 400) {
    score += 4
    reasons.push('alto_engajamento')
  } else if (engagement >= 150) {
    score += 3
    reasons.push('bom_engajamento')
  } else if (engagement >= 50) {
    score += 2
    reasons.push('engajamento_moderado')
  }

  if (ageInHours <= 12) {
    score += 3
    reasons.push('muito_recente')
  } else if (ageInHours <= 36) {
    score += 2
    reasons.push('recente')
  } else if (ageInHours <= 72) {
    score += 1
    reasons.push('ainda_relevante')
  }

  if (item.tags.length >= 2) {
    score += 2
    reasons.push('tema_tech_denso')
  } else if (item.tags.length === 1) {
    score += 1
    reasons.push('tema_tech')
  }

  if ((item.authorHandle || '').match(/openai|anthropic|google|vercel|reactjs|github|microsoft|meta|apple/i)) {
    score += 2
    reasons.push('fonte_oficial_ou_relevante')
  }

  if (item.source === 'ars-technica') {
    score += 1
    reasons.push('fonte_editorial_profunda')
  }

  if (item.rawText.length >= 180) {
    score += 1
    reasons.push('contexto_suficiente')
  }

  return { score, reasons }
}

export function rankAndFilterItems(items: NewsItem[], minScore: number, maxItems: number): {
  selectedItems: RankedNewsItem[]
  skippedItems: RankedNewsItem[]
} {
  const ranked = items
    .map((item) => {
      const { score, reasons } = scoreItem(item)

      return {
        ...item,
        score,
        scoreReasons: reasons,
        dedupeKey: dedupeText(item.rawText).slice(0, 180),
      }
    })
    .sort((left, right) => {
      if (left.score !== right.score) {
        return right.score - left.score
      }

      return new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime()
    })

  const seenDedupeKeys = new Set<string>()
  const selectedItems: RankedNewsItem[] = []
  const skippedItems: RankedNewsItem[] = []

  for (const item of ranked) {
    if (item.score < minScore) {
      skippedItems.push(item)
      continue
    }

    if (seenDedupeKeys.has(item.dedupeKey)) {
      skippedItems.push(item)
      continue
    }

    if (selectedItems.length >= maxItems) {
      skippedItems.push(item)
      continue
    }

    seenDedupeKeys.add(item.dedupeKey)
    selectedItems.push(item)
  }

  return {
    selectedItems,
    skippedItems,
  }
}
