# MavelogxDigital Website Build Bible, v2.2

**Prepared for** Emmanuel Kofi Avleshie, Founder, MavelogxDigital
**Date** 28 October 2026
**Supersedes** v2.1 (23 October 2026) in the sections reproduced below. Every
section of v2.1 not reproduced here is unchanged and still governs.
**Status** Approved for build
**Branch** `rebuild/astro`, under PR #1. Not merged to `main`.

---

## How to read this version

v2.1 exists as a Word document in the claude.ai Project. This file carries the
sections that have been superseded since it was written, each rewritten in full
rather than annotated. Where this file and the v2.1 document disagree, this file
wins, per 15.1.

The rewritten sections keep their v2.1 numbers, so a build ticket that cites
"5.2" still resolves. One section is new: 13.5, the automated guards.

Nothing here changes the positioning in Section 03, the audiences in Section 04,
the information architecture in 5.1, the type scale in 6.4, the spacing system
in 6.5 or the build sequence in Section 14.

---

## 1.4 (addendum) Version history, v2.2 changes

Twenty-six commits between 24 and 28 October 2026. Each decision below
contradicts something in v2.1 and is recorded here rather than left in a
conversation, per 15.1.

| # | Change | What it supersedes |
|---|---|---|
| 1 | The collapsed menu is a push-down disclosure inside the header, not a slide-in overlay. No focus trap. | Rewrites 5.2. Rewrites the mobile-nav row of 13.1. |
| 2 | Home is a nav item. Six items plus the CTA. | Rewrites 5.2. The ceiling named in 5.1 is now reached, not approached. |
| 3 | The nav collapses below 1000px, not 900px. | Rewrites 5.2. |
| 4 | A full light and dark theme with a visitor-facing toggle, honouring the OS preference until the visitor chooses. | Reverses the Theme row of the 1.4 conflict log and the Technology row of 2.2. |
| 5 | Contrast-safe ink variants, and theme-resolved ink tokens that repoint in any light context. | Extends 6.1. Rewrites the contrast callout in 6.2. |
| 6 | The tagline lockup sets four words in four accents. Documented exception to one-accent-per-section, covering that component and nothing else. | Amends 6.2. New component in Section 07. |
| 7 | The swept brandmark is the second documented exception, and is excluded from the automated contrast check as logotype. | Amends 6.2 and 13.1. |
| 8 | No arrow glyphs anywhere in UI copy. No em dashes. No decorative rule before an eyebrow. Enforced by the build. | Rewrites every CTA label in Section 08, 9.6, Appendix A and components 01 and 03 in Section 07. |
| 9 | Phone and WhatsApp are two separate numbers on two separate channels. The WhatsApp number is never printed. | Rewrites 11.4 contact handling, 9.6, 8.10, Appendix A. Closes and reframes defect 12.2. |
| 10 | Case study copy names what was built, never the plumbing. No repo, stack, host, CMS or form handler in published copy. | New rule in 10.1. Enforced by the build. |
| 11 | A read-aloud player on case studies, articles and legal pages, built on the browser's own speech synthesis. | New block 12 in 10.1. New component in Section 07. |
| 12 | The contact form posts to Formspree, not Netlify Forms. | Rewrites the Backend row of 9.6 and the Netlify Forms line of 11.5. |
| 13 | Case study imagery is WebP only. JPG fallbacks are kept for project cards and the founder portrait. | Narrows 5.5 and 6.7. |
| 14 | An image that changes content must change filename. Enforced by the build. | New rule in 5.5. |
| 15 | The client voice section carries three quotes, no star marks, with the external client leading. | Rewrites 8.7, component 09 in Section 07, and Appendix A section 07. |
| 16 | The Torah Farms quote is withdrawn, not only the project. | Completes the removal begun at 12.1. |
| 17 | The long coral rule on the testimonial is removed. Three shorter vertical rules stay. | Rewrites component 09 in Section 07. |
| 18 | The About stats read six websites shipped and three podcasts built and distributed. | Rewrites the Stats row of 9.3. |
| 19 | Ten industries, four carrying a Proven tag. | Rewrites 9.1 and its callout. |
| 20 | The default tap highlight is removed from every rounded control. | New rule in 6.8. |
| 21 | Podcast building and distribution is shipped work across three ventures, not a Floks Speaks detail. | Amends 10.3. |
| 22 | The automated guards that enforce the above are specified in new section 13.5. | New section. |

### Decisions taken and then reversed

Recorded because 15.1 asks for the reasoning, not only the outcome.

- Two additions were made that had not been asked for, and were reverted whole
  in `c2850a6`. Nothing from them survives in the build.
- A rewrite of the Torah Farms testimonial to read more strongly was declined.
  Publishing words a named client did not say is not a copy decision, and no
  version of it belongs in this document.

---

## 2.2 (revised) What is explicitly not changing

The rebuild is a restructure, not a rebrand. The following stay exactly as they
are. The Technology row is amended: the stack changed at v2.1 and the theme
decision changed at v2.2.

| Element | Decision |
|---|---|
| Tagline | "From Idea To Impact" is retained across the site, social and documents. Its typographic treatment is specified in 6.2 and Section 07. |
| Brand palette | All four core accents (Coral, Amber, Purple, Teal) and the dark base are retained. No new brand hues are introduced. The contrast-safe variants in 6.1 are the same hues at different lightness, not new colours. |
| Typefaces | Plus Jakarta Sans and Cormorant Garamond are both retained. Only their usage rules change. |
| Technology | Astro static build, output as plain HTML, CSS and a few KB of JavaScript. Deployment stays GitHub to Netlify. No WordPress, no CMS, no server runtime. |
| Theme | **Changed at v2.2.** Both themes are fully supported, with a visitor-facing toggle. See 6.1. |
| Hero eyebrow | "AI-Augmented. Strategy-Led. Built to Scale." is retained verbatim. |
| Legal pages | The Privacy Policy and Terms of Service text is unchanged. Both now carry a read-aloud control, per 10.1. |

---

## 5.2 (rewritten) Navigation

One header pattern, used on every page without exception.

| Position | Item | Behaviour |
|---|---|---|
| Left | Brandmark, "MavelogxDigital", swept | Links to `/` on every page. Never links to `#`. |
| Centre | Home | Active state on `/` |
| Centre | Work | Active state when the URL starts `/work` |
| Centre | Services | Active state on `/services` |
| Centre | About | Active state on `/about` |
| Centre | Insights | Active state on `/insights` |
| Centre | Contact | Active state on `/contact` |
| Right | Theme toggle | Icon button, labelled. Switches light and dark. |
| Right | Start a Project | Solid button in `--coral-strong`. Links to `/contact/`. |

Six nav items plus a CTA is the ceiling named in 5.1, and it is now reached. A
seventh item does not get added; something comes out first.

### Header behaviour

- Transparent over the hero on Home only. Solid `--bg` with a 1px `--border`
  bottom rule on every other page.
- On scroll past 80px the background becomes `--nav-scrim` with a 12px backdrop
  blur, over 240ms. The scrim is theme-resolved, so it does not stay dark when
  the site is light.
- Sticky on all pages. Height 64px, rising to 72px from 768px up.
- Below 1000px the centre nav and the header CTA are hidden and the control at
  the right becomes a three-line icon with the visible label "Menu".

### The collapsed menu is a disclosure, not an overlay

**This supersedes the slide-in panel specified in v2.1.** The menu expands
inside the header and pushes the page content down. It does not cover it.

| Decision | Reason |
|---|---|
| Expands in the flow of the header | The content beneath stays visible and reachable. A visitor who opens the menu has not lost the page. |
| Animated on a `grid-template-rows` 0fr to 1fr transition | It is what lets an auto height animate. A fixed max-height either clips the panel or overshoots it. |
| The panel clip is `visibility:hidden` while closed | Keeps the links out of the tab order without removing them from the document. |
| Opening returns the page to the top | Once the header is pinned mid-page, pushing down would otherwise shift content the visitor is reading. |
| **No focus trap** | A trap belongs to a modal. This is a disclosure, and the page behind it is not inert. Trapping focus in a non-modal control is a bug, not an accessibility feature. |
| Escape closes it, and focus returns to the control | Expected behaviour for a disclosure. |
| Any link in the panel closes it | Same-page anchors do not reload, so the panel would otherwise stay open behind the target. |
| The CTA sits directly under Contact inside the panel | Full-width, at the end of the list. Not pinned to the bottom of the viewport, which a push-down panel does not have. |

The control is a `<button>` carrying `aria-expanded` and `aria-controls`. It is
never a `<div>`.

---

## 6.1 (extended) Colour

The four core accents and the two neutral sets are unchanged from v2.1. Two
additions.

### Contrast-safe variants

The four accents were validated as text on dark only. They fail in two other
situations: as a fill behind white text, and as text on a light ground. These
variants are the same hues at a different lightness, and they exist so that no
component has to invent a value.

| Token | Hex | Why it exists |
|---|---|---|
| `--coral-strong` | `#E12C43` | Button fill. White on raw Coral is 3.39:1, below AA. White on this is 4.52:1. |
| `--amber-ink` | `#BF7C09` | Amber as large text on a light ground: 3.08:1. |
| `--teal-ink` | `#267C68` | Teal as text on a light ground: 4.51:1 on `#F2F2F4`. Raw Teal there is 2.20:1. |
| `--purple-ink` | `#6565BE` | Purple as text on a light ground: 4.52:1 on `#F2F2F4`. |

### Theme-resolved ink tokens

`--teal-text`, `--amber-text` and `--purple-text` point at the raw accent in a
dark context and at the ink variant in any light one. Light contexts are the
light theme, the OS light preference before the visitor has chosen, and any
`.section--invert` band inside a dark page.

**A component never writes a raw accent where text sits on a ground that can
change.** It writes the `-text` token and lets the stylesheet resolve it. This
is what makes the light-break rhythm of Section 08 survive in both themes
instead of collapsing into the page.

### The theme toggle

v2.0 decided dark-dominant with two light break sections, and rejected a full
second theme on the grounds that it doubles the token and QA surface. That
reasoning held until the ink tokens above existed. With them, the second theme
is a repointing of six neutrals and three inks, and the QA surface is covered by
13.5, which runs every route in both.

The toggle honours the OS preference until the visitor chooses for themselves,
after which the choice persists.

---

## 6.2 (rewritten) Colour rules

- Maximum one accent per section, outside the two documented exceptions below.
  A section may use its assigned accent plus neutrals.
- `--coral-strong` is the only colour permitted on a solid button. Amber, Purple
  and Teal appear as text, rules, icons, numerals and borders only.
- No gradient uses more than two stops outside the exceptions, and both stops
  come from the same accent family or run accent to transparent.
- No accent is used as a large background fill. Accents are 1 to 10 per cent of
  a section's surface, never 50.
- Steel Blue and Orange are removed from the stylesheet entirely.
- Text whose ground can change writes a `-text` token, never a raw accent.

### The two documented exceptions

Both are logotype. Neither is a precedent for anything else, and both are named
in the stylesheet so a later reader can see they were deliberate.

**1. The swept brandmark (`.sweep`).** The gradient sweep across the wordmark is
the only place the two retired accents still appear, and the only multi-hue
gradient on the site. It is excluded from the automated contrast check in 13.5,
because it is a logotype treatment rather than body text, which is the same
exemption WCAG 1.4.3 grants.

**2. The tagline lockup.** Four words in four accents, one per word, in the
order of the four-petal mark in the brand guidelines. Two constraints on it are
not negotiable:

- **Never set below 24px.** Purple is the floor and is AA for large text only in
  both themes, so the clamp minimum is 28px.
- **Never hard-code the raw accents in it.** Amber and Teal at full strength are
  1.91:1 and 2.20:1 on a light ground, both well below AA. The words read
  `--amber-text` and `--teal-text`.

The lockup holds one line at every width. If it wraps, the size is wrong, not
the breakpoint.

### Contrast is a requirement, not a preference

Coral on `--bg-d` is roughly 5.1:1, Teal 8.4:1 and Amber 10.2:1, all passing AA
for normal text. Purple on `--bg-d` is roughly 4.0:1 and **fails** AA for body
text under 18.66px: use `--purple-lt` (5.6:1) for small text on dark, which is
what `--purple-text` already resolves to. Every pair is verified by 13.5 on
every route in both themes rather than trusted from this table.

---

## 6.8 (addendum) Interaction states

Everything in v2.1 stands. One addition.

**Remove the default tap highlight.** Chrome on Android paints a square flash
behind a tapped control and ignores the border radius doing it, so a pill button
flashes as a rectangle. `-webkit-tap-highlight-color: transparent` on every
interactive element, with a real `:active` state defined in its place. A control
with the highlight removed and no `:active` state is worse than leaving the
default alone, so the two always ship together.

---

## 5.5 (addendum) Image rules

The base64 retirement and the export specification in v2.1 stand. Two changes.

### Format

| Where | Format |
|---|---|
| Case study hero and inline captures | WebP only |
| Project card thumbnails | WebP with a JPG fallback in `<picture>` |
| Founder portrait | WebP with a JPG fallback in `<picture>` |
| Logos and marks | SVG where a vector original exists, otherwise WebP with a PNG fallback |

v2.1 required a JPG fallback in every case. Twenty-six of them were never
referenced by any `<picture>` element and were deleted, which removed 3.3MB from
the repo. The fallbacks that remain are the ones actually wired up.

### Renaming is mandatory when content changes

**An image that changes content gets a new filename.** Never replace a picture
under its existing name.

A returning visitor holds the old file in cache, keyed by name. Replacing the
bytes and keeping the name leaves them looking at the old picture however
correct the file on the server is, and the failure is invisible to whoever made
the change, because their own cache was busted by the deploy. This is enforced
by the build, per 13.5.

---

## 7 (amended) Component inventory

Twelve components in v2.1 are unchanged. Three entries are rewritten and two are
added.

| # | Component | Change |
|---|---|---|
| 01 | Button, primary | Fill is `--coral-strong`, not raw Coral. **No trailing glyph.** The optional trailing arrow glyph in v2.1 is removed site-wide. |
| 03 | Eyebrow label | **No decorative rule before the text.** The optional 24px Teal rule in v2.1 is removed. Colour is `--teal-text`. |
| 09 | Testimonial | **The 2px coral left rule is removed.** At 478px it was the longest line on the site and it earned nothing: the serif italic and the attribution already say testimonial. The attribution sits under a 1px `--border` top rule. **No star marks**, rendered or glyph. |
| 15 | Tagline lockup | New. Four words, four accents. Governed by the exception in 6.2. |
| 16 | Read aloud | New. Specified in 10.1 block 12. |

Three vertical rules remain on the site, at 50 to 151px: the blockquote, the key
decision marker and the process connector. They are short enough to read as
markers. The testimonial rule was not.

---

## 8.7 (rewritten) Client testimonials

Three quotes. The ceiling stays at four.

### Layout

- One featured quote in 7 columns, with the other two stacked in 5.
- The external client leads. Felix Lokko of Floks Speaks is the only
  third-party voice in the section, so the two in-house ventures sit beside him
  rather than above him.
- Quote text in Cormorant italic at `--fs-quote`, rising on the featured quote.
- Attribution in Plus Jakarta Sans 600, with the project name as a link in
  `--teal-text`.
- **No star marks.** Removed site-wide. A five-star rating an agency awards
  itself on behalf of a client is not evidence, and rendering it as SVG only
  made it render consistently.
- Section head: eyebrow "Client Voice", H2 "What our clients say."

### The three quotes

| Quote | Attribution |
|---|---|
| Featured | Felix Lokko, Founder and spoken-word artist, Floks Speaks. Carved from his own written answers at intake, using the passage that carries the results. |
| Second | Mavelogx Enterprise, Brand Identity and Web Design. Trimmed to end at "The quality was outstanding", per the v2.1 edit note. |
| Third | Mavel's Corner, Brand Voice and Content Strategy. |

### The Torah Farms quote is withdrawn

v2.1 removed the project at 12.1 and the quote with it. The quote was
subsequently re-added and then withdrawn again on 28 October. It stays out. A
testimonial from a client whose site the agency no longer shows, with no link to
follow, asks the reader to take it on trust and gives them nothing to check.

### Known drift, not yet resolved

The three quotes are written inline in `src/pages/index.astro`. Every other
piece of repeated content on the site is typed data in `src/site.ts`, per 5.4,
and adding a fourth quote is currently a markup edit rather than a data entry.
**Move them to `src/site.ts` before the section reaches four.** Recorded here so
it is not discovered at the point of adding the fourth.

---

## 9.1 (amended) Services, the industries grid

Ten industries, four carrying a Proven tag that links to a real case study. v2.1
specified eight with three proven.

| Industry | Proof |
|---|---|
| Faith & Community | Syndei Embassy |
| Arts & Creative | Floks Speaks |
| Logistics & Procurement | Mavelogx Enterprise |
| Publishing & Media | Mavel's Corner |
| Technology & SaaS | Reach, not evidence |
| E-Commerce & Retail | Reach, not evidence |
| Real Estate & Property | Reach, not evidence |
| Agriculture & Agribusiness | Reach, not evidence |
| Professional Services | Reach, not evidence |
| Health & Wellness | Reach, not evidence |

Four proven out of ten is a better ratio than three of eight, and the four map
onto the four case studies exactly. The six unproven are reach. If a list of ten
ever starts to read as "anyone who will pay", the fix is to cut the unproven
ones, not to add tags.

---

## 9.3 (amended) About, the stats row

| Figure | Label |
|---|---|
| 2026 | Founded |
| 15+ | Years of design practice |
| 2 | Markets served |
| 6 | Websites shipped |
| 3 | Podcasts built and distributed |

v2.1 showed four projects shipped. The real figure is nine: six websites and
three podcasts. They are split across two stats rather than merged into one,
because the podcast work is the strongest material in two of the four case
studies and a single "nine projects" would have hidden it.

Torah Farms counts in the six even though it came off the site when its domain
went offline. These figures state what was done, not what is on display.

Still only verifiable facts. No satisfaction percentages, which is also why the
98 per cent figure on the Mavelogx Enterprise site is not carried into its case
study, per 10.1.

---

## 9.6 (amended) Contact

Everything in v2.1 stands except the three rows below.

| Element | Specification |
|---|---|
| Submit | `.btn--primary`, label "Send Enquiry". **No trailing glyph.** |
| Direct channels | The Canadian line as the voice number, shown as text and wired to a matching `tel:`. A "Chat on WhatsApp" control with no number printed in it. The email address. The two locations. Typical response within one business day. |
| Backend | **Formspree**, not Netlify Forms. The honeypot and the time-to-submit check in 11.5 are unchanged, and still no CAPTCHA. |

---

## 10.1 (amended) The case study template

The eleven blocks in v2.1 are unchanged in order and content. One block is added
and one rule now governs the copy in all of them.

### Block 12, read aloud

A control at the head of the body that reads the case study aloud. Specified
once here and reused on articles and legal pages.

| Decision | Reason |
|---|---|
| Built on the browser's own speech synthesis | No third-party script, no hosted audio file, no recurring cost, nothing to break when a vendor changes terms. It is the only way the feature satisfies the no-dependency rule in 11.4. |
| Reads one block at a time, not the page in one piece | Chrome stops a long utterance after roughly fifteen seconds. Block-by-block survives that, and gives a progress position for free. |
| Prefers an en-GB voice, falling back to any English voice | Matches the written voice of the site. |
| Reads the standfirst before the body | It is the paragraph that frames everything after it. |
| Pause and resume are cancel and restart | The API's own `pause()` and `resume()` are unreliable: Android Chrome frequently ignores `resume()`, and desktop Chrome drops a paused utterance after about fifteen seconds. Resume restarts the current paragraph from its first word. |
| Holds its place through a screen lock | A lock arrives as an interrupted utterance, or as a queue that silently empties. Both are caught, and the reader returns paused at its position rather than reset. |
| Removes itself where the API is absent | A dead button is worse than no button. |
| One player per page | The status region carries a fixed id, and a device allows one speech queue. A second player on the same page is a bug. |

Placed on: case studies, Insights articles, Privacy, Terms. Not on the homepage
or any index page.

### The copy rule: what was built, not what it was built on

**No published copy names a repository, a framework, a host, a CMS or a form
handler.** This applies to every block of every case study, and to the site
generally.

Naming the plumbing tells a prospect nothing they can act on, helps a competitor
read the delivery model, and gives a reconnaissance scan a starting point on a
client's infrastructure. Describe the capability: "the client publishes episodes
without us" rather than the name of the thing that lets them.

This is enforced by the build, per 13.5.

---

## 10.3 (amended) The portfolio

The four projects and their angles are unchanged. One correction.

**Podcast building and distribution is a service line across three ventures**,
not a Floks Speaks detail. Floks Speaks, Syndei Embassy and Mavel's Corner each
have one, built and distributed in-house. It is the strongest material in two of
the four case studies and it is the clearest evidence that the agency does
content and distribution work rather than websites alone.

---

## 11.4 (amended) Contact details

**Phone and WhatsApp are two different numbers on two different channels.**

| Channel | Number | Where it appears |
|---|---|---|
| Voice | The Canadian line | Shown as text, and wired to a matching `tel:` |
| WhatsApp | The Ghanaian line | **Never printed anywhere on the site.** Reachable only through a "Chat on WhatsApp" control |

Both are held in `SITE` in `src/site.ts`. No page writes either by hand.

Two failure modes, both enforced by the build per 13.5:

- A `tel:` link that points at the Ghanaian number. The voice line is Canadian.
- A WhatsApp link with a number printed in its own label. The control says
  "Chat on WhatsApp" and nothing else.

### This closes and reframes defect 12.2

v2.1 recorded a contact-number mismatch: the Canadian number displayed as text
with a `tel:` beneath it that dialled Ghana. v2.1's instruction was to replace
every displayed Canadian number with the Ghanaian one.

**That instruction is superseded.** The Canadian line is a working voice number
and is the correct one to display. The defect was never that the wrong number
was shown, it was that the two channels had been collapsed into one. The fix is
the split above, not a replacement.

The legacy single-file site still carries the v2.1 arrangement.
`legacy/index-hotfix.html` corrects it and is not yet committed to the live
site. Until it is, the live site and this document disagree.

---

## 13.1 (amended) Accessibility checklist

Every item in v2.1 stands except the mobile-nav row, which is replaced.

| Check |
|---|
| Collapsed menu: `aria-expanded` toggles on the control, Escape closes it, focus returns to the control on close, any link in the panel closes it. **No focus trap**: the menu is a disclosure that pushes content down, not a modal, and the page behind it is not inert. |

Two additions:

| Check |
|---|
| Every tapped control has a real `:active` state, since the default tap highlight is removed per 6.8. |
| The swept brandmark is excluded from the automated contrast check as logotype, per 6.2. Nothing else is excluded, and a new exclusion is a decision that comes back to this document. |

---

## 13.5 (new) Automated guards

The rules in this document are only true if something checks them. Six guards
run against a built site before anything is committed.

### Where the logic lives

**This section names each guard and the rule it enforces. It does not restate
the logic.** The scripts are the only place the logic lives, so a change to a
script cannot silently contradict this page. If a guard and this document
disagree about what a rule is, that is a defect in one of them and it gets
resolved here, not worked around.

```
npm run qa          runs both scripts
npm run check:images runs the rename guard alone
```

`scripts/qa.cjs` drives a real browser over every route at three widths in dark
and at 1440 in light, scrolling first so sticky chrome is measured in its
scrolled state. `scripts/check-image-renames.cjs` compares tracked images
against the previous commit.

### What each guard enforces

| Guard | The rule, and where it is specified |
|---|---|
| Contrast | Every text and background pair meets 4.5:1, or 3:1 at large sizes, on every route in both themes. The swept brandmark is excluded as logotype. 6.1, 6.2, 13.1 |
| Structure | One H1 per page, no skipped heading level, `lang="en"`, a skip link, alt on every image, no broken image, width and height on every image, every form control labelled, no empty or `#` href, no JavaScript error. 7.2, 13.1 |
| Target size | No interactive target under 24px, excluding links inline in prose. WCAG 2.2, 13.1 |
| Banned glyphs | No arrow or dash character in visible text. Owner standing rule, recorded at change 8 in 1.4 |
| Retired language | No instance of budget, affordab, price tag, or "without the premium". 3.2, 13.3 |
| Contact wiring | No digits in the label of a `wa.me` link. No `tel:` pointing at the Ghanaian number. 11.4 |
| Infrastructure names | No host, framework, CMS or form handler named in visible copy. 10.1 |
| Image renames | No tracked image modified in place. A rename or a new file is fine. 5.5 |

### Known gap

The guard suite has not been run against the commits made since 24 October.
Playwright's browser download is refused by the proxy in the environment the
work was done in, so the checks have been satisfied by reading the markup and
the stylesheet rather than by executing. **Run `npm run build && npm run preview`
then `npm run qa` locally before this branch merges.** Until that happens, every
claim in this section is a specification rather than a verified result.

---

## Appendix A (amended) Homepage copy deck

Three changes across the deck.

- **No arrow glyphs in any CTA label.** "Start a Project", "Explore Our Work",
  "View case study", "All work", "See all services", "Read our story", "See the
  full process", "All insights". None carries a trailing character.
- **No em dashes** in any body copy. Periods, commas or colons instead. The
  paragraphs in sections 03 and 05 of the v2.1 deck are rewritten accordingly.
- **Section 07, Client Testimonials**, is replaced by the three quotes in 8.7.
  The "Incoming" note about collecting two more is closed: the Floks Speaks
  quote arrived, the Syndei Embassy one is still outstanding, and the ceiling is
  four.

The footer contact line shows the email and the voice number. It does not show
the WhatsApp number, per 11.4.

---

## Appendix F (updated) Open decisions

| Question | Status | Owner | Needed by |
|---|---|---|---|
| SVG logo sources | OPEN. Still extracted from a flattened raster. | Owner | Phase 1 |
| Founder photograph | **RESOLVED.** The warm studio frame, on About. Renamed on replacement, per 5.5. | Closed | Closed |
| Which three articles launch Insights | **RESOLVED.** All three are written and live: the AI-augmented studio, the Canada to Ghana corridor, and positioning before logo. | Closed | Closed |
| Which industries carry a Proven tag | **RESOLVED.** Four of ten, per 9.1. | Closed | Closed |
| Client quotes | IN PROGRESS. Floks Speaks is in. Syndei Embassy is outstanding and needs Prophet AK Lawrence. The permission message is drafted and unsent. | Owner | Phase 2 |
| Mavelogx Enterprise blocks 04 to 07 and 10 | OPEN. Thirteen intake questions are with the owner. In-house, so no block 11. | Owner | Phase 2 |
| Mavel's Corner app screenshots | OPEN. Waiting on the store build. | Owner | Phase 2 |
| The 98 per cent satisfaction figure on mavelogx.com | OPEN. It is not carried into the case study, per 9.3 and 10.1. Whether it stays on the Enterprise site is a separate decision. | Owner | Phase 2 |
| Five swept elements in the footer | OPEN, and asked twice without an answer. Whether five continuously swept elements read as busy, and whether the three footer headings should drop the sweep. | Owner | Phase 5 |
| Testimonials in `site.ts` | OPEN. See the drift note in 8.7. Move them before the section reaches four. | Build | Before quote four |
| Run the guard suite | OPEN. See the known gap in 13.5. | Owner | Before merge |
| Legacy hotfix | OPEN. `legacy/index-hotfix.html` is not committed to the live single-file site, so the live site still shows the v2.1 contact arrangement. | Owner | Immediate |
| Pricing page | OPEN. Not specified here. If added it belongs at `/pricing/`, reached from Services and Contact, never from the homepage hero. | Owner | Post-launch |
| Host form, www or non-www | RESOLVED: non-www. | Closed | Closed |
| Analytics and consent | RESOLVED: deferred. | Closed | Closed |
| Injected vs hard-coded header | RESOLVED: neither. Astro renders it at build time. | Closed | Closed |
| Theme | **REOPENED AND RESOLVED.** Both themes fully supported with a visitor toggle, per 6.1. | Closed | Closed |

---

*MavelogxDigital, Website Build Bible, v2.2, 28 October 2026*
*From Idea To Impact*
