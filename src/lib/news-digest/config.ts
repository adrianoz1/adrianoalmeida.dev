function readOptionalNumberEnv(name: string, fallback: number): number {
  const value = process.env[name]

  if (!value) {
    return fallback
  }

  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : fallback
}

function readOptionalStringEnv(name: string, fallback: string): string {
  return process.env[name] || fallback
}

export interface NewsDigestConfig {
  cronSecret?: string
  timezone: string
  authorName: string
  xBearerToken?: string
  xQuery: string
  xMaxResults: number
  openAiApiKey?: string
  openAiModel: string
  githubToken?: string
  githubOwner?: string
  githubRepo?: string
  githubBaseBranch: string
  githubDraftsPath: string
  maxSelectedItems: number
  minScore: number
  repoUrl?: string
}

export function getNewsDigestConfig(): NewsDigestConfig {
  return {
    cronSecret: process.env.CRON_SECRET,
    timezone: readOptionalStringEnv('NEWS_DIGEST_TIMEZONE', 'America/Sao_Paulo'),
    authorName: readOptionalStringEnv('NEWS_DIGEST_AUTHOR', 'Adriano Almeida'),
    xBearerToken: process.env.X_BEARER_TOKEN,
    xQuery: readOptionalStringEnv(
      'X_SEARCH_QUERY',
      '(AI OR OpenAI OR Anthropic OR Google OR Apple OR Meta OR Microsoft OR Vercel OR React OR Next.js OR TypeScript OR startup) lang:en -is:retweet -is:reply'
    ),
    xMaxResults: readOptionalNumberEnv('X_MAX_RESULTS', 30),
    openAiApiKey: process.env.OPENAI_API_KEY,
    openAiModel: readOptionalStringEnv('OPENAI_MODEL', 'gpt-4.1-mini'),
    githubToken: process.env.GITHUB_TOKEN,
    githubOwner: process.env.GITHUB_REPO_OWNER,
    githubRepo: process.env.GITHUB_REPO_NAME,
    githubBaseBranch: readOptionalStringEnv('GITHUB_BASE_BRANCH', 'main'),
    githubDraftsPath: readOptionalStringEnv('GITHUB_DRAFTS_PATH', 'content/blog/drafts'),
    maxSelectedItems: readOptionalNumberEnv('NEWS_DIGEST_MAX_ITEMS', 7),
    minScore: readOptionalNumberEnv('NEWS_DIGEST_MIN_SCORE', 2),
    repoUrl: process.env.GITHUB_REPOSITORY_URL,
  }
}

export function assertGitHubConfig(config: NewsDigestConfig): asserts config is NewsDigestConfig & {
  githubToken: string
  githubOwner: string
  githubRepo: string
} {
  if (!config.githubToken || !config.githubOwner || !config.githubRepo) {
    throw new Error('GitHub integration requires GITHUB_TOKEN, GITHUB_REPO_OWNER and GITHUB_REPO_NAME')
  }
}

export function assertOpenAiConfig(config: NewsDigestConfig): asserts config is NewsDigestConfig & {
  openAiApiKey: string
} {
  if (!config.openAiApiKey) {
    throw new Error('OpenAI integration requires OPENAI_API_KEY')
  }
}

export function assertXConfig(config: NewsDigestConfig): asserts config is NewsDigestConfig & {
  xBearerToken: string
} {
  if (!config.xBearerToken) {
    throw new Error('X integration requires X_BEARER_TOKEN')
  }
}

export function getRequiredRepositoryUrl(config: NewsDigestConfig): string {
  if (config.repoUrl) {
    return config.repoUrl
  }

  if (config.githubOwner && config.githubRepo) {
    return `https://github.com/${config.githubOwner}/${config.githubRepo}`
  }

  return 'https://github.com/owner/repo'
}
