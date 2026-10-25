---
client: Mavel's Corner
descriptor: Publication, podcast infrastructure and brand voice for a faith-lifestyle ministry
sector: In-house venture, faith lifestyle
services: [Web Design & Development, Podcast Infrastructure, Brand Voice, Content Strategy]
year: "2026"
live: https://mavelscorner.blog
inHouse: true
order: 4
hero: /img/mavels-corner-1280.webp
heroAlt: The Mavel's Corner homepage, Welcome to Mavel's Corner over a deep teal ground patterned with small crosses
lead: >
  Mavel's Corner is a faith-lifestyle publication. The problem here was editorial before it was
  visual. The work was a voice that could carry sustained writing without drifting, and a
  structure that made publishing a routine rather than a decision each time.
brief:
  - >
    Mavel's Corner is our own ministry brand, which is why it carries the hardest brief we
    have taken on. In-house there is no client to negotiate the scope down with and nothing
    to escalate to. You either solve it properly or you do not ship.
  - >
    The ask was deliberately unreasonable. Give an independent one-person ministry the same
    reach and the same product quality as a funded one. Three properties rather than one: a
    publication, a podcast with genuine distribution, and a native app on both stores. Built
    to a standard we would put a client's name on.
challenge:
  - >
    Independent ministries fail at digital for predictable reasons, and none of them are
    talent. Podcasting assumes a studio, a microphone, editing time and a monthly hosting
    fee. A mobile app assumes a development team, a backend, and running costs that climb
    with every new reader. Bible text assumes licensing written for organisations with legal
    departments.
  - >
    Each of those is a wall. Most ministries meet the first one and stop there.
  - >
    So the constraint was not treated as something to work around. It became the brief. Every
    architectural decision started from one question: what does this cost at scale, and can it
    cost nothing instead?
strategy:
  - >
    Offline first, not offline as a fallback. Anything that could run on the reader's own
    device was built to run there, as the primary path rather than a degraded mode when the
    signal drops. That one decision removed the running costs, the latency and the privacy
    problem at the same time.
  - >
    Automate the labour, never the voice. The ministry writes. Everything downstream of the
    writing happens without a human touching it, and no part of the automation touches the
    message itself.
  - >
    Design to the ceiling on purpose. Where a paid service was unavoidable, its free limit was
    treated as a hard architectural constraint from day one rather than something to discover
    in production. That shaped the navigation model, the caching and the feature boundaries
    across the whole Bible module.
  - >
    What we ruled out matters as much as what we shipped. One major translation was
    investigated and dropped: its licence excludes commercial use and a direct publisher
    agreement was not viable at this scale. A build log that lists only wins is a brochure.
identity:
  note: >
    A serif masthead against a sans interface, which signals publication rather than product.
    The ground alternates between a deep teal and a warm cream so a long read is never set on
    black. Gold carries the scripture bands and the editorial marks. The cyan is reserved for
    the two actions that matter, reading and asking for prayer.
  palette:
    - { name: Deep Teal, hex: "#0D2C31" }
    - { name: Near Black, hex: "#060F11" }
    - { name: Warm Cream, hex: "#FBF8F2" }
    - { name: Gold, hex: "#C8973A" }
    - { name: Cyan, hex: "#1B9AAA" }
  type:
    - Serif for the masthead, titles and scripture
    - Sans for navigation, body and controls
shots:
  - src: /img/mavels-corner-full-960.webp
    w: 960
    h: 2767
    device: full
    alt: The complete Mavel's Corner homepage, from the welcome through a scripture band, four reasons the publication exists, editor's picks, recent posts and a closing promise to the reader
    caption: Top to bottom. A scripture band, then why the publication exists, then the writing itself.
  - src: /img/mavels-corner-home-mobile-780.webp
    w: 780
    h: 1688
    device: mobile
    alt: The Mavel's Corner homepage on a phone, the masthead and platform row above the welcome, the positioning line and two calls to action
    caption: On a phone. Masthead, the three words that set the boundary, then read or ask for prayer.
  - src: /img/mavels-corner-blog-1200.webp
    w: 1200
    h: 750
    device: desktop
    alt: The blog index, Words for the Journey above a start-here row of seven numbered posts each carrying its scripture reference
    caption: The blog index opens with seven posts to start on. A new reader is given a route in rather than a reverse chronological list.
  - src: /img/mavels-corner-blog-mobile-780.webp
    w: 780
    h: 1688
    device: mobile
    alt: The blog index on a phone, the heading and the numbered start-here posts stacked full width
    caption: The numbered route in, stacked.
  - src: /img/mavels-corner-post-1200.webp
    w: 1200
    h: 750
    device: desktop
    alt: A single post, You Are Not in That Fire Alone, a dark masthead band above body text set on cream, with a floating listen control
    caption: A post. Dark masthead, then cream for the reading itself, and a listen control that follows the reader down the page.
  - src: /img/mavels-corner-post-mobile-780.webp
    w: 780
    h: 1688
    device: mobile
    alt: The same post on a phone, title and standfirst on the dark band with the opening paragraphs below on cream
    caption: Cream behind the body text, which is what makes a long read bearable on a small screen.
decisions:
  - title: Writing becomes a podcast without anyone recording it
    body: >
      A devotional published on the site becomes a narrated episode and appears across seven
      listening platforms. No microphone was bought, no studio was booked, and no episode has
      been edited by hand. For a solo publisher that is the difference between a podcast
      being a weekly production commitment and a podcast being a byproduct of writing.
  - title: The prayer journal never leaves the phone
    body: >
      A prayer journal holds the most sensitive thing a faith app can hold. People write
      things in it they have told no one. The usual answer is to keep it on a server, encrypt
      it, and publish a policy explaining the encryption. We kept it on the device instead.
      There is no server copy to breach and no document asking anyone to take our word for
      it. That only works because it was decided before the architecture, not bolted on after.
  - title: Two Bible translations work with no signal at all
    body: >
      Five translations in total, two of them carried inside the app so they work with no
      connection whatsoever. Full text search and the random verse run against those two
      only, so the features a reader uses most can never depend on a network or a quota.
  - title: A positioning line that sets the editorial boundary
    body: >
      "Faith. Hope. Second Chances." sits directly under the masthead. Three words that tell a reader what the
      publication is about and, more usefully for the writer, what it is not. That is what
      keeps a personal blog from becoming a diary.
  - title: A start-here row instead of reverse chronology
    body: >
      "Read the Blog" and "Submit a Prayer Request" are given equal weight in the hero. One is
      for a reader, the other for someone arriving in need. Treating them as peers, rather than making the
      prayer request a footer link, is the editorial decision the design encodes.
  - title: A serif masthead against a sans body
    body: >
      The display type is set in a serif while the interface stays sans. That signals publication rather than product,
      the right register for writing meant to be read slowly.
outcome:
  - >
    The publication and the podcast are live. Writing goes up on a routine rather than as a
    decision each time, and every piece reaches seven listening platforms without anyone
    recording or editing anything.
  - >
    The app is not launched. Seven of ten build phases are complete, with device testing and
    store submission still ahead, and one feature waiting on a third party outside our
    control. We are publishing this while it is still in build because the decisions are the
    case study. Download numbers, when they come, will be the less interesting part.
pending:
  - "08 The build: app screenshots once the store build is ready. The captures here are the publication only."
  - "10 Outcome: numbers for the publication and the podcast, once there are any worth stating."
---
