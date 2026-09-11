export const siteConfig = {
  /** 서비스명 (한글) */
  name: "맘마",
  /** 서비스명 (영문) */
  nameEn: "Mamma",
  /** 서비스명 (한글+영문) */
  nameWithEn: "맘마(Mamma)",
  /** 운영사명 (사업자등록증 상호) */
  company: "스페시파이(specify)",
  /** 서비스 URL */
  url: "https://mamma.im",
  /** iOS App Store URL */
  appStoreUrl: "https://apps.apple.com/kr/app/mamma/id6760751452",
  /** Android Google Play URL */
  playStoreUrl: "https://play.google.com/store/apps/details?id=im.mamma.app",
  /** 고객지원 이메일 */
  email: "support@specify.app",
  /** Google Analytics 4 측정 ID */
  gaMeasurementId: "G-39P8T0W65L",
  /**
   * 네이버 서치어드바이저 `https://mamma.im` 사이트의 소유확인 메타 태그 값.
   * `http://mamma.im` 사이트는 public/naver3c2eebbec59f0e56eabd7b4968c03078.html로 따로 확인합니다
   * (네이버는 http와 https를 다른 사이트로 봅니다).
   */
  naverSiteVerification: "82f87c45eead6dc221cf930baff7f35bfbb29dd6",
  /** 서비스 설명 (한글) */
  description:
    "태어나는 순간부터 초등학교 졸업까지, 아이의 모든 성장을 함께하는 스마트 육아 앱",
  /** 브랜드 테마 컬러 */
  themeColor: "#FF4757",
  /** 앱 플랫폼 */
  appPlatform: "React Native",

  /** 공식 소셜 계정 */
  social: {
    x: "https://x.com/de0978",
  },

  /** 사업자 정보 (사업자등록증 기준) */
  business: {
    /** 대표자 */
    representative: "김현중",
    /** 사업자등록번호 */
    registrationNumber: "656-14-02899",
    /** 사업장 소재지 */
    address: "서울특별시 동대문구 왕산로 288, 902호(전농동, 에스앤제이프리미안)",
  },

  legal: {
    /** 약관/방침 시행일자 */
    effectiveDate: "2026년 3월 1일",
    /** 개인정보 보호책임자 이름 */
    privacyOfficer: "맘마 개인정보 보호팀",
    /** 개인정보 보호책임자 직책 */
    privacyOfficerTitle: "개인정보 보호책임자",
  },

  seo: {
    /** 홈 검색 타이틀이자 카카오톡·X 공유 제목 (openGraph를 따로 선언하지 않은 404의 기본 제목이기도 합니다) */
    title: "맘마 - AI 육아 에이전트 | 육아 기록·상담 앱",
    keywords: [
      "육아",
      "육아앱",
      "맘마",
      "아기",
      "성장기록",
      "AI육아",
      "육아일기",
      "수유기록",
      "발달체크",
      "AI육아상담",
      "육아앱비교",
      "아기성장",
      "육아앱추천",
      "수면기록",
      "기저귀기록",
    ],
  },
} as const;
