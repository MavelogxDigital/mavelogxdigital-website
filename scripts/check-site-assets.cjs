/* Site-level checks against the built output. Owner rule, 30 Oct 2026.

   qa.cjs drives a browser over a hand-maintained list of routes and checks
   what is on each page. That shape cannot catch two whole classes of defect,
   and both reached the site:

   1. A file missing from the site root. site.webmanifest was referenced from
      every page and absent from public/ since the Astro scaffold went up.
      robots.txt never existed. Neither is visible to a per-page check, because
      a missing asset is not a broken page.
   2. A page that exists but was never added to the route list. The list has
      had to be edited by hand three times, and anything not on it is unchecked.

   So this walks dist/ instead. Every page is covered the moment it is built,
   with no list to maintain, and no browser to start.

   Run with: npm run qa  (or on its own: node scripts/check-site-assets.cjs) */

const fs = require('fs');
const path = require('path');

const DIST = path.join(__dirname, '..', 'dist');
const HOST = 'https://mavelogxdigital.com';
const fails = [];
const fail = (m) => fails.push(m);

if (!fs.existsSync(DIST)) {
  console.error('dist/ not found. Run npm run build first.');
  process.exit(1);
}

/* ---- every html page in the build, however it got there ---------------- */
const pages = [];
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith('.html')) pages.push(p);
  }
})(DIST);

const route = (f) =>
  '/' + path.relative(DIST, f).split(path.sep).join('/').replace(/index\.html$/, '');

const read = (f) => fs.readFileSync(f, 'utf8');
const exists = (rel) => fs.existsSync(path.join(DIST, rel.replace(/^\//, '')));

/* ---- 1. the files 13.4 requires at the root ---------------------------- */
for (const f of ['robots.txt', 'sitemap-index.xml', 'site.webmanifest',
                 '404.html', 'favicon.ico']) {
  if (!exists(f)) fail(`missing from the site root: /${f}`);
}

/* ---- 2. robots points at a sitemap that is really there ---------------- */
if (exists('robots.txt')) {
  const robots = read(path.join(DIST, 'robots.txt'));
  const m = robots.match(/Sitemap:\s*(\S+)/i);
  if (!m) fail('robots.txt does not declare a Sitemap (11.3)');
  else {
    if (!m[1].startsWith(HOST)) fail(`robots.txt sitemap is not in the canonical host form: ${m[1]}`);
    const rel = m[1].replace(HOST, '');
    if (!exists(rel)) fail(`robots.txt points at a sitemap that does not exist: ${rel}`);
  }
}

/* ---- 3. the manifest parses, and its icons resolve --------------------- */
if (exists('site.webmanifest')) {
  try {
    const man = JSON.parse(read(path.join(DIST, 'site.webmanifest')));
    for (const icon of man.icons || []) {
      if (!exists(icon.src)) fail(`site.webmanifest lists an icon that does not exist: ${icon.src}`);
    }
    if (!man.name) fail('site.webmanifest has no name');
    if (/[—–]/.test(JSON.stringify(man))) fail('site.webmanifest contains an em or en dash');
  } catch (e) {
    fail(`site.webmanifest is not valid JSON: ${e.message}`);
  }
}

/* ---- 4. the sitemap lists real pages, and nothing marked noindex ------- */
const sitemapFile = fs.readdirSync(DIST).find((f) => /^sitemap-\d+\.xml$/.test(f));
const listed = new Set();
if (sitemapFile) {
  const xml = read(path.join(DIST, sitemapFile));
  for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    const rel = m[1].replace(HOST, '');
    listed.add(rel);
    if (!exists(rel) && !exists(rel + 'index.html')) {
      fail(`sitemap lists a URL with no page behind it: ${rel}`);
    }
  }
}

/* ---- 5. per page -------------------------------------------------------
   Written as rules about what a page must carry, not as a list of pages, so
   a new page is checked the moment it exists. */
for (const file of pages) {
  const r = route(file);
  const h = read(file);
  const noindex = /name="robots"[^>]*content="[^"]*noindex/.test(h);

  // noindex and sitemap are a contradiction in either direction
  if (noindex && listed.has(r)) fail(`${r}: noindex but listed in the sitemap`);

  // Local assets a page asks for must be in the build. This is the general
  // form of the site.webmanifest defect: a page requesting a file that is not
  // there renders perfectly and quietly 404s in the background.
  const refs = new Set();
  for (const m of h.matchAll(/(?:href|src)="(\/[^"#?]+\.[a-z0-9]{2,5})"/gi)) refs.add(m[1]);
  for (const ref of refs) {
    if (!exists(ref)) fail(`${r}: references a file that is not in the build: ${ref}`);
  }

  if (r === '/404.html' || noindex) continue;   // the rest is for real pages

  // Structured data (11.1). The rebuild shipped with none at all, on any page,
  // and nothing noticed for six days.
  const ld = [...h.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
  if (ld.length === 0) { fail(`${r}: no JSON-LD (11.1)`); continue; }
  if (ld.length > 1) { fail(`${r}: ${ld.length} JSON-LD blocks, expected one`); continue; }

  let data;
  try { data = JSON.parse(ld[0][1]); }
  catch (e) { fail(`${r}: JSON-LD is not valid JSON: ${e.message}`); continue; }

  const graph = data['@graph'] || [data];
  const types = graph.map((g) => g['@type']);
  const has = (t) => types.includes(t);

  if (!has('Organization')) fail(`${r}: JSON-LD has no Organization`);
  if (!has('WebSite'))      fail(`${r}: JSON-LD has no WebSite`);

  // 11.1 asks for a trail on every child page.
  if (r !== '/' && !has('BreadcrumbList')) fail(`${r}: no BreadcrumbList (11.1)`);

  // The entity a page type is supposed to carry.
  if (/^\/work\/[^/]+\/$/.test(r)     && !has('CreativeWork')) fail(`${r}: case study has no CreativeWork (11.1)`);
  if (/^\/insights\/[^/]+\/$/.test(r) && !has('Article'))      fail(`${r}: article has no Article (11.1)`);
  if (r === '/services/'              && !has('Service'))      fail(`${r}: services page has no Service (11.1)`);

  // The split in 11.4, in machine-readable form. The previous graph named the
  // Ghanaian WhatsApp line as the business telephone.
  const org = graph.find((g) => g['@type'] === 'Organization');
  if (org && org.telephone && /233/.test(String(org.telephone))) {
    fail(`${r}: JSON-LD telephone is the WhatsApp number, not the voice line (11.4)`);
  }
}

/* ---- 6. images nothing references ------------------------------------
   The mirror of the dangling-reference check above. Eight logo files sat in
   public/img unreferenced from the day the scaffold went up, roughly half a
   megabyte, and nothing noticed because an unused file breaks nothing. Scoped
   to /img/ because the root holds favicons and share cards, which are
   referenced from places this walk does not read. References are collected
   from the built HTML and CSS, so a path assembled at build time still
   counts. */
const imgDir = path.join(DIST, 'img');
if (fs.existsSync(imgDir)) {
  const referenced = new Set();
  const collect = (text) => {
    for (const m of text.matchAll(/\/img\/([^"'\s,)]+)/g)) referenced.add(m[1]);
  };
  for (const f of pages) collect(read(f));
  (function css(dir) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p2 = path.join(dir, e.name);
      if (e.isDirectory()) css(p2);
      else if (/\.(css|js)$/.test(e.name)) collect(read(p2));
    }
  })(DIST);
  const orphans = fs.readdirSync(imgDir).filter((f) => !referenced.has(f));
  for (const o of orphans) fail(`public/img/${o} is in the build and nothing references it`);
}

/* --- Share cards (11.2) ------------------------------------------------
   Case studies used to share the hero screenshot: WebP at 1280x720. WhatsApp
   is this studio's main sharing channel and renders WebP unreliably, so a
   shared case study often arrived with no picture at all, and nothing in the
   build said so. The browser suite cannot see this: the page looks perfect.
   So the card is checked here, by its real bytes rather than its markup. */
const pngSize = (abs) => {
  const b = fs.readFileSync(abs);
  if (b.length < 24 || b.toString('hex', 0, 8) !== '89504e470d0a1a0a') return null;
  if (b.toString('ascii', 12, 16) !== 'IHDR') return null;
  return { w: b.readUInt32BE(16), h: b.readUInt32BE(20) };
};

for (const f of pages) {
  const r = route(f);
  const html = read(f);
  const src = (html.match(/<meta property="og:image" content="([^"]+)"/) || [])[1];
  if (!src) { fail(`${r}: no og:image`); continue; }
  if (!src.startsWith(HOST)) { fail(`${r}: og:image is not an absolute URL on the canonical host: ${src}`); continue; }
  const rel = src.slice(HOST.length);
  if (!exists(rel)) { fail(`${r}: og:image points at a file that is not in the build: ${rel}`); continue; }
  if (!/\.png$/i.test(rel)) {
    fail(`${r}: og:image is ${path.extname(rel) || 'extensionless'}, not PNG. WhatsApp and LinkedIn render WebP unreliably (11.2): ${rel}`);
    continue;
  }
  const real = pngSize(path.join(DIST, rel.replace(/^\//, '')));
  if (!real) { fail(`${r}: og:image is named .png but is not a PNG: ${rel}`); continue; }
  if (real.w !== 1200 || real.h !== 630) {
    fail(`${r}: og:image is ${real.w}x${real.h}, and a share card must be 1200x630: ${rel}`);
  }
  const dw = (html.match(/<meta property="og:image:width" content="(\d+)"/) || [])[1];
  const dh = (html.match(/<meta property="og:image:height" content="(\d+)"/) || [])[1];
  if (Number(dw) !== real.w || Number(dh) !== real.h) {
    fail(`${r}: og:image declares ${dw}x${dh} but the file is ${real.w}x${real.h}`);
  }
}

/* Each case study needs its own card. Sharing the default one would be a
   silent regression: the markup is valid, the picture is just the wrong one. */
for (const f of pages) {
  const r = route(f);
  const m = r.match(/^\/work\/([^/]+)\/$/);
  if (!m) continue;
  const want = `/img/og-${m[1]}-1200x630.png`;
  if (!read(f).includes(`content="${HOST}${want}"`)) fail(`${r}: does not share its own card, expected ${want}`);
}

/* --- Brand colour drift ------------------------------------------------
   Teal was revalued when the palette was sampled from the logo (6.1), and
   the browser chrome colour kept the superseded value for weeks. Nothing on
   screen looks wrong when this drifts, so it is checked rather than watched. */
{
  const css = fs.readFileSync(path.join(__dirname, '..', 'src', 'styles', 'global.css'), 'utf8');
  const teal = (css.match(/--teal:\s*(#[0-9A-Fa-f]{6})/) || [])[1];
  if (!teal) fail('global.css does not define --teal, so the theme colour cannot be checked');
  else {
    for (const f of pages) {
      const got = (read(f).match(/<meta name="theme-color" content="([^"]+)"/) || [])[1];
      if (!got) { fail(`${route(f)}: no theme-color`); break; }
      if (got.toUpperCase() !== teal.toUpperCase()) {
        fail(`theme-color is ${got} but --teal is ${teal} (6.1)`);
        break;
      }
    }
    const man = JSON.parse(read(path.join(DIST, 'site.webmanifest')));
    if (String(man.theme_color).toUpperCase() !== teal.toUpperCase()) {
      fail(`site.webmanifest theme_color is ${man.theme_color} but --teal is ${teal} (6.1)`);
    }
  }
}

console.log(`site assets: ${pages.length} pages walked, ${listed.size} sitemap URLs`);
if (fails.length) {
  console.error(`\nSITE ASSET FAILURES (${fails.length}):`);
  for (const f of [...new Set(fails)].slice(0, 40)) console.error('  ' + f);
  console.error('');
  process.exit(1);
}
console.log('site assets: all checks pass');
