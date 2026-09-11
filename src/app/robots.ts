import type { MetadataRoute } from 'next'
import { siteConfig } from '@/config/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/api/',
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
      },
      {
        userAgent: 'Yeti',
        allow: '/',
      },
      {
        userAgent: 'kakao',
        allow: '/',
      },
    ],
    // rss.xml도 함께 알립니다 — 콘솔 제출과 별개로 크롤러(Yeti·Googlebot)가 robots.txt에서 피드를 발견합니다.
    sitemap: [`${siteConfig.url}/sitemap.xml`, `${siteConfig.url}/rss.xml`],
  }
}
