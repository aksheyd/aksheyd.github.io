import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/BlogPosts";

export const dynamic = "force-static";

const BASE_URL = "https://aksheyd.github.io";

export default function sitemap(): MetadataRoute.Sitemap {
  // Exported HTML is file-based (out/foo.html), so canonical URLs have no trailing slash
  const home: MetadataRoute.Sitemap = [{ url: `${BASE_URL}/` }];

  const posts: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${BASE_URL}/blog/${encodeURIComponent(post.slug)}`,
    lastModified: post.date || undefined,
  }));

  return [...home, ...posts];
}
