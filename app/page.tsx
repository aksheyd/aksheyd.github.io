import Nav from "@/components/Nav";
import Terminal from "../components/Terminal";

export default function Page() {
  return (
    <div className="overflow-x-hidden max-h-screen bg-background text-foreground">
      <Nav/>
      <Terminal />
    </div>
  );
} 