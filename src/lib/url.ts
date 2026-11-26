/**
 * Joins a site-relative path onto a base path.
 * joinBase('/ISOLDE', 'research/') → '/ISOLDE/research/'
 */
export function joinBase(base: string, path = ''): string {
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;
  const normalizedPath = path.replace(/^\/+/, '');
  return `${normalizedBase}${normalizedPath}`;
}

/** Base-aware URL for internal links and files in public/. Always use this instead of hard-coded "/…" paths. */
export function url(path = ''): string {
  return joinBase(import.meta.env.BASE_URL, path);
}

const withTrailingSlash = (path: string) => (path.endsWith('/') ? path : `${path}/`);

/** True when `href` points at the page being rendered (trailing-slash insensitive). */
export function isCurrentPath(currentPathname: string, href: string): boolean {
  return withTrailingSlash(currentPathname) === withTrailingSlash(href);
}
