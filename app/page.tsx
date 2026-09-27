import { formatPostDate, getAllPosts } from "@/lib/BlogPosts";
import socialAccounts from "@/lib/Socials";
import Link from "next/link";

const socialOrder = ["github", "x", "linkedin", "huggingface"] as const;

const socialLabels: Record<(typeof socialOrder)[number], string> = {
  github: "GitHub",
  x: "X",
  linkedin: "LinkedIn",
  huggingface: "Hugging Face",
};

const work = [
  {
    name: "desfb",
    href: "https://aksheyd.github.io/desfb/",
    sentence:
      "Interactive companion for the Don Edwards San Francisco Bay National Wildlife Refuge.",
  },
  {
    name: "easy-train",
    href: "https://github.com/aksheyd/easy-train",
    sentence: "Learning about training LLMs with SFT and RL.",
  },
  {
    name: "Dueler's Providence",
    href: "https://aksheyd.itch.io/providence",
    sentence: "A soulslike sword combat game set in ancient Japan.",
  },
] as const;

export default function HomePage() {
  const posts = getAllPosts();
  const socials = socialOrder.flatMap((name) => {
    const account = socialAccounts.find((item) => item.name === name);
    if (!account) {
      return [];
    }
    return [{ name, href: account.website, label: socialLabels[name] }];
  });

  return (
    <main className="mx-auto max-w-xl px-6 py-16">
      <h1 className="text-2xl">Akshey Deokule</h1>
      <p className="mt-4 leading-relaxed">
        I write software at xAI. I live in San Francisco.
      </p>
      <p className="mt-4">
        {socials.map((account, index) => (
          <span key={account.name}>
            {index > 0 ? " / " : null}
            <a
              href={account.href}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2"
            >
              {account.label}
            </a>
          </span>
        ))}
      </p>

      <h2 className="mt-10 text-lg">Writing</h2>
      <ul className="mt-3 space-y-2">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${encodeURIComponent(post.slug)}`}
              className="underline underline-offset-2"
            >
              {post.title}
            </Link>
            <span className="text-neutral-600">
              {" "}
              — {formatPostDate(post.date)}
            </span>
          </li>
        ))}
      </ul>

      <h2 className="mt-10 text-lg">Work</h2>
      <ul className="mt-3 space-y-3">
        {work.map((item) => (
          <li key={item.name}>
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2"
            >
              {item.name}
            </a>
            <span> — {item.sentence}</span>
          </li>
        ))}
      </ul>
    </main>
  );
}
