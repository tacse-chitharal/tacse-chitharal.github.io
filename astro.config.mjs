// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Where the site is published. Used for canonical links, WhatsApp/Facebook
// share previews and sitemap.xml.
//
//   SITE_URL   the address, without a trailing slash
//   BASE_PATH  the folder the site lives in — "/" at the root of a domain,
//              "/<repository-name>" on a GitHub Pages project site
//
// The GitHub Pages deploy sets both (see .github/workflows/deploy.yml);
// everything else, including `npm run dev`, uses the defaults below.
export default defineConfig({
  site: process.env.SITE_URL ?? 'https://tacsechitharal-star.github.io',
  base: process.env.BASE_PATH ?? '/',
  output: 'static',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
