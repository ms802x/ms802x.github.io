// Usage: npm run new -- "Post title" [--ar]
import { existsSync, writeFileSync } from 'node:fs';

const args = process.argv.slice(2);
const lang = args.includes('--ar') ? 'ar' : 'en';
const title = args.filter((arg) => arg !== '--ar').join(' ').trim();

if (!title) {
  console.error('Usage: npm run new -- "Post title" [--ar]');
  process.exit(1);
}

const slug =
  title
    .normalize('NFKD')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '') || `post-${Date.now()}`;
const file = `src/content/blog/${slug}.md`;

if (existsSync(file)) {
  console.error(`${file} already exists.`);
  process.exit(1);
}

const date = new Date().toISOString().slice(0, 10);

writeFileSync(
  file,
  `---
title: ${JSON.stringify(title)}
date: ${date}
tags: []
summary: "One sentence: what the reader will learn."
lang: ${lang}
draft: true
---

Start with the problem and the result.
`,
);

console.log(`Created ${file}
Preview:  npm run dev  ->  http://localhost:4321/blog/${slug}/
Publish:  set draft: false, then git commit and push.`);
