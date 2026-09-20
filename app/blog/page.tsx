import BlogPage from "@/components/BlogPage";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("blog", "Writing by Akshey Deokule.");

export default function Page() {
  return (
    <div className="overflow-x-hidden bg-background text-foreground">
      <BlogPage />
    </div>
  );
}
