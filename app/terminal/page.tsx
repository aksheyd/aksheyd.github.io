import type { Metadata } from "next";
import Terminal from "../../components/Terminal";

export const metadata: Metadata = {
  title: "terminal",
};

export default function Page() {
  return (
    <div className="overflow-x-hidden bg-background text-foreground">
      <Terminal />
    </div>
  );
}
