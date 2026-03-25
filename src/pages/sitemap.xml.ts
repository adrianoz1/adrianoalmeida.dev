import type { GetServerSideProps } from 'next'
import { getSortedPublishedPosts } from '../lib/blog.server'
import { getAbsoluteUrl } from '../lib/seo'

function buildSitemapXml(urls: Array<{ loc: string; lastmod?: string }>): string {
  const items = urls
    .map(
      ({ loc, lastmod }) => `
  <url>
    <loc>${loc}</loc>
    ${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}
  </url>`
    )
    .join('')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${items}
</urlset>`
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const posts = getSortedPublishedPosts()
  const urls = [
    { loc: getAbsoluteUrl('/') },
    { loc: getAbsoluteUrl('/blog') },
    ...posts.map((post) => ({
      loc: getAbsoluteUrl(`/blog/${post.slug}`),
      lastmod: new Date(`${post.date}T00:00:00`).toISOString(),
    })),
  ]

  const xml = buildSitemapXml(urls)

  res.setHeader('Content-Type', 'application/xml')
  res.write(xml)
  res.end()

  return {
    props: {},
  }
}

export default function Sitemap(): null {
  return null
}
