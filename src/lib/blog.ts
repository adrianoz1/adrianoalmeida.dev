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

export interface BlogPostHeading {
  id: string
  text: string
  level: 2 | 3
}

export interface BlogPost extends BlogPostSummary {
  contentHtml: string
  headings: BlogPostHeading[]
}

export function formatPostDate(date: string): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date(`${date}T00:00:00`))
}

export function formatPostMonth(date: string): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric',
  }).format(new Date(`${date}T00:00:00`))
}

export function getPostMonthKey(date: string): string {
  return date.slice(0, 7)
}
