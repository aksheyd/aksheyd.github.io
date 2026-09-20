import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/BlogPosts";

export const dynamic = "force-static";

const BASE_URL = "https://aksheyd.github.io";

const ROUTES = [
  "",
  "/terminal",
  "/chat",
  "/blog",
  "/destroy-the-wormhole",
  "/legend-of-zelda",
  "/providence",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  // Exported HTML is file-based (out/foo.html), so canonical URLs have no trailing slash
  const routes: MetadataRoute.Sitemap = ROUTES.map((route) => ({
    url: `${BASE_URL}${route || "/"}`,
  }));

  const posts: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${BASE_URL}/blog/${encodeURIComponent(post.slug)}`,
    lastModified: post.date || undefined,
  }));

  return [...routes, ...posts];
}
