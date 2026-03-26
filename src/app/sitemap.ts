import type { MetadataRoute } from 'next'
import { siteConfig } from '@/config/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url
  const now = new Date()

  return [
    {
      url: base,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${base}/privacy`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${base}/terms`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${base}/licenses`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.1,
    },
    {
      url: `${base}/faq`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${base}/notices`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: `${base}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${base}/team`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.45,
    },
    {
      url: `${base}/guidelines`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ]
}
