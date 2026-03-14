import type { NextApiRequest, NextApiResponse } from 'next'
import { assertGitHubConfig, getNewsDigestConfig } from '../../../lib/news-digest/config'
import { runNewsDigest } from '../../../lib/news-digest'

function isAuthorized(request: NextApiRequest, cronSecret?: string): boolean {
  if (process.env.NODE_ENV !== 'production' && !cronSecret) {
    return true
  }

  const authorization = request.headers.authorization
  const expectedAuthorization = cronSecret ? `Bearer ${cronSecret}` : undefined

  if (expectedAuthorization && authorization === expectedAuthorization) {
    return true
  }

  return false
}

export default async function handler(request: NextApiRequest, response: NextApiResponse): Promise<void> {
  if (request.method !== 'GET' && request.method !== 'POST') {
    response.setHeader('Allow', 'GET, POST')
    response.status(405).json({ error: 'Method not allowed' })
    return
  }

  const config = getNewsDigestConfig()

  if (!isAuthorized(request, config.cronSecret)) {
    response.status(401).json({ error: 'Unauthorized' })
    return
  }

  const dryRun = request.query.dryRun === '1' || request.query.dryRun === 'true'

  try {
    if (!dryRun) {
      assertGitHubConfig(config)
    }

    const result = await runNewsDigest(config, dryRun ? 'dry-run' : 'pull-request')

    response.status(200).json({
      ok: true,
      mode: result.mode,
      digestTitle: result.digestTitle,
      draftPath: result.draftPath,
      branchName: result.branchName,
      pullRequestUrl: result.pullRequestUrl,
      selectedCount: result.selectedItems.length,
      skippedCount: result.skippedItems.length,
      selectedItems: result.selectedItems.map((item) => ({
        title: item.title,
        url: item.url,
        score: item.score,
        scoreReasons: item.scoreReasons,
      })),
      markdown: dryRun ? result.markdown : undefined,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'

    response.status(500).json({
      ok: false,
      error: message,
    })
  }
}
