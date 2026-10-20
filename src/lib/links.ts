/**
 * Turns a site path like `/courses/` into a link that works wherever the site
 * is published.
 *
 * On a host that serves the site at the root (Netlify, a custom domain) this
 * changes nothing. On GitHub Pages the site lives under the repository name,
 * e.g. `https://<account>.github.io/<repository>/`, so every internal link
 * needs that prefix — set once, through `base` in astro.config.mjs.
 *
 * Always write internal links as `withBase('/somewhere/')`, never as a bare
 * `"/somewhere/"`, or they will break on GitHub Pages.
 */
const base = import.meta.env.BASE_URL.replace(/\/+$/, '');

export function withBase(path: string): string {
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}
