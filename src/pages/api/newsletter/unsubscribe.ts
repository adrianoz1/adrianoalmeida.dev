import type { NextApiRequest, NextApiResponse } from 'next'
import { getNewsletterConfig } from '../../../lib/newsletter/config'
import { unsubscribeSubscriber } from '../../../lib/newsletter/dynamodb'

export default async function handler(request: NextApiRequest, response: NextApiResponse): Promise<void> {
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET')
    response.status(405).send('Method not allowed')
    return
  }

  const email = typeof request.query.email === 'string' ? request.query.email : ''
  const token = typeof request.query.token === 'string' ? request.query.token : ''

  if (!email || !token) {
    response.status(400).send('Invalid unsubscribe link.')
    return
  }

  try {
    const config = getNewsletterConfig()
    const success = await unsubscribeSubscriber({ config, email, token })

    response
      .status(success ? 200 : 400)
      .setHeader('Content-Type', 'text/html; charset=utf-8')
      .send(
        success
          ? '<html><body style="font-family:sans-serif;padding:40px;"><h1>Inscricao cancelada</h1><p>Voce nao recebera mais emails da newsletter.</p></body></html>'
          : '<html><body style="font-family:sans-serif;padding:40px;"><h1>Link invalido</h1><p>Nao foi possivel cancelar a inscricao com esse link.</p></body></html>'
      )
  } catch (error) {
    response
      .status(500)
      .setHeader('Content-Type', 'text/html; charset=utf-8')
      .send(
        `<html><body style="font-family:sans-serif;padding:40px;"><h1>Erro</h1><p>${
          error instanceof Error ? error.message : 'Unknown error'
        }</p></body></html>`
      )
  }
}
