#!/usr/bin/env node
/* Share cards for the case studies, Build Bible 11.2.
 *
 * Why this script exists. A case study used to share its hero screenshot
 * directly: WebP, 1280x720. WhatsApp is the primary sharing channel for this
 * studio and it renders WebP unreliably, as does LinkedIn, so a link often
 * arrived with no picture at all. These cards are PNG at 1200x630, the ratio
 * every platform crops to, so nothing is cropped and nothing is dropped.
 *
 * The cards are rendered in Chromium against the studio's own type and
 * palette rather than drawn by hand, so a palette change here is a palette
 * change on the cards. The fonts are vendored in scripts/og-fonts because the
 * build may run without reaching Google Fonts, and a card that silently falls
 * back to system type is off-brand without looking broken.
 *
 * Output lands in public/img/ so it inherits the immutable cache rule in
 * netlify.toml. The size is in the filename: new bytes need a new name (5.5).
 */
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'public', 'img');
const FONTS = path.join(__dirname, 'og-fonts');
const W = 1200, H = 630;

/* Accent per case study, from the studio's four, in build order. The card is
   MavelogxDigital's, not the client's, so the palette is MavelogxDigital's.
   Every one of these clears 4.5:1 on #0B0B0D. */
const ACCENTS = {
  'floks-speaks':       { hex: '#FD4950', name: 'Coral' },
  'syndei-embassy':     { hex: '#FED136', name: 'Amber' },
  'mavelogx-enterprise':{ hex: '#6682F9', name: 'Blue'  },
  'mavels-corner':      { hex: '#2CD4AD', name: 'Teal'  },
};

const b64 = (p) => fs.readFileSync(p).toString('base64');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/* Front matter is read with a narrow reader rather than a YAML dependency:
   only four scalar fields are needed and they are all single-line or folded. */
function readStudy(file) {
  const raw = fs.readFileSync(file, 'utf8');
  const fm = raw.split(/^---\s*$/m)[1] || '';
  const one = (key) => {
    const m = fm.match(new RegExp('^' + key + ':\\s*(.+)$', 'm'));
    return m ? m[1].trim().replace(/^["']|["']$/g, '') : '';
  };
  return {
    slug: path.basename(file, '.md'),
    client: one('client'),
    descriptor: one('descriptor'),
    sector: one('sector'),
    hero: one('hero'),
  };
}

function cardHtml(s, accent, heroDataUri, markDataUri) {
  const font = (file, weight, family) =>
    `@font-face{font-family:'${family}';font-style:normal;font-weight:${weight};` +
    `font-display:block;src:url(data:font/woff2;base64,${b64(path.join(FONTS, file))}) format('woff2')}`;
  return `<!doctype html><html><head><meta charset="utf-8"><style>
${font('plus-jakarta-sans-latin-400-normal.woff2', 400, 'Jakarta')}
${font('plus-jakarta-sans-latin-600-normal.woff2', 600, 'Jakarta')}
${font('plus-jakarta-sans-latin-800-normal.woff2', 800, 'Jakarta')}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:${W}px;height:${H}px;overflow:hidden}
body{background:#0B0B0D;font-family:'Jakarta',sans-serif;-webkit-font-smoothing:antialiased}
.card{position:relative;width:${W}px;height:${H}px;overflow:hidden}
/* A single accent wash behind the screenshot, so the card reads as one object
   rather than a panel glued to a background. */
.wash{position:absolute;right:-180px;top:-200px;width:900px;height:900px;border-radius:50%;
  background:radial-gradient(circle,${accent.hex}1F 0%,${accent.hex}0A 45%,transparent 70%)}
.rule{position:absolute;left:0;top:0;width:100%;height:6px;background:${accent.hex}}
.body{position:absolute;inset:0;padding:56px 0 52px 72px;display:flex;flex-direction:column;
  justify-content:space-between;width:650px}
.lockup{display:flex;align-items:center;gap:13px}
.lockup img{width:40px;height:40px;display:block}
.lockup span{font-weight:800;font-size:25px;letter-spacing:-0.025em;color:#fff}
.eyebrow{font-weight:600;font-size:14px;letter-spacing:0.15em;
  text-transform:uppercase;color:${accent.hex}}
h1{margin-top:14px;font-weight:800;font-size:${s.client.length > 14 ? 54 : 64}px;line-height:1.03;
  letter-spacing:-0.035em;color:#fff;max-width:560px}
p{margin-top:18px;font-weight:400;font-size:20px;line-height:1.45;color:#B6B6BE;max-width:500px}
.foot{font-weight:600;font-size:15px;letter-spacing:0.01em;color:#8A8A93}
.foot b{color:#fff;font-weight:600}
/* The screenshot bleeds off the right and bottom edges. A card that stops
   short of its own edges looks like a slide; bleeding reads as a window. */
/* The screenshot is never cropped horizontally. Cropping it cut words in half
   at the panel edge, which reads as a broken render rather than a frame. */
.shot{position:absolute;right:-150px;top:116px;width:740px;border-radius:16px;
  overflow:hidden;box-shadow:0 52px 110px rgba(0,0,0,.66);border:1px solid rgba(255,255,255,.11)}
.shot img{width:100%;display:block}
.veil{position:absolute;inset:0;
  background:linear-gradient(96deg,#0B0B0D 0%,#0B0B0D 38%,#0B0B0DD9 50%,transparent 66%)}
</style></head><body><div class="card">
  <div class="wash"></div>
  <div class="shot"><img src="${heroDataUri}" alt=""></div>
  <div class="veil"></div>
  <div class="rule"></div>
  <div class="body">
    <div class="lockup"><img src="${markDataUri}" alt=""><span>MavelogxDigital</span></div>
    <div class="mid">
      <div class="eyebrow">${esc(s.sector)}</div>
      <h1>${esc(s.client)}</h1>
      <p>${esc(s.descriptor)}</p>
    </div>
    <div class="foot">Case study&nbsp;&nbsp;&middot;&nbsp;&nbsp;<b>mavelogxdigital.com</b></div>
  </div>
</div></body></html>`;
}

(async () => {
  const dir = path.join(ROOT, 'src', 'content', 'work');
  const studies = fs.readdirSync(dir).filter(f => f.endsWith('.md')).map(f => readStudy(path.join(dir, f)));
  const markPath = path.join(ROOT, 'public', 'img', 'mark-petals-128.webp');
  const mark = 'data:image/webp;base64,' + b64(markPath);

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
  const written = [];

  for (const s of studies) {
    const accent = ACCENTS[s.slug];
    if (!accent) { console.error(`no accent mapped for ${s.slug}`); process.exitCode = 1; continue; }
    const heroPath = path.join(ROOT, 'public', s.hero.replace(/^\//, ''));
    if (!fs.existsSync(heroPath)) { console.error(`missing hero for ${s.slug}: ${s.hero}`); process.exitCode = 1; continue; }
    const hero = 'data:image/webp;base64,' + b64(heroPath);

    await page.setContent(cardHtml(s, accent, hero, mark), { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    const out = path.join(OUT, `og-${s.slug}-1200x630.png`);
    await page.screenshot({ path: out, type: 'png' });
    written.push(`${path.basename(out)}  ${accent.name}`);
  }

  await browser.close();
  console.log(`og cards: ${written.length} written`);
  written.forEach(w => console.log('  ' + w));
})();
