#!/usr/bin/env node
/**
 * Inject FAQPage JSON-LD into out/docs/faq.html so search engines and AI
 * answer engines can lift each question and answer directly.
 *
 * Questions and answers come from the rspress "llms" Markdown export of the
 * page (out/docs/faq.md): every `####` heading is a question and the text up
 * to the next heading or `***` rule is its answer. Running after
 * `rspress build` keeps the structured data in step with the FAQ itself.
 *
 * Usage: node scripts/build-faq-schema.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SITE_ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const MD = path.join(SITE_ROOT, 'out/docs/faq.md');
const HTML = path.join(SITE_ROOT, 'out/docs/faq.html');

// Markdown to plain text: answers are read as prose, not rendered.
function plain(md) {
  return md
    .replace(/```[\s\S]*?```/g, '')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[*_`]/g, '')
    .replace(/^\s*[-+]\s+/gm, '')
    .replace(/^\s*\|.*\|\s*$/gm, '')
    .replace(/\s+/g, ' ')
    .trim();
}

const questions = [];
let current;
for (const line of readFileSync(MD, 'utf8').split('\n')) {
  if (line.startsWith('#### ')) {
    current = { name: line.slice(5).trim(), body: [] };
    questions.push(current);
  } else if (/^#{1,3} /.test(line) || line.trim() === '***') {
    current = undefined;
  } else if (current) {
    current.body.push(line);
  }
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: questions
    .map(({ name, body }) => ({ name, text: plain(body.join('\n')) }))
    .filter(({ text }) => text)
    .map(({ name, text }) => ({
      '@type': 'Question',
      name,
      acceptedAnswer: { '@type': 'Answer', text },
    })),
};
if (!schema.mainEntity.length) throw new Error('no FAQ entries found in out/docs/faq.md');

const tag = `<script type="application/ld+json">${JSON.stringify(schema).replace(/</g, '\\u003c')}</script>`;
const html = readFileSync(HTML, 'utf8');
if (!html.includes('</head>')) throw new Error('no </head> in out/docs/faq.html');
writeFileSync(HTML, html.replace('</head>', `${tag}</head>`));
console.log(`injected FAQPage JSON-LD into out/docs/faq.html (${schema.mainEntity.length} questions)`);
