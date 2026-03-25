import Head from 'next/head'

interface StructuredDataProps {
  data: Record<string, unknown> | Array<Record<string, unknown>>
}

export function StructuredData({ data }: StructuredDataProps): JSX.Element {
  return (
    <Head>
      <script
        key="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      />
    </Head>
  )
}
