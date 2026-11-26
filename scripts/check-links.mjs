// Post-build link check: every internal href/src/srcset in dist/ must resolve to a built file,
// every root-relative URL must carry the base path, and in-page #anchors must exist.
//   npm run build && npm run check:links
import { readdir, readFile, stat } from 'node:fs/promises';
import { join, relative } from 'node:path';
import config from '../astro.config.mjs';

const DIST = new URL('../dist/', import.meta.url).pathname;
const BASE = `${(config.base ?? '/').replace(/\/+$/, '')}/`;
const ORIGIN = 'http://site.invalid';
const EXTERNAL = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
const ATTRIBUTE = /\s(href|src|srcset)="([^"]*)"/g;
const ID = /\sid="([^"]+)"/g;

async function htmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) => {
      const path = join(dir, entry.name);
      if (entry.isDirectory()) return htmlFiles(path);
      return entry.name.endsWith('.html') ? [path] : [];
    }),
  );
  return nested.flat();
}

const exists = (path) =>
  stat(path).then(
    (s) => s.isFile(),
    () => false,
  );

/** Public URL path of a built page, e.g. dist/faq/index.html → /ISOLDE/faq/ */
const pageUrlPath = (file) => `${BASE}${relative(DIST, file).replace(/index\.html$/, '')}`;

async function resolvesToFile(urlPath) {
  const inDist = join(DIST, decodeURIComponent(urlPath.slice(BASE.length)));
  if (urlPath.endsWith('/')) return exists(join(inDist, 'index.html'));
  return (await exists(inDist)) || exists(join(inDist, 'index.html'));
}

const urlsFrom = (name, value) =>
  name === 'srcset' ? value.split(',').map((candidate) => candidate.trim().split(/\s+/)[0]) : [value];

const files = await htmlFiles(DIST);
const failures = [];
let checked = 0;

for (const file of files) {
  const html = await readFile(file, 'utf8');
  const pagePath = pageUrlPath(file);
  const ids = new Set([...html.matchAll(ID)].map((m) => m[1]));

  for (const [, name, value] of html.matchAll(ATTRIBUTE)) {
    for (const raw of urlsFrom(name, value)) {
      if (!raw || EXTERNAL.test(raw)) continue;
      checked++;
      const where = `${relative(DIST, file)}: ${name}="${raw}"`;
      if (raw.startsWith('#')) {
        if (raw.length > 1 && !ids.has(decodeURIComponent(raw.slice(1)))) failures.push(`${where} → no element with this id`);
        continue;
      }
      if (raw.startsWith('/') && !raw.startsWith(BASE)) {
        failures.push(`${where} → missing base path ${BASE}`);
        continue;
      }
      const target = new URL(raw, `${ORIGIN}${pagePath}`).pathname;
      if (!target.startsWith(BASE) || !(await resolvesToFile(target))) failures.push(`${where} → no such file in dist/`);
    }
  }
}

if (failures.length > 0) {
  process.stderr.write(`Link check FAILED: ${failures.length} broken of ${checked} internal links\n${failures.join('\n')}\n`);
  process.exit(1);
}
process.stdout.write(`Link check passed: ${checked} internal links in ${files.length} pages, base ${BASE}\n`);
