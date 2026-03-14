import type { NextApiRequest, NextApiResponse } from 'next'
import { getPublishedPostBySlug, getSortedPublishedPosts } from '../../../lib/blog.server'
import { getNewsletterConfig } from '../../../lib/newsletter/config'
import { getDeliveryStatus, listActiveSubscribers, markDeliverySent } from '../../../lib/newsletter/dynamodb'
import { sendNewsletterEmails } from '../../../lib/newsletter/email'

const digestSlugPattern = /^\d{4}-\d{2}-\d{2}-tech-digest$/

function isAuthorized(request: NextApiRequest, secret: string): boolean {
  return request.headers.authorization === `Bearer ${secret}`
}

function resolveTargetSlug(request: NextApiRequest): string | undefined {
  const slug = typeof request.query.slug === 'string' ? request.query.slug : undefined

  if (slug) {
    return slug
  }

  return getSortedPublishedPosts().find((post) => digestSlugPattern.test(post.slug))?.slug
}

export default async function handler(request: NextApiRequest, response: NextApiResponse): Promise<void> {
  if (request.method !== 'POST' && request.method !== 'GET') {
    response.setHeader('Allow', 'GET, POST')
    response.status(405).json({ ok: false, error: 'Method not allowed' })
    return
  }

  try {
    const config = getNewsletterConfig()

    if (!isAuthorized(request, config.newsletterDispatchSecret)) {
      response.status(401).json({ ok: false, error: 'Unauthorized' })
      return
    }

    const dryRun = request.query.dryRun === '1' || request.query.dryRun === 'true'
    const force = request.query.force === '1' || request.query.force === 'true'
    const targetSlug = resolveTargetSlug(request)

    if (!targetSlug) {
      response.status(404).json({ ok: false, error: 'No digest post found in published posts.' })
      return
    }

    if (!digestSlugPattern.test(targetSlug)) {
      response.status(400).json({ ok: false, error: 'Only YYYY-MM-DD-tech-digest posts can trigger the newsletter.' })
      return
    }

    const existingDelivery = await getDeliveryStatus({
      config,
      postSlug: targetSlug,
    })

    if (existingDelivery && !force) {
      response.status(200).json({
        ok: true,
        skipped: true,
        reason: 'already-sent',
        postSlug: targetSlug,
        sentAt: existingDelivery.sentAt,
      })
      return
    }

    const subscribers = await listActiveSubscribers(config)

    if (subscribers.length === 0) {
      response.status(200).json({
        ok: true,
        skipped: true,
        reason: 'no-subscribers',
        postSlug: targetSlug,
      })
      return
    }

    const post = await getPublishedPostBySlug(targetSlug)

    if (dryRun) {
      response.status(200).json({
        ok: true,
        dryRun: true,
        postSlug: post.slug,
        subscriberCount: subscribers.length,
      })
      return
    }

    const resendIds = await sendNewsletterEmails({
      config,
      post,
      subscribers,
    })

    await markDeliverySent({
      config,
      postSlug: post.slug,
      recipientCount: subscribers.length,
      resendIds,
    })

    response.status(200).json({
      ok: true,
      postSlug: post.slug,
      recipientCount: subscribers.length,
      resendIds,
    })
  } catch (error) {
    response.status(500).json({
      ok: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    })
  }
}
