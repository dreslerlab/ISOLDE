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
});
