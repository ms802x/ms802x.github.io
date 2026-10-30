# Manual launch checklist

- [ ] Replace the remaining LinkedIn, Hugging Face, and Google Scholar placeholders in `src/consts.ts`.
- [ ] Replace the IEEE and Springer placeholders in `src/pages/publications.astro`.
- [ ] Set a GitHub Actions secret named `SITE_PASSWORD` with a real password.
- [ ] Review the sample draft posts in `src/content/blog/` and remove or replace them.
- [ ] Set `PUBLIC_INCLUDE_DRAFTS` to `"false"` in `.github/workflows/deploy.yml` when drafts should be hidden.
- [ ] Use the existing GitHub repository `ms802x/ms802x.github.io` with the `alhejab.me` custom domain.
- [ ] Push the project to the `main` branch.
- [ ] Enable **Settings → Pages → Source: GitHub Actions**.
- [ ] Confirm the first workflow run completes.
- [ ] Open the deployed site and check the password screen.
- [ ] Optional custom domain: set **Settings → Pages → Custom domain**, add the DNS records, set the `SITE_URL` repository variable, and enable **Enforce HTTPS**.
- [ ] Open `/rss.xml` and `/sitemap-index.xml` on the deployed site and check them.
- [ ] Run `npm run check`, `npm run build`, and Lighthouse once more before sharing the site.

> The password gate is client-side visual privacy. The HTML, RSS, sitemap, and assets
> can still be fetched directly by someone who knows the URLs. Use Cloudflare Access
> if you need real access control.
