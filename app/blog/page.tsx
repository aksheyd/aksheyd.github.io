import type { Metadata } from "next";
import BlogPage from "@/components/BlogPage";

export const metadata: Metadata = {
  title: "blog",
};

export default function Page() {
  return (
    <div className="overflow-x-hidden bg-background text-foreground">
      <BlogPage />
    </div>
  );
}
