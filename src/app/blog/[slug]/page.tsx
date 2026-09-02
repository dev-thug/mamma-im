import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/content/blog";
import { siteConfig } from "@/config/site";
import PostContent from "@/components/blog/PostContent";

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
      title: post.title,
      description: post.description,
      type: "article",
      url,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: ["/og-image.png"],
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

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: {
      "@type": "Organization",
      name: siteConfig.company,
    },
    publisher: {
      "@type": "Organization",
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

      <div className="flex items-center gap-2 text-sm text-neutral-400 mb-10">
        <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
        <span>·</span>
        <span>{post.readingMinutes}분 읽기</span>
      </div>

      <PostContent blocks={post.content} />

      <div
        className="mt-12 rounded-2xl p-8 text-center"
        style={{ background: "var(--primary-50)" }}
      >
        <p className="text-neutral-800 font-semibold mb-1">
          수유·수면·발달 기록, 이제 맘마와 함께 하세요
        </p>
        <p className="text-sm text-neutral-500 mb-5">
          AI 분석과 놀이지도까지, 하나의 앱에서 관리할 수 있어요.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={siteConfig.appStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-2xl text-white font-semibold text-sm transition-opacity hover:opacity-85"
            style={{ background: "#000" }}
          >
            App Store에서 다운로드
          </a>
          <a
            href={siteConfig.playStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-2xl text-white font-semibold text-sm transition-opacity hover:opacity-85"
            style={{ background: "#000" }}
          >
            Google Play에서 다운로드
          </a>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-14">
          <h2 className="text-xl font-bold text-neutral-900 mb-5">함께 보면 좋은 글</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/blog/${r.slug}`}
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
