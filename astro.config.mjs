import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://mavelogxdigital.com',
  trailingSlash: 'always',
  build: { format: 'directory' },        // /work/ not /work.html
  integrations: [sitemap()],
  image: { domains: [] },
  compressHTML: true,
});
