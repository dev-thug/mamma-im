import { Instagram, Youtube, Globe, Heart, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1 - Brand */}
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-white">맘마</span>
              <Heart className="w-5 h-5 text-primary-400 fill-primary-400" />
            </div>
            <p className="text-neutral-400 text-sm mt-3">
              우리 가족의 육아 파트너
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a
                href="#"
                aria-label="Instagram"
                className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center hover:bg-neutral-700 transition-colors"
              >
                <Instagram className="w-5 h-5 text-neutral-300" />
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center hover:bg-neutral-700 transition-colors"
              >
                <Youtube className="w-5 h-5 text-neutral-300" />
              </a>
              <a
                href="#"
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
              {["기능 소개", "앱 다운로드", "업데이트 소식", "자주 묻는 질문"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-neutral-400 hover:text-white transition-colors text-sm py-1 block"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Column 3 - 고객지원 */}
          <div>
            <h3 className="text-sm font-semibold text-neutral-300 uppercase tracking-wider mb-4">
              고객지원
            </h3>
            <ul className="space-y-1">
              {["공지사항", "1:1 문의", "피드백 보내기"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-neutral-400 hover:text-white transition-colors text-sm py-1 block"
                  >
                    {item}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href="mailto:support@mamma.im"
                  className="text-primary-400 hover:text-primary-300 transition-colors text-sm py-1 flex items-center gap-1.5"
                >
                  <Mail className="w-4 h-4" />
                  support@mamma.im
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
              {["이용약관", "개인정보처리방침", "오픈소스 라이선스"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-neutral-400 hover:text-white transition-colors text-sm py-1 block"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-neutral-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-neutral-500 text-sm">
            © 2024 Mamma. All rights reserved.
          </p>
          <p className="text-neutral-500 text-sm flex items-center gap-1">
            Made with{" "}
            <Heart className="w-4 h-4 text-primary-400 fill-primary-400" />{" "}
            for families
          </p>
        </div>
      </div>
    </footer>
  );
}
