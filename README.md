# Ali Alhejab — writing

Personal blog and CV, built with Astro. Markdown in, static HTML out. No database, no
client framework, no trackers.

## Writing a post

### In the browser (recommended)

- **Locally:** `npm run dev`, open http://localhost:4321/admin/ in Chrome or Edge, click
  **Work with Local Repository**, and select this folder. Edits are written straight to
  `src/content/blog/`; commit and push when ready.
- **On the live site:** open `/admin/`, click **Sign In Using Access Token**, and paste a
  GitHub fine-grained token with *Contents: read and write* on this repository. Every save is a
  commit to `main`.

New posts start as drafts (hidden on the live site). Uncheck **Draft** to publish. Images you
drop into the editor are stored in `public/images/posts/`. Config: `public/admin/config.yml`.

### From the terminal

```bash
npm run new -- "My post title"        # add --ar for an Arabic post
npm run dev                           # preview at http://localhost:4321 (drafts visible)
```

This creates `src/content/blog/my-post-title.md` with `draft: true`. Write in Markdown.
Code blocks, `$math$` / `$$math$$` (KaTeX), and images from `public/images/` work. An image
title becomes its caption: `![alt](/images/x.png "Figure 1. Caption")`.

To publish, set `draft: false`, then commit and push to `main`. GitHub Actions builds and
deploys. Drafts never appear in production.

## Sharing and feedback

Each post ends with: reply by email (pre-filled subject), copy link, and share to X,
LinkedIn, and Hacker News. RSS is at `/rss.xml`.

Comments use [giscus](https://giscus.app) (GitHub Discussions) and are off until configured:

1. Enable **Discussions** on the repository and create a category (e.g. "Comments").
2. Install the giscus GitHub app on the repository.
3. On giscus.app, enter the repository and copy the repo ID and category ID.
4. Add repository **variables** (Settings → Secrets and variables → Actions → Variables):
   `GISCUS_REPO`, `GISCUS_REPO_ID`, `GISCUS_CATEGORY`, `GISCUS_CATEGORY_ID`.

## CV

The CV lives in `src/pages/cv.astro`. `public/cv/Ali-Alhejab-CV.pdf` is that page printed
to PDF (browser → Print → Save as PDF, A4, no headers/footers). Re-export it after editing.

## Local development

Requires **Node 22.23.4 or newer** (see `.nvmrc`).

```bash
nvm use
npm install
npm run dev        # http://localhost:4321
```

Production build and preview:

```bash
npm run build
npm run preview    # http://localhost:4321
```

Type-check the project:

```bash
npm run check
```

## Add a post

1. Copy the template:

   ```bash
   cp src/content/_template.md src/content/blog/my-new-post.md
   ```

2. Edit the front matter:

   ```yaml
   ---
   title: "My new post"
   date: 2026-11-01
   tags: ["Inference", "Arabic NLP"]
   summary: "One or two sentences used in listings, RSS, and SEO metadata."
   lang: en                 # en | ar
   canonical_url: ""        # optional; original URL when cross-posting
   draft: false             # true keeps it out of production builds by default
   ---
   ```

3. Write the post and push to `main`.

The file name becomes the slug: `my-new-post.md` → `/blog/my-new-post/`.

### Drafts

Drafts are visible in local development and hidden in production builds unless
`PUBLIC_INCLUDE_DRAFTS=true`.

The deployed demo currently sets `PUBLIC_INCLUDE_DRAFTS: "true"` in
`.github/workflows/deploy.yml` so the sample posts render. Once you have real
content, set it to `"false"` or remove that environment variable.

### Images and captions

Put images in `public/images/` and use a normal Markdown image. The image **title**
becomes the caption:

```md
![Alt text describing the image](/images/diagram.svg "Figure 1. Caption text.")
```

### Math

Inline math uses `$...$`; display math uses `$$...$$`:

```md
The cost per token is:

$$
C = \frac{\text{hourly rate}}{\text{tokens per second} \times 3600}
$$
```

### Arabic and RTL

Set `lang: ar` in the front matter. Post titles, summaries, and body content are
rendered RTL and use Noto Sans Arabic. Code blocks and equations stay LTR. Site
navigation remains English.

### Canonical URLs

For cross-posted articles, set `canonical_url` to the original URL. The page's
canonical tag will point there while the post remains available on this site.

## Site configuration

Edit these files before publishing:

| File | What to change |
| --- | --- |
| `src/consts.ts` | Name, role, email, GitHub, X, Google Scholar |
| `astro.config.mjs` | Fallback `site` URL used outside the GitHub Actions deployment |
| `.github/workflows/deploy.yml` | Draft visibility, giscus variables, optional `SITE_URL` override |
| `.env.example` | Local environment variables |
| `public/og-default.png` | Default 1200×630 social card |
| `public/favicon.svg`, `public/icon-*.png` | Icons |
| `src/pages/cv.astro` | CV content (also prints to the PDF) |

The main profile links are configured in `src/consts.ts`.

## Deploy to GitHub Pages

The workflow in `.github/workflows/deploy.yml` builds on every push to `main` and
deploys the `dist/` output with GitHub Pages.

The repository is `ms802x/ms802x.github.io` and the working site URL is
`https://ms802x.github.io/`.

1. Push or merge changes to `main`.
2. Confirm **Settings → Pages → Source** is **GitHub Actions**.
3. The workflow runs automatically.

The workflow sets `SITE_URL` to `https://ms802x.github.io` by default. Override it
with a repository variable named `SITE_URL` if the public domain changes.

### Custom domain

The previous `alhejab.me` domain is currently **not registered/resolving**, so the
site uses the GitHub Pages URL. To restore a custom domain later:

1. Register or fix DNS for the domain and point it at GitHub Pages.
2. Add `public/CNAME` containing only the domain (for example `alhejab.me`).
3. Set the `SITE_URL` repository variable to the full URL.
4. Set the custom domain in **Settings → Pages** and enable **Enforce HTTPS**.

## Performance and quality

The site is intentionally static and lightweight:

- No client UI framework and no web font requests to third parties.
- One small inline theme script and one small script for the theme and copy controls.
- Self-hosted fonts, SVG post illustrations, and a single OG image.
- Semantic HTML, skip link, visible focus styles, and reduced-motion support.

Run Lighthouse locally after a production build:

```bash
npm run build
npm run preview
npx lighthouse http://localhost:4321 --chrome-flags="--headless --no-sandbox"
```

## Analytics

No analytics are enabled. If you add a privacy-friendly provider, keep it off by
default and avoid third-party trackers or paid requirements.

## Project structure

```text
.github/workflows/deploy.yml   GitHub Pages build/deploy
public/                        Fonts, images, icons, OG card
src/components/                Header, footer, post list, icons
scripts/new-post.mjs           `npm run new` scaffold
src/content/blog/              Markdown posts
public/cv/                     Downloadable CV PDF
src/layouts/                   Base and post layouts
src/lib/posts.ts               Sorting, drafts, tags, reading time
src/pages/                     Routes (home, blog, tags, about, CV, RSS, 404)
src/styles/global.css          Design tokens, dark mode, typography
```

The font files in `public/fonts/` are licensed under the SIL Open Font License;
their license texts are included in the same directory. Update the PDF in `public/cv/`
whenever the CV changes.

See [CHECKLIST.md](CHECKLIST.md).
