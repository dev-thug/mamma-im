import type { MetadataRoute } from 'next'
import { siteConfig } from '@/config/site'
import { getAllPosts } from '@/content/blog'

/**
 * lastModified는 실제로 내용이 바뀐 날짜만 넣습니다.
 * 빌드 시각(new Date())을 넣으면 매 배포마다 모든 URL이 "수정됨"으로 보여서
 * Google이 이 사이트의 lastmod 값을 신뢰하지 않게 됩니다.
 * 수정일을 추적하지 않는 정적 페이지는 lastModified를 생략합니다.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url
  const posts = getAllPosts()
  const postModified = (post: (typeof posts)[number]) =>
    new Date(post.updatedAt ?? post.publishedAt)

  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: postModified(post),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  const latestPostModified = posts.length
    ? new Date(Math.max(...posts.map((post) => postModified(post).getTime())))
    : undefined

  return [
    {
      url: base,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${base}/blog`,
      lastModified: latestPostModified,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    ...blogEntries,
    {
      url: `${base}/privacy`,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${base}/terms`,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${base}/licenses`,
      changeFrequency: 'monthly',
      priority: 0.1,
    },
    {
      url: `${base}/faq`,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${base}/notices`,
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: `${base}/contact`,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${base}/team`,
      changeFrequency: 'monthly',
      priority: 0.45,
    },
    {
      url: `${base}/guidelines`,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ]
}
