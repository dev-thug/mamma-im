import type { MetadataRoute } from 'next'
import { siteConfig } from '@/config/site'

/**
 * AI 검색·답변 엔진의 크롤러.
 * 이름 있는 그룹이 있으면 그 봇은 `*` 그룹을 아예 무시하므로,
 * 여기에 나열한 봇에는 `*`와 같은 disallow를 함께 적어 둡니다.
 */
const aiCrawlers = [
  'GPTBot', // OpenAI 학습·검색
  'OAI-SearchBot', // ChatGPT 검색 인덱스
  'ChatGPT-User', // ChatGPT가 사용자의 요청으로 즉시 방문할 때
  'PerplexityBot',
  'ClaudeBot',
  'anthropic-ai',
  'Google-Extended', // Gemini / AI 개요
  'Bingbot', // Copilot
]

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
        disallow: '/api/',
      },
      {
        userAgent: 'Yeti', // 네이버
        allow: '/',
        disallow: '/api/',
      },
      {
        userAgent: 'kakao',
        allow: '/',
        disallow: '/api/',
      },
      ...aiCrawlers.map((userAgent) => ({
        userAgent,
        allow: '/',
        disallow: '/api/',
      })),
    ],
    // rss.xml도 함께 알립니다 — 콘솔 제출과 별개로 크롤러(Yeti·Googlebot)가 robots.txt에서 피드를 발견합니다.
    sitemap: [`${siteConfig.url}/sitemap.xml`, `${siteConfig.url}/rss.xml`],
  }
}
