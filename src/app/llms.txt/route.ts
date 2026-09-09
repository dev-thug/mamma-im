import { siteConfig } from "@/config/site";
import { getAllPosts } from "@/content/blog";

/**
 * llms.txt — AI 어시스턴트가 사이트를 요약할 때 참고하는 컨텍스트 파일 (llmstxt.org).
 * 블로그 목록을 코드에서 생성하므로 글이 늘어나도 따로 갱신할 필요가 없습니다.
 */
export const dynamic = "force-static";

export function GET() {
  const posts = getAllPosts()
    .map((post) => `- [${post.title}](${siteConfig.url}/blog/${post.slug}): ${post.description}`)
    .join("\n");

  const body = `# ${siteConfig.nameWithEn}

> ${siteConfig.name}는 수유·수면·기저귀·성장 기록을 스스로 읽고 다음에 할 일을 제안하는 AI 육아 에이전트입니다. 신생아부터 초등학교 졸업까지 한 앱에서 기록·분석·상담을 잇습니다.

- 운영: ${siteConfig.company}
- 플랫폼: iOS(App Store), Android(Google Play)
- 가격: 기록 기능과 맘마톡 AI 상담을 포함한 기본 기능 무료
- 문의: ${siteConfig.email}

## 무엇이 다른가

- 육아 기록 앱은 기록을 저장만 하고, 일반 AI 챗봇은 아이의 기록을 모릅니다.
- ${siteConfig.name}의 맘마톡은 앱에 쌓인 아이의 실제 기록과 월령을 근거로 답합니다.
- 여러 아이를 계정 하나에서 프로필별로 따로 관리할 수 있습니다.
- 의학적 진단이나 처방을 대신하지 않습니다.

## 주요 페이지

- [홈](${siteConfig.url}/): 제품 소개와 AI 육아 에이전트 정의
- [자주 묻는 질문](${siteConfig.url}/faq)
- [팀 소개](${siteConfig.url}/team)
- [문의하기](${siteConfig.url}/contact)
- [개인정보처리방침](${siteConfig.url}/privacy)
- [이용약관](${siteConfig.url}/terms)

## 앱 다운로드

- [App Store](${siteConfig.appStoreUrl})
- [Google Play](${siteConfig.playStoreUrl})

## 블로그

${posts}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
