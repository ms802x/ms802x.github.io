import { getCollection, type CollectionEntry } from 'astro:content';

export type BlogPost = CollectionEntry<'blog'>;

/**
 * Drafts are visible in local development. In a production build they are
 * hidden unless PUBLIC_INCLUDE_DRAFTS=true.
 */
export function draftsEnabled(): boolean {
  return import.meta.env.DEV || import.meta.env.PUBLIC_INCLUDE_DRAFTS === 'true';
}

export async function getPosts(options: { includeDrafts?: boolean } = {}): Promise<BlogPost[]> {
  const includeDrafts = options.includeDrafts ?? draftsEnabled();
  const posts = await getCollection('blog', ({ data }) => includeDrafts || !data.draft);

  return posts.sort((a, b) => {
    const byDate = b.data.date.getTime() - a.data.date.getTime();
    return byDate !== 0 ? byDate : a.data.title.localeCompare(b.data.title);
  });
}

export function postSlug(post: BlogPost): string {
  return post.id.replace(/\.(md|mdx)$/i, '');
}

export function postHref(post: BlogPost): string {
  return `/blog/${postSlug(post)}/`;
}

export function formatDate(date: Date, lang: 'en' | 'ar' = 'en'): string {
  return new Intl.DateTimeFormat(lang === 'ar' ? 'ar-SA' : 'en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

export function formatDateISO(date: Date): string {
  return date.toISOString();
}

export function readingTime(body: string | undefined, lang: 'en' | 'ar' = 'en'): number {
  const words = (body ?? '').trim().split(/\s+/).filter(Boolean).length;
  const wordsPerMinute = lang === 'ar' ? 160 : 200;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

export function tagSlug(tag: string): string {
  return tag
    .normalize('NFKD')
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/&/g, ' and ')
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '');
}

export function getTags(posts: BlogPost[]): Array<{ name: string; slug: string; count: number }> {
  const tags = new Map<string, { name: string; slug: string; count: number }>();

  for (const post of posts) {
    for (const tag of post.data.tags) {
      const slug = tagSlug(tag);
      const current = tags.get(slug);
      if (current) {
        current.count += 1;
      } else {
        tags.set(slug, { name: tag, slug, count: 1 });
      }
    }
  }

  return [...tags.values()].sort(
    (a, b) => b.count - a.count || a.name.localeCompare(b.name),
  );
}
