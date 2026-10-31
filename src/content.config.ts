import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/** Case study schema, the eleven blocks of Build Bible 10.1.
 *  Optional blocks are omitted from the page when absent (10.1), never
 *  rendered with placeholder text. `pending` lists the blocks still waiting
 *  on material from the client intake in Appendix B. */
const work = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/work' }),
  schema: ({ image }) => z.object({
    client: z.string(),
    descriptor: z.string(),              // one line under the H1
    sector: z.string(),
    services: z.array(z.string()),
    year: z.string(),
    live: z.string().url().optional(),   // omitted when the site is offline
    inHouse: z.boolean().default(false),
    order: z.number(),                   // build + display order
    draft: z.boolean().default(false),

    hero: z.string(),                    // /img/<slug>-1280.webp
    heroAlt: z.string(),
    lead: z.string(),                    // block 03, the serif paragraph

    brief: z.array(z.string()).optional(),        // 04
    challenge: z.array(z.string()).optional(),    // 05
    strategy: z.array(z.string()).optional(),     // 06
    identity: z.object({                          // 07, optional per 10.1
      note: z.string(),
      palette: z.array(z.object({ name: z.string(), hex: z.string() })).optional(),
      type: z.array(z.string()).optional(),
    }).optional(),
    shots: z.array(z.object({
      src: z.string(), alt: z.string(), caption: z.string().optional(),
      device: z.enum(['desktop','mobile','full']).default('desktop'),
      w: z.number().optional(), h: z.number().optional(),
    })).optional(), // 08
    decisions: z.array(z.object({ title: z.string(), body: z.string() })).optional(),  // 09
    outcome: z.array(z.string()).optional(),      // 10
    metrics: z.array(z.object({ figure: z.string(), label: z.string() })).optional(),  // only when confirmed in writing
    quote: z.object({ text: z.string(), name: z.string(), role: z.string() }).optional(), // 11

    /** Blocks still awaiting material. Rendered as an author-only note in dev,
     *  never shown in a production build. */
    pending: z.array(z.string()).default([]),
  }),
});


/** Articles for /insights/ (8.8). Body is markdown. */
const insights = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/insights' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    date: z.coerce.date(),
    readTime: z.string(),
    lead: z.string(),
    draft: z.boolean().default(false),
    /* Contextual cross-links rendered at the foot of the article. Slugs, so a
       retitled service or case study does not strand the link. */
    relatedService: z.string().optional(),
    relatedWork: z.string().optional(),
  }),
});

export const collections = { work, insights };
