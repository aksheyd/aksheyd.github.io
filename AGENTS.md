# Overview

## Project Overview

My personal portfolio website built with Next.js, React, TypeScript, Tailwind CSS, and Shadcn UI. Hosted on GitHub Pages as a static site with no server-side functionality. Features a UNIX-style terminal interface for portfolio navigation and MDX-based blog posts.

## Development Commands

### Running the Development Server

```bash
npm run dev
```

Uses Next.js with Turbo mode for fast development.

### Building for Production

```bash
npm run build
```

Generates static export in `out/` directory (configured via `output: "export"` in next.config.ts).

### Preview Production Build

```bash
npm run start
```

### Core Structure

**App Router** (`app/`)

- `app/layout.tsx`: Root layout with theme provider, navigation, and font configuration (Inter + Playfair Display)
- `app/page.tsx`: Landing page
- `app/terminal/page.tsx`: Interactive terminal interface
- `app/blog/page.tsx`: Blog listing
- `app/blog/[slug]/page.tsx`: Dynamic blog post pages using MDX
- Game/project pages: `/destroy-the-wormhole`, `/legend-of-zelda`, `/providence`

**Data Layer** (`lib/`)

- `Projects.ts`: Projects I've worked on with categorization (web-dev, video-games, ai, research)
- `Contributions.ts`: Open source contributions I've made
- `Models.ts`: Models I've fine-tuned
- `Socials.ts`: My social media account links
- `BlogPosts.ts`: File system-based blog post retrieval using gray-matter for frontmatter parsing
- `FileSystem.ts`: Virtual file system tree structure for terminal navigation
- `Utils.ts`: Shared utilities

**Components** (`components/`)

- `Terminal.tsx`: Full terminal emulator with file system navigation, command parsing, and autocomplete
- `Nav.tsx`: Global navigation bar
- `BlogPage.tsx`: Blog post rendering wrapper
- `RecentPosts.tsx`: Blog post listing component
- `ThemeProvider.tsx`: Dark/light mode wrapper (next-themes)
- `ui/`: Shadcn UI components (button, card, dropdown-menu, input, navigation-menu, etc.)

### Terminal System

The terminal implements a custom virtual file system with hierarchical navigation:

**File System Structure:**

```
root/
├── projects/
│   ├── video-games/
│   ├── web-dev/
│   ├── ai/
│   └── research/
├── contributions/
│   └── open-source/
└── fine-tunes/
```

**Terminal Features:**

- Commands: `ls`, `cd`, `cat`, `open`, `clear`, `help`, plus social media shortcuts
- Autocomplete: Tab completion for commands, flags, and file/folder names
- Command history: Arrow key navigation through previous commands
- Data integration: Projects, contributions, and models mapped to file nodes with metadata

**Key Implementation Details:**

- `FileNode` class represents both directories and files
- Files with `data` property contain project/contribution/model metadata
- Folders have `data === undefined` and contain `children`
- Social commands dynamically populated from `Socials.ts`

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

- **Tailwind CSS**: Utility-first styling with custom configuration
- **Shadcn UI**: Component library built on Radix UI primitives
- **Fonts**: Inter (body), Playfair Display (serif headings)
- **Theme**: Dark/light mode support via `next-themes` with system preference detection
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

2. Run `npm run build` to generate static pages

### Adding a Project

1. Add project object to `lib/Projects.ts` array
2. If terminal integration needed, add FileNode to appropriate category folder in `components/Terminal.tsx`
3. Optional: Create dedicated page in `app/your-project/page.tsx`

### Adding UI Components

- Use Shadcn CLI to add components: `npx shadcn@latest add [component]`
- Components added to `components/ui/` with Tailwind styling

## Design Principles

- **Simplicity**: Clean, minimalist UI focused on functionality
- **Static-first**: No server dependencies, fully portable static site
- **Terminal-centric**: Portfolio navigable via UNIX-style terminal interface
- **Type-safe**: Full TypeScript coverage
