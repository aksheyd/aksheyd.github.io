import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "posts");

/** Allowed slug characters: letters, digits, dot, underscore, hyphen. */
const SAFE_SLUG = /^[a-zA-Z0-9._-]+$/;

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  tldr: string;
  content: string;
}

/** Derive a URL-safe slug from a post filename (strips .md/.mdx). */
export function slugFromFileName(fileName: string): string {
  return fileName.replace(/\.mdx?$/, "");
}

/** Reject path traversal and other unsafe slug values. */
export function isSafeSlug(slug: string): boolean {
  return slug.length > 0 && SAFE_SLUG.test(slug) && !slug.includes("..");
}

export function getAllPosts(): BlogPost[] {
  const fileNames = fs.readdirSync(postsDirectory);

  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith(".md") || fileName.endsWith(".mdx"))
    .map((fileName) => {
      const slug = slugFromFileName(fileName);
      if (!isSafeSlug(slug)) {
        return null;
      }

      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title || slug,
        date: data.date || "",
        tldr: data.tldr || "",
        content,
      };
    })
    .filter((post): post is BlogPost => post !== null);

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getPostBySlug(slug: string): BlogPost | null {
  if (!isSafeSlug(slug)) {
    return null;
  }

  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    let fileContents: string;

    try {
      fileContents = fs.readFileSync(fullPath, "utf8");
    } catch {
      const mdPath = path.join(postsDirectory, `${slug}.md`);
      fileContents = fs.readFileSync(mdPath, "utf8");
    }

    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title || slug,
      date: data.date || "",
      tldr: data.tldr || "",
      content,
    };
  } catch {
    return null;
  }
}

export function getAllPostSlugs(): string[] {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith(".md") || fileName.endsWith(".mdx"))
    .map(slugFromFileName)
    .filter(isSafeSlug);
}
