---
client: Floks Speaks
descriptor: Brand identity and web design for a Christ-centred spoken-word artist
sector: Spoken word / faith
services: [Brand Identity, Web Design & Development, Content]
year: "2026"
live: https://floksspeaks.org
inHouse: false
order: 1
hero: /img/floks-speaks-1280.webp
heroAlt: The Floks Speaks homepage, hero headline over studio photography of Felix Lokko at a microphone
lead: >
  Floks Speaks is the digital home of Felix Lokko, a spoken-word artist working at the
  intersection of faith, rhythm and everyday life. The site had to do two jobs.
  Carry the weight of the work, and make listening the first thing a visitor does.
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
    The cost of that was not technical, it was commercial. There was nowhere to put the
    merchandise. There was no way for a church or a camp organiser to book him without
    going through a direct message. An artist whose work was reaching six platforms had
    no address of his own to send anyone to.
  - >
    Nothing about the schedule or the commercials constrained this one, which is rarer
    than it sounds and worth saying plainly. The constraint was technical. Moving a live
    podcast off a hosted anchor feed without breaking six downstream platforms is the
    kind of migration that only announces itself when it goes wrong.
strategy:
  - >
    The decision the whole project turns on is that Floks Speaks publishes its own feed.
    He uploads through his own CMS, the site generates the RSS, and the six platforms
    subscribe to him rather than the other way round. He already owned the audience. He
    was renting the pipe. The site is what ended that.
  - >
    Everything else follows from it. Sanity Studio so he can publish without us. Cloudflare
    R2 so the audio sits somewhere that will not meter him for being listened to. Next.js
    on Netlify so the pages are fast on a mid-range Android phone in Accra, which is what
    his audience is actually holding. The six platforms stay exactly where they are, still
    carrying him, now fed from his own address.
  - >
    What we rejected was the obvious version: an embedded player pointed at the Spotify
    feed, with a site wrapped around it. It would have looked the same and shipped faster.
    It would also have left the dependency untouched, which was the one thing the project
    existed to fix.
  - >
    Listening is the primary action. A visitor can hear the work before they have read a
    sentence about it, because for a spoken-word artist the recording is the argument.
identity:
  note: >
    The logo was his and stayed his. The work was building a palette and a type system
    around it that could carry long-form text without losing the register of a record
    sleeve. Dark ground, warm ivory text, one amber accent that does the work of a
    highlight, and a muted lilac held back for the editorial moments.
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
    h: 4034
    device: full
    alt: The complete Floks Speaks homepage, from the hero through releases, the artist profile, themes, blog, events, merchandise and the footer
    caption: The full homepage, scrollable. The featured track sits above the fold with its title and runtime, so listening is one click from arrival.
  - src: /img/floks-speaks-mobile-780.webp
    w: 780
    h: 1697
    device: mobile
    alt: The Floks Speaks homepage on a phone, photography stacked above the headline
    caption: Mobile. The photograph moves above the headline and the two calls to action stack full width.
  - src: /img/floks-speaks-listen-1200.webp
    w: 1200
    h: 610
    device: desktop
    alt: The Listen page on Floks Speaks, a full-bleed performance photograph behind the heading Every word, in one place
    caption: The library. One address for everything he has recorded, searchable by theme or by a line you half remember.
  - src: /img/floks-speaks-listen-mobile-376.webp
    w: 376
    h: 855
    device: mobile
    alt: The Listen page on a phone, the performance photograph stacked above the heading and the first recording below it
    caption: The library on a phone. The photograph crops to a band and the first piece sits immediately beneath it.
  - src: /img/floks-speaks-piece-1200.webp
    w: 1200
    h: 610
    device: desktop
    alt: A single recording page on Floks Speaks, cover artwork beside the title My Real Gee with a theme tag, date, runtime and a play control
    caption: A single piece. Cover art, theme, date and runtime, and a play control before any description. Each recording has its own URL.
  - src: /img/floks-speaks-piece-mobile-376.webp
    w: 376
    h: 855
    device: mobile
    alt: A single recording page on a phone, cover artwork above the title and the play control at the foot
    caption: The same piece on a phone. Artwork first, then the title, then the reason to press play.
decisions:
  - title: Listening is the primary action, not reading
    body: >
      The hero gives a featured track its own play control with the title and runtime visible
      before any navigation. "My Real Gee", Faith, 2:18. A visitor can hear the work in one
      click rather than reading about it first, which for a spoken-word artist is the whole
      proposition.
  - title: Photography carries the brand, not graphics
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
    He is getting booked. Enquiries arrive through the site rather than through a direct
    message, which is the difference between a request he might miss and one that waits
    for him in one place.
  - >
    He publishes without us. Episodes go up through his own CMS and out through his own
    feed, and the six platforms carry them as they always did. The handover worked, which
    is the only real test of a CMS build.
  - >
    The merchandise sells. It had nowhere to live before this, which was the clearest of
    the costs of not having an address of his own.
pending:
  - "11 Client quote: Felix's own words. Permission to publish is granted, the sentence itself is still outstanding."
---
