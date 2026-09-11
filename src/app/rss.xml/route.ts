import { siteConfig } from "@/config/site";
import { getAllPosts } from "@/content/blog";

export const dynamic = "force-static";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * 블로그 RSS 2.0 피드.
 * 네이버 서치어드바이저의 "RSS 제출"과 Search Console 사이트맵 제출에 함께 씁니다.
 * 새 글이 올라오면 검색엔진이 사이트맵보다 이 피드를 더 자주 읽어 갑니다.
 */
export function GET() {
  const posts = getAllPosts();
  const feedUrl = `${siteConfig.url}/rss.xml`;
  const blogUrl = `${siteConfig.url}/blog`;
  const lastBuildDate = new Date(
    Math.max(...posts.map((p) => new Date(p.updatedAt ?? p.publishedAt).getTime())),
  );

  const items = posts
    .map((post) => {
      const url = `${blogUrl}/${post.slug}`;
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(post.description)}</description>
      <category>${escapeXml(post.category)}</category>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(`${siteConfig.name} 블로그`)}</title>
    <link>${blogUrl}</link>
    <description>${escapeXml(siteConfig.description)}</description>
    <language>ko</language>
    <lastBuildDate>${lastBuildDate.toUTCString()}</lastBuildDate>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
