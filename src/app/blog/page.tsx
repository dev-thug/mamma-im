import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/content/blog";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "육아 정보 블로그 | 맘마",
  description:
    "수유·수면·발달 체크부터 육아앱 고르는 법까지, 맘마가 정리한 실용적인 육아 정보를 확인하세요.",
  alternates: {
    canonical: `${siteConfig.url}/blog`,
    languages: { ko: `${siteConfig.url}/blog` },
  },
  openGraph: {
    title: "육아 정보 블로그 | 맘마",
    description:
      "수유·수면·발달 체크부터 육아앱 고르는 법까지, 맘마가 정리한 실용적인 육아 정보를 확인하세요.",
    type: "website",
    url: `${siteConfig.url}/blog`,
  },
};

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
}

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-neutral-500 hover:text-neutral-900 transition-colors mb-6"
        >
          ← 홈으로
        </Link>
        <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-3">
          육아 정보 블로그
        </h1>
        <p className="text-neutral-500 max-w-2xl">
          수유·수면 기록부터 발달 체크, 육아앱 고르는 법까지 — 맘마가 실제로 도움이 되는
          육아 정보만 골라 정리합니다.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-col rounded-2xl border border-neutral-100 p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
          >
            <span
              className="inline-block w-fit px-3 py-1 rounded-full text-xs font-semibold mb-4"
              style={{ background: "var(--primary-50)", color: "var(--primary-500)" }}
            >
              {post.category}
            </span>
            <h2 className="text-lg font-bold text-neutral-900 mb-2 group-hover:text-primary-500 transition-colors">
              {post.title}
            </h2>
            <p className="text-sm text-neutral-500 leading-relaxed mb-4 line-clamp-3">
              {post.description}
            </p>
            <div className="mt-auto flex items-center gap-2 text-xs text-neutral-400">
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              <span>·</span>
              <span>{post.readingMinutes}분 읽기</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
