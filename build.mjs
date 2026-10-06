import { mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const SITE = "https://aksheyd.github.io";
const NAME = "Akshey Deokule";
const PROJECTS = ["desfb", "fivebyfive", "threejam", "whatsup"];

process.chdir(dirname(fileURLToPath(import.meta.url)));

const escapeHtml = (text) => text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const escapeAttr = (text) => escapeHtml(text).replace(/"/g, "&quot;");

function emphasis(text) {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/(^|[^\w*])([_*])(?=\S)(.+?)(?<=\S)\2(?![\w*])/g, "$1<em>$3</em>");
}

function inline(text) {
  return text
    .split(/(\[[^\]]+\]\([^)\s]+\))/)
    .map((part) => {
      const link = part.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
      if (link) {
        return `<a href="${escapeAttr(link[2])}">${emphasis(escapeHtml(link[1]))}</a>`;
      }
      return emphasis(escapeHtml(part));
    })
    .join("")
    .replace(/\\\n/g, "<br>\n")
    .replace(/(?<!<br>)\n/g, " ");
}

const HEADING = /^(#{1,6})\s+(.*)$/;
const RULE = /^(-{3,}|\*{3,})\s*$/;
const BULLET = /^[-*]\s+/;
const NUMBERED = /^\d+\.\s+/;

function markdown(source) {
  const lines = source.split(/\r?\n/);
  const html = [];
  let i = 0;
  const take = (keep) => {
    const taken = [];
    while (i < lines.length && keep(lines[i])) {
      taken.push(lines[i++]);
    }
    return taken;
  };
  const isParagraphLine = (line) =>
    line.trim() !== "" && ![HEADING, RULE, BULLET, NUMBERED].some((re) => re.test(line)) && !line.startsWith(">");

  while (i < lines.length) {
    const line = lines[i];
    const heading = line.match(HEADING);
    if (!line.trim()) {
      i++;
    } else if (heading) {
      const level = Math.max(2, heading[1].length);
      html.push(`<h${level}>${inline(heading[2].trim())}</h${level}>`);
      i++;
    } else if (RULE.test(line)) {
      html.push("<hr>");
      i++;
    } else if (line.startsWith(">")) {
      const quote = take((l) => l.startsWith(">")).map((l) => l.replace(/^>\s?/, ""));
      html.push(`<blockquote><p>${inline(quote.join("\n"))}</p></blockquote>`);
    } else if (BULLET.test(line)) {
      const items = take((l) => BULLET.test(l)).map((l) => `<li>${inline(l.replace(BULLET, "").trim())}</li>`);
      html.push(`<ul>\n${items.join("\n")}\n</ul>`);
    } else if (NUMBERED.test(line)) {
      const items = take((l) => NUMBERED.test(l)).map((l) => `<li>${inline(l.replace(NUMBERED, "").trim())}</li>`);
      html.push(`<ol>\n${items.join("\n")}\n</ol>`);
    } else if (line.startsWith("<")) {
      html.push(take((l) => l.trim() !== "").join("\n"));
    } else {
      const paragraph = take(isParagraphLine).map((l) => l.trim());
      html.push(`<p>${inline(paragraph.join("\n"))}</p>`);
    }
  }
  return html.join("\n");
}

function readPost(file) {
  const slug = file.replace(/\.md$/, "");
  if (!/^[a-z0-9-]+$/.test(slug)) {
    throw new Error(`posts/${file}: use lowercase letters, digits, and hyphens in the file name`);
  }
  const match = readFileSync(`posts/${file}`, "utf8").match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    throw new Error(`posts/${file}: start the file with --- frontmatter ---`);
  }
  const meta = {};
  for (const line of match[1].split(/\r?\n/)) {
    const colon = line.indexOf(":");
    if (colon > 0) {
      meta[line.slice(0, colon).trim()] = line.slice(colon + 1).trim().replace(/^"(.*)"$/, "$1");
    }
  }
  for (const key of ["title", "date"]) {
    if (!meta[key]) {
      throw new Error(`posts/${file}: frontmatter needs ${key}`);
    }
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(meta.date)) {
    throw new Error(`posts/${file}: date must look like 2026-04-19`);
  }
  const pretty = new Date(`${meta.date}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
  return { slug, title: meta.title, date: meta.date, pretty, body: markdown(match[2]) };
}

function essayPage(post) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(`${post.title} - ${NAME}`)}</title>
<link rel="canonical" href="${SITE}/blog/${post.slug}">
<link rel="stylesheet" href="../style.css">
</head>
<body>
<div class="page">
<main class="essay">
<h1>${escapeHtml(post.title)}</h1>
<p class="dateline"><time datetime="${post.date}">${post.pretty}</time></p>
${post.body}
</main>
</div>
</body>
</html>
`;
}

const posts = readdirSync("posts")
  .filter((file) => file.endsWith(".md"))
  .map(readPost)
  .sort((a, b) => b.date.localeCompare(a.date));

mkdirSync("blog", { recursive: true });
for (const file of readdirSync("blog")) {
  if (file.endsWith(".html")) {
    rmSync(`blog/${file}`);
  }
}
for (const post of posts) {
  writeFileSync(`blog/${post.slug}.html`, essayPage(post));
}

const list = posts
  .map((post) => `<p><a href="blog/${post.slug}.html">${escapeHtml(post.title)}</a> <time datetime="${post.date}">${post.pretty}</time></p>`)
  .join("\n");
const index = readFileSync("index.html", "utf8");
const markers = /<!-- posts -->[\s\S]*<!-- \/posts -->/;
if (!markers.test(index)) {
  throw new Error("index.html: put <!-- posts --> and <!-- /posts --> around the Writings list");
}
writeFileSync("index.html", index.replace(markers, `<!-- posts -->\n${list}\n<!-- /posts -->`));

const urls = [
  `  <url>\n    <loc>${SITE}/</loc>\n  </url>`,
  ...PROJECTS.map((slug) => `  <url>\n    <loc>${SITE}/${slug}/</loc>\n  </url>`),
  ...posts.map((post) => `  <url>\n    <loc>${SITE}/blog/${post.slug}</loc>\n    <lastmod>${post.date}</lastmod>\n  </url>`),
];
writeFileSync(
  "sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`,
);

console.log(`Built ${posts.length} posts.`);
