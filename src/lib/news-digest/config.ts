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
  openAiApiKey?: string
  openAiModel: string
  awsRegion?: string
  awsAccessKeyId?: string
  awsSecretAccessKey?: string
  newsDigestTableName: string
  githubToken?: string
  githubOwner?: string
  githubRepo?: string
  githubBaseBranch: string
  githubDraftsPath: string
  maxSelectedItems: number
  minScore: number
  repoUrl?: string
  rssTechCrunchFeed: string
  rssArsTechnicaFeed: string
  rssWiredFeed: string
}

export function getNewsDigestConfig(): NewsDigestConfig {
  return {
    cronSecret: process.env.CRON_SECRET,
    timezone: readOptionalStringEnv('NEWS_DIGEST_TIMEZONE', 'America/Sao_Paulo'),
    authorName: readOptionalStringEnv('NEWS_DIGEST_AUTHOR', 'Adriano Almeida'),
    openAiApiKey: process.env.OPENAI_API_KEY,
    openAiModel: readOptionalStringEnv('OPENAI_MODEL', 'gpt-4.1-mini'),
    awsRegion: process.env.AWS_REGION,
    awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
    awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    newsDigestTableName: readOptionalStringEnv('NEWS_DIGEST_TABLE_NAME', 'abolhatech-daily-news'),
    githubToken: process.env.GITHUB_TOKEN,
    githubOwner: process.env.GITHUB_REPO_OWNER,
    githubRepo: process.env.GITHUB_REPO_NAME,
    githubBaseBranch: readOptionalStringEnv('GITHUB_BASE_BRANCH', 'main'),
    githubDraftsPath: readOptionalStringEnv('GITHUB_DRAFTS_PATH', 'content/blog/drafts'),
    maxSelectedItems: readOptionalNumberEnv('NEWS_DIGEST_MAX_ITEMS', 7),
    minScore: readOptionalNumberEnv('NEWS_DIGEST_MIN_SCORE', 2),
    repoUrl: process.env.GITHUB_REPOSITORY_URL,
    rssTechCrunchFeed: readOptionalStringEnv('RSS_TECHCRUNCH_FEED', 'https://techcrunch.com/feed/'),
    rssArsTechnicaFeed: readOptionalStringEnv('RSS_ARS_TECHNICA_FEED', 'https://feeds.arstechnica.com/arstechnica/everything/'),
    rssWiredFeed: readOptionalStringEnv('RSS_WIRED_FEED', 'https://www.wired.com/feed/tag/ai/latest/rss'),
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

export function assertNewsDigestStorageConfig(config: NewsDigestConfig): asserts config is NewsDigestConfig & {
  awsRegion: string
  awsAccessKeyId: string
  awsSecretAccessKey: string
} {
  if (!config.awsRegion || !config.awsAccessKeyId || !config.awsSecretAccessKey) {
    throw new Error('News digest DynamoDB storage requires AWS_REGION, AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY')
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
