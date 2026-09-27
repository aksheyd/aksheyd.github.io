# Overview

## Project Overview

My personal portfolio website built with Next.js, React, TypeScript, and Tailwind CSS. Hosted on GitHub Pages as a static site with no server-side functionality. One page: name, a short bio, social links, two essays, and a short list of work. Essays are MDX posts.

## README

Do not edit `README.md` unless the user explicitly asks to change it.

On origin, keep only `main` and `old-2026-09-26` unless Akshey specifies otherwise.

## Development Commands

Use pnpm (`packageManager` is pinned in `package.json`).

### Running the Development Server

```bash
pnpm dev
```

Uses Next.js with Turbo mode for fast development.

### Building for Production

```bash
pnpm build
```

Generates static export in `out/` directory (configured via `output: "export"` in next.config.ts).

### Typecheck

```bash
pnpm typecheck
```

### Core Structure

**App Router** (`app/`)

- `app/layout.tsx`: Root layout and font (Inter)
- `app/page.tsx`: The site: name, bio, links, writing, and work
- `app/blog/[slug]/page.tsx`: Essay pages using MDX
- `app/sitemap.ts` and `app/robots.ts`: Static SEO files

**Data Layer** (`lib/`)

- `Socials.ts`: GitHub, X, LinkedIn, and Hugging Face
- `BlogPosts.ts`: File-system blog post retrieval using gray-matter
- `metadata.ts`: Shared title and description helper for essays

### Blog System

**Content Storage:**

- Blog posts stored as `.md` or `.mdx` files in `posts/` directory
- Frontmatter parsed with gray-matter (fields: `title`, `date`, `tldr`)

**Rendering:**

- `MDXRemote` from `next-mdx-remote/rsc` for server-side MDX rendering
- Tailwind Typography plugin (`prose`) for styling
- Static paths generated via `generateStaticParams()` for all posts

**Blog Post Structure:**

```typescript
interface BlogPost {
  slug: string;
  title: string;
  date: string;
  tldr: string;
  content: string;
}
```

### Styling

- **Tailwind CSS v3**: Utility-first styling
- **Fonts**: Inter
- **Typography**: `@tailwindcss/typography` for prose content

## Adding New Content

### Adding a Blog Post

1. Create `posts/your-slug.mdx` with frontmatter:

```mdx
---
title: "Your Title"
date: "2025-11-23"
tldr: "Brief summary"
---

Your content here...
```

2. Run `pnpm build` to generate static pages

### Adding work

Add a name, one sentence, and one URL to the work list in `app/page.tsx`. Do not add a route for that project in this repo.

## Design Principles

- **Simplicity**: One page. Name, bio, links, essays, work.
- **Static-first**: No server dependencies, fully portable static site
- **Type-safe**: Full TypeScript coverage
