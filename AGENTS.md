# Overview

## Project Overview

My personal portfolio website built with Next.js, React, TypeScript, Tailwind CSS, and Shadcn UI. Hosted on GitHub Pages as a static site with no server-side functionality. Features a UNIX-style terminal interface for portfolio navigation, an in-browser WebLLM chat, and MDX-based blog posts.

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

- `app/layout.tsx`: Root layout with theme provider, navigation, and font configuration (Inter + Playfair Display)
- `app/page.tsx`: Landing page
- `app/terminal/page.tsx`: Interactive terminal interface
- `app/chat/page.tsx`: In-browser WebLLM chat
- `app/blog/page.tsx`: Blog listing
- `app/blog/[slug]/page.tsx`: Dynamic blog post pages using MDX
- Game/project pages: `/destroy-the-wormhole`, `/legend-of-zelda`, `/providence`

**Data Layer** (`lib/`)

- `Projects.ts`: Projects with a `category` field (`web-dev`, `video-games`, `ai`, `research`)
- `Contributions.ts`: Open source contributions
- `Models.ts`: Fine-tuned models
- `Socials.ts`: Social media account links
- `BlogPosts.ts`: File-system blog post retrieval using gray-matter
- `FileSystem.ts`: `FileNode` class for the terminal tree
- `terminal/fs.ts`: Builds the virtual file system from the data files
- `terminal/readline.ts`: History, paste, and tab-complete helpers
- `utils.ts`: `cn()` class-name helper

**Components** (`components/`)

- `Terminal.tsx`: Terminal emulator (input, history, keybindings)
- `terminal/`: Command runner, tab completion, and display helpers
- `Chat.tsx`: WebLLM chat panel
- `Nav.tsx`: Global navigation bar
- `BlogPage.tsx`: Blog listing
- `RecentPosts.tsx`: Homepage post list
- `GamePage.tsx` / `UnityEmbed.tsx`: Shared layout for playable Unity pages
- `ThemeProvider.tsx`: Dark/light mode wrapper (next-themes)
- `ui/`: Shadcn UI primitives actually in use (`button`, `arrow`, `mode-toggle`)

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

- Commands: `ls`, `cd`, `cat`, `open`, `pwd`, `whoami`, `tree`, `clear`, `help`, `exit`, plus social media shortcuts
- Autocomplete: Tab completion for commands, flags, and file/folder names
- Command history: Arrow key navigation through previous commands
- Data integration: Projects, contributions, and models mapped to file nodes with metadata

**Key Implementation Details:**

- `FileNode` class represents both directories and files
- Files with `data` property contain project/contribution/model metadata
- Folders have `data === undefined` and contain `children`
- Project files are placed from `Project.category` in `lib/terminal/fs.ts`
- Social commands are populated from `Socials.ts`

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

- **Tailwind CSS v3**: Utility-first styling. Color tokens are oklch CSS variables mapped as `var(--token)` (not `hsl(var(--token))`).
- **Shadcn UI**: Component library built on Radix UI primitives
- **Fonts**: Inter (body), Playfair Display (`font-serif` headings)
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

2. Run `pnpm build` to generate static pages

### Adding a Project

1. Add a project object to `lib/Projects.ts` with a `category` of `web-dev`, `video-games`, `ai`, or `research`
2. The terminal file tree picks it up from `category`. Do not add a FileNode by hand.
3. Optional: set `featured: true` to list it on the homepage
4. Optional: create a dedicated page in `app/your-project/page.tsx`

### Adding UI Components

- Use Shadcn CLI to add components: `pnpm dlx shadcn@latest add [component]`
- Components added to `components/ui/` with Tailwind styling

## Design Principles

- **Simplicity**: Clean, minimalist UI focused on functionality
- **Static-first**: No server dependencies, fully portable static site
- **Terminal-centric**: Portfolio navigable via UNIX-style terminal interface
- **Type-safe**: Full TypeScript coverage
