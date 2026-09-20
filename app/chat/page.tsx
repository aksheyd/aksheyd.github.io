import type { Metadata } from "next";
import Chat from "@/components/Chat";

export const metadata: Metadata = {
  title: "chat",
};

export default function Page() {
  return (
    <div className="overflow-x-hidden bg-background text-foreground">
      <Chat />
    </div>
  );
}
