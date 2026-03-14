import type { NextApiRequest, NextApiResponse } from 'next'
import { getNewsletterConfig } from '../../../lib/newsletter/config'
import { upsertSubscriber } from '../../../lib/newsletter/dynamodb'

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export default async function handler(request: NextApiRequest, response: NextApiResponse): Promise<void> {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST')
    response.status(405).json({ ok: false, error: 'Method not allowed' })
    return
  }

  const email = typeof request.body?.email === 'string' ? request.body.email.trim().toLowerCase() : ''

  if (!isValidEmail(email)) {
    response.status(400).json({ ok: false, error: 'Informe um email valido.' })
    return
  }

  try {
    const config = getNewsletterConfig()
    const result = await upsertSubscriber({
      config,
      email,
      source: request.headers.origin || request.headers.referer,
    })

    const messageByStatus = {
      created: 'Inscricao confirmada. Os proximos posts publicados poderao chegar por email.',
      reactivated: 'Sua inscricao foi reativada com sucesso.',
      'already-subscribed': 'Esse email ja esta inscrito.',
    }

    response.status(200).json({
      ok: true,
      status: result.status,
      message: messageByStatus[result.status],
    })
  } catch (error) {
    response.status(500).json({
      ok: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    })
  }
}
