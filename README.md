# DevX-Dragon Portfolio

A React + Vite + Tailwind portfolio with a built-in visual CMS, built as a
static site for GitHub Pages.

## Stack

- React 18 + Vite
- Tailwind CSS (flat, single-accent design system — no gradients)
- Framer Motion for interactions (tilt cards, modals, accordions)
- lucide-react for icons
- canvas-confetti for the star/send feedback

## Getting started

```bash
npm install
npm run dev       # local dev server
npm run build     # production build -> dist/
npm run preview   # preview the production build locally
```

## Editing your projects

There are two ways to manage the project list:

1. **Edit the file directly.** Update `src/data/projects.json` and rebuild.
   This is the source of truth for a fresh deploy.
2. **Use the in-browser admin panel.** Press `Ctrl+Shift+A` anywhere on the
   site (or click "admin" in the footer / the gear icon in the nav) to open
   a drawer where you can add, edit, filter, and delete projects. Changes
   save to `localStorage` and update the live page instantly, but **only in
   your own browser** — they are not written back to the repo automatically.
   When you're happy with your changes, click **Copy JSON** or
   **Download projects.json** in the admin panel, then replace the contents
   of `src/data/projects.json` with it and commit. That's what makes the
   change permanent for every visitor.

## Deploying to GitHub Pages

### Option A — GitHub Actions (recommended)

This repo includes `.github/workflows/deploy.yml`, which builds and deploys
automatically on every push to `main`.

1. In your repo, go to **Settings → Pages** and set **Source** to
   "GitHub Actions".
2. Push to `main`. The workflow builds the site and publishes `dist/`.

### Option B — `gh-pages` branch

```bash
npm run deploy
```

This uses the `gh-pages` package (already in `devDependencies`) to push the
built `dist/` folder to a `gh-pages` branch. Then set **Settings → Pages →
Source** to the `gh-pages` branch.

### Important: set the correct `base` path

In `vite.config.js`:

- Deploying to `https://<username>.github.io/<repo-name>/` (a project page)
  → keep `base: "/<repo-name>/"` and set it to your actual repo name.
- Deploying to `https://<username>.github.io/` (a user/org root site, repo
  named `<username>.github.io`) → change it to `base: "/"`.

## Customizing

- **Colors/type**: `tailwind.config.js` — single indigo accent (`#4F46E5`)
  plus a restrained emerald used only for success/status states.
- **Copy**: hero headline and bio live in `src/components/Hero.jsx`;
  experience timeline in `src/components/Timeline.jsx`; skills in
  `src/components/Skills.jsx`.
- **Social links**: `src/components/Footer.jsx`.
- **Dragon mascot quotes**: `STATUS_QUOTES` array in
  `src/components/DragonMascot.jsx`.

## Notes

- The contact form has no backend — it gives visual confirmation (confetti +
  toast) but doesn't send anything. Wire `handleSubmit` in
  `src/components/Contact.jsx` to a service like Formspree, Resend, or your
  own API before relying on it.
- All interactivity (CMS, cursor, confetti, tilt) runs entirely client-side,
  so the site works unmodified on GitHub Pages with no server component.
