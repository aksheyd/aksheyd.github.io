import socialAccounts from "@/lib/Socials";
import projects from "@/lib/Projects";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Arrow } from "@/components/ui/arrow";
import RecentPosts from "@/components/RecentPosts";

const featured = projects.filter((project) => project.featured);

export default function HomePage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 min-h-[calc(100dvh-3.5rem)]">
      <main className="lg:col-span-2 h-full w-full border-x border-b border-dashed bg-card overflow-y-auto">
        <div className="mt-10 mx-6 md:mx-10 pb-10">
          <div className="mb-6">
            <p className="text-sm">
              hi, my name is akshey deokule. i love coding, a lot.
            </p>
            <p className="text-sm">currently coding at xAI.</p>
          </div>

          <hr className="border-dashed mb-6 -mx-6 md:-mx-10 w-[calc(100%+3rem)] md:w-[calc(100%+5rem)]" />

          <div className="mb-6">
            <h2 className="text-xl font-medium mb-1 font-serif">socials</h2>
            <ul>
              {socialAccounts
                .filter((account) => account.name !== "huggingface")
                .map((account) => (
                  <li key={account.name}>
                    <a
                      href={account.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs underline decoration-dotted underline-offset-2 hover:decoration-solid"
                    >
                      {account.pretty}
                    </a>
                  </li>
                ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-medium mb-2 font-serif">projects</h2>
            <ul className="mb-3">
              {featured.map((project) => {
                const href = project.link ?? project.repo;
                const name = (
                  <span className="text-xs underline decoration-dotted underline-offset-2 hover:decoration-solid">
                    {project.name}
                  </span>
                );
                return (
                  <li key={project.name}>
                    {href ? (
                      <Link
                        href={href}
                        {...(href.startsWith("/")
                          ? {}
                          : { target: "_blank", rel: "noopener noreferrer" })}
                      >
                        {name}
                      </Link>
                    ) : (
                      name
                    )}
                  </li>
                );
              })}
            </ul>
            <Button variant="link" className="h-auto px-0 text-sm" asChild>
              <Link className="flex items-center gap-2" href="/terminal">
                launch terminal <Arrow direction="right" />
              </Link>
            </Button>
          </div>
        </div>
      </main>

      <div className="border-x border-b lg:border-l-0 border-dashed">
        <RecentPosts />
      </div>
    </div>
  );
}
