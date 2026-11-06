#!/usr/bin/env node
/**
 * Rewrite out/llms.txt after `rspress build` so AI agents and answer-engine
 * crawlers get:
 *   1. Full https://cresc.dev/...md URLs (per llmstxt.org conventions)
 *   2. Clear semantic groupings instead of dumping every landing/comparison
 *      page into a generic "## Others" bucket
 *   3. Descriptive seoTitle / frontmatter descriptions and machine-readable
 *      discovery endpoints (llms-full.txt, mcp-docs-index.json, .well-known).
 *
 * Usage: node scripts/build-llms-txt.mjs
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const BASE_URL = 'https://cresc.dev';
const SITE_ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = path.join(SITE_ROOT, 'out');

const GROUPS = [
  {
    heading: 'Overview & Engineering Guides',
    routes: [
      '/',
      '/react-native-ota-updates',
      '/react-native-hermes-ota',
      '/react-native-new-architecture-ota',
      '/react-native-ota-rollback',
      '/react-native-ota-ci-cd',
      '/pricing',
    ],
  },
  {
    heading: 'Migration Guides (CodePush & Expo Updates)',
    routes: [
      '/codepush-alternative',
      '/app-center-codepush-retirement',
      '/codepush-migration-checklist',
      '/codepush-api-migration',
      '/expo-updates-migration',
    ],
  },
  {
    heading: 'Comparisons & Cost Breakdowns',
    routes: [
      '/expo-updates-vs-cresc',
      '/expo-pricing-vs-cresc',
      '/expo-updates-self-hosted-vs-cresc',
      '/hot-updater-vs-cresc',
      '/revopush-vs-cresc',
      '/stallion-vs-cresc',
    ],
  },
  {
    heading: 'Documentation',
    routes: [
      '/docs/intro',
      '/docs/skills',
      '/docs/getting-started',
      '/docs/integration',
      '/docs/harmony',
      '/docs/publish',
      '/docs/api',
      '/docs/native-api',
      '/docs/api-token',
      '/docs/mcp',
      '/docs/cli',
      '/docs/analytics',
      '/docs/errors',
      '/docs/brownfield',
      '/docs/bestpractice',
      '/docs/faq',
      '/docs/changelog',
    ],
  },
];

const decodeEntities = (s) =>
  s
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');

function metaFor(route) {
  const rel = route === '/' ? 'index' : route.slice(1);
  const htmlPath = path.join(OUT_DIR, `${rel}.html`);
  const mdPath = path.join(OUT_DIR, `${rel}.md`);
  if (!existsSync(htmlPath) || !existsSync(mdPath)) {
    throw new Error(`build-llms-txt: missing built output for ${route}`);
  }
  const html = readFileSync(htmlPath, 'utf8');
  const title = decodeEntities(
    (html.match(/<title[^>]*>([^<]*)<\/title>/) || [])[1] || route,
  )
    .replace(/\s+[-|]\s+Cresc$/i, '')
    .trim();
  const description = decodeEntities(
    (html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '',
  ).trim();
  return {
    title,
    description,
    mdUrl: `${BASE_URL}/${rel}.md`,
  };
}

const sections = GROUPS.map(({ heading, routes }) => {
  const items = routes.map((route) => {
    const { title, description, mdUrl } = metaFor(route);
    return description ? `- [${title}](${mdUrl}): ${description}` : `- [${title}](${mdUrl})`;
  });
  return `## ${heading}\n\n${items.join('\n')}`;
});

sections.push(
  [
    '## Machine-Readable Discovery',
    '',
    `- [Full Documentation & Guides Bundle](${BASE_URL}/llms-full.txt): Single-file Markdown export of all Cresc documentation and technical guides.`,
    `- [MCP Documentation Search Index](${BASE_URL}/mcp-docs-index.json): Section-indexed JSON corpus served by the Cresc MCP server.`,
    `- [Agent Skills Manifest](${BASE_URL}/.well-known/agent-skills/index.json): Installable react-native-update AI integration skill archive.`,
    `- [MCP Server Card](${BASE_URL}/.well-known/mcp/server-card.json): Streamable HTTP MCP endpoint (${BASE_URL.replace('cresc.dev', 'api.cresc.dev')}/mcp) for read-only release diagnostics.`,
  ].join('\n'),
);

const output = [
  '# Cresc',
  '',
  '> Cresc (npm: `react-native-update`, MIT) is a React Native over-the-air (OTA) update service for iOS, Android, HarmonyOS NEXT, and tvOS — featuring 3.4 KB Hermes bytecode-aware delta patches, automatic launch-crash rollback, native cold-start brick rescue (Force Boot), built-in source-mapped JS error monitoring, read-only MCP diagnostics, and flat monthly pricing from $0 with CDN bandwidth included.',
  '',
  sections.join('\n\n'),
  '',
].join('\n');

writeFileSync(path.join(OUT_DIR, 'llms.txt'), output);
console.log(`wrote out/llms.txt (${GROUPS.reduce((n, g) => n + g.routes.length, 0)} pages)`);
