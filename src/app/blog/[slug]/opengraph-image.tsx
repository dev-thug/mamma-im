import { getAllPosts, getPostBySlug } from "@/content/blog";
import { siteConfig } from "@/config/site";
import { OG_SIZE, renderOgCard } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = `${siteConfig.name} 육아 정보 블로그`;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  return renderOgCard({
    badge: post?.category ?? "육아 정보",
    title: post?.title ?? "육아 정보 블로그",
    footnote: post ? `${post.readingMinutes}분 읽기` : "육아 기록 앱 맘마",
  });
}
