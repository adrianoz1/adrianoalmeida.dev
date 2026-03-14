import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  ScanCommand,
  UpdateCommand,
} from '@aws-sdk/lib-dynamodb'
import { randomUUID } from 'crypto'
import type { NewsletterConfig } from './config'

interface SubscriberRecord {
  pk: string
  sk: 'PROFILE'
  entity: 'subscriber'
  email: string
  status: 'active' | 'unsubscribed'
  unsubscribeToken: string
  subscribedAt: string
  unsubscribedAt?: string
  source?: string
}

interface DeliveryRecord {
  pk: string
  sk: 'STATUS'
  entity: 'delivery'
  postSlug: string
  sentAt: string
  recipientCount: number
  resendIds: string[]
}

export interface NewsletterSubscriber {
  email: string
  unsubscribeToken: string
}

function buildClient(config: NewsletterConfig): DynamoDBDocumentClient {
  const client = new DynamoDBClient({
    region: config.awsRegion,
    credentials: {
      accessKeyId: config.awsAccessKeyId,
      secretAccessKey: config.awsSecretAccessKey,
    },
  })

  return DynamoDBDocumentClient.from(client)
}

function getSubscriberPk(email: string): string {
  return `SUBSCRIBER#${email.toLowerCase()}`
}

function getDeliveryPk(postSlug: string): string {
  return `DELIVERY#${postSlug}`
}

export async function upsertSubscriber(params: {
  config: NewsletterConfig
  email: string
  source?: string
}): Promise<{ status: 'created' | 'reactivated' | 'already-subscribed' }> {
  const { config, email, source } = params
  const client = buildClient(config)
  const pk = getSubscriberPk(email)
  const existing = await client.send(
    new GetCommand({
      TableName: config.newsletterTableName,
      Key: { pk, sk: 'PROFILE' },
    })
  )

  const current = existing.Item as SubscriberRecord | undefined
  const subscribedAt = new Date().toISOString()

  if (!current) {
    await client.send(
      new PutCommand({
        TableName: config.newsletterTableName,
        Item: {
          pk,
          sk: 'PROFILE',
          entity: 'subscriber',
          email: email.toLowerCase(),
          status: 'active',
          unsubscribeToken: randomUUID(),
          subscribedAt,
          source,
        } satisfies SubscriberRecord,
      })
    )

    return { status: 'created' }
  }

  if (current.status === 'active') {
    return { status: 'already-subscribed' }
  }

  await client.send(
    new UpdateCommand({
      TableName: config.newsletterTableName,
      Key: { pk, sk: 'PROFILE' },
      UpdateExpression:
        'SET #status = :status, subscribedAt = :subscribedAt, unsubscribeToken = :token, #source = :source REMOVE unsubscribedAt',
      ExpressionAttributeNames: {
        '#status': 'status',
        '#source': 'source',
      },
      ExpressionAttributeValues: {
        ':status': 'active',
        ':subscribedAt': subscribedAt,
        ':token': randomUUID(),
        ':source': source,
      },
    })
  )

  return { status: 'reactivated' }
}

export async function unsubscribeSubscriber(params: {
  config: NewsletterConfig
  email: string
  token: string
}): Promise<boolean> {
  const { config, email, token } = params
  const client = buildClient(config)
  const pk = getSubscriberPk(email)
  const existing = await client.send(
    new GetCommand({
      TableName: config.newsletterTableName,
      Key: { pk, sk: 'PROFILE' },
    })
  )

  const current = existing.Item as SubscriberRecord | undefined

  if (!current || current.unsubscribeToken !== token) {
    return false
  }

  await client.send(
    new UpdateCommand({
      TableName: config.newsletterTableName,
      Key: { pk, sk: 'PROFILE' },
      UpdateExpression: 'SET #status = :status, unsubscribedAt = :unsubscribedAt',
      ExpressionAttributeNames: {
        '#status': 'status',
      },
      ExpressionAttributeValues: {
        ':status': 'unsubscribed',
        ':unsubscribedAt': new Date().toISOString(),
      },
    })
  )

  return true
}

export async function listActiveSubscribers(config: NewsletterConfig): Promise<NewsletterSubscriber[]> {
  const client = buildClient(config)
  const subscribers: NewsletterSubscriber[] = []
  let lastEvaluatedKey: Record<string, unknown> | undefined

  do {
    const response = await client.send(
      new ScanCommand({
        TableName: config.newsletterTableName,
        ExclusiveStartKey: lastEvaluatedKey,
        FilterExpression: 'entity = :entity AND #status = :status',
        ExpressionAttributeNames: {
          '#status': 'status',
        },
        ExpressionAttributeValues: {
          ':entity': 'subscriber',
          ':status': 'active',
        },
      })
    )

    for (const item of (response.Items || []) as SubscriberRecord[]) {
      subscribers.push({
        email: item.email,
        unsubscribeToken: item.unsubscribeToken,
      })
    }

    lastEvaluatedKey = response.LastEvaluatedKey
  } while (lastEvaluatedKey)

  return subscribers
}

export async function getDeliveryStatus(params: {
  config: NewsletterConfig
  postSlug: string
}): Promise<DeliveryRecord | undefined> {
  const { config, postSlug } = params
  const client = buildClient(config)
  const response = await client.send(
    new GetCommand({
      TableName: config.newsletterTableName,
      Key: { pk: getDeliveryPk(postSlug), sk: 'STATUS' },
    })
  )

  return response.Item as DeliveryRecord | undefined
}

export async function markDeliverySent(params: {
  config: NewsletterConfig
  postSlug: string
  recipientCount: number
  resendIds: string[]
}): Promise<void> {
  const { config, postSlug, recipientCount, resendIds } = params
  const client = buildClient(config)

  await client.send(
    new PutCommand({
      TableName: config.newsletterTableName,
      Item: {
        pk: getDeliveryPk(postSlug),
        sk: 'STATUS',
        entity: 'delivery',
        postSlug,
        sentAt: new Date().toISOString(),
        recipientCount,
        resendIds,
      } satisfies DeliveryRecord,
    })
  )
}
