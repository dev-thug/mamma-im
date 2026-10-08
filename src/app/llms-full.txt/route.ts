import { siteConfig } from '@/config/site';
import { getAllPosts, type PostBlock } from '@/content/blog';
import { appDescription, appQuestions } from '@/content/app';

export const dynamic = 'force-static';

function renderBlock(block: PostBlock): string {
  switch (block.type) {
    case 'paragraph': return block.text;
    case 'heading': return `${'#'.repeat(block.level + 1)} ${block.text}`;
    case 'list': return block.items.map((item) => `- ${item}`).join('\n');
    case 'callout': return `> ${block.text}`;
    case 'link': return `[${block.text}](${block.href.startsWith('/') ? siteConfig.url + block.href : block.href})`;
    case 'image': return `![${block.alt}](${siteConfig.url}${block.src})${block.caption ? `\n${block.caption}` : ''}`;
    case 'table': return [block.headers, block.headers.map(() => '---'), ...block.rows].map((row) => `| ${row.map((cell) => cell.replace(/\|/g, '\\|').replace(/\n/g, ' ')).join(' | ')} |`).join('\n');
  }
}

export function GET() {
  const questions = appQuestions.map((item) => `## ${item.question}\n\n${item.answer}\n\n원문: ${siteConfig.url}${item.href}`).join('\n\n');
  const posts = getAllPosts().map((post) => `## ${post.title}\n\n원문: ${siteConfig.url}/blog/${post.slug}\n게시: ${post.publishedAt}\n최종 내용 수정: ${post.updatedAt ?? post.publishedAt}\n작성·편집: 맘마 편집팀 (${siteConfig.url}/team#editorial-policy)\n\n${post.content.map(renderBlock).join('\n\n')}`).join('\n\n---\n\n');
  const body = `# ${siteConfig.nameWithEn} 공개 정보\n\n${appDescription}\n\n운영: ${siteConfig.company}\n공식 사이트: ${siteConfig.url}/\nApp Store: ${siteConfig.appStoreUrl}\nGoogle Play: ${siteConfig.playStoreUrl}\n문의: ${siteConfig.email}\n\n이 파일은 공개 웹페이지의 보조 텍스트입니다. 원문 링크를 함께 확인하세요. 건강 정보와 AI 답변은 의료진의 진단·처방을 대신하지 않습니다.\n\n${questions}\n\n# 블로그\n\n${posts}\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } });
}
