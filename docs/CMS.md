# Insights CMS

A browser editor for `/insights/` at **https://mavelogxdigital.com/admin/**.

Articles stay where they already were: markdown files in `src/content/insights`,
validated by the schema in `src/content.config.ts`. The CMS is a writing surface
over the repository, not a database. Nothing about the site's content lives in a
third party, and anything written in the CMS can equally be written by hand.

---

## Why there is no password

There is no user table and no password in this repository, by design.

Sign-in is your **GitHub account**, protected by whatever two-factor method you
already have on it. There is no separate credential for me to issue, nothing to
leak, and nothing to rotate. A default admin password committed to a public
repository would have been a live exposure, not a formality.

The consequence, stated plainly: **anyone who writes in this CMS needs a GitHub
account with access to the repository.** That is the trade for keeping content in
Git. If a contributor can never have a GitHub account, this is the wrong tool and
a different one is needed.

---

## Roles

Roles are GitHub repository permissions. They are enforced by GitHub, not drawn
in a user interface, so a role cannot be bypassed by someone who knows the URL.

| Role | GitHub permission | What they can do |
|---|---|---|
| **Super admin** — Emmanuel | Admin | Everything. Grants and revokes access, changes branch rules, merges, overrides. |
| **Publisher** | Write, allowed to merge | Writes and edits articles, and publishes them by merging. |
| **Editor** | Write, merge blocked | Writes and edits articles, moves them to Ready. Cannot publish. |
| **Reviewer** | Read or Triage | Reads and comments on an article in review. Cannot edit. |

The difference between Publisher and Editor is a branch rule on `main`. Without
that rule, write access means the ability to publish, and Editor and Publisher
collapse into the same thing.

> **As of 15 November 2026 this table is aspirational, not current.** The
> repository is private and owned by a personal account on the Free plan, and
> that combination cannot enforce any of it. Two separate limits bite:
>
> 1. **Branch rules do not apply.** Protected branches and rulesets are
>    available on public repositories on Free, and on private repositories only
>    from Pro upward. Worse than unavailable: the ruleset form still lets you
>    create one, and it displays as Active while enforcing nothing.
> 2. **A personal-account repository has only two permission levels**, owner and
>    collaborator, and on a private one a collaborator cannot be read-only.
>    Every collaborator can push. Editor, Publisher and Reviewer have nowhere
>    to live.
>
> For a single user this costs nothing today: you are the owner, and the table
> above describes you. It matters the moment a second person is added, because
> that person would arrive with full publish rights and no gate in front of
> them. See *Restoring enforcement* below.

---

## How publishing works

The CMS runs in `editorial_workflow` mode, so an article is never committed
straight to `main`.

```
Draft  ─────►  In review  ─────►  Ready  ─────►  Published
(branch)       (pull request)     (approved)     (merged to main, site rebuilds)
```

Each article is a branch and a pull request. `.github/workflows/guards.yml` runs
the full guard suite on that pull request: contrast at every viewport and theme,
heading order, retired phrases, banned glyphs, brand casing, structured data,
dangling asset references, and the floating WhatsApp control not covering text.
Publishing is the merge, and the merge is blocked until those pass.

Before 15 November 2026 the guards ran only when someone remembered to run them
by hand, and Netlify deployed whatever reached `main` regardless. An editor
publishing from a CMS would have bypassed every check.

**The workflow runs and reports, but on this plan it cannot block.** A required
status check is a branch rule, and branch rules do not apply to a private
repository on Free. So a red run is visible on the pull request and nothing
stops the merge. For one person reading their own results that is most of the
value. For more than one person it is not a gate, and should not be described
as one.

**Draft toggle.** Separate from the workflow above. An article with Draft on is
built but kept off `/insights/` entirely. Use it for a piece that is finished
enough to merge but not meant to be public yet.

---

## Setup

These need repository Admin, so they are yours to do. The CMS works for you
today with step 1 alone; the rest is for adding other people and is worth doing
before anyone else gets access.

### 1. Sign in (nothing to configure)

Open `/admin/`, choose the token option, and paste a GitHub personal access
token:

- GitHub → Settings → Developer settings → Personal access tokens →
  **Fine-grained tokens** → Generate new token
- Repository access: only `MavelogxDigital/mavelogxdigital-website`
- Permissions: **Contents: Read and write**, **Pull requests: Read and write**
- Expiry: whatever you are willing to re-do. 90 days is reasonable.

The token is stored by your browser on your machine. It is never committed, and
it is not shared with anyone. Treat it like a password.

### 2. One-click "Sign in with GitHub" (optional, nicer)

Because the site is on Netlify, Netlify can act as the OAuth client and no
server of ours is involved.

- GitHub → Settings → Developer settings → **OAuth Apps** → New OAuth App.
  Homepage `https://mavelogxdigital.com`. For the authorization callback, use
  the URL Netlify shows you on the screen in the next step rather than guessing
  it.
- Netlify → the site → site configuration → **Authentication providers** →
  Install provider → GitHub → paste the Client ID and Client Secret → save.

No change to `config.yml`. `base_url` is deliberately unset, which is what makes
the CMS use Netlify as its OAuth client.

### 3. The branch rule that makes roles real — not available right now

This is the step that turns the guard suite into a gate and separates Editor
from Publisher. **It cannot be done on this repository as it stands**, for the
reasons under Roles above. Do not create a ruleset and assume it is working: on
a private repository on Free the form accepts it and shows it as Active while
enforcing nothing, which is worse than having none, because it looks done.

See *Restoring enforcement*. Once the repository is on a plan where rules apply,
the configuration is: Settings → Rules → Rulesets → New branch ruleset, target
`main`, with **Require a pull request before merging**, **Require status checks
to pass** → select **Guards**, and **Restrict who can merge** listing the people
who may publish.

### 4. Adding someone

GitHub → repository → Settings → Collaborators → Add people, then set their
permission from the table above. Nothing to do in the CMS: it reads their
GitHub identity when they sign in.

---

## Restoring enforcement

Three ways to get the gate and the roles back, in increasing cost. None is
urgent while you are the only person with access.

| Option | Cost | Gives back | Costs you |
|---|---|---|---|
| **Make the repository public again** | Free | Branch rules, required checks, the full role table | Source, commit history and article drafts become readable by anyone. The site is public either way; the workings would be too. |
| **GitHub Pro on your personal account** | Paid, per month | Branch rules and required checks on a private repository, so the guards become a gate again | Does **not** fix roles. A personal-account repository still has only owner and collaborator, and every collaborator can push. |
| **Move the repository into an Organization on the Team plan** | Paid, per user per month | Both: rules enforce on private repositories, and members get real Write, Maintain, Triage and Read roles | A migration, and a per-seat bill. An Organization on the *Free* plan does not help: it gets no private-repository enforcement either. |

The honest read for a one-person studio: leave it private on Free, publish from
the CMS yourself, and read the pull request's check result before merging.
Revisit this before granting anyone else access, because that is the point at
which the missing gate stops being theoretical.

One caveat worth knowing: GitHub's own documentation lists protected branches
for private repositories from Pro upward, while some community reports argue
that full enforcement on a personal account needs an Organization regardless.
If you go the Pro route, verify the ruleset actually blocks a merge before
trusting it, rather than taking the Active badge at face value.

## What is checked, and where

| Guard | Script | Catches |
|---|---|---|
| Bible tokens | `check-bible-tokens.cjs` | A CSS variable the Build Bible names that no longer exists |
| CMS config | `check-cms-config.cjs` | The CMS and the content schema drifting apart |
| Site assets | `check-site-assets.cjs` | Missing root files, dangling references, structured data |
| Pages | `qa.cjs` | Contrast, headings, targets, retired phrases, brand casing, overlap |
| Images | `check-image-renames.cjs` | An image replaced in place behind a cached URL |

All five run as `npm run qa`, locally and in the workflow.

`check-cms-config.cjs` is the one specific to this feature. The CMS offers a
fixed list of services and case studies, duplicated from `src/site.ts`. That is
exactly the arrangement that let the Build Bible keep naming `--purple-lt` eight
days after the token was deleted: a hand-kept list beside the thing it
describes, with nothing checking the two agree. So it is checked. It also fails
the build if a required schema field is missing from the CMS, which would
otherwise mean every article an editor created was broken on save with no
explanation.

---

## Known limits

- **A contributor without a GitHub account cannot use this.** See the top of
  this file.
- **Sveltia CMS is pre-1.0.** It is actively maintained, several releases a
  week, and reads the same configuration format as Decap CMS, so moving is
  cheap if it stalls. The content is plain markdown in the repository either
  way, so no migration is ever required to keep writing.
- **The CMS bundle loads from a CDN.** If it is unreachable the editor does not
  open. The site itself is unaffected, and articles can still be edited as files.
- **`/admin/` is `noindex`, not disallowed in `robots.txt`.** A page blocked from
  crawling is never read, so the crawler never sees the tag telling it to stay
  out of the index. Same reasoning as the styleguide, Build Bible 11.3.
