import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `오픈소스 라이선스 | ${siteConfig.name}`,
  alternates: {
    canonical: `${siteConfig.url}/licenses`,
    languages: { ko: `${siteConfig.url}/licenses` },
  },
};

const libraries = [
  {
    name: "Next.js",
    version: "16.1.6",
    license: "MIT",
    url: "https://github.com/vercel/next.js",
  },
  {
    name: "React",
    version: "19.2.3",
    license: "MIT",
    url: "https://github.com/facebook/react",
  },
  {
    name: "React DOM",
    version: "19.2.3",
    license: "MIT",
    url: "https://github.com/facebook/react",
  },
  {
    name: "Tailwind CSS",
    version: "4",
    license: "MIT",
    url: "https://github.com/tailwindlabs/tailwindcss",
  },
  {
    name: "Framer Motion",
    version: "12.34.2",
    license: "MIT",
    url: "https://github.com/framer/motion",
  },
  {
    name: "Lucide React",
    version: "0.575.0",
    license: "ISC",
    url: "https://github.com/lucide-icons/lucide",
  },
  {
    name: "class-variance-authority",
    version: "0.7.1",
    license: "Apache 2.0",
    url: "https://github.com/joe-bell/cva",
  },
  {
    name: "clsx",
    version: "2.1.1",
    license: "MIT",
    url: "https://github.com/lukeed/clsx",
  },
  {
    name: "tailwind-merge",
    version: "3.5.0",
    license: "MIT",
    url: "https://github.com/dcastil/tailwind-merge",
  },
];

const licenseBadgeColor: Record<string, string> = {
  MIT: "bg-green-100 text-green-800",
  ISC: "bg-blue-100 text-blue-800",
  "Apache 2.0": "bg-orange-100 text-orange-800",
};

function getBadgeClasses(license: string): string {
  return licenseBadgeColor[license] ?? "bg-neutral-100 text-neutral-700";
}

export default function LicensesPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-neutral-900 mb-2">
        오픈소스 라이선스
      </h1>
      <p className="text-neutral-500 text-sm mb-8">
        {siteConfig.name} 서비스는 아래의 오픈소스 라이브러리를 사용합니다.
      </p>

      {/* Desktop table */}
      <div className="hidden sm:block overflow-hidden rounded-xl border border-neutral-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-neutral-50 border-b border-neutral-200">
              <th className="text-left px-6 py-3 font-semibold text-neutral-700">
                라이브러리
              </th>
              <th className="text-left px-6 py-3 font-semibold text-neutral-700">
                버전
              </th>
              <th className="text-left px-6 py-3 font-semibold text-neutral-700">
                라이선스
              </th>
              <th className="text-left px-6 py-3 font-semibold text-neutral-700">
                링크
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {libraries.map((lib) => (
              <tr
                key={lib.name}
                className="bg-white hover:bg-neutral-50 transition-colors"
              >
                <td className="px-6 py-4 font-medium text-neutral-900">
                  {lib.name}
                </td>
                <td className="px-6 py-4 text-neutral-500 font-mono">
                  {lib.version}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${
                      getBadgeClasses(lib.license)
                    }`}
                  >
                    {lib.license}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <a
                    href={lib.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700 hover:underline transition-colors"
                  >
                    GitHub &rarr;
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="sm:hidden space-y-3">
        {libraries.map((lib) => (
          <div
            key={lib.name}
            className="rounded-xl border border-neutral-200 bg-white p-4"
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <span className="font-semibold text-neutral-900">{lib.name}</span>
              <span
                className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold shrink-0 ${
                  licenseBadgeColor[lib.license] ??
                  "bg-neutral-100 text-neutral-700"
                }`}
              >
                {lib.license}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-neutral-500 font-mono text-sm">
                v{lib.version}
              </span>
              <a
                href={lib.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary-600 hover:text-primary-700 hover:underline transition-colors"
              >
                GitHub &rarr;
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
