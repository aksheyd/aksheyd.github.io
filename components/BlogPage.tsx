import { getAllPosts } from "@/lib/BlogPosts";
import Link from "next/link";

export default function BlogPage() {
  const sortedPosts = getAllPosts();

  return (
    <main className="min-h-[calc(100vh-3.5rem)] border-l border-r border-b border-dashed bg-card">
      {sortedPosts.length === 0 ? (
        <p className="px-6 md:px-10 py-10 font-serif text-muted-foreground">
          No posts yet.
        </p>
      ) : (
        <ul>
          {sortedPosts.map((post) => (
            <li
              key={post.slug}
              className="border-b border-dashed last:border-b-0"
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group block px-6 md:px-10 py-6"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <span className="font-serif group-hover:underline decoration-dotted underline-offset-2">
                    {post.title}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground shrink-0">
                    {new Date(post.date)
                      .toISOString()
                      .slice(0, 10)
                      .replace(/-/g, ".")}
                  </span>
                </div>
                {post.tldr && (
                  <p className="text-xs text-muted-foreground mt-1.5">
                    {post.tldr}
                  </p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
