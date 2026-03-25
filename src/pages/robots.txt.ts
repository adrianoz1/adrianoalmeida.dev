import type { GetServerSideProps } from 'next'
import { getAbsoluteUrl } from '../lib/seo'

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const body = [`User-agent: *`, `Allow: /`, ``, `Sitemap: ${getAbsoluteUrl('/sitemap.xml')}`].join('\n')

  res.setHeader('Content-Type', 'text/plain')
  res.write(body)
  res.end()

  return {
    props: {},
  }
}

export default function Robots(): null {
  return null
}
