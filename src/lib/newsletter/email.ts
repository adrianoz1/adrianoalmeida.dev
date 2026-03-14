import type { BlogPost } from '../blog'
import type { NewsletterConfig } from './config'
import type { NewsletterSubscriber } from './dynamodb'

interface ResendResponse {
  id?: string
  error?: {
    message?: string
  }
}

function stripHtml(value: string): string {
  return value.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
}

function buildNewsletterHtml(params: {
  config: NewsletterConfig
  post: BlogPost
  unsubscribeEmail: string
  unsubscribeToken: string
}): string {
  const { config, post, unsubscribeEmail, unsubscribeToken } = params
  const unsubscribeUrl = new URL('/api/newsletter/unsubscribe', config.siteUrl)
  unsubscribeUrl.searchParams.set('email', unsubscribeEmail)
  unsubscribeUrl.searchParams.set('token', unsubscribeToken)
  const postUrl = new URL(`/blog/${post.slug}`, config.siteUrl).toString()

  return [
    '<div style="background:#f5f5ef;padding:32px 16px;font-family:Georgia,serif;color:#111827;">',
    '<div style="max-width:720px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:24px;padding:40px 28px;">',
    '<p style="margin:0 0 8px;font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:#6b7280;">aa.dev newsletter</p>',
    `<h1 style="margin:0 0 12px;font-size:36px;line-height:1.1;">${post.title}</h1>`,
    `<p style="margin:0 0 24px;font-size:18px;line-height:1.7;color:#4b5563;">${post.excerpt}</p>`,
    `<p style="margin:0 0 24px;font-size:14px;color:#6b7280;">Leia no site: <a href="${postUrl}" style="color:#111827;">${postUrl}</a></p>`,
    `<div style="font-size:16px;line-height:1.8;color:#111827;">${post.contentHtml}</div>`,
    '<hr style="border:none;border-top:1px solid #e5e7eb;margin:32px 0;" />',
    '<p style="margin:0 0 8px;font-size:14px;color:#6b7280;">Voce recebeu este email porque se cadastrou no site a2dev.com.br.</p>',
    `<p style="margin:0;font-size:14px;color:#6b7280;"><a href="${unsubscribeUrl.toString()}" style="color:#6b7280;">Cancelar inscricao</a></p>`,
    '</div>',
    '</div>',
  ].join('')
}

export async function sendNewsletterEmails(params: {
  config: NewsletterConfig
  post: BlogPost
  subscribers: NewsletterSubscriber[]
}): Promise<string[]> {
  const { config, post, subscribers } = params
  const resendIds: string[] = []

  for (const subscriber of subscribers) {
    const html = buildNewsletterHtml({
      config,
      post,
      unsubscribeEmail: subscriber.email,
      unsubscribeToken: subscriber.unsubscribeToken,
    })

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${config.resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: config.newsletterFromEmail,
        to: [subscriber.email],
        reply_to: config.newsletterReplyTo,
        subject: post.title,
        html,
        text: stripHtml(`${post.title}\n\n${post.excerpt}\n\n${post.contentHtml}`),
      }),
    })

    const payload = (await response.json()) as ResendResponse

    if (!response.ok || !payload.id) {
      throw new Error(payload.error?.message || `Resend request failed with status ${response.status}`)
    }

    resendIds.push(payload.id)
  }

  return resendIds
}
