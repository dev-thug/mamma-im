import Link from "next/link";
import { Instagram, Youtube, Globe, Heart, Mail } from "lucide-react";
import { siteConfig } from "@/config/site";

function FooterLogoIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 320 118"
      width="210"
      height="77"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="ftBrand" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF6B6B" />
          <stop offset="100%" stopColor="#FF4757" />
        </linearGradient>
        <linearGradient id="ftMilk" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFF0F0" />
          <stop offset="100%" stopColor="#FFE4E4" />
        </linearGradient>
        <filter id="ftShadow" x="-15%" y="-15%" width="130%" height="130%">
          <feDropShadow dx="0" dy="3" stdDeviation="5" floodColor="#000000" floodOpacity="0.35" />
        </filter>
      </defs>

      {/* 젖병 아이콘 — scale(0.78)로 축소, 중심 기준 재정렬 */}
      <g transform="translate(10, 10) scale(0.78)" filter="url(#ftShadow)">
        <g transform="translate(38, 12) rotate(12, 45, 45)">
          <path d="M35 30 C35 5, 55 5, 55 30" fill="#FFA502" />
          <rect x="20" y="45" width="50" height="60" rx="15" fill="#FFFFFF" stroke="#2F3542" strokeWidth="4" />
          <path d="M22 70 Q 32 65, 45 72 T 68 70 L 68 90 A 13 13 0 0 1 55 103 L 35 103 A 13 13 0 0 1 22 90 Z" fill="url(#ftMilk)" />
          <rect x="15" y="30" width="60" height="15" rx="6" fill="url(#ftBrand)" stroke="#2F3542" strokeWidth="4" />
          <line x1="28" y1="55" x2="38" y2="55" stroke="#2F3542" strokeWidth="3" strokeLinecap="round" />
          <line x1="28" y1="65" x2="35" y2="65" stroke="#2F3542" strokeWidth="3" strokeLinecap="round" />
          <line x1="28" y1="75" x2="38" y2="75" stroke="#2F3542" strokeWidth="3" strokeLinecap="round" />
          <path d="M41 82 C 41 82, 38 79, 41 77 C 44 75, 48 78, 45 82 C 43 85, 41 82, 41 82 Z" fill="#FF4757" />
        </g>
        {/* 반짝임 */}
        <path d="M108 22 L111 29 L118 32 L111 35 L108 42 L105 35 L98 32 L105 29 Z" fill="#FFA502" opacity="0.9" />
      </g>

      {/* 텍스트 영역 */}
      <g transform="translate(118, 75)">
        {/* 맘마 텍스트 */}
        <text
          x="0"
          y="0"
          fontFamily="'Pretendard', 'Noto Sans KR', 'Nunito', sans-serif"
          fontSize="52"
          fontWeight="900"
          fill="#FFFFFF"
          letterSpacing="-1"
        >
          맘마
        </text>
        {/* 하트 아이콘 (lucide Heart path, 24x24 → scale 1.4) */}
        <g transform="translate(108, -36) scale(1.4)">
          <path
            d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
            fill="#FF4757"
            stroke="#FF4757"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        {/* 서브 한글 텍스트 */}
        <text
          x="5"
          y="28"
          fontFamily="'Pretendard', 'Noto Sans KR', sans-serif"
          fontSize="15"
          fontWeight="700"
          fill="#9CA3AF"
          letterSpacing="-0.5"
        >
          우리아이를 위한{" "}
          <tspan fill="#FFFFFF">맘마</tspan>
        </text>
      </g>
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav aria-label="푸터 메뉴">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1 - Brand */}
          <div>
            <div className="-ml-1 -mt-2">
              <FooterLogoIcon />
            </div>
            <div className="flex items-center gap-3 mt-6">
              <a
                href="#"
                title="준비 중"
                aria-label="Instagram"
                className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center hover:bg-neutral-700 transition-colors"
              >
                <Instagram className="w-5 h-5 text-neutral-300" />
              </a>
              <a
                href="#"
                title="준비 중"
                aria-label="YouTube"
                className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center hover:bg-neutral-700 transition-colors"
              >
                <Youtube className="w-5 h-5 text-neutral-300" />
              </a>
              <a
                href="#"
                title="준비 중"
                aria-label="Blog"
                className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center hover:bg-neutral-700 transition-colors"
              >
                <Globe className="w-5 h-5 text-neutral-300" />
              </a>
            </div>
          </div>

          {/* Column 2 - 서비스 */}
          <div>
            <h3 className="text-sm font-semibold text-neutral-300 uppercase tracking-wider mb-4">
              서비스
            </h3>
            <ul className="space-y-1">
                <li>
                  <Link
                    href="/#features"
                    className="text-neutral-400 hover:text-white transition-colors text-sm py-1 block"
                  >
                    기능 소개
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#download"
                    className="text-neutral-400 hover:text-white transition-colors text-sm py-1 block"
                  >
                    앱 다운로드
                  </Link>
                </li>
                <li>
                  <a
                    href="#"
                    title="준비 중"
                    className="text-neutral-400 hover:text-white transition-colors text-sm py-1 block"
                  >
                    업데이트 소식
                  </a>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="text-neutral-400 hover:text-white transition-colors text-sm py-1 block"
                  >
                    자주 묻는 질문
                  </Link>
                </li>
              </ul>
          </div>

          {/* Column 3 - 고객지원 */}
          <div>
            <h3 className="text-sm font-semibold text-neutral-300 uppercase tracking-wider mb-4">
              고객지원
            </h3>
            <ul className="space-y-1">
                <li>
                  <Link
                    href="/notices"
                    className="text-neutral-400 hover:text-white transition-colors text-sm py-1 block"
                  >
                    공지사항
                  </Link>
                </li>
                <li>
                  <Link
                    href="/team"
                    className="text-neutral-400 hover:text-white transition-colors text-sm py-1 block"
                  >
                    팀 소개
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-neutral-400 hover:text-white transition-colors text-sm py-1 block"
                  >
                    1:1 문의
                  </Link>
                </li>
                <li>
                  <a
                    href={`mailto:${siteConfig.email}?subject=피드백`}
                    className="text-neutral-400 hover:text-white transition-colors text-sm py-1 block"
                  >
                    피드백 보내기
                  </a>
                </li>
                <li className="pt-2">
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-primary-400 hover:text-primary-300 transition-colors text-sm py-1 flex items-center gap-1.5"
                  >
                    <Mail className="w-4 h-4" />
                    {siteConfig.email}
                  </a>
                </li>
              </ul>
          </div>

          {/* Column 4 - 법적고지 */}
          <div>
            <h3 className="text-sm font-semibold text-neutral-300 uppercase tracking-wider mb-4">
              법적고지
            </h3>
            <ul className="space-y-1">
              {[
                { label: "이용약관", href: "/terms" },
                { label: "개인정보처리방침", href: "/privacy" },
                { label: "커뮤니티 가이드라인", href: "/guidelines" },
                { label: "오픈소스 라이선스", href: "/licenses" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-400 hover:text-white transition-colors text-sm py-1 block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        </nav>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-neutral-800">
          <p className="text-neutral-500 text-xs leading-relaxed">
            {siteConfig.company} · 대표 {siteConfig.business.representative} ·
            사업자등록번호 {siteConfig.business.registrationNumber}
            <br />
            {siteConfig.business.address} · {siteConfig.email}
          </p>
          <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-neutral-500 text-sm">
              © {new Date().getFullYear()} {siteConfig.nameEn}. All rights reserved.
            </p>
            <p className="text-neutral-500 text-sm flex items-center gap-1">
              Made with{" "}
              <Heart className="w-4 h-4 text-primary-400 fill-primary-400" />{" "}
              for families
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
