function readOptionalString(name: string, fallback?: string): string | undefined {
  return process.env[name] || fallback
}

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
  resendApiKey: string
  newsletterFromEmail: string
  newsletterReplyTo?: string
  newsletterDispatchSecret: string
  siteUrl: string
}

export function getNewsletterConfig(): NewsletterConfig {
  return {
    awsRegion: readRequiredString('AWS_REGION'),
    awsAccessKeyId: readRequiredString('AWS_ACCESS_KEY_ID'),
    awsSecretAccessKey: readRequiredString('AWS_SECRET_ACCESS_KEY'),
    newsletterTableName: readRequiredString('NEWSLETTER_TABLE_NAME'),
    resendApiKey: readRequiredString('RESEND_API_KEY'),
    newsletterFromEmail: readRequiredString('NEWSLETTER_FROM_EMAIL'),
    newsletterReplyTo: readOptionalString('NEWSLETTER_REPLY_TO'),
    newsletterDispatchSecret: readRequiredString('NEWSLETTER_DISPATCH_SECRET'),
    siteUrl: readRequiredString('SITE_URL'),
  }
}
