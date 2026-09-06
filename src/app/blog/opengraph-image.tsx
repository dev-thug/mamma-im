import { siteConfig } from "@/config/site";
import { OG_SIZE, renderOgCard } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = `${siteConfig.name} 육아 정보 블로그`;

export default async function OpengraphImage() {
  return renderOgCard({
    badge: "육아 정보 블로그",
    title: "수유·수면·발달 체크까지,\n맘마가 정리한 육아 정보",
    footnote: "육아 기록 앱 맘마",
  });
}
