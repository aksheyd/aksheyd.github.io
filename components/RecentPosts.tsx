import { getAllPosts } from "@/lib/BlogPosts";
import Link from "next/link";
import { Arrow } from "@/components/ui/arrow";

function formatDate(date: string) {
  return new Date(date).toISOString().slice(0, 10).replace(/-/g, ".");
}

export default function RecentPosts() {
  const posts = getAllPosts();

  if (posts.length === 0) {
    return (
      <aside className="mt-10 text-center">
        <h2 className="text-xl font-medium mb-2 font-serif">recent posts</h2>
        <p className="text-xs text-muted-foreground">No posts yet.</p>
      </aside>
    );
  }

  return (
    <aside className="mt-10 text-center px-4 pb-10">
      <h2 className="text-xl font-medium mb-2 font-serif">recent posts</h2>
      <ul className="space-y-1 mb-6">
        {posts.slice(0, 5).map((post) => (
          <li key={post.slug} className="text-xs">
            <Link
              href={`/blog/${post.slug}`}
              className="hover:underline font-semibold text-base font-serif block"
            >
              {post.title}
            </Link>
            <span className="block text-xs text-muted-foreground font-mono mb-2">
              {formatDate(post.date)}
            </span>
          </li>
        ))}
        {posts.length > 5 && (
          <li className="text-xs">
            <Link
              href="/blog"
              className="hover:underline font-semibold text-base font-serif inline-flex items-center justify-center gap-2"
            >
              see all posts <Arrow direction="right" />
            </Link>
          </li>
        )}
      </ul>
    </aside>
  );
}
