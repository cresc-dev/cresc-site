#!/usr/bin/env node
/**
 * Render a 1200x630 social card for every built page into out/og/<route>.png,
 * so a shared docs or comparison link previews with its own title instead of
 * the generic home cover. Titles and descriptions are read back from the built
 * HTML, so the card always matches what the page itself declares.
 *
 * The home page keeps the hand-made images/og-cover.png; noindex pages (404)
 * get no card. The theme points og:image at /og/<route>.png for every other
 * route, so this must run after `rspress build`.
 *
 * Fonts are bundled (scripts/og-fonts, SIL OFL) and system fonts are not
 * loaded, so local and CI renders are identical.
 *
 * Usage: node scripts/build-og-images.mjs
 */
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Resvg } from '@resvg/resvg-js';

const SITE_ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = path.join(SITE_ROOT, 'out');
const FONT_DIR = path.join(SITE_ROOT, 'scripts', 'og-fonts');

const WIDTH = 1200;
const HEIGHT = 630;
const PAD_X = 88;
const TEXT_WIDTH = WIDTH - PAD_X * 2;

const fontOptions = {
  fontFiles: readdirSync(FONT_DIR)
    .filter((name) => name.endsWith('.ttf'))
    .map((name) => path.join(FONT_DIR, name)),
  loadSystemFonts: false,
  defaultFontFamily: 'Inter',
};

const TITLE_FONT = `font-family="Space Grotesk" font-weight="700"`;
const BODY_FONT = `font-family="Inter" font-weight="400"`;

const escapeXml = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const decodeEntities = (s) =>
  s
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');

function textWidth(text, font, size) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="4000" height="200"><text x="0" y="150" ${font} font-size="${size}">${escapeXml(text)}</text></svg>`;
  return new Resvg(svg, { font: fontOptions }).innerBBox()?.width ?? 0;
}

// Greedy word wrap. When the text needs more than maxLines, the last line is
// cut at a word boundary and ends with an ellipsis.
function wrap(text, font, size, maxLines) {
  const words = text.split(/\s+/).filter(Boolean);
  const lines = [];
  let current = '';
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (!current || textWidth(candidate, font, size) <= TEXT_WIDTH) {
      current = candidate;
      continue;
    }
    lines.push(current);
    current = word;
  }
  if (current) lines.push(current);
  if (lines.length <= maxLines) return lines;

  const kept = lines.slice(0, maxLines);
  let last = kept[maxLines - 1];
  while (last.includes(' ') && textWidth(`${last}…`, font, size) > TEXT_WIDTH) {
    last = last.slice(0, last.lastIndexOf(' '));
  }
  kept[maxLines - 1] = `${last.replace(/[\s,;:·–—-]+$/, '')}…`;
  return kept;
}

const LOGO = `
  <defs>
    <linearGradient id="cresc_stroke" x1="16" y1="18" x2="90" y2="90" gradientUnits="userSpaceOnUse">
      <stop stop-color="#D7B57C"/>
      <stop offset="0.55" stop-color="#A86A42"/>
      <stop offset="1" stop-color="#6E3428"/>
    </linearGradient>
    <radialGradient id="cresc_pearl" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(84 50) rotate(56.31) scale(18.6011)">
      <stop stop-color="#FFFDF9"/>
      <stop offset="0.56" stop-color="#F0E1CA"/>
      <stop offset="1" stop-color="#C7A072"/>
    </radialGradient>
  </defs>
  <path d="M 88 25 A 40 40 0 1 0 88 83" stroke="url(#cresc_stroke)" stroke-width="18" stroke-linecap="round" fill="none"/>
  <path d="M 86 31 A 32 32 0 1 0 86 77" stroke="#F4E6CD" stroke-opacity="0.28" stroke-width="4" stroke-linecap="round" fill="none"/>
  <circle cx="88" cy="54" r="10" fill="url(#cresc_pearl)" stroke="#B68657" stroke-width="1.6"/>
  <circle cx="84.2" cy="49.3" r="2.8" fill="#FFFFFF" fill-opacity="0.88"/>`;

function cardSvg({ title, description, section }) {
  let titleSize = 64;
  let titleLines = wrap(title, TITLE_FONT, titleSize, 2);
  if (titleLines.at(-1).endsWith('…')) {
    titleSize = 54;
    titleLines = wrap(title, TITLE_FONT, titleSize, 3);
  }
  const titleLeading = Math.round(titleSize * 1.12);
  const descLines = description ? wrap(description, BODY_FONT, 28, titleLines.length > 2 ? 2 : 3) : [];

  const titleTop = 250;
  const titleText = titleLines
    .map((line, i) => `<tspan x="${PAD_X}" y="${titleTop + i * titleLeading}">${escapeXml(line)}</tspan>`)
    .join('');
  const descTop = titleTop + (titleLines.length - 1) * titleLeading + 68;
  const descText = descLines
    .map((line, i) => `<tspan x="${PAD_X}" y="${descTop + i * 40}">${escapeXml(line)}</tspan>`)
    .join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <defs>
    <radialGradient id="glow" cx="1010" cy="90" r="620" gradientUnits="userSpaceOnUse">
      <stop stop-color="#F3E3C8" stop-opacity="0.95"/>
      <stop offset="1" stop-color="#FDFDFC" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="#FDFDFC"/>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#glow)"/>
  <g transform="translate(${PAD_X} 82) scale(0.7)">${LOGO}</g>
  <text x="${PAD_X + 96}" y="140" ${TITLE_FONT} font-size="44" fill="#1C1917">Cresc</text>
  <text ${TITLE_FONT} font-size="${titleSize}" fill="#1C1917">${titleText}</text>
  <text ${BODY_FONT} font-size="28" fill="#57534E">${descText}</text>
  <text x="${PAD_X}" y="548" ${BODY_FONT} font-size="24" fill="#78716C">${escapeXml(section)}</text>
  <text x="${WIDTH - PAD_X}" y="548" ${BODY_FONT} font-size="26" fill="#A86A42" text-anchor="end">cresc.dev</text>
</svg>`;
}

function htmlFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return htmlFiles(full);
    return entry.name.endsWith('.html') ? [full] : [];
  });
}

const attr = (html, pattern) => {
  const match = html.match(pattern);
  return match ? decodeEntities(match[1]).trim() : '';
};

let count = 0;
for (const file of htmlFiles(OUT_DIR)) {
  const rel = path.relative(OUT_DIR, file).split(path.sep).join('/');
  if (rel === 'index.html' || rel === '404.html') continue;
  const html = readFileSync(file, 'utf8');
  if (/<meta name="robots" content="[^"]*noindex/.test(html)) continue;
  // Standalone files under public/ (the launch film) are not site pages.
  if (!html.includes('og:url')) continue;

  const route = `/${rel.replace(/\.html$/, '')}`;
  // Docs titles carry a " - Cresc" suffix; the card already shows the brand.
  const title = (
    attr(html, /<meta property="og:title" content="([^"]*)"/) ||
    attr(html, /<title>([^<]*)<\/title>/)
  ).replace(/\s+-\s+Cresc$/, '');
  const description = attr(html, /<meta name="description" content="([^"]*)"/);
  const section = route.startsWith('/docs/') ? 'Cresc documentation' : 'React Native OTA updates';

  const png = new Resvg(cardSvg({ title, description, section }), {
    font: fontOptions,
    fitTo: { mode: 'width', value: WIDTH },
  })
    .render()
    .asPng();
  const target = path.join(OUT_DIR, 'og', `${rel.replace(/\.html$/, '')}.png`);
  mkdirSync(path.dirname(target), { recursive: true });
  writeFileSync(target, png);
  count += 1;
}
console.log(`wrote ${count} social cards to out/og/`);
