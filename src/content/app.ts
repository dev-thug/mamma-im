import { siteConfig } from '@/config/site';

// Public product facts shared by rendered pages and the optional AI context files.
// Update this source when features or pricing change; never infer features from marketing copy.
export const appDescription = '맘마(Mamma)는 수유·수면·기저귀·성장 기록과 맘마톡 AI 육아 상담을 한곳에서 사용하는 무료 육아 앱입니다. iPhone과 Android에서 아이별 기록을 관리하고, 아이의 월령과 기록을 참고한 답변을 받을 수 있습니다.';

export const appQuestions = [
  { question: '수유 기록 앱으로 맘마를 어떻게 사용하나요?', answer: '맘마에서 수유를 기록하고 이전 기록과 함께 확인할 수 있습니다. 수유 시간과 간격을 남기면 다음 돌봄 때 아이의 최근 수유 흐름을 돌아보기 쉽습니다. 월령별 수유 정보는 맘마 블로그의 신생아 수유텀 가이드에서 확인하세요.', href: '/blog/newborn-feeding-schedule', label: '신생아 수유텀 가이드' },
  { question: '아기 수면 기록도 함께 관리할 수 있나요?', answer: '맘마는 수면 기록을 수유·기저귀 기록과 같은 앱에서 관리합니다. 낮잠과 밤잠의 흐름을 기록하고, 아이의 월령과 최근 기록을 참고하는 맘마톡에 육아 고민을 질문할 수 있습니다.', href: '/features', label: '수면·성장 기록 기능 보기' },
  { question: '맘마톡 AI 육아 상담은 어떤 정보를 참고하나요?', answer: '맘마톡은 아이의 월령과 앱에 저장된 육아 기록을 참고해 답변합니다. 아이의 상황을 매번 처음부터 설명하는 부담을 줄이기 위한 기능이며, AI 답변은 의학적 진단이나 처방을 대신하지 않습니다.', href: '/blog/ai-parenting-agent', label: 'AI 육아 상담과 기록의 관계' },
  { question: '맘마 앱은 무료인가요? 어디에서 설치하나요?', answer: '수유·수면·기저귀 등 기본 기록 기능과 맘마톡 AI 상담을 무료로 제공합니다. 공식 다운로드 페이지에서 iPhone용 App Store와 Android용 Google Play 링크를 확인할 수 있습니다.', href: '/download', label: '맘마 앱 무료 다운로드' },
  { question: '쌍둥이 기록이나 가족 공유도 가능한가요?', answer: '여러 아이의 프로필을 한 계정에서 등록해 아이별 기록을 따로 관리할 수 있습니다. 배우자나 조부모와 계정 간 기록을 실시간으로 공유하는 기능은 현재 지원하지 않습니다.', href: '/faq', label: '여러 아이 관리·공유 FAQ' },
] as const;

export const appSchema = {
  '@context': 'https://schema.org',
  '@type': 'MobileApplication',
  '@id': `${siteConfig.url}/#app`,
  name: siteConfig.name,
  alternateName: ['Mamma', '맘마 육아 앱'],
  url: `${siteConfig.url}/`,
  description: appDescription,
  operatingSystem: 'iOS, Android',
  applicationCategory: 'LifestyleApplication',
  inLanguage: 'ko',
  image: `${siteConfig.url}/og-image.png`,
  publisher: { '@id': `${siteConfig.url}/#organization` },
  installUrl: [siteConfig.appStoreUrl, siteConfig.playStoreUrl],
  sameAs: [siteConfig.appStoreUrl, siteConfig.playStoreUrl],
  featureList: ['수유·수면·기저귀 기록', '아이별 성장 기록과 발달 체크', '월령과 육아 기록을 참고하는 맘마톡 AI 상담', '한 계정에서 여러 아이의 프로필 관리'],
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW', url: `${siteConfig.url}/download`, description: '기본 기록 기능과 맘마톡 AI 상담 무료' },
};
