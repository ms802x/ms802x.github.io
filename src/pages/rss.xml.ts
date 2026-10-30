import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { SITE } from '../consts';
import { getPosts, postHref } from '../lib/posts';

export async function GET(context: APIContext) {
  const posts = await getPosts();
  const site = context.site ?? new URL(SITE.fallbackUrl);

  return rss({
    title: SITE.title,
    description: SITE.description,
    site,
    trailingSlash: true,
    xmlns: {
      dc: 'http://purl.org/dc/elements/1.1/',
    },
    customData: '<language>en</language>',
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.summary,
      pubDate: post.data.date,
      link: postHref(post),
      categories: post.data.tags,
      author: SITE.email,
      customData: `<dc:language>${post.data.lang}</dc:language>`,
    })),
  });
}
