function readRequiredString(name: string): string {
  const value = process.env[name]

  if (!value) {
    throw new Error(`Missing required env var: ${name}`)
  }

  return value
}

export interface NewsletterConfig {
  awsRegion: string
  awsAccessKeyId: string
  awsSecretAccessKey: string
  newsletterTableName: string
}

export function getNewsletterConfig(): NewsletterConfig {
  return {
    awsRegion: readRequiredString('AWS_REGION'),
    awsAccessKeyId: readRequiredString('AWS_ACCESS_KEY_ID'),
    awsSecretAccessKey: readRequiredString('AWS_SECRET_ACCESS_KEY'),
    newsletterTableName: readRequiredString('NEWSLETTER_TABLE_NAME'),
  }
}
