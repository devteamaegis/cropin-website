# cropin-website

A static offline mirror of [cropin.com](https://www.cropin.com/) — the Cropin marketing site captured as plain HTML, CSS, JavaScript, images, videos, and Lottie animations. No build step; serve the folder directly.

**Live demo:** [https://cropin-website.vercel.app](https://cropin-website.vercel.app)

## What this is

This repository is a **wget static export** of cropin.com, trimmed to the pages and assets needed to run the site locally or on static hosting (Vercel). It is not the live WordPress backend — forms, analytics, and some third-party embeds point off-site or are inert offline.

### Pages included (18)

| Route | Description |
|-------|-------------|
| `/` | Homepage — hero video, ecosystem Lottie, carousels |
| `/about` | About Cropin, leadership, partner video |
| `/agriculture-digital-public-infrastructure` | AgriStack / DPI |
| `/ai-powered-intelligent-agriculture` | AI agriculture solutions |
| `/career` | Careers |
| `/case-study` | Case studies listing |
| `/cashew` | Cashew industry page |
| `/cocoa` | Cocoa industry page |
| `/coffee` | Coffee industry page |
| `/compliance-regulations-eudr` | EUDR compliance |
| `/connect` | Contact / demo |
| `/consumer-packed-foods` | CPG / FMCG |
| `/corns-maize` | Corn & maize |
| `/cotton` | Cotton |
| `/crop-knowledge-grid` | Crop knowledge grid |
| `/cropin-ai-info` | Cropin AI info |
| `/glossary` | Glossary listing |
| `/white_paper` | White papers listing |

Also includes `/cropin-ecosystem` (linked from the homepage).

### What’s in the repo

```
├── index.html              # Homepage
├── mirror-fixes.js         # Offline fixes: hero video + Lottie animations
├── vercel.json             # Static hosting config
├── about/ … white_paper/   # Page HTML (one folder per route)
├── wp-content/             # Themes, plugins, uploads (images, Lottie JSON, videos)
└── wp-includes/            # WordPress core JS (jQuery, etc.)
```

### Animations & media

`mirror-fixes.js` runs on every included page and:

- Plays the **homepage hero background video** (`home-banner-video-updated-compressed.mp4`)
- Loads **Lottie animations** (ecosystem diagram, EUDR hero, agristack, AI page, etc.)
- Fixes **local video paths** on `/about` and other pages

Without this script, WP Rocket + Elementor init often fail on static hosting.

## Run locally

From this directory:

```bash
python3 -m http.server 8888
```

Open [http://localhost:8888](http://localhost:8888)

Use a **hard refresh** (`Cmd+Shift+R` / `Ctrl+Shift+R`) after pulling updates.

> Do not use `file://` — animations and assets require an HTTP server.

### Other local servers

```bash
npx serve -l 8888 .
# or
php -S localhost:8888 .
```

## Deploy to Vercel

This repo is configured for Vercel static hosting (`vercel.json`). Connect the GitHub repo or:

```bash
vercel --prod --archive=tgz
```

## Known offline limitations

These work on the live site but not in this static mirror:

- **Zoho** lead-capture forms and popups
- **YouTube** video embeds (testimonials)
- **Google Analytics / GTM**
- Some **Swiper carousels** if Elementor JS does not fully init (scripts load from cropin.com CDN)
- Links to **blog posts**, **newsroom**, and other pages not included in this trimmed mirror

## Source

Mirrored from `https://www.cropin.com/` for local replication and design reference. All content © Cropin.
