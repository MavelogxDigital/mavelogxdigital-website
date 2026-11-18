/* Lighthouse runner. Measures the built site so optimisation is driven by
   numbers rather than by guesses about what is slow.

   Needs the preview server running:
     npm run build && npm run preview &
     node scripts/lighthouse.cjs                 # the default route set
     node scripts/lighthouse.cjs / /work/        # specific routes
     node scripts/lighthouse.cjs --json          # also write full reports

   Reports go to .lighthouse/ (gitignored) so a run can be read in detail
   without re-running it.

   A caveat worth keeping in mind when reading the output: this measures a
   local preview server, not production. Compression, CDN edge caching and
   real network latency are not represented, so the absolute performance score
   is pessimistic in some ways and optimistic in others. What it measures
   reliably is the things we control in the repository: what is in the
   document, how much of it, when it loads, and whether it shifts. Accessibility,
   best practices and SEO are environment-independent and can be read directly. */

const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const DEFAULT_ROUTES = [
  '/',
  '/work/',
  '/work/syndei-embassy/',
  '/insights/',
  '/services/',
  '/about/',
  '/contact/',
];

const args = process.argv.slice(2);
const writeJson = args.includes('--json');
const routes = args.filter((a) => !a.startsWith('--'));
const ROUTES = routes.length ? routes : DEFAULT_ROUTES;
const BASE = process.env.LH_BASE || 'http://localhost:4321';
const PORT = 9222;
const OUT = path.join(__dirname, '..', '.lighthouse');

const pct = (v) => (v == null ? '  -' : String(Math.round(v * 100)).padStart(3));

(async () => {
  const lighthouse = (await import('lighthouse')).default;
  const desktopConfig = (await import('lighthouse/core/config/desktop-config.js')).default;

  const browser = await chromium.launch({ args: [`--remote-debugging-port=${PORT}`] });
  if (writeJson) fs.mkdirSync(OUT, { recursive: true });

  const rows = [];
  console.log(
    'route'.padEnd(26) + 'form'.padEnd(9) +
    'perf a11y  bp  seo   LCP       CLS     TBT',
  );
  console.log('-'.repeat(84));

  for (const route of ROUTES) {
    for (const form of ['mobile', 'desktop']) {
      const result = await lighthouse(
        BASE + route,
        { port: PORT, output: 'json', logLevel: 'error' },
        form === 'desktop' ? desktopConfig : undefined,
      );
      const { categories: c, audits: a } = result.lhr;
      rows.push({ route, form, lhr: result.lhr });

      console.log(
        route.padEnd(26) + form.padEnd(9) +
        pct(c.performance.score) + ' ' +
        pct(c.accessibility.score) + ' ' +
        pct(c['best-practices'].score) + ' ' +
        pct(c.seo.score) + '   ' +
        (a['largest-contentful-paint']?.displayValue || '-').padEnd(10) +
        (a['cumulative-layout-shift']?.displayValue || '-').padEnd(8) +
        (a['total-blocking-time']?.displayValue || '-'),
      );

      if (writeJson) {
        const name = (route === '/' ? 'home' : route.replace(/^\/|\/$/g, '').replace(/\//g, '-'));
        fs.writeFileSync(path.join(OUT, `${name}.${form}.json`), JSON.stringify(result.lhr));
      }
    }
  }

  await browser.close();

  /* Everything scored below 1 on any page, so the output says what to fix
     rather than only how it did. Performance opportunities are listed with
     their estimated saving; the other categories list the failing audit. */
  const seen = new Map();
  for (const { route, form, lhr } of rows) {
    for (const [id, audit] of Object.entries(lhr.audits)) {
      if (audit.score === null || audit.score >= 1) continue;
      if (audit.scoreDisplayMode === 'notApplicable' || audit.scoreDisplayMode === 'manual') continue;
      const ms = audit.details?.overallSavingsMs || 0;
      const key = id;
      const prev = seen.get(key) || { title: audit.title, ms: 0, where: new Set() };
      prev.ms = Math.max(prev.ms, ms);
      prev.where.add(`${route} ${form}`);
      seen.set(key, prev);
    }
  }

  console.log('\nFailing or imperfect audits, worst estimated saving first:\n');
  [...seen.entries()]
    .sort((a, b) => b[1].ms - a[1].ms)
    .forEach(([id, v]) => {
      const saving = v.ms ? `${Math.round(v.ms)}ms` : '';
      console.log(
        `  ${id.padEnd(38)} ${saving.padStart(7)}  ${v.title.slice(0, 60)}  [${v.where.size} page/form]`,
      );
    });
})().catch((e) => {
  console.error('lighthouse run failed:', e.message);
  process.exit(1);
});
