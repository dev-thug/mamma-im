// Run against a production build or deployed site: node scripts/audit-seo.mjs <origin>
import assert from 'node:assert/strict';

const origin = (process.argv[2] ?? 'https://mamma.im').replace(/\/$/, '');
const canonicalOrigin = 'https://mamma.im';
const failures = [];
const titles = new Set();
const descriptions = new Set();
const stylesheets = new Map();
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;/g, "'");
const text = (s) => decode(s.replace(/<[^>]*>/g, '')).trim();
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map((m) => [m[1], decode(m[2])]));
const sitemap = await fetch(`${origin}/sitemap.xml`).then((r) => { assert.equal(r.status, 200); return r.text(); });
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => decode(m[1]));
assert(urls.length > 0, 'Sitemap must contain pages');
assert.equal(new Set(urls).size, urls.length, 'Duplicate sitemap URLs');

for (const url of urls) {
  const path = new URL(url).pathname;
  try {
    const response = await fetch(`${origin}${path}`, { redirect: 'manual' });
    assert.equal(response.status, 200, 'Indexable URL must return 200 without redirect');
    const html = await response.text();
    assert(!html.includes('pretendardvariable-dynamic-subset'), 'External font stylesheet must not block rendering');
    if (path === '/') {
      for (const match of html.matchAll(/<link\b[^>]*>/g)) {
        const link = attrs(match[0]);
        if (link.rel !== 'stylesheet') continue;
        const cssUrl = new URL(link.href, origin).href;
        if (!stylesheets.has(cssUrl)) stylesheets.set(cssUrl, await fetch(cssUrl).then((r) => r.text()));
        assert(!stylesheets.get(cssUrl).includes('@font-face'), 'Optional font CSS must load after the initial page, outside render-blocking stylesheets');
      }
    }
    const meta = [...html.matchAll(/<meta\b[^>]*>/g)].map((m) => attrs(m[0]));
    const value = (key) => meta.find((m) => m.name === key || m.property === key)?.content;
    const title = text(html.match(/<title>(.*?)<\/title>/s)?.[1] ?? '');
    assert(title && !titles.has(title), 'Missing or duplicate title'); titles.add(title);
    const description = value('description');
    assert(description && !descriptions.has(description), 'Missing or duplicate description'); descriptions.add(description);
    const canonical = [...html.matchAll(/<link\b[^>]*>/g)].map((m) => attrs(m[0])).find((a) => a.rel === 'canonical')?.href;
    assert.equal(new URL(canonical).origin, canonicalOrigin, 'Canonical origin');
    assert.equal(new URL(canonical).pathname, path, 'Self-referencing canonical');
    assert.equal(new URL(value('og:url')).pathname, path, 'Open Graph URL');
    assert(!/noindex/i.test(value('robots') ?? ''), 'Sitemap page must be indexable');
    const headings = [...html.matchAll(/<h1\b[^>]*>(.*?)<\/h1>/gs)].map((m) => text(m[1]));
    assert.equal(headings.length, 1, 'Exactly one H1');
    const schemas = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)].flatMap((m) => {
      const data = JSON.parse(m[1]); return data['@graph'] ?? [data];
    });
    if (path === '/') {
      assert(headings[0].includes('맘마'), 'Home H1 must identify the app');
      const app = schemas.find((s) => s['@type'] === 'SoftwareApplication' || s['@type'] === 'MobileApplication');
      assert(app?.['@id'] && app.publisher?.['@id'], 'App must link to publisher entity');
      assert.equal(app.installUrl?.length, 2, 'Both official store links must be discoverable');
      assert.equal(schemas.filter((s) => s['@type'] === 'WebSite').length, 1, 'Single WebSite entity');
    }
    if (path.startsWith('/blog/')) {
      const article = schemas.find((s) => s['@type'] === 'Article' || s['@type'] === 'BlogPosting');
      assert(article?.author?.url, 'Article author must link to a public identity page');
      assert(article.image?.length, 'Article must identify its representative image');
      assert(html.includes('작성·편집'), 'Visible editorial attribution');
      assert(article.datePublished && article.dateModified, 'Real publication and modification dates');
    }
    // Check every first-party page link; ignore assets, queries and mail/store links.
    for (const match of html.matchAll(/<a\b[^>]*href="([^"]*)"/g)) {
      const link = new URL(decode(match[1]), canonicalOrigin);
      if (link.origin !== canonicalOrigin || link.search || /\.[a-z\d]+$/i.test(link.pathname)) continue;
      assert(urls.some((u) => new URL(u).pathname === link.pathname), `Linked page missing from sitemap: ${link.pathname}`);
    }
  } catch (error) { failures.push(`${path}: ${error.message}`); }
}
for (const failure of failures) console.error(`FAIL ${failure}`);
console.log(`SEO audit: ${urls.length} pages, ${failures.length} failures (${origin})`);
if (failures.length) process.exitCode = 1;
