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

## Image credits

Background photos are from [Unsplash](https://unsplash.com) and credited in the site footer (`photoCredits` in `app/page.tsx`). When adding a photo, keep the photographer's name and photo ID from the original filename (`name-PHOTOID-unsplash.jpg`) and add an entry there. Project screenshots and the testimonial portrait are the author's own work or supplied by the person pictured.

## Testing & accessibility

```bash
npx playwright install chromium   # one-time browser download
npm test                # all Playwright tests (builds and serves ./out)
npm run test:a11y       # axe-core WCAG 2.0/2.1 A + AA scan (ADA compliance)
npm run test:responsive # layout, nav and touch-target checks
npm run test:ui         # interactive Playwright runner
npm run storybook       # component previews with the a11y panel (port 6006)
```

Every spec runs at three viewports (mobile, tablet, desktop) defined in `playwright.config.ts`. CI runs the tests before deploying, so a failing test blocks the release. Automated scans catch only part of WCAG, so keep doing manual keyboard and screen-reader checks.

## Keeping LinkedIn data up to date

LinkedIn has no public API for reading your own profile, so the site syncs from LinkedIn's official data export:

1. In LinkedIn, go to **Settings & Privacy → Data privacy → Get a copy of your data**.
2. Select **Profile**, **Experience** (or **Positions**), **Education**, and **Skills** when LinkedIn offers individual data-file choices. A **Profile**-only archive contains `Profile.csv` and updates only the headline and summary.
3. If those individual choices are not available, request the larger/full archive instead. LinkedIn may delay the download; wait for its email before downloading and unzipping the archive.
4. Confirm the unzipped directory contains `Profile.csv`, `Positions.csv`, `Education.csv`, and `Skills.csv`. Missing files are skipped, so the corresponding fields remain empty.
5. Run `npm run sync:linkedin -- path/to/unzipped-export`.
6. Commit the updated `data/linkedin.json`; pushing to `main` redeploys.

Fields present in `data/linkedin.json` (headline, summary, skills, experience, education) override the defaults in `data/profile.json`. Reset the file to `{}` to revert.

## Deploy

`.github/workflows/deploy.yml` builds and publishes to GitHub Pages on every push to `main`. This repo is `talHollingsworth.github.io`, so the site is served from the root and no `BASE_PATH` is set. **Settings → Pages → Source** must be **GitHub Actions**. If you host it under a repo sub-path instead, set `BASE_PATH` (e.g. `/repo-name`) in the build step.
