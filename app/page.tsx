import Hero from "../components/Hero";
import Nav from "../components/Nav";
import About from "../components/About";
import WorkSection from "../components/WorkSection";
import projects from "@/lib/projects";

export default function Page() {
  return (
    <div className="overflow-x-hidden min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <About />
      <WorkSection
      projects={projects}
      />
    </div>
  );
} 