export const siteConfig = {
  name: 'aa.dev',
  title: 'Adriano Almeida | Programacao, tecnologia e conteudo dev',
  description:
    'Programacao e tecnologia com linguagem clara e execucao real. Blog, conteudos e insights práticos sobre desenvolvimento, arquitetura, ferramentas e carreira.',
  url: 'https://a2dev.com.br',
  locale: 'pt_BR',
  twitterHandle: '@aa2dev',
  author: 'Adriano Almeida',
  defaultOgImage: '/api/og?title=Adriano%20Almeida&subtitle=Programacao%2C%20tecnologia%20e%20conteudo%20dev',
} as const

export function getAbsoluteUrl(path = ''): string {
  if (!path) {
    return siteConfig.url
  }

  return new URL(path, siteConfig.url).toString()
}

export function stripHtmlTags(value: string): string {
  return value.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
}
