import { type NewsDigestConfig } from './config'
import { saveNewsDigest } from './dynamodb'
import { rankAndFilterItems } from './editorial'
import { createDigestPullRequest } from './github'
import { generateDigestDraft } from './markdown'
import { collectNewsFromRss } from './sources/rss'
import type { NewsDigestRunResult } from './types'

function buildBranchName(slug: string): string {
  return `codex/news-digest-${slug}`
}

export async function runNewsDigest(config: NewsDigestConfig, mode: 'dry-run' | 'pull-request'): Promise<NewsDigestRunResult> {
  const collectedItems = await collectNewsFromRss(config)
  const { selectedItems, skippedItems } = rankAndFilterItems(
    collectedItems,
    config.minScore,
    config.maxSelectedItems
  )

  if (selectedItems.length === 0) {
    throw new Error('The digest pipeline did not find any items above the editorial threshold')
  }

  const draft = await generateDigestDraft(config, selectedItems)
  const draftPath = `${config.githubDraftsPath}/${draft.slug}.md`
  const publishedPath = `${config.githubPublishedPath}/${draft.slug}.md`

  if (mode === 'dry-run') {
    return {
      mode,
      slug: draft.slug,
      draftPath,
      publishedPath,
      digestTitle: draft.title,
      excerpt: draft.excerpt,
      selectedItems,
      skippedItems,
      markdown: draft.draftMarkdown,
      publishedMarkdown: draft.publishedMarkdown,
    }
  }

  const branchName = buildBranchName(draft.slug)
  const pullRequestUrl = await createDigestPullRequest({
    config,
    branchName,
    draftPath,
    publishedPath,
    draftMarkdown: draft.draftMarkdown,
    publishedMarkdown: draft.publishedMarkdown,
    digestTitle: draft.title,
    selectedCount: selectedItems.length,
  })

  await saveNewsDigest({
    config,
    slug: draft.slug,
    title: draft.title,
    excerpt: draft.excerpt,
    markdown: draft.publishedMarkdown,
    draftPath,
    publishedPath,
    branchName,
    pullRequestUrl,
    selectedItems,
  })

  return {
    mode,
    slug: draft.slug,
    branchName,
    pullRequestUrl,
    draftPath,
    publishedPath,
    digestTitle: draft.title,
    excerpt: draft.excerpt,
    selectedItems,
    skippedItems,
    markdown: draft.draftMarkdown,
    publishedMarkdown: draft.publishedMarkdown,
  }
}
