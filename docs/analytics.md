# 맘마 웹사이트 측정·검색엔진 운영 문서

GA4 측정 ID: `G-39P8T0W65L` · 속성 `mamma.im` (속성 ID `552469899`, 웹 스트림 ID `15619841487`)
코드 위치: `src/lib/analytics.ts`, `src/components/AnalyticsProvider.tsx`, `src/components/GoogleAnalytics.tsx`

---

## 1. 이벤트 목록

`page_view`는 GA4 **향상된 측정**이 담당합니다. Next.js App Router의 클라이언트 라우팅도
브라우저 기록(history) 이벤트로 잡히므로 코드에서 별도로 보내지 않습니다. 직접 보내면 이중 집계됩니다.

| 이벤트 | 언제 | 파라미터 |
| --- | --- | --- |
| `store_click` | App Store / Google Play 링크 클릭 (**핵심 전환, 주요 이벤트**) | `store`, `placement` |
| `scroll_depth` | 25 / 50 / 75 / 100% 도달 시 각 1회 | `percent_scrolled`, `page_type` |
| `section_view` | 랜딩 섹션이 화면의 절반 이상 보일 때 1회 | `section_id`, `page_type` |
| `article_complete` | 블로그 본문 끝(하단 CTA 직전)이 화면에 들어올 때 1회 | `post_slug`, `page_type` |
| `nav_click` | 헤더·푸터 내비게이션 클릭 | `link_label`, `link_location`, `page_type` |
| `blog_card_click` | 블로그 목록/관련글 카드 클릭 | `post_slug`, `list_position`, `link_location`, `page_type` |
| `faq_open` | FAQ 아코디언 펼침 | `faq_question`, `page_type` |
| `contact_click` | `mailto:` 링크 클릭 | `contact_channel`, `page_type` |
| `gallery_interact` | 스크린샷 갤러리 조작 | `method`, `screen_name` |
| `demo_interact` | 히어로 목업 첫 조작 (세션당 1회) | `demo_tab` |
| `mobile_menu_open` | 모바일 햄버거 메뉴 열기 | — |
| `page_not_found` | 404 페이지 노출 | `page_type` |
| `web_vitals` | LCP/CLS/INP/FCP/TTFB 측정 시 | `metric_name`, `metric_value`, `metric_rating`, `metric_id`, `page_type` |

- `page_type` 값: `home` / `blog_index` / `blog_post` / `legal` / `service` / `other` (`pageTypeFromPath()` 참고)
- `section_id` 값: `hero` / `features` / `screenshots` / `download`
- `article_complete`는 하단 CTA·관련 글·푸터까지 포함하는 `scroll_depth` 100%와 달리 "본문을 끝까지 읽음"만 잽니다.
  블로그 글별 완독률 = `article_complete` 수 ÷ 해당 글 `page_view` 수.
- `page_not_found`의 깨진 경로와 유입 경로는 GA4 기본 측정기준 **페이지 경로**, **페이지 리퍼러**로 봅니다.
  404 페이지는 제목이 기본 title과 같아서 `page_view`만으로는 구분할 수 없습니다.
- `metric_id`는 카디널리티가 높아 일부러 맞춤 측정기준으로 등록하지 않았습니다.

향상된 측정이 따로 보내는 `scroll`(90%), `click`(외부 링크), `file_download` 등도 그대로 둡니다.
스토어 링크 클릭은 `store_click`과 향상된 측정의 `click`(outbound)이 둘 다 찍히지만 이벤트 이름이 달라
이중 집계가 아닙니다. 전환은 `store_click`만 봅니다.

---

## 2. 계측을 추가하는 방법

**client 컴포넌트**는 `@/lib/analytics`의 헬퍼를 직접 호출합니다.

**server 컴포넌트**는 `"use client"`로 바꾸지 말고 데이터 속성만 붙이면 됩니다.
`AnalyticsProvider`가 문서 전체에서 이 속성을 읽어 전송합니다.

| 속성 | 동작 |
| --- | --- |
| `data-ga-event="이벤트명"` | 클릭하면 전송 |
| `data-ga-view="이벤트명"` | 화면에 들어오면 1회 전송 (본문 끝 도달, 404 노출 등) |
| `data-ga-p-<파라미터명>="값"` | 위 두 이벤트의 파라미터. 숫자로 읽히면 숫자로 전송(GA4 지표로 집계 가능) |
| `data-ga-section="섹션ID"` | 절반 이상 보이면 `section_view` 1회 |
| `data-ga-nav="영역명"` | 컨테이너 안의 모든 `<a>` 클릭을 `nav_click`으로 전송 |

```tsx
<Link
  href="/blog/parenting-agent-mamma"
  data-ga-event="nav_click"
  data-ga-p-link_label="육아 에이전트 맘마"
  data-ga-p-link_location="home"
>
```

**새 파라미터를 만들면 GA4 관리 → 맞춤 정의에 같은 이름으로 등록해야** 보고서에서 보입니다.
등록하지 않은 파라미터는 수집은 되지만 보고서에서는 `(not set)`으로만 보입니다.

### 주의: `<html data-scroll-behavior="smooth">`를 지우지 마세요

`globals.css`가 `html { scroll-behavior: smooth }`라서, 이 속성이 없으면 Next.js가 페이지 이동 때
맨 위로 약 1초간 부드럽게 스크롤합니다. 그 사이 새 페이지의 `scroll_depth`·`article_complete`가
**이전 페이지의 스크롤 위치로 계산되어** 스크롤 없이 25~100%와 완독이 한꺼번에 기록됩니다
(관련 글 카드로 이동할 때 재현됨). 속성이 있으면 Next.js가 전환 순간에만 smooth를 끕니다.

---

## 3. 로컬·프리뷰에서 검증하기

측정 ID가 코드에 하드코딩되어 있어, `GoogleAnalytics`는 **운영 도메인(mamma.im)에서만**
GA를 로드합니다. `next dev`와 Vercel 프리뷰 배포는 히트를 보내지 않습니다.

DebugView로 확인하려면 브라우저 콘솔에서:

```js
localStorage.setItem('ga_debug', '1')
```

이후 새로고침하면 어느 호스트에서든 `debug_mode`로 계측이 켜집니다. 끌 때는
`localStorage.removeItem('ga_debug')`. 콘솔에서 아래로 지금까지 보낸 이벤트를 볼 수 있습니다.

```js
dataLayer.filter(a => a[0] === 'event').map(a => [a[1], a[2]])
```

---

## 4. GA4 관리 화면 설정

### 맞춤 측정기준 14개 (범위: 이벤트, 2026-09-09 등록)

| 이름 | 매개변수 |
| --- | --- |
| 스토어 | `store` |
| CTA 위치 | `placement` |
| 페이지 유형 | `page_type` |
| 섹션 | `section_id` |
| 링크 라벨 | `link_label` |
| 링크 위치 | `link_location` |
| 블로그 글 | `post_slug` |
| FAQ 질문 | `faq_question` |
| 문의 채널 | `contact_channel` |
| 갤러리 조작 방식 | `method` |
| 갤러리 화면 | `screen_name` |
| 데모 탭 | `demo_tab` |
| 웹 바이털 지표 | `metric_name` |
| 웹 바이털 등급 | `metric_rating` |

### 맞춤 측정항목 3개 (범위: 이벤트, 단위: 일반)

| 이름 | 매개변수 |
| --- | --- |
| 스크롤 도달률 | `percent_scrolled` |
| 목록 순서 | `list_position` |
| 웹 바이털 값 | `metric_value` |

`article_complete`, `page_not_found`는 기존 파라미터(`post_slug`, `page_type`)만 쓰므로 추가 등록이 필요 없습니다.

### 주요 이벤트

- `store_click`

### 데이터 보관

- 이벤트 데이터 **14개월**(무료 속성 최대값), 사용자 데이터 14개월, 새 활동 시 재설정 켜짐
- 영구 보관이 필요하면 BigQuery Export(관리 → 제품 링크 → BigQuery 링크, 결제 계정 필요)

### 향상된 측정

- 모든 항목 켜짐. 페이지 조회 고급 설정의 **"브라우저 방문 기록 이벤트를 토대로 한 페이지 변경사항" 체크됨** —
  클라이언트 라우팅 `page_view`가 여기서 나옵니다. **끄지 마세요.**

### 데이터 필터

- **Developer Traffic** (개발자 트래픽, 제외, **활성** — 2026-09-11): `debug_mode`/`debug_event`가 붙은 이벤트를
  보고서에서 뺍니다. `ga_debug=1` 검증 이벤트는 DebugView에서만 보입니다. 소급 적용되지 않으므로
  필터 활성화(15:54 KST) 전인 2026-09-11 15:29~15:35 KST에 localhost 검증으로 들어간 debug 이벤트
  십수 건(사용자 2명, 소스 direct)은 보고서에 남아 있습니다.
- Internal Traffic (내부 트래픽, 테스트): GA4 기본값. 내부 IP 정의가 없어 아무것도 걸러지지 않습니다.

### 일부러 하지 않은 것

- **Google 신호 데이터**: 주간 사용자 100명대 규모에서 켜면 데이터 임계값이 적용되어 보고서 행이 가려집니다.
- **내부 트래픽 필터**: 사무실·자택 고정 IP가 정해지면 관리 → 데이터 스트림 → 태그 설정 → 내부 트래픽 정의에서 추가.

---

## 5. 검색엔진

### Google Search Console

- 속성: **`sc-domain:mamma.im` (도메인 속성)**, 소유권은 **DNS TXT** 방식으로 확인됨.
  그래서 `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` 메타 태그는 필요 없습니다(비워 두면 태그가 렌더되지 않음).
- GA4 ↔ Search Console 연결 완료 (GA4 보고서 → Search Console 컬렉션).
- 제출된 사이트맵: `https://mamma.im/sitemap.xml` (2026-03-23 제출, Google이 주기적으로 다시 읽음),
  `https://mamma.im/rss.xml` (2026-09-11 제출 — 새 글 발견을 앞당기는 용도)
  - rss.xml은 제출 직후 상태가 "가져올 수 없음"으로 표시됐습니다. Googlebot UA로 200·`application/rss+xml`·
    유효한 XML임을 확인했으므로 첫 처리 전 표시로 보고, 며칠 뒤에도 그대로면 URL 검사로 원인을 확인하세요.
- 2026-09-11 색인 생성 요청: `/blog/parenting-agent-mamma`, `/blog/baby-fever-guide`,
  `/blog/baby-formula-amount-guide` (셋 다 "Google에 아직 알려지지 않은 URL" 상태였음)
- `www.mamma.im`, `http://` 주소가 "리디렉션이 포함된 페이지"로 잡히는 것은 정상입니다(308로 `https://mamma.im` 통일).
- 2026-09-11 색인 현황: 색인 9 / 미색인 9. 미색인 중 리디렉션 4건과 `www.mamma.im/privacy` 중복 1건은 조치 불필요.
  `크롤링됨 - 현재 색인이 생성되지 않음`인 `/blog`, `/blog/monthly-development-checklist`,
  `/blog/parenting-app-comparison-2026`은 크롤링 문제가 아니라 Google이 가치를 낮게 본 신호라서
  색인 요청을 반복하기보다 본문 차별화·내부 링크 보강이 필요합니다.

### 네이버 서치어드바이저

- 소유 확인: HTML 파일 방식 `public/naver3c2eebbec59f0e56eabd7b4968c03078.html` (2026-09-02 추가).
  메타 태그 방식은 쓰지 않습니다.
- **미완료(콘솔에서 직접)**: 요청 → 사이트맵 제출(`https://mamma.im/sitemap.xml`),
  요청 → RSS 제출(`https://mamma.im/rss.xml`), 새 글은 요청 → 웹 페이지 수집.
  naver.com은 Claude의 브라우저 도구에서 안전 제한으로 열리지 않아 대신 처리할 수 없습니다.
- 2026-09-11 기준 네이버 웹문서 검색(`site:mamma.im`)에는 홈만 노출되고 블로그 글은 보이지 않았습니다.

### RSS 피드 — `/rss.xml`

`src/app/rss.xml/route.ts`가 블로그 글 목록으로 RSS 2.0을 만듭니다. 모든 페이지 `<head>`에
`<link rel="alternate" type="application/rss+xml">`가 들어갑니다. 글을 추가하면 자동 반영됩니다.

### IndexNow (네이버·Bing 즉시 색인 요청)

키 파일 `public/17534d8f90495c2b4b04f71c983020c8.txt`가 소유 증명입니다. **새 글을 배포한 뒤** 실행하세요.

```bash
npm run indexnow                                   # sitemap.xml의 모든 URL
npm run indexnow -- https://mamma.im/blog/<slug>   # 특정 URL만
```

네이버(`searchadvisor.naver.com/indexnow`)에는 직접, Bing 등 나머지 참여 검색엔진에는
`api.indexnow.org`로 보냅니다. 200/202면 접수된 것입니다.
제출 기록: 2026-09-11 sitemap 전체 21개 URL — 네이버 200, api.indexnow.org 202. Google은 IndexNow를 지원하지 않으므로
Search Console의 URL 검사 → 색인 생성 요청을 따로 씁니다.

### sitemap.xml의 lastmod

블로그 글은 `updatedAt ?? publishedAt`, `/blog`는 가장 최근 글 날짜를 씁니다. 정적 페이지는
수정일을 추적하지 않아 `lastmod`를 생략합니다 — 빌드 시각을 넣으면 매 배포마다 전체 URL이 "수정됨"으로
보여서 Google이 이 사이트의 lastmod를 신뢰하지 않게 됩니다. 글을 고치면 `updatedAt`을 갱신하세요.
