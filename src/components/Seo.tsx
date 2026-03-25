import Head from 'next/head'
import { getAbsoluteUrl, siteConfig } from '../lib/seo'

interface SeoProps {
  title?: string
  description?: string
  path?: string
  image?: string
  type?: 'website' | 'article'
  publishedTime?: string
  author?: string
  noIndex?: boolean
}

export function Seo({
  title,
  description = siteConfig.description,
  path = '/',
  image = siteConfig.defaultOgImage,
  type = 'website',
  publishedTime,
  author = siteConfig.author,
  noIndex = false,
}: SeoProps): JSX.Element {
  const resolvedTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.title
  const canonicalUrl = getAbsoluteUrl(path)
  const imageUrl = image.startsWith('http') ? image : getAbsoluteUrl(image)

  return (
    <Head>
      <title>{resolvedTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      {noIndex ? <meta name="robots" content="noindex,nofollow" /> : null}

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteConfig.name} />
      <meta property="og:locale" content={siteConfig.locale} />
      <meta property="og:title" content={resolvedTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={resolvedTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:site" content={siteConfig.twitterHandle} />
      <meta name="twitter:creator" content={siteConfig.twitterHandle} />

      {type === 'article' && publishedTime ? <meta property="article:published_time" content={publishedTime} /> : null}
      {type === 'article' ? <meta property="article:author" content={author} /> : null}
    </Head>
  )
}
