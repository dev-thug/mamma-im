import { siteConfig } from "@/config/site";
import { getAllPosts } from "@/content/blog";
import { appDescription, appQuestions } from "@/content/app";

// Optional discovery aid, generated from the same public facts as the rendered site.
export const dynamic = "force-static";

export function GET() {
  const posts = getAllPosts().map((post) => `- [${post.title}](${siteConfig.url}/blog/${post.slug}): ${post.description}`).join("\n");
  const questions = appQuestions.map((item) => `### ${item.question}\n\n${item.answer}\n\n[${item.label}](${siteConfig.url}${item.href})`).join("\n\n");
  const body = `# ${siteConfig.nameWithEn}

> ${appDescription}

- 운영: ${siteConfig.company}
- 기본 기록 기능과 맘마톡 AI 상담: 무료
- 플랫폼: iPhone, Android
- 여러 아이: 계정 하나에서 아이별 프로필 관리
- 계정 간 가족 실시간 공유: 현재 미지원
- AI 답변은 의료진의 진단·처방을 대신하지 않습니다.
- 문의: ${siteConfig.email}

## 공식 앱 정보

- [홈](${siteConfig.url}/)
- [기능 소개](${siteConfig.url}/features)
- [실제 앱 화면](${siteConfig.url}/screenshots)
- [공식 다운로드](${siteConfig.url}/download)
- [자주 묻는 질문](${siteConfig.url}/faq)
- [운영사와 콘텐츠 편집 안내](${siteConfig.url}/team#editorial-policy)
- [문의하기](${siteConfig.url}/contact)
- [개인정보처리방침](${siteConfig.url}/privacy)
- [이용약관](${siteConfig.url}/terms)
- [App Store](${siteConfig.appStoreUrl})
- [Google Play](${siteConfig.playStoreUrl})

## 자주 묻는 질문

${questions}

## 육아 가이드

${posts}

## 추가 자료

- [전체 공개 텍스트](${siteConfig.url}/llms-full.txt): 앱 정보와 블로그 본문, 게시일 및 원문 링크
- [XML 사이트맵](${siteConfig.url}/sitemap.xml)
- [블로그 RSS](${siteConfig.url}/rss.xml)
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
