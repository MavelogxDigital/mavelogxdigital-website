/* Images must get a new filename whenever their content changes.
   Owner rule, 27 Oct 2026. Reusing a name leaves returning visitors
   looking at the old picture out of cache, however correct the file on
   the server is.

   Compares every tracked image against the previous commit. Same path,
   different bytes, is a failure. Renames and new files are fine. */
const {execSync} = require('child_process');

const IMG = /\.(webp|jpg|jpeg|png|avif|gif|svg)$/i;
const run = (c) => execSync(c, {encoding: 'utf8', maxBuffer: 64 * 1024 * 1024});

let base;
try { base = run('git rev-parse HEAD~1').trim(); }
catch { console.log('image-rename check: no previous commit, skipped'); process.exit(0); }

const changed = run(`git diff --name-status ${base} HEAD`)
  .split('\n').filter(Boolean)
  .map((l) => l.split('\t'))
  .filter(([status, path]) => status === 'M' && IMG.test(path || ''));

if (!changed.length) { console.log('image-rename check: no image replaced in place'); process.exit(0); }

console.error('\nIMAGE REPLACED WITHOUT A RENAME:\n');
for (const [, path] of changed) console.error('  ' + path);
console.error(`\n${changed.length} image(s) changed while keeping the same filename.`);
console.error('Returning visitors will keep seeing the old picture from cache.');
console.error('Give the new file a new name and repoint every reference to it.\n');
process.exit(1);
