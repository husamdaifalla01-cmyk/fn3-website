import type { MetadataRoute } from 'next'

const BASE = 'https://ecommerce-ops-brain.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE,
      lastModified: new Date('2026-03-21'),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE}/dashboard`,
      lastModified: new Date('2026-03-21'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE}/inventory`,
      lastModified: new Date('2026-03-21'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE}/customer-service`,
      lastModified: new Date('2026-03-21'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE}/returns`,
      lastModified: new Date('2026-03-21'),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE}/content`,
      lastModified: new Date('2026-03-21'),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE}/launch`,
      lastModified: new Date('2026-03-21'),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE}/reports`,
      lastModified: new Date('2026-03-21'),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE}/bfcm`,
      lastModified: new Date('2026-03-21'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE}/brief`,
      lastModified: new Date('2026-03-21'),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${BASE}/guides`,
      lastModified: new Date('2026-03-21'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE}/guides/shopify-stockout-prevention`,
      lastModified: new Date('2026-03-21'),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${BASE}/guides/shopify-customer-service-templates`,
      lastModified: new Date('2026-03-21'),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${BASE}/guides/shopify-inventory-management-tips`,
      lastModified: new Date('2026-03-21'),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${BASE}/guides/ecommerce-customer-service-ai`,
      lastModified: new Date('2026-03-21'),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
  ]
}
