export interface BlogPostFrontmatter {
  title: string
  excerpt: string
  date: string
  author: string
  tags?: string[]
  coverTitle?: string
}

export interface BlogPostSummary extends BlogPostFrontmatter {
  slug: string
}

export interface BlogPost extends BlogPostSummary {
  contentHtml: string
}

export function formatPostDate(date: string): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date(`${date}T00:00:00`))
}
