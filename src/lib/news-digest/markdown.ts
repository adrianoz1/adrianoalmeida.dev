import { assertOpenAiConfig, getRequiredRepositoryUrl, type NewsDigestConfig } from './config'
import type { GeneratedDraft, RankedNewsItem } from './types'

function formatDate(date: Date, timeZone: string): string {
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })

  return formatter.format(date)
}

function slugify(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

function escapeYaml(value: string): string {
  return value.replace(/"/g, '\\"')
}

function buildFallbackBody(items: RankedNewsItem[]): string {
  const sections = items.map((item, index) => {
    const authorLabel = item.authorHandle ? `@${item.authorHandle}` : item.authorName || 'fonte sem identificacao'

    return [
      `## ${index + 1}. ${item.title}`,
      '',
      `${item.summary}`,
      '',
      `Por que entrou no digest: ${item.scoreReasons.join(', ') || 'sinal editorial manual'}.`,
      '',
      `Fonte original: [${authorLabel}](${item.url})`,
    ].join('\n')
  })

  return [
    '## Resumo rapido',
    '',
    'Compilado diario com os principais sinais e movimentos do ecossistema de tecnologia capturados pelo pipeline editorial.',
    '',
    ...sections.flatMap((section) => [section, '']),
    '## Observacoes editoriais',
    '',
    '- Validar contexto e links antes de publicar.',
    '- Ajustar a abertura para refletir o tema dominante do dia.',
    '- Remover itens que parecam rumor, provocacao ou marketing vazio.',
  ].join('\n')
}

function buildPrompt(items: RankedNewsItem[], publishDate: string): string {
  const serializedItems = items
    .map((item, index) => {
      return [
        `Item ${index + 1}`,
        `titulo: ${item.title}`,
        `resumo: ${item.summary}`,
        `url: ${item.url}`,
        `autor: ${item.authorName || ''} ${item.authorHandle ? `(@${item.authorHandle})` : ''}`.trim(),
        `publicado_em: ${item.publishedAt}`,
        `score: ${item.score}`,
        `motivos_score: ${item.scoreReasons.join(', ')}`,
        `texto_original: ${item.rawText}`,
      ].join('\n')
    })
    .join('\n\n')

  return [
    'Voce escreve em portugues do Brasil para um blog de tecnologia.',
    'Sua tarefa e gerar um unico post diario em Markdown com 5 a 7 noticias agrupadas.',
    'Nao invente fatos.',
    'Nao use tom exagerado.',
    'Prefira contexto curto e editorial, como um compilado para newsletter.',
    'Estrutura obrigatoria:',
    '1. Um titulo forte e informativo.',
    '2. Uma abertura curta com leitura editorial do dia.',
    '3. Uma secao por noticia em formato ##.',
    '4. Em cada secao: contexto, por que importa, e link da fonte.',
    '5. Uma secao final "## Fechamento" com 2 ou 3 frases.',
    `Data editorial do digest: ${publishDate}.`,
    'Retorne apenas o corpo em Markdown, sem frontmatter.',
    '',
    serializedItems,
  ].join('\n')
}

async function generateBodyWithOpenAi(config: NewsDigestConfig, items: RankedNewsItem[], publishDate: string): Promise<string> {
  assertOpenAiConfig(config)

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${config.openAiApiKey}`,
    },
    body: JSON.stringify({
      model: config.openAiModel,
      temperature: 0.5,
      messages: [
        {
          role: 'system',
          content: 'You are a precise editorial assistant that writes concise Brazilian Portuguese markdown digests.',
        },
        {
          role: 'user',
          content: buildPrompt(items, publishDate),
        },
      ],
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`OpenAI request failed (${response.status}): ${errorText}`)
  }

  const payload = (await response.json()) as {
    choices?: Array<{
      message?: {
        content?: string
      }
    }>
  }

  const content = payload.choices?.[0]?.message?.content?.trim()

  if (!content) {
    throw new Error('OpenAI response did not include markdown content')
  }

  return content
}

export async function generateDigestDraft(config: NewsDigestConfig, items: RankedNewsItem[]): Promise<GeneratedDraft> {
  if (items.length === 0) {
    throw new Error('Cannot generate digest without selected items')
  }

  const now = new Date()
  const publishDate = formatDate(now, config.timezone)
  const slug = `${publishDate}-tech-digest`
  const title = `Tech Digest: ${publishDate}`
  const excerpt = `Compilado diario com ${items.length} sinais relevantes do mundo da tecnologia para revisao editorial.`
  const tags = ['digest', 'tech-news', 'automation']
    .concat(Array.from(new Set(items.flatMap((item) => item.tags))))
    .slice(0, 6)

  const body = config.openAiApiKey
    ? await generateBodyWithOpenAi(config, items, publishDate)
    : buildFallbackBody(items)

  const frontmatter = [
    '---',
    `title: "${escapeYaml(title)}"`,
    `excerpt: "${escapeYaml(excerpt)}"`,
    `date: "${publishDate}"`,
    `author: "${escapeYaml(config.authorName)}"`,
    `tags: [${tags.map((tag) => `"${escapeYaml(tag)}"`).join(', ')}]`,
    `coverTitle: "Daily Tech Digest"`,
    `canonicalSource: "${escapeYaml(getRequiredRepositoryUrl(config))}"`,
    'draft: true',
    'automation: "news-digest"',
    '---',
    '',
  ].join('\n')

  const sourceAuditTrail = [
    '',
    '## Auditoria do pipeline',
    '',
    ...items.map((item, index) => {
      return `${index + 1}. [${item.title}](${item.url}) | score ${item.score} | motivos: ${item.scoreReasons.join(', ')}`
    }),
  ].join('\n')

  return {
    slug,
    title,
    excerpt,
    tags,
    markdown: `${frontmatter}${body.trim()}\n${sourceAuditTrail}\n`,
  }
}
