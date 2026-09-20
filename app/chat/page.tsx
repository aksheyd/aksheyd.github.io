import Chat from "@/components/Chat";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("chat", "An LLM chat running entirely in your browser.");

export default function Page() {
  return (
    <div className="overflow-x-hidden bg-background text-foreground">
      <Chat />
    </div>
  );
}
