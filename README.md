# DevX-Dragon Portfolio

High-energy personal portfolio. Built with Astro + Tailwind + React + Framer Motion.

## Stack

- **Astro** — static site generator, content collections for projects
- **Tailwind CSS** — utility-first styling
- **React** — interactive components (gallery, modal)
- **Framer Motion** — 3D card tilts, animations
- **Lucide React** — icons
- **GitHub Pages** — hosting

## Getting Started

```bash
npm install
npm run dev
```

## Adding a Project

Drop a `.md` file into `src/content/projects/`. Example:

```md
---
title: "My Cool Build"
description: "What it is and why I built it."
tags: ["Hardware", "Software"]   # Hardware | Software | IRL
images:
  - "/projects/my-build/hero.jpg"
repoUrl: "https://github.com/DevX-Dragon/my-build"
date: "2024-06-01"
featured: false
status: "done"   # done | wip | abandoned
---

Full markdown description here. This shows in the modal.
```

Then put your images in `public/projects/my-build/`.

## Updating Your Status Badge

In `src/pages/index.astro`, find this line and edit it:

```ts
const CURRENT_STATUS = "Currently: soldering a new PCB ⚡";
```

## Deploying to GitHub Pages

1. Push your repo to GitHub
2. Go to Settings → Pages → Source → GitHub Actions
3. Push to `main` — the workflow auto-deploys
4. The footer will show the actual git commit hash automatically

## File Structure

```
devx-dragon/
├── src/
│   ├── content/
│   │   ├── config.ts              # Zod schema for projects
│   │   └── projects/              # Drop .md files here
│   │       ├── esp32-weather-station.md
│   │       ├── keyboard-pcb.md
│   │       └── terminal-portfolio.md
│   ├── components/
│   │   ├── ProjectCard.jsx        # 3D tilt card
│   │   ├── ProjectGallery.jsx     # Search + filter + grid
│   │   └── ProjectModal.jsx       # Full-screen project view
│   ├── layouts/
│   │   └── Layout.astro           # HTML shell, global styles
│   └── pages/
│       └── index.astro            # Main page
├── public/
│   ├── favicon.svg
│   └── projects/                  # Your project images go here
├── .github/workflows/deploy.yml   # GitHub Pages CI
├── astro.config.mjs
├── tailwind.config.mjs
└── package.json
```
