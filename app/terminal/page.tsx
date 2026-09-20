import Terminal from "../../components/Terminal";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("terminal", "A UNIX-style portfolio terminal.");

export default function Page() {
  return (
    <div className="overflow-x-hidden bg-background text-foreground">
      <Terminal />
    </div>
  );
}
