// @ts-check
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://0xmsu.github.io',
  base: '/awesome-inference-engineering',
  trailingSlash: 'always',
  // Astro 7 defaults to 'jsx', which strips the spaces between inline elements ("a · b" becomes "a·b").
  compressHTML: true,
  devToolbar: { enabled: false },
  integrations: [sitemap()],
  vite: {
    define: {
      // Where the build finds public/api/entries.json, whatever the working directory is.
      __SITE_ROOT__: JSON.stringify(fileURLToPath(new URL('.', import.meta.url))),
    },
  },
});
