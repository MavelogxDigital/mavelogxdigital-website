/* Every CSS custom property the Build Bible names must exist in the
   stylesheet. Owner rule, 7 Nov 2026.

   Why this exists. On 30 Oct the palette was resampled from the logo and
   the third accent was renamed from purple to blue. 6.1 (rewritten)
   recorded that. But 6.1 (extended), 6.2 and 8.4 still carried the old
   names and the old hex values, and 6.2 still instructed the reader to
   "use --purple-lt for small text on dark" eight days after that token
   left the system. A build ticket citing 6.1 resolved to two sections
   that disagreed. Nothing caught it, because nothing was looking.

   This is the same shape as 13.5: a statement that was true when it was
   written and went quietly false when something else moved.

   The check keeps no list of retired tokens. A list would go stale the
   same way the bible did, which is the bug rather than the fix. It reads
   what the bible names and what the stylesheet defines, and fails on any
   name the stylesheet does not back.

   Historical mentions are allowed. A section explaining that a token was
   retired or renamed has to be able to say which one, so a mention is
   permitted when "retir" or "renam" appears within two lines of it. */
const fs = require('fs');
const path = require('path');

const BIBLE = path.join(__dirname, '..', 'docs', 'BUILD-BIBLE-v2.2.md');
const STYLES = path.join(__dirname, '..', 'src', 'styles');
const WINDOW = 2;

if (!fs.existsSync(BIBLE)) {
  console.error('bible-token check: cannot find ' + BIBLE);
  process.exit(1);
}

// Tokens the stylesheet actually defines.
const css = fs.readdirSync(STYLES)
  .filter((f) => f.endsWith('.css'))
  .map((f) => fs.readFileSync(path.join(STYLES, f), 'utf8'))
  .join('\n');
const defined = new Set([...css.matchAll(/(--[a-z][a-z0-9-]*)\s*:/gi)].map((m) => m[1]));

if (!defined.size) {
  console.error('bible-token check: no custom properties found in ' + STYLES);
  console.error('That is almost certainly a path problem rather than an empty stylesheet.');
  process.exit(1);
}

/* (?<![\w-]) keeps BEM class names out: the --invert of section--invert is
   not a token. Requiring a letter after -- keeps markdown's --- rules out. */
const TOKEN = /(?<![\w-])(--[a-z][a-z0-9-]*)/gi;
const EXPLAINS = /retir|renam/i;

const lines = fs.readFileSync(BIBLE, 'utf8').split('\n');
const bad = new Map();

lines.forEach((line, i) => {
  const near = lines.slice(Math.max(0, i - WINDOW), i + WINDOW + 1).join('\n');
  if (EXPLAINS.test(near)) return;
  for (const m of line.matchAll(TOKEN)) {
    const tok = m[1];
    if (defined.has(tok)) continue;
    if (!bad.has(tok)) bad.set(tok, []);
    bad.get(tok).push(i + 1);
  }
});

const named = new Set([...lines.join('\n').matchAll(TOKEN)].map((m) => m[1]));

if (!bad.size) {
  console.log(`bible-token check: ${named.size} tokens named, ${defined.size} defined, all resolve`);
  process.exit(0);
}

console.error('\nBIBLE NAMES TOKENS THE STYLESHEET DOES NOT DEFINE:\n');
for (const [tok, where] of [...bad].sort()) {
  console.error(`  ${tok}  at line${where.length > 1 ? 's' : ''} ${where.join(', ')}`);
}
console.error('\nThe bible is the build authority, so a reader following it would');
console.error('write a variable that resolves to nothing. Either the token was');
console.error('renamed and the bible was not updated, or the bible is ahead of the');
console.error('stylesheet. Fix whichever is wrong.');
console.error('\nTo record that a token was retired, say so within two lines of');
console.error('naming it and this check will read it as history rather than an');
console.error('instruction.\n');
process.exit(1);
