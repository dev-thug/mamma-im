import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/content/blog";
import { siteConfig } from "@/config/site";
import { baseOpenGraph } from "@/lib/seo";
import PostContent from "@/components/blog/PostContent";
import TrackedStoreLink from "@/components/TrackedStoreLink";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const url = `${siteConfig.url}/blog/${post.slug}`;

  return {
    title: `${post.title} | ${siteConfig.name}`,
    description: post.description,
    keywords: post.keywords,
    alternates: {
      canonical: url,
      languages: { ko: url },
    },
    openGraph: {
      ...baseOpenGraph,
      title: post.title,
      description: post.description,
      type: "article",
      url,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      // og:image / twitter:image는 opengraph-image.tsx가 글마다 생성합니다. images 키를 넣으면 생성 이미지가 적용되지 않습니다.
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(slug);
  const url = `${siteConfig.url}/blog/${post.slug}`;
  const articleImages = post.content.filter((block) => block.type === "image").map((block) => `${siteConfig.url}${block.src}`);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}/#article`,
    headline: post.title,
    inLanguage: "ko",
    image: articleImages.length ? articleImages : [`${url}/opengraph-image`],
    isPartOf: { "@id": `${siteConfig.url}/#website` },
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: {
      "@type": "Organization",
      "@id": `${siteConfig.url}/team#editorial-policy`,
      name: "맘마 편집팀",
      url: `${siteConfig.url}/team#editorial-policy`,
    },
    publisher: {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organization`,
      name: siteConfig.company,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "홈", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "블로그", item: `${siteConfig.url}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Link
        href="/blog"
        className="inline-flex items-center gap-1 text-sm text-neutral-500 hover:text-neutral-900 transition-colors mb-8"
      >
        ← 블로그 목록
      </Link>

      <span
        className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4"
        style={{ background: "var(--primary-50)", color: "var(--primary-500)" }}
      >
        {post.category}
      </span>

      <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 leading-tight mb-4">
        {post.title}
      </h1>

      <div className="flex flex-wrap items-center gap-2 text-sm text-neutral-500 mb-5">
        <span>게시 <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time></span>
        {post.updatedAt && post.updatedAt !== post.publishedAt && <span>· 수정 <time dateTime={post.updatedAt}>{formatDate(post.updatedAt)}</time></span>}
        <span>·</span>
        <span>{post.readingMinutes}분 읽기</span>
        <span>·</span>
        <Link href="/team#editorial-policy" className="underline underline-offset-4">작성·편집: 맘마 편집팀</Link>
      </div>

      <nav aria-label="글 목차" className="mb-10 rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
        <p className="mb-3 font-semibold text-neutral-900">이 글에서 확인할 내용</p>
        <ul className="space-y-2 text-sm text-neutral-600">
          {post.content.map((block, index) => block.type === "heading" && block.level === 2 ? (
            <li key={index}><a href={`#section-${index}`} className="underline underline-offset-4 hover:text-primary-600">{block.text}</a></li>
          ) : null)}
        </ul>
      </nav>
      <PostContent blocks={post.content} />
      <aside className="mt-10 border-t border-neutral-200 pt-5 text-sm leading-relaxed text-neutral-500" aria-label="편집 안내">
        맘마 운영사가 제공하는 육아 정보입니다. 건강 관련 내용은 일반적인 참고 자료이며 의료진의 진단·처방을 대신하지 않습니다. 출처가 있는 글은 본문의 원문 링크를 함께 확인해 주세요.
        <Link href="/contact" className="ml-1 underline underline-offset-4">내용 오류·수정 요청</Link>
      </aside>

      {/* 본문 끝 도달 — 아래 CTA·관련 글까지 포함하는 scroll_depth 100%와 달리 '끝까지 읽음'만 잽니다 */}
      <div
        aria-hidden="true"
        data-ga-view="article_complete"
        data-ga-p-post_slug={post.slug}
        className="h-px"
      />

      <div
        className="mt-12 rounded-2xl p-8 text-center"
        style={{ background: "var(--primary-50)" }}
      >
        <p className="text-neutral-800 font-semibold mb-1">
          수유·수면·발달 기록, 이제 맘마와 함께 하세요
        </p>
        <p className="text-sm text-neutral-500 mb-5">
          기록에 답하는 AI 맘마톡까지, 하나의 앱에서 관리할 수 있어요.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <TrackedStoreLink
            href={siteConfig.appStoreUrl}
            store="ios"
            placement="blog_cta"
            className="px-6 py-3 rounded-2xl text-white font-semibold text-sm transition-opacity hover:opacity-85"
            style={{ background: "#000" }}
            aria-label="App Store에서 맘마 다운로드"
          >
            App Store에서 다운로드
          </TrackedStoreLink>
          <TrackedStoreLink
            href={siteConfig.playStoreUrl}
            store="android"
            placement="blog_cta"
            className="px-6 py-3 rounded-2xl text-white font-semibold text-sm transition-opacity hover:opacity-85"
            style={{ background: "#000" }}
            aria-label="Google Play에서 맘마 다운로드"
          >
            Google Play에서 다운로드
          </TrackedStoreLink>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-14">
          <h2 className="text-xl font-bold text-neutral-900 mb-5">함께 보면 좋은 글</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {related.map((r, index) => (
              <Link
                key={r.slug}
                href={`/blog/${r.slug}`}
                data-ga-event="blog_card_click"
                data-ga-p-post_slug={r.slug}
                data-ga-p-list_position={index + 1}
                data-ga-p-link_location="blog_post"
                className="group rounded-2xl border border-neutral-100 p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
              >
                <h3 className="font-bold text-neutral-900 group-hover:text-primary-500 transition-colors mb-1">
                  {r.title}
                </h3>
                <p className="text-sm text-neutral-500 line-clamp-2">{r.description}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
