/** Single source of truth for nav, footer and project data (Bible 5.1, 5.2, 8.10). */
export const SITE = {
  name: 'MavelogxDigital',
  tagline: 'From Idea To Impact',
  url: 'https://mavelogxdigital.com',          // non-www, per Appendix F decision
  email: 'MavelogxDigital@gmail.com',
  phone: '+233 24 749 3949',
  phoneHref: 'tel:+233247493949',
  whatsapp: 'https://wa.me/233247493949',
  locations: 'Toronto, Canada & Accra, Ghana',
} as const;

export const NAV = [
  { label: 'Work',     href: '/work/',     key: 'work' },
  { label: 'Services', href: '/services/', key: 'services' },
  { label: 'About',    href: '/about/',    key: 'about' },
  { label: 'Insights', href: '/insights/', key: 'insights' },
  { label: 'Contact',  href: '/contact/',  key: 'contact' },
] as const;

export const SERVICES = [
  { n:'01', slug:'brand-identity', title:'Brand Strategy & Identity', accent:'var(--coral)',
    desc:'Logo systems, brand guidelines and visual identity, built on the positioning work that makes them defensible.' },
  { n:'02', slug:'web', title:'Web Design & Development', accent:'var(--amber)',
    desc:'Conversion-focused, mobile-first websites engineered for speed, search visibility and growth.' },
  { n:'03', slug:'content', title:'Content Creation', accent:'var(--purple)',
    desc:'Copy, graphics and multimedia that speak to a specific audience in a specific market.' },
  { n:'04', slug:'social', title:'Social Media Management', accent:'var(--teal)',
    desc:'Strategy, production and community management across the platforms your audience actually uses.' },
  { n:'05', slug:'ecommerce', title:'E-Commerce', accent:'var(--coral)',
    desc:'Storefront design, product presentation and payment integration built to convert and to be maintained by you.' },
  { n:'06', slug:'consultation', title:'Digital Consultation', accent:'var(--amber)',
    desc:'Strategic sessions that map the digital roadmap, clarify priorities and produce a plan you can act on.' },
] as const;

export const PILLARS = [
  { title:'Strategy Before Pixels', accent:'var(--coral)',
    body:'Every engagement opens with the business problem, the audience and the competitive position. Design decisions follow from that. It is why they hold up when a client asks why.' },
  { title:'AI-Augmented Delivery', accent:'var(--amber)',
    body:'Intelligent workflows absorb the research, iteration and production load. The thinking gets the time it deserves and the timeline still shortens.' },
  { title:'Built for Two Markets', accent:'var(--purple)',
    body:'Active delivery across Canada and Ghana means designing for real differences in device, bandwidth, payment habit and cultural read. Not one assumed default audience.' },
  { title:'One Accountable Team', accent:'var(--teal)',
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
