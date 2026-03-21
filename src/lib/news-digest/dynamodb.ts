import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb'
import { assertNewsDigestStorageConfig, type NewsDigestConfig } from './config'
import type { RankedNewsItem } from './types'

interface NewsDigestRecord {
  pk: string
  sk: 'DIGEST'
  entity: 'news-digest'
  slug: string
  title: string
  excerpt: string
  markdown: string
  digestDate: string
  draftPath: string
  publishedPath: string
  branchName?: string
  pullRequestUrl?: string
  selectedCount: number
  selectedItems: Array<{
    title: string
    url: string
    source: string
    publishedAt: string
    score: number
    scoreReasons: string[]
  }>
  createdAt: string
}

function buildClient(config: NewsDigestConfig): DynamoDBDocumentClient {
  assertNewsDigestStorageConfig(config)

  const client = new DynamoDBClient({
    region: config.awsRegion,
    credentials: {
      accessKeyId: config.awsAccessKeyId,
      secretAccessKey: config.awsSecretAccessKey,
    },
  })

  return DynamoDBDocumentClient.from(client)
}

function getDigestPk(slug: string): string {
  return `DIGEST#${slug}`
}

function getDigestDateFromSlug(slug: string): string {
  return slug.split('-').slice(0, 3).join('-')
}

export async function saveNewsDigest(params: {
  config: NewsDigestConfig
  slug: string
  title: string
  excerpt: string
  markdown: string
  draftPath: string
  publishedPath: string
  branchName?: string
  pullRequestUrl?: string
  selectedItems: RankedNewsItem[]
}): Promise<void> {
  const { config, slug, title, excerpt, markdown, draftPath, publishedPath, branchName, pullRequestUrl, selectedItems } = params
  const client = buildClient(config)

  await client.send(
    new PutCommand({
      TableName: config.newsDigestTableName,
      Item: {
        pk: getDigestPk(slug),
        sk: 'DIGEST',
        entity: 'news-digest',
        slug,
        title,
        excerpt,
        markdown,
        digestDate: getDigestDateFromSlug(slug),
        draftPath,
        publishedPath,
        branchName,
        pullRequestUrl,
        selectedCount: selectedItems.length,
        selectedItems: selectedItems.map((item) => ({
          title: item.title,
          url: item.url,
          source: item.source,
          publishedAt: item.publishedAt,
          score: item.score,
          scoreReasons: item.scoreReasons,
        })),
        createdAt: new Date().toISOString(),
      } satisfies NewsDigestRecord,
    })
  )
}
