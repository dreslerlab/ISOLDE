// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// GitHub Pages project site: https://dreslerlab.github.io/ISOLDE/
// Custom domain later: set `site` to 'https://<domain>' and remove `base`.
export default defineConfig({
  site: 'https://dreslerlab.github.io',
  base: '/ISOLDE',
  trailingSlash: 'always',
  integrations: [sitemap()],
  // Fetch the other pages' HTML (2–3 kB gzipped each) as soon as their links are visible, so clicks feel
  // instant, on phones too. Astro skips this with Data Saver on or on 2G connections.
  prefetch: { prefetchAll: true, defaultStrategy: 'viewport' },
});
