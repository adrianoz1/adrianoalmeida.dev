import type { NextApiRequest, NextApiResponse } from 'next'

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export default function handler(request: NextApiRequest, response: NextApiResponse): void {
  const title = typeof request.query.title === 'string' ? request.query.title.slice(0, 120) : 'aa.dev'
  const subtitle = typeof request.query.subtitle === 'string'
    ? request.query.subtitle.slice(0, 180)
    : 'Programacao, tecnologia e conteudo dev'

  const svg = `
    <svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="1200" height="630" fill="#0F172A"/>
      <rect x="48" y="48" width="1104" height="534" rx="32" fill="#111827" stroke="#334155"/>
      <text x="88" y="150" fill="#FACC15" font-family="Arial, Helvetica, sans-serif" font-size="28" font-weight="700">aa.dev</text>
      <text x="88" y="260" fill="#F8FAFC" font-family="Arial, Helvetica, sans-serif" font-size="64" font-weight="700">${escapeHtml(title)}</text>
      <text x="88" y="340" fill="#CBD5E1" font-family="Arial, Helvetica, sans-serif" font-size="30">${escapeHtml(subtitle)}</text>
      <text x="88" y="540" fill="#94A3B8" font-family="Arial, Helvetica, sans-serif" font-size="24">Adriano Almeida • Programacao e tecnologia com execucao real</text>
    </svg>
  `

  response.setHeader('Content-Type', 'image/svg+xml')
  response.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
  response.status(200).send(svg)
}
