import type { APIContext } from 'astro';
import { SITE_GATE_ENABLED } from '../lib/gate';

export const prerender = true;

export function GET({ site }: APIContext) {
  if (SITE_GATE_ENABLED) {
    return new Response('User-agent: *\nDisallow: /\n', {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    });
  }

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
