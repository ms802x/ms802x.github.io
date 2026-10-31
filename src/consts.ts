export const SITE = {
  title: 'Ali Alhejab',
  shortTitle: 'Ali Alhejab',
  brand: 'aalhejab',
  description:
    'Ali Alhejab is a Lead AI Engineer at HUMAIN, building agentic AI, real-time avatars, generative image and video systems, and efficient inference infrastructure.',
  author: 'Ali Alhejab',
  role: 'Lead AI Engineer',
  location: 'Riyadh, Saudi Arabia',
  // Fallback used when Astro.site is unavailable. The deploy workflow sets SITE_URL.
  fallbackUrl: 'https://ms802x.github.io',
  email: 'alhejab.ee@gmail.com',
  github: 'https://github.com/ms802x',
  x: 'https://x.com/ms802x',
  scholar: 'https://scholar.google.com/citations?user=1ES4vkoAAAAJ',
} as const;

export const NAV = [
  { href: '/', label: 'Writing' },
  { href: '/about/', label: 'About' },
  { href: '/cv/', label: 'CV' },
] as const;

export const LINKS = [
  { href: SITE.github, label: 'GitHub' },
  { href: SITE.x, label: 'X' },
  { href: SITE.scholar, label: 'Scholar' },
] as const;

/**
 * Comments use giscus (GitHub Discussions). They stay off until all three values are set.
 * Get them from https://giscus.app after enabling Discussions on the repository.
 */
export const GISCUS = {
  repo: import.meta.env.PUBLIC_GISCUS_REPO as string | undefined,
  repoId: import.meta.env.PUBLIC_GISCUS_REPO_ID as string | undefined,
  category: (import.meta.env.PUBLIC_GISCUS_CATEGORY as string | undefined) || 'Comments',
  categoryId: import.meta.env.PUBLIC_GISCUS_CATEGORY_ID as string | undefined,
};

export const GISCUS_ENABLED = Boolean(GISCUS.repo && GISCUS.repoId && GISCUS.categoryId);
