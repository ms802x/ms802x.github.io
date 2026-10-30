import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/blog',
  }),
  schema: z.object({
    title: z.string().min(1),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    summary: z.string().min(1),
    lang: z.enum(['en', 'ar']).default('en'),
    canonical_url: z.preprocess(
      (value) => (value === '' ? undefined : value),
      z.url().optional(),
    ),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
