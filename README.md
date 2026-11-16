# Modern Portfolio

Portfolio site for Tal Hollingsworth built with Next.js (App Router, static export), React, TypeScript and Tailwind CSS.

- **Parallax scrolling**: `components/Parallax.tsx` (rAF-throttled, automatically disabled for `prefers-reduced-motion`).
- **Responsive**: mobile-first Tailwind layout with a collapsible nav.
- **Accessible (WCAG 2.2 AA target)**: skip link, landmarks, labelled sections, visible focus, 44px touch targets, alt text, reduced-motion support. Verified with axe-core (0 violations).
- **Content**: `data/profile.json` holds all content migrated from the previous Jekyll site.

## Develop

```bash
npm install
npm run dev
npm run build   # static site in ./out
```

## Keeping LinkedIn data up to date

LinkedIn has no public API for reading your own profile, so the site syncs from LinkedIn's official data export:

1. LinkedIn → Settings & Privacy → Data privacy → **Get a copy of your data** → select Positions, Education, Skills, Profile → download and unzip.
2. Run `npm run sync:linkedin -- path/to/unzipped-export`.
3. Commit the updated `data/linkedin.json`; pushing to `main` redeploys.

Fields present in `data/linkedin.json` (headline, summary, skills, experience, education) override the defaults in `data/profile.json`. Reset the file to `{}` to revert.

## Deploy

`.github/workflows/deploy.yml` builds and publishes to GitHub Pages on every push to `main`. In the repo, enable **Settings → Pages → Source: GitHub Actions**. For a custom domain or a `<user>.github.io` repo, remove the `BASE_PATH` env in the workflow.
