import { ImageResponse } from "next/og";
import { getAllPosts, getPostBySlug } from "@/content/blog";
import { siteConfig } from "@/config/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${siteConfig.name} 육아 정보 블로그`;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

/**
 * satori(ImageResponse 엔진)는 woff2를 읽지 못해 한글 폰트를 otf/ttf로 따로 공급해야 합니다.
 * 리포 용량을 늘리지 않으려고 빌드 시점에 CDN에서 받아옵니다 — 빌드당 한 번만 호출됩니다.
 */
const FONT_BASE =
  "https://cdn.jsdelivr.net/npm/pretendard@1.3.9/dist/public/static";

async function loadFont(weight: "Bold" | "Regular"): Promise<ArrayBuffer> {
  const res = await fetch(`${FONT_BASE}/Pretendard-${weight}.otf`);
  if (!res.ok) {
    throw new Error(
      `OG 이미지용 Pretendard-${weight} 폰트를 받지 못했습니다 (HTTP ${res.status})`,
    );
  }
  return res.arrayBuffer();
}

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  const [bold, regular] = await Promise.all([
    loadFont("Bold"),
    loadFont("Regular"),
  ]);

  const title = post?.title ?? "육아 정보 블로그";
  const category = post?.category ?? "육아 정보";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#ffffff",
          fontFamily: "Pretendard",
        }}
      >
        {/* 상단 브랜드 바 */}
        <div
          style={{
            display: "flex",
            width: "100%",
            height: 18,
            background: "linear-gradient(90deg, #f43f5e 0%, #e11d48 100%)",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            justifyContent: "space-between",
            padding: "60px 72px 56px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            {/* 카테고리 배지 */}
            <div style={{ display: "flex" }}>
              <div
                style={{
                  display: "flex",
                  background: "#fff1f2",
                  color: "#f43f5e",
                  fontSize: 28,
                  fontWeight: 700,
                  padding: "12px 28px",
                  borderRadius: 999,
                }}
              >
                {category}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                fontSize: 58,
                fontWeight: 700,
                color: "#171717",
                lineHeight: 1.34,
                letterSpacing: "-0.02em",
                marginTop: 36,
              }}
            >
              {title}
            </div>
          </div>

          {/* 하단 브랜드 라인 */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderTop: "2px solid #f5f5f5",
              paddingTop: 32,
            }}
          >
            <div style={{ display: "flex", alignItems: "baseline" }}>
              <div style={{ fontSize: 42, fontWeight: 700, color: "#f43f5e" }}>
                {siteConfig.name}
              </div>
              <div style={{ fontSize: 26, color: "#a3a3a3", marginLeft: 16 }}>
                mamma.im
              </div>
            </div>
            <div style={{ display: "flex", fontSize: 26, color: "#a3a3a3" }}>
              {post ? `${post.readingMinutes}분 읽기` : "육아 기록 앱 맘마"}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Pretendard", data: bold, weight: 700, style: "normal" },
        { name: "Pretendard", data: regular, weight: 400, style: "normal" },
      ],
    },
  );
}
