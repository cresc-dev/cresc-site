#!/usr/bin/env node
/**
 * Emit out/sitemap.xml from the pages rspress actually built, so new docs are
 * listed without anyone remembering to edit a static file.
 *
 * <lastmod> is the last commit that touched the page's source. The deploy
 * workflow checks out full history for this; on a shallow clone every page
 * would report the same date, so lastmod is omitted there instead.
 *
 * Pages marked noindex (the 404 page) and standalone assets under public/
 * (the launch film) are skipped.
 *
 * Usage: node scripts/build-sitemap.mjs
 */
import { execFileSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const BASE_URL = 'https://cresc.dev';
const SITE_ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = path.join(SITE_ROOT, 'out');
const PAGES_DIR = path.join(SITE_ROOT, 'pages');

function git(args) {
  try {
    return execFileSync('git', args, { cwd: SITE_ROOT, encoding: 'utf8' }).trim();
  } catch {
    return '';
  }
}

const shallow = git(['rev-parse', '--is-shallow-repository']) !== 'false';

function htmlFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return htmlFiles(full);
    return entry.name.endsWith('.html') ? [full] : [];
  });
}

function sourceOf(route) {
  const base = path.join(PAGES_DIR, route === '/' ? 'index' : route);
  return ['.mdx', '.md'].map((ext) => base + ext).find(existsSync);
}

const urls = [];
for (const file of htmlFiles(OUT_DIR)) {
  const rel = path.relative(OUT_DIR, file).split(path.sep).join('/');
  const route = rel === 'index.html' ? '/' : `/${rel.replace(/\.html$/, '')}`;
  const source = sourceOf(route);
  if (!source) continue;
  if (/<meta name="robots" content="[^"]*noindex/.test(readFileSync(file, 'utf8'))) continue;

  const lastmod = shallow ? '' : git(['log', '-1', '--format=%cs', '--', source]);
  urls.push({ loc: `${BASE_URL}${route}`, lastmod });
}

// Home first, then marketing pages, then docs, each alphabetical.
const rank = (loc) => (loc === `${BASE_URL}/` ? 0 : loc.includes('/docs/') ? 2 : 1);
urls.sort((a, b) => rank(a.loc) - rank(b.loc) || a.loc.localeCompare(b.loc));

const body = urls
  .map(({ loc, lastmod }) =>
    lastmod
      ? `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`
      : `  <url>\n    <loc>${loc}</loc>\n  </url>`,
  )
  .join('\n');

writeFileSync(
  path.join(OUT_DIR, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`,
);
console.log(`wrote out/sitemap.xml (${urls.length} urls${shallow ? ', no lastmod: shallow clone' : ''})`);
