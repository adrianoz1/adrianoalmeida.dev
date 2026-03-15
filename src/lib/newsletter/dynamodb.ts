import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
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
