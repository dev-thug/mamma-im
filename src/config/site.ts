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
  email: "support@mamma.im",
  /** Google Analytics 4 측정 ID */
  gaMeasurementId: "G-39P8T0W65L",
  /** 서비스 설명 (한글) */
  description:
    "태어나는 순간부터 초등학교 졸업까지, 아이의 모든 성장을 함께하는 스마트 육아 앱",
  /** 브랜드 테마 컬러 */
  themeColor: "#FF4757",
  /** 앱 플랫폼 */
  appPlatform: "React Native",

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
    title: "맘마 - 우리 가족의 육아 파트너",
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
