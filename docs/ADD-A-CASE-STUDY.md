# Adding a case study

Build Bible 15.3 asks that you be able to publish a case study yourself, without
a developer, and that the procedure be written down. This is it.

Nothing here needs you to understand Astro. You are editing two text files and
adding some pictures.

> **Why this document exists.** 15.3 calls this the item people skip. If
> publishing a case study needs a developer, case studies stop getting
> published, and within a year the portfolio shows work from the first quarter
> and nothing since. Run through this once, end to end, before Phase 2 is
> signed off. If any step does not work, the template is not finished.

---

## Before you start

Run the intake questionnaire in Appendix B with the client, at or near handover.
Not six months later, when the detail has gone. Allow 45 minutes.

Ask question 16, the one about a metric the client will confirm in writing. It
is the question that compounds: asked at every handover, it gives you a
portfolio of evidenced results in a year instead of qualitative description.

**Get permission in writing before anything is published.** Specifically: the
work, the screenshots, and any named result. A message you can point at later is
enough. Verbal permission is not something you can show anyone.

---

## Step 1. Capture the screenshots

Per 6.7, every image is a real screenshot of real work. No stock photography of
people at laptops, no photographic laptop mockups.

| What | Size | How many |
|---|---|---|
| Desktop screens | 1600 x 1000 | 3 to 5 |
| Phone screens | 780 x 1688 | 2 to 3 |
| One full-page capture | 1600 wide, any height | 1 |

Capture without browser chrome. No address bar, no tabs, no bookmarks.

You need at least four images for block 08. Six is the number the existing four
case studies use.

---

## Step 2. Name and size the files

Put the finished files in `public/img/`.

Name them `<slug>-<what-it-shows>-<width>.webp`, where the slug is the short
lowercase name you will use in the URL. For example, for a client called Torah
Farms with slug `torah-farms`:

```
torah-farms-1280.webp              the hero and the card, 16:9
torah-farms-960.webp   .jpg        card, two sizes, both formats
torah-farms-480.webp   .jpg
torah-farms-home-complete-960.webp the full-page capture
torah-farms-home-phone-780.webp    a phone screen
torah-farms-services-1200.webp     a desktop screen
```

Export everything as WebP at quality 82. Keep each file under 220KB, and the
card images under 150KB.

> ### The one rule you must not break
>
> **If you change what a picture shows, change its filename.**
>
> Never replace a picture under its existing name. A returning visitor holds the
> old file in their browser cache, keyed by that name, and will keep seeing the
> old picture no matter how correct the file on the server is. You will not see
> this yourself, because your own cache was cleared by the deploy. This has
> already happened once on this site.
>
> The build enforces it. `npm run qa` fails if a tracked image changes while
> keeping its name. If you are replacing a whole capture set for a project that
> is already live, see "Recapturing an existing project" at the end.

---

## Step 3. Write the case study

Create `src/content/work/<slug>.md`. Copy an existing one and work through it:
`syndei-embassy.md` is the most complete and has every block filled.

The file is a list of labelled fields. Everything before the second `---` is the
case study; there is no body text after it.

### The fields you must fill

| Field | What it is |
|---|---|
| `client` | The client's name as they write it |
| `descriptor` | One line under the title. What the project was |
| `sector` | For an in-house venture, start it with "In-house venture" |
| `services` | A list, in square brackets |
| `year` | In quotes |
| `live` | The site's URL. Leave the whole line out if the site is down |
| `inHouse` | `true` or `false`. Be honest, 10.4 |
| `order` | The position on `/work/`. Give it the next number |
| `hero` | `/img/<slug>-1280.webp` |
| `heroAlt` | What the hero picture shows, described for someone who cannot see it |
| `lead` | The whole project in three sentences. Sets in italic serif |

### The blocks

Each is optional. **Leave a block out entirely rather than filling it with
placeholder text.** A missing block disappears from the page; a placeholder
ships to a prospect.

| Field | Block | What goes in it |
|---|---|---|
| `brief` | 04 | Who the client is and what they came with |
| `challenge` | 05 | The real problem, and what it was costing. This is what separates a case study from a gallery |
| `strategy` | 06 | What you decided and why, and what you rejected. The block a serious prospect reads most closely |
| `identity` | 07 | Logo, palette, type. Only if you did identity work |
| `shots` | 08 | The screenshots, with alt text and captions |
| `decisions` | 09 | Three to five specific decisions, each with its reason |
| `outcome` | 10 | What changed. Qualitative, unless you have a figure confirmed in writing |
| `quote` | 11 | The approved client quote |

`brief`, `challenge`, `strategy` and `outcome` are lists of paragraphs. Each
paragraph starts with `- >` on its own line and is indented beneath.

### Writing the outcome without numbers

You will usually not have measured data. That is normal and 10.2 covers it. A
specific qualitative statement beats a weak metric and is infinitely better than
an invented one.

Write what the client can now do that they could not before. "Enquiries arrive
with the property reference already stated, because the form asks for it" is
stronger than "improved conversion".

**Never invent a figure.** The `metrics` field exists only for numbers a client
has confirmed in writing.

### Carving a quote

Trim, never assemble. You may cut a long answer down to its strongest
continuous run. You may not stitch separate sentences together, and you may not
turn a bulleted answer into flowing prose. The result would be words the client
did not write, published under their name.

If a client gives you two publishable passages, use one here and one on the
homepage. Do not print the same words twice.

### Blocks you are still waiting on

List them under `pending:`, like this:

```yaml
pending:
  - "10 Outcome: waiting on the client to confirm the booking figure"
```

These show as a note when you run `npm run dev` and never appear on the live
site. When nothing is outstanding, write `pending: []`.

---

## Step 4. Add it to the project list

Open `src/site.ts` and find `PROJECTS`. Copy an existing entry and change it:

```ts
{ slug:'torah-farms', client:'Torah Farms', live:'https://torahfarmsgh.com',
  sector:'Agriculture and real estate', year:'2026', inHouse:false,
  featured:false, caseStudy:true,
  tags:['Web Design','Content'],
  blurb:'One sentence for the card on the work page.' },
```

Two flags decide where it appears:

- `caseStudy: true` gives it a page at `/work/<slug>/` and a card on `/work/`.
- `featured: true` also puts it on the homepage.

**The homepage holds exactly three.** The layout is one wide card with two
beside it, and a fourth breaks it. To feature a new project, set `featured:
false` on one of the current three. That is a one-line change, which is the
point.

If you do feature it, also add a line to the `ALT` list near the top of
`src/pages/index.astro`, describing the card picture.

---

## Step 5. Check it, then publish

```bash
npm run build          # must pass. A broken build blocks the deploy
npm run preview        # in one terminal
npm run qa             # in another
```

`npm run qa` drives a real browser over every page at three widths in both
light and dark, and checks contrast, headings, alt text, tap target sizes,
banned words and glyphs, the contact links, and the image-renaming rule. It
takes a couple of minutes. It must say `ALL CHECKS PASS`.

Then look at the page yourself on a phone. The guards check rules; they cannot
tell you whether the story reads well.

Last, read it against one question from 3.6: **could a competitor put their name
on this without changing a word?** If yes, it is not specific enough yet.

Commit, push, and check the deploy preview before it goes live.

---

## Recapturing an existing project

When you recapture a project that is already published, every new file needs a
new name, including the card images.

The card images are built from a filename stem rather than named directly, so
give the project a new one in `src/site.ts`:

```ts
cardBase:'torah-farms-v2',
```

Then name the new card files `torah-farms-v2-1280.webp`,
`torah-farms-v2-960.webp`, `-960.jpg`, `-480.webp`, `-480.jpg`, point `hero` at
the new 1280 file, and rename the block 08 stills for what they show.

Delete the old files once nothing references them. Check first:

```bash
grep -rn "old-filename.webp" src/
```

---

## If something goes wrong

| What you see | What it means |
|---|---|
| The build fails with a message about a missing field | A required field is absent from the frontmatter. The message names it |
| `qa` says "image replaced in place" | You reused a filename. Rename the file and repoint every reference |
| `qa` says "retired phrase" | A word from the 3.2 retire list reached the copy. It names the word |
| `qa` says "names infrastructure in copy" | The copy names a host, framework, CMS or form handler. Describe what was built instead |
| `qa` says "heading level skipped" | You jumped from one heading size to another without the one between |
| `qa` says "broken img" | A file referenced on the page is not in `public/img/`. The commonest cause is a card set that stops at `-1280`: the cards need `-960` and `-480`, in both `.webp` and `.jpg`. The build does not catch this, because a missing picture is not a broken page. `qa` does |
| The page builds but shows no images | Check the paths in `shots` match the filenames in `public/img/` exactly, including the extension |
