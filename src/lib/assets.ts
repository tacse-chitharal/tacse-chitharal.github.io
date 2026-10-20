import fs from 'node:fs';
import path from 'node:path';

/**
 * Checks at build time whether a file has been dropped into `public/`.
 *
 * The site is designed to look finished before the Academy has any photographs
 * of its own: each slot renders a designed fallback until a real image appears
 * at the expected path, and then quietly switches to the photograph. Nobody has
 * to edit a component to add a picture — they just save the file.
 */
export function hasPublicAsset(relativePath: string): boolean {
  const clean = relativePath.replace(/^\/+/, '');
  return fs.existsSync(path.join(process.cwd(), 'public', clean));
}

/** The first of these paths that exists, or null. Lets us accept .jpg or .webp. */
export function firstPublicAsset(relativePaths: string[]): string | null {
  const found = relativePaths.find((candidate) => hasPublicAsset(candidate));
  return found ? `/${found.replace(/^\/+/, '')}` : null;
}
