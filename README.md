# MavelogxDigital — Astro rebuild

Phase 0 of the Website Build Bible v2.0. Astro static site, replacing the
single-file `index.html` build.

## Run it

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs to dist/
npm run preview  # serve the built site
```

Needs Node 18.20+ or 20.3+. `npm run build` must pass before you commit —
unlike the old single-file site, a broken build blocks the deploy.

## Netlify

Build command `npm run build`, publish directory `dist`. Everything in
`public/` is copied verbatim, `_redirects` included.

## What is here

```
src/
  site.ts                  nav, services, pillars, process, projects — single source of truth
  styles/global.css        Appendix D tokens, reset, grain overlay, focus ring, motion
  styles/components.css    the 14 components from Section 07, all states from 6.8
  layouts/BaseLayout.astro per-page metadata (11.1), hash redirect (5.3), reveal observer
  components/              13 .astro components (Buttons 01–02 are CSS classes)
  pages/styleguide.astro   Phase 0 acceptance surface — noindex, unlinked
public/
  img/                     optimised WebP + PNG, from the old base64 payload
  _redirects               legacy anchor map (5.3)
  favicon*, og-*           carried over unchanged
```

## Publishing a case study

See **[docs/ADD-A-CASE-STUDY.md](docs/ADD-A-CASE-STUDY.md)**. It assumes no
knowledge of Astro: you edit two text files and add some pictures. Build Bible
15.3 requires that this be possible without a developer.

The current specification is **[docs/BUILD-BIBLE-v2.2.md](docs/BUILD-BIBLE-v2.2.md)**,
which supersedes v2.1 in the sections it reproduces.

## Phase 0 decisions worth knowing

- **Four accents only.** `--steel-blue` and `--orange` are retired (6.1). They
  still exist inside the logo artwork; they are gone from the interface.
- **Purple fails AA for body text** on dark (≈4.0:1). Use `--purple-lt`
  (`#8F8FD0`) for anything under 18.66px. Enforced in `.insight__tag`.
- **Focus ring is `--text-1`, never Coral.** A Coral ring on a Coral button is
  invisible, and Coral is reserved for things that are clickable (6.8).
- **Light sections** use the `.theme-light` class, which re-points the neutral
  tokens only. Accents never change between themes.
- **No budget field** on the contact form (9.6) — it anchors the prospect
  before they understand scope.
- **Project card art**: `plate` prop puts logo art on a light plate, because
  these brands are drawn for light backgrounds and a transparent cut-out loses
  their dark strokes. Screenshots use the default dark media and no plate.

## Decisions on record

- **No analytics.** Deferred by decision (Bible 12.5). No tag, no consent banner,
  and the Privacy Policy's "essential functional cookies only" stays true as
  written. Average proposal value is tracked by hand instead — see Bible 4.3.
- **Torah Farms & Properties is removed**, not withheld. Card, footer link,
  testimonial and case study are all gone (Bible 12.1).

## Still open

- Real 1440×900 screenshots per 6.7 — Phase 2. `placeholder.svg` stands in.
- Phase 2 builds **four** case studies, in `CASE_STUDIES` order: Floks Speaks,
  Syndei Embassy, Mavelogx Enterprise, Mavel's Corner. Homepage Selected Work
  shows the three `FEATURED` ones; Mavel's Corner appears on /work/ only.
- Torah Farms & Properties is withheld from `PROJECTS` while
  torahfarmsgh.com is offline (12.1).
- `logo-mavelogxdigital` and the client logos want SVG sources; the PNGs are
  traced from a flattened raster, and the MavelogxDigital mark has no alpha
  channel, which is why the old site wrapped it in a white pill.
- Testimonials from Floks Speaks and Syndei Embassy are being collected. The
  testimonial section ships with two and is built to take four — ask for a
  confirmable metric in the same conversation (Bible 10.2).
