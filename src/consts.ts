export const SITE = {
  title: 'Aalhejab — AI Engineer',
  shortTitle: 'Aalhejab',
  brand: 'aalhejab',
  description:
    'The personal profile of Ali at Aalhejab — an AI engineer working on generative imaging, diffusion models, inference optimization, knowledge distillation, and Arabic ASR/NLP.',
  author: 'Ali Alhejab',
  role: 'AI Engineer',
  location: 'Saudi Arabia',
  // Fallback used when Astro.site is unavailable. The deploy workflow sets SITE_URL.
  fallbackUrl: 'https://ms802x.github.io',
  // LinkedIn, Hugging Face, and Google Scholar are still placeholders.
  email: 'alhejab.ee@gmail.com',
  github: 'https://github.com/ms802x',
  linkedin: 'https://www.linkedin.com/in/yourusername',
  x: 'https://x.com/ms802x',
  huggingface: 'https://huggingface.co/yourusername',
  scholar: 'https://scholar.google.com/citations?user=YOUR_SCHOLAR_ID',
} as const;

export const NAV = [
  { href: '/blog/', label: 'Writing' },
  { href: '/about/', label: 'About' },
  { href: '/publications/', label: 'Publications' },
  { href: '/contact/', label: 'Contact' },
] as const;

export const SOCIALS = [
  { href: SITE.github, label: 'GitHub', icon: 'github' },
  { href: SITE.linkedin, label: 'LinkedIn', icon: 'linkedin' },
  { href: SITE.x, label: 'X', icon: 'x' },
  { href: SITE.huggingface, label: 'Hugging Face', icon: 'huggingface' },
  { href: SITE.scholar, label: 'Google Scholar', icon: 'scholar' },
] as const;

export const FOCUS_AREAS = [
  {
    title: 'Generative imaging',
    description:
      'Diffusion sampling, scheduling, and the engineering details that make image models usable outside a research notebook.',
  },
  {
    title: 'Inference optimization',
    description:
      'Latency and throughput trade-offs: batching, quantization, caching, and knowing which benchmark number actually matters.',
  },
  {
    title: 'Knowledge distillation',
    description:
      'Turning large models into smaller, faster students — and being honest about the cases where distillation does not pay off.',
  },
  {
    title: 'Arabic ASR & NLP',
    description:
      'Benchmarking and fine-tuning speech and language models on real-world Arabic audio and text, dialects included.',
  },
] as const;
