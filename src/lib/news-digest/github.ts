import { assertGitHubConfig, type NewsDigestConfig } from './config'

interface GitHubFileResponse {
  sha: string
}

async function githubRequest<T>(config: NewsDigestConfig, pathname: string, init?: RequestInit): Promise<T> {
  assertGitHubConfig(config)

  const response = await fetch(`https://api.github.com${pathname}`, {
    ...init,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${config.githubToken}`,
      'Content-Type': 'application/json',
      'User-Agent': 'aa-dev-news-digest',
      ...(init?.headers ?? {}),
    },
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`GitHub API request failed (${response.status} ${pathname}): ${errorText}`)
  }

  return (await response.json()) as T
}

async function githubRequestNoContent(config: NewsDigestConfig, pathname: string, init?: RequestInit): Promise<void> {
  assertGitHubConfig(config)

  const response = await fetch(`https://api.github.com${pathname}`, {
    ...init,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${config.githubToken}`,
      'Content-Type': 'application/json',
      'User-Agent': 'aa-dev-news-digest',
      ...(init?.headers ?? {}),
    },
  })

  if (response.status === 204) {
    return
  }

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`GitHub API request failed (${response.status} ${pathname}): ${errorText}`)
  }
}

async function getBaseBranchSha(config: NewsDigestConfig): Promise<string> {
  const branch = await githubRequest<{ commit: { sha: string } }>(
    config,
    `/repos/${config.githubOwner}/${config.githubRepo}/branches/${config.githubBaseBranch}`
  )

  return branch.commit.sha
}

async function ensureBranch(config: NewsDigestConfig, branchName: string): Promise<void> {
  try {
    await githubRequest<{ ref: string }>(config, `/repos/${config.githubOwner}/${config.githubRepo}/git/ref/heads/${branchName}`)
    return
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)

    if (!message.includes('(404 ')) {
      throw error
    }
  }

  const baseSha = await getBaseBranchSha(config)

  await githubRequestNoContent(config, `/repos/${config.githubOwner}/${config.githubRepo}/git/refs`, {
    method: 'POST',
    body: JSON.stringify({
      ref: `refs/heads/${branchName}`,
      sha: baseSha,
    }),
  })
}

async function getFileSha(config: NewsDigestConfig, path: string, branchName: string): Promise<string | undefined> {
  const encodedPath = path.split('/').map(encodeURIComponent).join('/')

  try {
    const file = await githubRequest<GitHubFileResponse>(
      config,
      `/repos/${config.githubOwner}/${config.githubRepo}/contents/${encodedPath}?ref=${encodeURIComponent(branchName)}`
    )

    return file.sha
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)

    if (message.includes('(404 ')) {
      return undefined
    }

    throw error
  }
}

async function createOrUpdateFile(
  config: NewsDigestConfig,
  branchName: string,
  path: string,
  content: string,
  commitMessage: string
): Promise<void> {
  const encodedPath = path.split('/').map(encodeURIComponent).join('/')
  const existingSha = await getFileSha(config, path, branchName)

  await githubRequestNoContent(config, `/repos/${config.githubOwner}/${config.githubRepo}/contents/${encodedPath}`, {
    method: 'PUT',
    body: JSON.stringify({
      message: commitMessage,
      branch: branchName,
      content: Buffer.from(content, 'utf8').toString('base64'),
      sha: existingSha,
    }),
  })
}

async function getOpenPullRequestUrl(config: NewsDigestConfig, branchName: string): Promise<string | undefined> {
  const pullRequests = await githubRequest<Array<{ html_url: string }>>(
    config,
    `/repos/${config.githubOwner}/${config.githubRepo}/pulls?state=open&head=${encodeURIComponent(`${config.githubOwner}:${branchName}`)}`
  )

  return pullRequests[0]?.html_url
}

async function createPullRequest(config: NewsDigestConfig, branchName: string, title: string, body: string): Promise<string> {
  const existingPullRequestUrl = await getOpenPullRequestUrl(config, branchName)

  if (existingPullRequestUrl) {
    return existingPullRequestUrl
  }

  const pullRequest = await githubRequest<{ html_url: string }>(
    config,
    `/repos/${config.githubOwner}/${config.githubRepo}/pulls`,
    {
      method: 'POST',
      body: JSON.stringify({
        title,
        head: branchName,
        base: config.githubBaseBranch,
        body,
      }),
    }
  )

  return pullRequest.html_url
}

export async function createDigestPullRequest(params: {
  config: NewsDigestConfig
  branchName: string
  draftPath: string
  publishedPath: string
  draftMarkdown: string
  publishedMarkdown: string
  digestTitle: string
  selectedCount: number
}): Promise<string> {
  const { config, branchName, draftPath, publishedPath, draftMarkdown, publishedMarkdown, digestTitle, selectedCount } = params
  assertGitHubConfig(config)

  await ensureBranch(config, branchName)
  await createOrUpdateFile(
    config,
    branchName,
    draftPath,
    draftMarkdown,
    `chore: add draft ${digestTitle.toLowerCase()}`
  )
  await createOrUpdateFile(
    config,
    branchName,
    publishedPath,
    publishedMarkdown,
    `chore: publish ${digestTitle.toLowerCase()}`
  )

  return createPullRequest(
    config,
    branchName,
    `Daily digest: ${digestTitle}`,
    [
      `PR automatica com rascunho diario do blog.`,
      '',
      `- itens selecionados: ${selectedCount}`,
      `- draft: \`${draftPath}\``,
      `- published: \`${publishedPath}\``,
      `- revisar contexto, links e tom editorial antes do merge`,
    ].join('\n')
  )
}
