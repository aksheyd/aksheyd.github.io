import { formatPostDate, getAllPostSlugs, getPostBySlug } from "@/lib/BlogPosts";
import { pageMetadata } from "@/lib/metadata";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const meta = pageMetadata(post.title, post.tldr);
  return {
    ...meta,
    openGraph: { ...meta.openGraph, type: "article" },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-xl px-6 py-16">
      <article>
        <header className="mb-8">
          <h1 className="text-2xl">{post.title}</h1>
          <time dateTime={post.date} className="mt-2 block text-neutral-600">
            {formatPostDate(post.date)}
          </time>
        </header>

        <div className="prose prose-neutral max-w-none prose-blockquote:before:content-none prose-blockquote:after:content-none [&_blockquote_p]:before:content-none [&_blockquote_p]:after:content-none">
          <MDXRemote source={post.content} />
        </div>
      </article>
    </main>
  );
}
