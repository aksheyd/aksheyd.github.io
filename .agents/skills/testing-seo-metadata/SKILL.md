---
name: testing-seo-metadata
description: How to verify Next.js metadata (OG/Twitter tags, icons, robots.txt, sitemap.xml, title templates) end-to-end on this static-export portfolio site
---

# Testing SEO / metadata changes on aksheyd.github.io

## Environment

- Node is NOT on PATH by default. Always run:
  `export PATH=$HOME/.nvm/versions/node/v24.19.0/bin:$PATH`
- Dev server: `pnpm dev` (Next.js Turbopack, port 3000). `pnpm build` emits static export to `out/`.
- Chrome runs on DISPLAY=:0 (remote-debugging-port=29229).

## Verifying head metadata in the browser

- To dump all meta/link tags visually in DevTools console (Ctrl+Shift+J):
  `[...document.head.querySelectorAll('meta,link')].map(e=>e.outerHTML).forEach(h=>console.log(h))`
- `document.title` is the reliable check for title templates (tab text is truncated).

## Dev vs production gotcha

- In `pnpm dev`, file-based image URLs (`og:image`, `twitter:image`) resolve to the dev origin
  (`http://localhost:3000/...`) even when `metadataBase` is set. To verify the absolute production
  URL (`https://aksheyd.github.io/...`), run `pnpm build` and grep `out/index.html`:
  `grep -o '<meta property="og:image"[^>]*>' out/index.html`
- robots.txt and sitemap.xml are served in dev at /robots.txt and /sitemap.xml and prerendered
  into `out/` at build time.
- Static export is file-based (`out/foo.html`): canonical/sitemap URLs must have NO trailing slash
  (a `/foo/` URL 404s on GitHub Pages).

## Useful checks

- Favicon: zoom the browser tab strip; SVG icon may only appear after page load settles.
- Sitemap count = static routes + `posts/*.mdx` slugs (via `getAllPosts()` in lib/BlogPosts.ts).
- Per-page titles live as `metadata.title` in each `app/<route>/page.tsx`; blog posts use
  `generateMetadata` in `app/blog/[slug]/page.tsx` returning `post.title` so the layout
  template `"%s · Akshey Deokule"` applies.
