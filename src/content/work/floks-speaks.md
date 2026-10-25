---
client: Floks Speaks
descriptor: Brand identity, website and podcast infrastructure for a Christ-centred spoken-word artist
sector: Spoken word / faith
services: [Brand Identity, Web Design & Development, Podcast Infrastructure, Photography Direction]
year: "2026"
live: https://floksspeaks.org
inHouse: false
order: 1
hero: /img/floks-speaks-1280.webp
heroAlt: The Floks Speaks homepage, the headline and a play control on the left beside studio photography of Felix Lokko at a microphone
lead: >
  Floks Speaks is the digital home of Felix Lokko, a spoken-word artist working at the
  intersection of faith, rhythm and everyday life. Eight published pieces lived inside a
  hosting platform he did not own. No address of his own, no way to publish without a
  middleman, and no way to take a booking or sell a shirt.
brief:
  - >
    Felix Lokko is a graphic designer and a spoken-word artist. Floks Speaks is his
    Christian spoken-word podcast, running since September 2021. Words that cut through
    the noise, is how he puts it. Each episode is a declaration, a reminder, and a call
    to return to the one truth that never changes.
  - >
    The audience is Christian youth and young adults, church communities, and the people
    who book speakers for youth camps, schools and weddings. Mostly Ghana and the wider
    continent, with a diaspora audience that finds him through the podcast platforms.
    They need to hear the work before they will trust it, which puts listening ahead of
    reading on every screen.
  - >
    He did not come asking for a brand. He came asking for a home. The podcast already
    existed and was already distributed. What he wanted was a place that was his.
challenge:
  - >
    Before this he had social accounts and six podcast platforms, and that was the whole
    estate. We had built that distribution for him: a Spotify for Creators anchor feed
    pushing out to Spotify, Apple Podcasts, Amazon Music, iHeartRadio, Deezer and Audible.
    It worked. It also meant that every episode he published went out through somebody
    else's pipe.
  - >
    What it cost him was commercial rather than technical. There was nowhere to show the
    merchandise. There was no way for a church or a camp organiser to book him without
    opening a direct message. An artist whose work was reaching six platforms had
    no address of his own to send anyone to.
  - >
    The project itself ran without a deadline or a spending limit. The difficulty was all
    in the engineering. Moving a live
    podcast off a hosted anchor feed without breaking six downstream platforms is the
    kind of migration that only announces itself when it goes wrong.
strategy:
  - >
    The decision the whole project turns on is that Floks Speaks publishes its own feed.
    He uploads through his own editor, the site generates the RSS, and the six platforms
    subscribe to him rather than the other way round. He already
    owned the audience. He was renting the pipe. The site is what ended that.
  - >
    Everything else follows from it. Six pages, plus a page of its own for every recording
    and every article. A library where search and theme filtering work together. A player
    that persists across the site, with queue playback and lock-screen controls on a phone.
    A static front end that stays fast on a mid-range Android device in Accra, which is what
    his audience is actually holding.
  - >
    The publishing side is his. He uploads audio straight from the editor, and he posts
    episodes, articles and events himself with no developer in the loop. Audio sits on
    storage that does not meter him for being listened to. The six platforms stay exactly
    where they are, still carrying him, now fed from his own address.
  - >
    What we rejected was the obvious version: an embedded player pointed at the Spotify
    feed, with a site wrapped around it. It would have looked the same and shipped faster.
    It would also have left the dependency untouched, which was the one thing the project
    existed to fix.
  - >
    Listening is the primary action. A visitor can hear the work before they have read a
    sentence about it.
identity:
  note: >
    The logo was his and stayed his. The work was building a palette and a type system
    around it that could carry long-form text without losing the register of a record
    sleeve. Dark ground, warm ivory text, one amber accent that does the work of a
    highlight, and a muted lilac held back for the editorial moments.
    Both accents were measured rather than assumed, and both failed where it mattered.
    Amber is a comfortable 9.03 to 1 on the near-black ground and collapses to 1.79 on
    the ivory sections. Lilac does the same, 8.28 down to 1.95. So the light sections
    carry darker inks of the same hues instead, and the brand colours stay untouched.
  palette:
    - { name: Midnight Black, hex: "#111116" }
    - { name: Charcoal, hex: "#22232B" }
    - { name: Warm Ivory, hex: "#F2EDE5" }
    - { name: Vibrant Amber, hex: "#F2A33A" }
    - { name: Muted Lilac, hex: "#B5A5CE" }
  type:
    - Sora for display headlines
    - Playfair Display for poetry and editorial titles
    - Inter for navigation, body and metadata
shots:
  - src: /img/floks-speaks-full-960.webp
    w: 960
    h: 3410
    device: full
    alt: The complete Floks Speaks homepage, from the hero through latest releases, the artist profile, a scripture panel, themes, the blog, events, merchandise and the platform row
    caption: The full homepage. Listening sits above the fold, and everything beneath it is a reason to keep going.
  - src: /img/floks-speaks-home-mobile-780.webp
    w: 780
    h: 1688
    device: mobile
    alt: The Floks Speaks homepage on a phone, the studio photograph above the headline with both calls to action stacked beneath
    caption: Photograph first, then the claim, then the play control.
  - src: /img/floks-speaks-listen-full-960.webp
    w: 960
    h: 2646
    device: full
    alt: The complete Listen page, hero and featured recording above a searchable grid of eight pieces, theme filters, collections and the podcast platform row
    caption: The library in full. Search, four themes, and collections that hold pieces in the order they are meant to be heard.
  - src: /img/floks-speaks-listen-mobile-780.webp
    w: 780
    h: 1688
    device: mobile
    alt: The Listen page on a phone, performance photograph cropped to a band above the heading, with the featured recording below
    caption: The library as most of his audience meets it.
  - src: /img/floks-speaks-piece-1200.webp
    w: 1200
    h: 750
    device: desktop
    alt: A single recording page, cover artwork beside the title My Real Gee with theme, date and runtime, a play control, sharing options and related pieces
    caption: One recording, one URL. Share controls and a route onward to the next piece in the same theme.
  - src: /img/floks-speaks-contact-1200.webp
    w: 1200
    h: 750
    device: desktop
    alt: The Contact page on a light ground, an enquiry type selector set to Booking above fields for name, email, event date and venue
    caption: The booking path. Enquiry type first, then the date and venue fields that make a booking answerable in one reply.
decisions:
  - title: The feed was verified episode by episode before cutover
    body: >
      A podcast migration fails quietly. Move a feed badly and directories republish the
      back catalogue as duplicates, or stop following the show altogether, and nobody is
      told. The artist finds out weeks later when a new episode reaches no one. So the
      move was not made on trust. Every episode identifier and every audio file length was
      checked against the archived original feed first, eight for eight, and only then did
      the redirect go live. It was held open for thirty days so every directory had time
      to follow.
  - title: The play control comes before the navigation
    body: >
      The hero gives a featured track its own play control with the title and runtime visible
      before any navigation. "My Real Gee", Faith, 2:18. A visitor can hear the work in one
      click rather than reading about it first, which for a spoken-word artist is the whole
      proposition.
  - title: The identity rests on original studio photography
    body: >
      The identity leans on original studio photography rather than illustration or stock.
      The hero image is the artist mid-performance, lit warm against a dark field. That sets
      the register for everything beneath it.
  - title: An amber accent on near-black
    body: >
      One warm accent against a dark ground, used for the headline emphasis, the play control
      and the eyebrow. The restraint keeps it feeling like a record sleeve, not a church bulletin.
outcome:
  - >
    He is getting booked through the site. Since launch the contact form has brought in
    church programmes for November and December 2026 and a run of wedding engagements.
    That is the difference between a request he might miss in a message thread and one
    that waits for him in one place.
  - >
    He publishes without us. Episodes go up through his own editor and out through his own
    feed, and the six platforms carry them as they always did.
  - >
    The merchandise has somewhere to live and is selling. Ordering still runs through
    WhatsApp while the shop is finished, so that leg has not moved yet. Booking has.
  - >
    He owns his feed, his audio, his domain and his words. He publishes without asking
    anyone.
pending:
  - "11 Client quote: carried on the homepage rather than here. Owner decision, 25 Oct 2026."
---
