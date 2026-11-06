#!/usr/bin/env node
/**
 * Inject FAQPage JSON-LD into built pages so search engines and AI answer
 * engines can lift each question and answer directly.
 *
 * Questions and answers come from the rspress "llms" Markdown export of each
 * page (out/<route>.md). On the FAQ page every `###` heading is a question;
 * on any other page only the `###` headings inside a `## FAQ` section are.
 * An answer is the text up to the next heading or `***` rule. Pages that
 * already carry a hand-written FAQPage (via <JsonLd>) are left alone.
 * Running after `rspress build` keeps the structured data in step with the
 * page itself.
 *
 * Usage: node scripts/build-faq-schema.mjs
 */
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SITE_ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = path.join(SITE_ROOT, 'out');
const FAQ_PAGE = path.join(OUT_DIR, 'docs/faq.html');

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

function questionsIn(md, wholePage) {
  const questions = [];
  let inFaq = wholePage;
  let current;
  for (const line of md.split('\n')) {
    // <Footer /> renders h3 column headers starting with "### Contact Us".
    if (line === '### Contact Us') {
      inFaq = false;
      current = undefined;
      break;
    }
    if (line.startsWith('### ') && inFaq) {
      current = { name: line.slice(4).trim(), body: [] };
      questions.push(current);
    } else if (/^#{1,2} /.test(line) || line.trim() === '***') {
      if (!wholePage && /^## /.test(line)) inFaq = /^## FAQ\s*$/i.test(line);
      current = undefined;
    } else if (current) {
      current.body.push(line);
    }
  }
  return questions
    .map(({ name, body }) => ({ name, text: plain(body.join('\n')) }))
    .filter(({ text }) => text);
}

function htmlFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return htmlFiles(full);
    return entry.name.endsWith('.html') ? [full] : [];
  });
}

let pages = 0;
for (const file of htmlFiles(OUT_DIR)) {
  const md = file.replace(/\.html$/, '.md');
  if (!existsSync(md)) continue;
  const html = readFileSync(file, 'utf8');
  if (html.includes('"FAQPage"')) continue;

  const mainEntity = questionsIn(readFileSync(md, 'utf8'), file === FAQ_PAGE).map(({ name, text }) => ({
    '@type': 'Question',
    name,
    acceptedAnswer: { '@type': 'Answer', text },
  }));
  if (file === FAQ_PAGE && !mainEntity.length) throw new Error('no FAQ entries found in out/docs/faq.md');
  if (!mainEntity.length) continue;

  const schema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity };
  const tag = `<script type="application/ld+json">${JSON.stringify(schema).replace(/</g, '\\u003c')}</script>`;
  if (!html.includes('</head>')) throw new Error(`no </head> in ${path.relative(SITE_ROOT, file)}`);
  writeFileSync(file, html.replace('</head>', `${tag}</head>`));
  console.log(`injected FAQPage JSON-LD into ${path.relative(SITE_ROOT, file)} (${mainEntity.length} questions)`);
  pages++;
}
console.log(`FAQPage JSON-LD: ${pages} pages`);
