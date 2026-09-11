/**
 * IndexNow로 네이버·Bing 등에 URL 추가·변경을 알립니다.
 *
 *   npm run indexnow                   # 운영 sitemap.xml의 모든 URL 제출
 *   npm run indexnow -- <url> [<url>…] # 특정 URL만 제출
 *
 * 배포가 끝나 새 글이 mamma.im에서 실제로 열릴 때 실행하세요.
 * 검색엔진은 운영에 떠 있는 키 파일(public/<KEY>.txt)로 소유를 확인하므로,
 * 키를 바꾸면 그 파일 이름과 내용도 함께 바꿔야 합니다.
 */
const SITE = "https://mamma.im";
const KEY = "17534d8f90495c2b4b04f71c983020c8";
const KEY_LOCATION = `${SITE}/${KEY}.txt`;

/** 네이버는 직접, 나머지 참여 검색엔진(Bing 등)은 api.indexnow.org가 공유합니다. */
const ENDPOINTS = [
  "https://searchadvisor.naver.com/indexnow",
  "https://api.indexnow.org/indexnow",
];

async function sitemapUrls() {
  const res = await fetch(`${SITE}/sitemap.xml`);
  if (!res.ok) throw new Error(`sitemap.xml을 읽지 못했습니다 (${res.status})`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}

async function main() {
  const keyRes = await fetch(KEY_LOCATION);
  const served = keyRes.ok ? (await keyRes.text()).trim() : "";
  if (served !== KEY) {
    throw new Error(
      `운영 키 파일이 없거나 내용이 다릅니다: ${KEY_LOCATION} (${keyRes.status}). 배포 후 다시 실행하세요.`,
    );
  }

  const args = process.argv.slice(2);
  const urlList = args.length > 0 ? args : await sitemapUrls();
  const body = JSON.stringify({
    host: new URL(SITE).host,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList,
  });

  let failed = false;
  for (const endpoint of ENDPOINTS) {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body,
    });
    // 200: 접수 완료, 202: 접수했고 키 확인 대기 중
    const ok = res.status === 200 || res.status === 202;
    if (!ok) failed = true;
    console.log(`${ok ? "OK " : "ERR"} ${res.status} ${endpoint} — URL ${urlList.length}개`);
    if (!ok) console.log(await res.text());
  }

  if (failed) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
