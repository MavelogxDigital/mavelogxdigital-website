import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://mavelogxdigital.com',
  trailingSlash: 'always',
  build: { format: 'directory' },        // /work/ not /work.html
  /* The styleguide is noindex and unlinked (5.4), so listing it in the sitemap
     asks Google to crawl a page it is then told to ignore. 11.3 wants the real
     pages and nothing else. */
  integrations: [sitemap({ filter: (page) => !page.includes('/styleguide/') })],
  image: { domains: [] },
  compressHTML: true,
});
