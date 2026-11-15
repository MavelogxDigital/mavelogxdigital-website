/* CMS config guard. Owner rule, 15 Nov 2026.

   The CMS at /admin/ writes markdown into src/content/insights. Three things
   can drift apart without anyone noticing, and all three publish a broken
   build rather than failing visibly at the moment of the mistake:

   1. A field added to the insights schema in src/content.config.ts and not to
      config.yml. The CMS then cannot set it. If it is required, every entry
      the CMS creates fails the build, and the editor sees a red deploy with no
      explanation of what they did wrong.
   2. A select option in config.yml naming a service or case study slug that no
      longer exists in src/site.ts. The cross-link at the foot of the article
      silently renders nothing, because the lookup is a .find() that returns
      undefined. This is the same failure as the Build Bible naming --purple-lt
      eight days after the token was deleted: a list of names kept by hand,
      next to the thing it describes, with nothing checking the two agree.
   3. A category in a published article that the CMS does not offer. Opening
      that article in the editor and saving would quietly change its category.

   So this compares config.yml against the schema, against site.ts, and against
   the content already on disk. It reads the schema as text rather than
   importing it, because content.config.ts imports astro:content, which only
   resolves inside a build.

   Run with: npm run qa  (or on its own: node scripts/check-cms-config.cjs) */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const root = path.join(__dirname, '..');
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');
const fails = [];
const fail = (m) => fails.push(m);

/* ---- the config itself ------------------------------------------------- */
const CONFIG = 'public/admin/config.yml';
if (!fs.existsSync(path.join(root, CONFIG))) {
  console.error(`${CONFIG} not found. The admin page cannot work without it.`);
  process.exit(1);
}

let cfg;
try { cfg = yaml.load(read(CONFIG)); }
catch (e) { console.error(`${CONFIG} is not valid YAML: ${e.message}`); process.exit(1); }

const col = (cfg.collections || []).find((c) => c.name === 'insights');
if (!col) { console.error(`${CONFIG} has no "insights" collection`); process.exit(1); }

const fieldsByName = new Map((col.fields || []).map((f) => [f.name, f]));

/* The folder the CMS writes into has to be the folder Astro reads from. */
if (!fs.existsSync(path.join(root, col.folder))) {
  fail(`collection folder does not exist: ${col.folder}`);
}

/* Editorial workflow is what makes publishing a pull request, which is what
   makes the guard suite run before anything reaches the live site. Without it
   the CMS commits straight to main and nothing is checked. */
if (cfg.publish_mode !== 'editorial_workflow') {
  fail(`publish_mode is "${cfg.publish_mode}", expected editorial_workflow, ` +
       `without which the CMS commits straight to main and skips every guard`);
}

/* ---- 1. config.yml covers the schema ----------------------------------- */
const schemaSrc = read('src/content.config.ts');
const block = schemaSrc.slice(schemaSrc.indexOf('const insights = defineCollection'));
const body = block.slice(0, block.indexOf('export const collections'));

/* Lines of the shape `name: z.something...`, which is how every field in this
   schema is written. Keys inside nested objects are not used by the insights
   collection, so a flat scan is the whole of it. */
const schemaFields = new Map();
for (const m of body.matchAll(/^\s{4}([a-zA-Z][\w]*)\s*:\s*z\.([\s\S]*?)(?=,\s*$|,\s*\/)/gm)) {
  const [, name, decl] = m;
  const optional = /\.optional\(\)/.test(decl) || /\.default\(/.test(decl);
  schemaFields.set(name, { optional });
}

if (schemaFields.size === 0) {
  fail('could not read any field from the insights schema, so this guard is checking nothing');
}

for (const [name, { optional }] of schemaFields) {
  if (fieldsByName.has(name)) continue;
  if (optional) fail(`schema field "${name}" is optional but absent from ${CONFIG}, so the CMS cannot set it`);
  else fail(`schema field "${name}" is REQUIRED and absent from ${CONFIG}: every entry the CMS creates would fail the build`);
}

/* The reverse: a field the CMS writes that the schema does not allow. Astro's
   content schema is strict, so this fails the build on the next entry. */
for (const name of fieldsByName.keys()) {
  if (name === 'body') continue;                  // markdown body, not frontmatter
  if (!schemaFields.has(name)) fail(`${CONFIG} offers a field the schema does not accept: "${name}"`);
}

/* A schema field that is required must not be optional in the CMS, or an
   editor can save an entry that cannot build. */
for (const [name, { optional }] of schemaFields) {
  const f = fieldsByName.get(name);
  if (f && !optional && f.required === false) {
    fail(`"${name}" is required by the schema but marked required: false in ${CONFIG}`);
  }
}

/* ---- 2. select options point at things that exist ---------------------- */
const siteSrc = read('src/site.ts');
const slugsIn = (text) => new Set([...text.matchAll(/slug\s*:\s*'([^']+)'/g)].map((m) => m[1]));

/* SERVICES and PROJECTS are separate arrays in site.ts. Slice between them so
   a service slug cannot satisfy a case-study option by accident. */
const servicesStart = siteSrc.indexOf('SERVICES');
const projectsStart = siteSrc.indexOf('PROJECTS');
if (servicesStart === -1 || projectsStart === -1) {
  fail('could not locate SERVICES and PROJECTS in src/site.ts, so slug options are unchecked');
} else {
  const serviceSlugs = slugsIn(siteSrc.slice(servicesStart, projectsStart));
  const projectSlugs = slugsIn(siteSrc.slice(projectsStart));

  const optionValues = (f) =>
    (f?.options || []).map((o) => (typeof o === 'string' ? o : o.value));

  for (const v of optionValues(fieldsByName.get('relatedService'))) {
    if (!serviceSlugs.has(v)) fail(`relatedService offers "${v}", which is not a service slug in site.ts`);
  }
  for (const v of optionValues(fieldsByName.get('relatedWork'))) {
    if (!projectSlugs.has(v)) fail(`relatedWork offers "${v}", which is not a case study slug in site.ts`);
  }
}

/* ---- 3. categories already published are offered ----------------------- */
const catField = fieldsByName.get('category');
const catOptions = new Set(
  (catField?.options || []).map((o) => (typeof o === 'string' ? o : o.value)),
);
const dir = path.join(root, col.folder);
if (fs.existsSync(dir) && catOptions.size) {
  for (const file of fs.readdirSync(dir).filter((f) => f.endsWith('.md'))) {
    const m = fs.readFileSync(path.join(dir, file), 'utf8').match(/^category:\s*(.+)$/m);
    if (!m) continue;
    const used = m[1].trim().replace(/^['"]|['"]$/g, '');
    if (!catOptions.has(used)) {
      fail(`${file} has category "${used}", which the CMS does not offer: opening it in the editor would change it`);
    }
  }
}

/* ---- 4. the admin page is not indexable -------------------------------- */
const ADMIN = 'public/admin/index.html';
if (!fs.existsSync(path.join(root, ADMIN))) {
  fail(`${ADMIN} is missing, so /admin/ would 404`);
} else {
  const html = read(ADMIN);
  if (!/name="robots"[^>]*content="[^"]*noindex/.test(html)) {
    fail(`${ADMIN} has no noindex: the editor would be indexable`);
  }
  if (!/unpkg\.com\/@sveltia\/cms/.test(html)) {
    fail(`${ADMIN} does not load the CMS bundle`);
  }
  if (/<script[^>]+@sveltia\/cms[^>]*type="module"/.test(html)) {
    fail(`${ADMIN} loads the CMS as a module, which Sveltia CMS does not support`);
  }
}

/* ---- 5. the backend points at this repository -------------------------- */
const expectedRepo = 'MavelogxDigital/mavelogxdigital-website';
if (cfg.backend?.name !== 'github') fail(`backend is "${cfg.backend?.name}", expected github`);
if (cfg.backend?.repo !== expectedRepo) {
  fail(`backend.repo is "${cfg.backend?.repo}", expected ${expectedRepo}`);
}

console.log(
  `cms config: ${schemaFields.size} schema fields, ${fieldsByName.size} CMS fields, ` +
  `${catOptions.size} categories, slug options checked against site.ts`,
);
console.log(fails.length
  ? 'FAILURES (' + fails.length + '):\n' + fails.map((f) => '  ' + f).join('\n')
  : 'cms config: all checks pass');
process.exit(fails.length ? 1 : 0);
