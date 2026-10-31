import type { APIContext } from 'astro';

export const prerender = true;

export function GET({ site }: APIContext) {
  const base = (site ?? new URL('https://ms802x.github.io')).href.replace(/\/$/, '');
  const body = `User-agent: *
Allow: /

Sitemap: ${base}/sitemap-index.xml
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
