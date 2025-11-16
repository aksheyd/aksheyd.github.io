import { getAllPosts } from "@/lib/BlogPosts";
import Link from "next/link";
import { useMemo } from "react";
import { Arrow } from "@/components/ui/arrow";

export default function RecentPosts() {
  const posts = useMemo(() => getAllPosts(), []);
  const sortedPosts = useMemo(
    () =>
      posts.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      ),
    [posts]
  );

  if (sortedPosts.length === 0) {
    return (
      <aside className="mt-10 text-center">
        <h2 className="text-xl font-medium mb-2 font-serif">recent posts</h2>
        <p className="text-xs text-muted-foreground">No posts yet.</p>
      </aside>
    );
  }

  return (
    <aside className="mt-10 text-center">
      <h2 className="text-xl font-medium mb-2 font-serif">recent posts</h2>
      <ul className="space-y-1 mb-6">
        {sortedPosts.slice(0, 5).map((post) => (
          <li key={post.slug} className="text-xs">
            <Link
              href={`/blog/${post.slug}`}
              className="hover:underline font-semibold text-base font-serif block"
            >
              {post.title}
            </Link>
            <span className="block text-xs text-gray-500 font-sans mb-2">
              {new Date(post.date).toLocaleDateString()}
            </span>
          </li>
        ))}
        {sortedPosts.length > 5 && (
          <li className="text-xs">
            <Link
              href="/blog"
              className="hover:underline font-semibold text-base font-serif block"
            >
              see all posts <Arrow direction="right" />
            </Link>
          </li>
        )}
      </ul>
    </aside>
  );
}
