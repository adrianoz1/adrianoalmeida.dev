import { type NewsDigestConfig } from './config'
import { rankAndFilterItems } from './editorial'
import { createDraftPullRequest } from './github'
import { generateDigestDraft } from './markdown'
import { collectNewsFromX } from './sources/x'
import type { NewsDigestRunResult } from './types'

function buildBranchName(slug: string): string {
  return `codex/news-digest-${slug}`
}

export async function runNewsDigest(config: NewsDigestConfig, mode: 'dry-run' | 'pull-request'): Promise<NewsDigestRunResult> {
  const collectedItems = await collectNewsFromX(config)
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

  if (mode === 'dry-run') {
    return {
      mode,
      draftPath,
      digestTitle: draft.title,
      selectedItems,
      skippedItems,
      markdown: draft.markdown,
    }
  }

  const branchName = buildBranchName(draft.slug)
  const pullRequestUrl = await createDraftPullRequest({
    config,
    branchName,
    draftPath,
    markdown: draft.markdown,
    digestTitle: draft.title,
    selectedCount: selectedItems.length,
  })

  return {
    mode,
    branchName,
    pullRequestUrl,
    draftPath,
    digestTitle: draft.title,
    selectedItems,
    skippedItems,
    markdown: draft.markdown,
  }
}
