/** Single source of truth for nav, footer and project data (Bible 5.1, 5.2, 8.10). */
export const SITE = {
  name: 'MavelogxDigital',
  tagline: 'From Idea To Impact',
  url: 'https://mavelogxdigital.com',          // non-www, per Appendix F decision
  email: 'MavelogxDigital@gmail.com',
  /* Phone and WhatsApp are two different numbers and two different channels.
     Owner decision, 24 Oct 2026, supersedes the single-number entry in 11.4
     and closes defect 12.2: the Canadian line is the voice number, the
     Ghanaian line is WhatsApp only. Never label one with the other.
     The WhatsApp number is never printed on the site. It is reachable only
     through a Chat on WhatsApp control. Owner decision, 24 Oct 2026. */
  phone: '+1 (437) 259-1010',
  phoneHref: 'tel:+14372591010',
  whatsapp: 'https://wa.me/233247493949',
  locations: 'Toronto, Canada & Accra, Ghana',
} as const;

export const NAV = [
  { label: 'Home',     href: '/',          key: 'home' },
  { label: 'Work',     href: '/work/',     key: 'work' },
  { label: 'Services', href: '/services/', key: 'services' },
  { label: 'About',    href: '/about/',    key: 'about' },
  { label: 'Insights', href: '/insights/', key: 'insights' },
  { label: 'Contact',  href: '/contact/',  key: 'contact' },
] as const;

export const SERVICES = [
  { n:'01', slug:'brand-identity', title:'Brand Strategy & Identity', accent:'var(--coral-strong)',
    desc:'Logo systems, brand guidelines and visual identity, built on the positioning work that makes them defensible.',
    deliverables:['Positioning and messaging platform','Primary logo, secondary marks and favicon set',
      'Colour, type and spacing system','Written brand guidelines','Social and document templates'],
    fit:'Businesses launching, rebranding, or carrying an identity that no longer matches what they sell.',
    proof:'floks-speaks' },
  { n:'02', slug:'web', title:'Web Design & Development', accent:'var(--amber-text)',
    desc:'Conversion-focused, mobile-first websites engineered for speed, search visibility and growth.',
    deliverables:['Sitemap and page-by-page content plan','Responsive design across phone, tablet and desktop',
      'Hand-built front end, no page-builder bloat','Per-page SEO, metadata and structured data',
      'Accessibility to WCAG 2.2 AA','Handover and a walkthrough so you can run it'],
    fit:'Anyone whose site is slow, hard to update, or no longer reflects the business behind it.',
    proof:'syndei-embassy' },
  { n:'03', slug:'content', title:'Content Creation', accent:'var(--purple-text)',
    desc:'Copy, graphics and multimedia that speak to a specific audience in a specific market.',
    deliverables:['Brand voice and tone guide','Website and landing page copy',
      'Editorial calendar','Graphics and multimedia assets','Photography art direction'],
    fit:'Teams with something worth saying and no settled way of saying it.',
    proof:'mavels-corner' },
  { n:'04', slug:'social', title:'Social Media Management', accent:'var(--teal-text)',
    desc:'Strategy, production and community management across the platforms your audience actually uses.',
    deliverables:['Channel strategy and posting rhythm','Templates and a reusable asset kit',
      'Scheduling and publishing','Community management','Monthly review against what you set out to do'],
    fit:'Businesses posting inconsistently, or posting a lot without it adding up to anything.' },
  { n:'05', slug:'ecommerce', title:'E-Commerce', accent:'var(--coral-strong)',
    desc:'Storefront design, product presentation and payment integration built to convert and to be maintained by you.',
    deliverables:['Storefront design and build','Product page and catalogue structure',
      'Payment and checkout integration','Shipping and tax configuration','Training so you can manage it yourself'],
    fit:'Sellers moving from WhatsApp or Instagram orders to a storefront that runs on its own.' },
  { n:'06', slug:'consultation', title:'Digital Consultation', accent:'var(--amber-text)',
    desc:'Strategic sessions that map the digital roadmap, clarify priorities and produce a plan you can act on.',
    deliverables:['Audit of what you have now','Competitive and audience review',
      'A prioritised roadmap','A written plan you keep, whether or not you build with us'],
    fit:'Founders who know something needs to change and want a clear order of operations first.' },
] as const;

export const PILLARS = [
  { title:'Strategy Before Pixels', accent:'var(--coral-strong)',
    body:'Every engagement opens with the business problem, the audience and the competitive position. Design decisions follow from that. It is why they hold up when a client asks why.' },
  { title:'AI-Augmented Delivery', accent:'var(--amber-text)',
    body:'Intelligent workflows absorb the research, iteration and production load. The thinking gets the time it deserves and the timeline still shortens.' },
  { title:'Built for Two Markets', accent:'var(--purple-text)',
    body:'Active delivery across Canada and Ghana means designing for real differences in device, bandwidth, payment habit and cultural read. Not one assumed default audience.' },
  { title:'One Accountable Team', accent:'var(--teal-text)',
    body:'Strategy, identity, build and launch under a single point of contact. Nothing is subcontracted into a gap where accountability disappears.' },
] as const;

export const PROCESS = [
  { n:'01', title:'Discover',   body:'We start with a deep dive into your brand, goals, audience and competitive landscape to understand exactly what you need.' },
  { n:'02', title:'Strategize', body:'We map out a clear creative and digital strategy, covering every touchpoint from brand voice to visual direction.' },
  { n:'03', title:'Build',      body:'We execute with precision, crafting your digital assets, designs and content to a high professional standard.' },
  { n:'04', title:'Launch',     body:'We deliver, review with you, and get your brand live and in front of the right people, ready to make an impact.' },
] as const;

/** Portfolio.
 *  inHouse, drives the transparency label required by Bible 10.3.
 *  featured, appears in homepage Selected Work. Cap at 3: the asymmetric
 *              stack in 8.2 is one wide card plus two beside it.
 *  caseStudy, gets a full case study page in Phase 2. Array order is build order.
 */
export const PROJECTS = [
  { slug:'floks-speaks', client:'Floks Speaks', live:'https://floksspeaks.org',
    sector:'Spoken word / faith', year:'2026', inHouse:false,
    featured:true, caseStudy:true,
    tags:['Brand Identity','Web Design','Content'],
    blurb:'A Christ-centred spoken-word brand for Felix Lokko, built around editorial art direction and original photography.' },
  { slug:'syndei-embassy', client:'Syndei Embassy', live:'https://syndeiembassy.org',
    sector:'Church / community', year:'2026', inHouse:false,
    featured:true, caseStudy:true,
    /* Recaptured 29 Oct 2026. New stem rather than new bytes under the old
       names, so returning visitors get the new picture (5.5). */
    cardBase:'syndei-embassy-v2',
    tags:['Brand Identity','Web Design','Digital Presence'],
    blurb:'A church in Accra given a restrained, confident digital home with WhatsApp built into the visit journey.' },
  { slug:'mavelogx-enterprise', client:'Mavelogx Enterprise', live:'https://mavelogx.com',
    sector:'In-house venture, B2B procurement', year:'2026', inHouse:true,
    featured:true, caseStudy:true,
    tags:['Brand Identity','Web Design','Strategy'],
    blurb:'B2B sourcing and procurement across the China\u2013Ghana\u2013Canada corridor, presented as a system rather than a brochure.' },
  { slug:'mavels-corner', client:"Mavel's Corner", live:'https://mavelscorner.blog',
    sector:'In-house venture, faith lifestyle', year:'2026', inHouse:true,
    featured:false, caseStudy:true,
    tags:['Blog Design','Content Strategy','Brand Voice'],
    blurb:'A faith-lifestyle publication with a documented brand voice and a publishing rhythm, shown through editorial and voice work rather than visual design alone.' },
  // Torah Farms & Properties, removed from the site entirely (Bible 12.1).
  // Not withheld: the card, footer link, testimonial and case study are all gone.
] as const;

/** Helpers so pages never hand-pick projects. */
export const FEATURED    = PROJECTS.filter(p => p.featured);
export const CASE_STUDIES = PROJECTS.filter(p => p.caseStudy);

/** Filename stem for a project's card images. Defaults to the slug; a project
 *  that has been recaptured carries a cardBase so the new pictures ship under
 *  new names (5.5). Pages read this rather than assembling paths themselves. */
export const cardStem = (slug: string): string =>
  (PROJECTS.find(p => p.slug === slug) as { cardBase?: string } | undefined)?.cardBase ?? slug;


/** Industries. `proof` links to a case study; the rest are reach, not evidence (9.1). */
export const INDUSTRIES = [
  { name:'Faith & Community',        proof:'syndei-embassy' },
  { name:'Arts & Creative',          proof:'floks-speaks' },
  { name:'Logistics & Procurement',  proof:'mavelogx-enterprise' },
  { name:'Publishing & Media',       proof:'mavels-corner' },
  { name:'Technology & SaaS' },
  { name:'E-Commerce & Retail' },
  { name:'Real Estate & Property' },
  { name:'Agriculture & Agribusiness' },
  { name:'Professional Services' },
  { name:'Health & Wellness' },
] as const;


/** Process detail for /process/ (Bible 9.4). Durations are ranges, not promises. */
export const PROCESS_DETAIL = [
  { n:'01', title:'Discover', duration:'Typically 3 to 5 days',
    body:'We start with a deep dive into your brand, goals, audience and competitive landscape, so the work that follows answers a real question rather than a guessed one.',
    need:['A conversation of about 90 minutes','Access to any existing brand or marketing material',
      'Whatever analytics or sales data you have','The name of the person who signs things off'],
    get:['A written summary of what we heard','A clear statement of the problem we are solving',
      'The audience we are designing for'] },
  { n:'02', title:'Strategize', duration:'Typically 5 to 8 days',
    body:'We map the creative and digital strategy, covering every touchpoint from brand voice to visual direction, and agree it with you before anything is designed.',
    need:['One round of feedback, consolidated','A decision on direction where we present options'],
    get:['Positioning and messaging direction','Sitemap and content plan','Visual direction with references'] },
  { n:'03', title:'Build', duration:'Typically 2 to 5 weeks, depending on scope',
    body:'We execute with precision, crafting your assets, designs and content to a professional standard. You see work in progress weekly rather than a reveal at the end.',
    need:['Copy, photography or product data where you are supplying it',
      'Weekly review of about 30 minutes','Prompt answers on blockers'],
    get:['Weekly progress you can look at','Two rounds of revisions included','A staging link before anything goes live'] },
  { n:'04', title:'Launch', duration:'Typically 2 to 3 days',
    body:'We deliver, review with you, and get the work live in front of the right people. Then we show you how to run it.',
    need:['Domain and hosting access, or permission to set it up','Final sign-off'],
    get:['The work live and tested','A handover walkthrough','Source files and documentation','30 days of post-launch support'] },
] as const;

export const FAQ = [
  { q:'How long does a full website take?',
    a:'Most sites run four to seven weeks end to end. A brand identity on its own is usually two to three. The variable is rarely the build, it is how quickly feedback and content come back.' },
  { q:'How many rounds of revisions are included?',
    a:'Two rounds at each stage. In practice the weekly reviews mean most changes happen as we go, so formal rounds are rarely both used.' },
  { q:'Who owns the files when we finish?',
    a:'You do. On final payment you receive the source files, the domain and hosting in your own accounts, and documentation. Nothing is held hostage.' },
  { q:'What happens after launch?',
    a:'30 days of support is included for anything that breaks or needs adjusting. After that you can run it yourself with the handover walkthrough, or arrange ongoing maintenance.' },
  { q:'Can I update the site myself?',
    a:'Yes. The handover covers how to edit content, add a project or publish a post. If you can edit a document you can run the site.' },
  { q:'Do you work with clients outside Canada and Ghana?',
    a:'Yes. Those are the two markets we know best and design for by default, but the work is not limited to them.' },
  { q:'What do you need from me to start?',
    a:'A conversation, any existing brand material, and one person who can make decisions. Everything else we work out together in Discover.' },
] as const;
