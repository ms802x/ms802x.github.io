export const SITE = {
  title: 'Aalhejab — Lead AI Engineer',
  shortTitle: 'Aalhejab',
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
  scholar: 'https://scholar.google.com/scholar?q=%22Ali%20Alhejab%22',
} as const;

export const NAV = [
  { href: '/blog/', label: 'Writing' },
  { href: '/cv/', label: 'CV' },
  { href: '/about/', label: 'About' },
  { href: '/publications/', label: 'Publications' },
  { href: '/contact/', label: 'Contact' },
] as const;

export const SOCIALS = [
  { href: SITE.github, label: 'GitHub', icon: 'github' },
  { href: SITE.x, label: 'X', icon: 'x' },
  { href: SITE.scholar, label: 'Google Scholar', icon: 'scholar' },
] as const;

export const FOCUS_AREAS = [
  {
    title: 'Agentic AI & avatars',
    description:
      'Real-time conversational agents with integrated STT, LLM, and TTS pipelines — built for presenters, meeting facilitators, and live interaction.',
  },
  {
    title: 'Generative image & video',
    description:
      'Diffusion models for custom avatar generation, from LoRA fine-tuning on Flux, Hunyuan, and Wan to inference on CPU and GPU.',
  },
  {
    title: 'Efficient inference',
    description:
      'TensorRT, vLLM, TeaCache, and multi-GPU training with DeepSpeed and Accelerate — optimizing the path from model to production.',
  },
  {
    title: 'Perception & language',
    description:
      'Object detection, sign-language translation, intent routing, and vision-language systems applied to real-world problems.',
  },
] as const;
