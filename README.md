# aksheyd.github.io

my personal site.

## adding a post

make a markdown file in `posts/`, like `posts/my-post.md`:

```
---
title: "My Post"
date: "2026-09-26"
---

words go here.
```

basic markdown works: headings, lists, quotes, links, and raw html.

then run:

```
node build.mjs
```

that makes `blog/my-post.html`, adds the post to the list on the homepage, and updates `sitemap.xml`. pushing to `main` runs the same script and deploys the site.

stick to characters you can type on a keyboard: straight quotes, `...`, and `-`.

## seeing it locally

open `index.html` in a browser, or run `python3 -m http.server` and go to http://localhost:8000.

p.s. [whatsup](https://aksheyd.github.io/whatsup/) and [desfb](https://aksheyd.github.io/desfb/) live here too.
