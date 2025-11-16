import { getAllPosts } from "@/lib/BlogPosts";
import Link from "next/link";
import { useMemo } from "react";

export default function BlogPage() {
  const posts = useMemo(() => getAllPosts(), []);
  const sortedPosts = useMemo(
    () =>
      posts.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      ),
    [posts]
  );
  return (
    <div className="min-h-[calc(100vh-3.5rem)] w-full flex justify-center border-l border-r border-b border-dashed">
      <div className="max-w-3xl w-full px-6 py-10">
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="font-serif text-muted-foreground">No posts yet.</p>
          </div>
        ) : (
          <div className="w-full">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-dashed">
                  <th className="text-left pb-4 font-serif text-lg">title</th>
                  <th className="text-left pb-4 font-serif text-lg">date</th>
                  <th className="text-left pb-4 font-serif text-lg">tldr</th>
                </tr>
              </thead>
              <tbody className="space-y-2">
                {sortedPosts.map((post) => (
                  <tr
                    key={post.slug}
                    className="border-b border-dashed border-border/30 last:border-b-0"
                  >
                    <td className="py-4 pr-8">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="hover:underline decoration-dotted underline-offset-2 font-serif text-base"
                      >
                        {post.title}
                      </Link>
                    </td>
                    <td className="py-4 pr-8 text-sm text-muted-foreground">
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="py-4 pr-8 text-xs truncate max-w-40">
                      {post.tldr}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
