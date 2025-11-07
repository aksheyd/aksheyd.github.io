"use client";

import { useEffect, useState } from "react";

interface SubstackPost {
  title: string;
  link: string;
  pubDate: string;
}

const SUBSTACK_FEED_URL = "https://aksheyd.substack.com/feed";

export default function RecentPosts() {
  const [posts, setPosts] = useState<SubstackPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Use a CORS proxy to fetch the RSS feed
    fetch(
      `https://api.allorigins.win/get?url=${encodeURIComponent(SUBSTACK_FEED_URL)}`,
    )
      .then((res) => res.json())
      .then((data) => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(data.contents, "text/xml");
        const items = Array.from(xml.querySelectorAll("item")).slice(0, 5);
        const posts = items.map((item) => ({
          title: item.querySelector("title")?.textContent || "",
          link: item.querySelector("link")?.textContent || "",
          pubDate: item.querySelector("pubDate")?.textContent || "",
        }));
        setPosts(posts);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading recent posts...</div>;

  return (
    <aside className="mt-10 text-center">
      <h2 className="text-xl font-medium mb-2 font-serif">recent posts</h2>
      <ul className="space-y-1 mb-6">
        {posts.map((post) => (
          <li key={post.link} className="text-xs">
            <a
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline font-semibold text-base font-serif block"
            >
              {post.title}
            </a>
            <span className="block text-xs text-gray-500 font-sans mb-2">
              {new Date(post.pubDate).toLocaleDateString()}
            </span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
