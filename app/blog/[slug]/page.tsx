import { getPostBySlug, getAllPostSlugs } from "@/lib/BlogPosts";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} - Akshey Deokule`,
    description: post.tldr,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-[calc(100vh-3.5rem)] w-full flex justify-center border-l border-r border-b border-dashed bg-card">
      <article className="max-w-3xl w-full px-6 py-10">
        <Link
          href="/blog"
          className="hover:underline decoration-dotted underline-offset-2 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to blog
        </Link>

        <header className="mb-8">
          <h1 className="text-4xl font-bold font-serif mb-3">{post.title}</h1>
          <div className="space-y-2 text-sm text-muted-foreground">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <p className="text-sm text-muted-foreground">{post.tldr}</p>
          </div>
        </header>

        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <MDXRemote source={post.content} />
        </div>
      </article>
    </div>
  );
}
