const SITE_URL = 'https://mintbrooks.com'
const DEFAULT_OG_IMAGE = `${SITE_URL}/lifestyle/editorial.jpg`
const LOGO_URL = `${SITE_URL}/lifestyle/logo.png`

type ArticleSchemaInput = {
  slug: string
  category?: string
  headline: string
  description: string
  datePublished: string
  dateModified: string
  imageUrl?: string
  authorName?: string
}

export function articleSchema(input: ArticleSchemaInput) {
  const path = input.category ? `${input.category}/${input.slug}` : input.slug
  const url = `${SITE_URL}/${path}`
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.headline,
    description: input.description,
    datePublished: input.datePublished,
    dateModified: input.dateModified,
    url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    image: {
      '@type': 'ImageObject',
      url: input.imageUrl ?? DEFAULT_OG_IMAGE,
      width: 1200,
      height: 630,
    },
    author: {
      '@type': 'Organization',
      name: input.authorName ?? 'Mintbrooks Editorial',
      url: `${SITE_URL}/about`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Mintbrooks',
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: LOGO_URL },
    },
  }
}

export type Crumb = { name: string; path?: string }

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      ...(c.path ? { item: `${SITE_URL}${c.path}` } : {}),
    })),
  }
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }
}

export function financialProductSchema(input: {
  name: string
  description: string
  slug: string
  hashFragment?: string
  apr?: number
  annualFeeText?: string
  rating?: { value: number; best?: number }
  category?: string
}) {
  const base = `${SITE_URL}/finance/${input.slug}`
  const url = input.hashFragment ? `${base}#${input.hashFragment}` : base
  return {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: input.name,
    description: input.description,
    url,
    ...(input.annualFeeText ? { feesAndCommissionsSpecification: input.annualFeeText } : {}),
    ...(input.apr !== undefined
      ? {
          annualPercentageRate: {
            '@type': 'QuantitativeValue',
            value: input.apr,
            unitText: 'APR',
          },
        }
      : {}),
    offers: {
      '@type': 'Offer',
      category: input.category ?? 'Credit Card',
    },
    ...(input.rating
      ? {
          review: {
            '@type': 'Review',
            reviewRating: {
              '@type': 'Rating',
              ratingValue: String(input.rating.value),
              bestRating: String(input.rating.best ?? 5),
            },
            author: { '@type': 'Organization', name: 'Mintbrooks' },
          },
        }
      : {}),
  }
}
