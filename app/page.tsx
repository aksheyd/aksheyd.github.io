import socialAccounts from "@/lib/Socials";
import projects from "@/lib/Projects";
import contributions from "@/lib/Contributions";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import RecentPosts from "@/components/RecentPosts";
import { Heart } from "lucide-react";
import { Arrow } from "@/components/ui/arrow";

export default function HomePage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3">
      <main className="col-span-2">
        <section className="h-[calc(100vh-3.5rem)] w-full flex justify-center border-l border-r border-b border-dashed bg-card overflow-hidden">
          <div className="h-full mt-10 overflow-auto text-center">
            <div className="mb-6">
              <p className="text-xl font-semibold font-serif">akshey deokule</p>
              <div className="text-base flex gap-1 items-center justify-center">
                <p>i</p> <Heart className="w-4 h-4 inline-block" />{" "}
                <p>coding</p>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-xl text-brown-800 font-medium mb-1 font-serif">
                socials
              </h2>
              <ul className="">
                {socialAccounts.map((account) => (
                  <li key={account.name}>
                    <a
                      href={account.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs underline decoration-dotted decoration-offset-2 hover:decoration-solid"
                    >
                      {account.pretty}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-medium mb-2 font-serif">skills</h2>
              <ul className="space-y-1 mb-6">
                <li className="text-xs">python</li>
                <li className="text-xs">typescript</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-medium mb-2 font-serif">projects</h2>
              <Button variant="link" size="icon" className="mb-4 text-sm ">
                <Link className="ml-4 flex items-center gap-2" href="/terminal">
                  launch terminal <Arrow direction="right" />
                </Link>
              </Button>
              <div className="mb-6">
                <h3 className="text-base font-medium mb-1 font-serif">
                  my favorites
                </h3>
                <ul className="text-sm">
                  {projects
                    .filter((project) => project.featured)
                    .map((project) => (
                      <li key={project.name}>
                        <a
                          href={project.link || project.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs underline decoration-dotted underline-offset-2 hover:decoration-solid"
                        >
                          {project.name}
                        </a>
                      </li>
                    ))}
                </ul>
              </div>
            </div>

            {/* Open Source Contributions Section */}
            <div className="mb-6">
              <h2 className="text-xl font-medium mb-2 font-serif">
                open source contributions
              </h2>
              <ul className="">
                {contributions.map((contribution) => (
                  <li key={contribution.link}>
                    <a
                      href={contribution.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs underline decoration-dotted underline-offset-2 hover:decoration-solid"
                    >
                      {contribution.org}/{contribution.project}: PR #
                      {contribution.link.split("/").pop()}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-10">
              <h2 className="text-xl font-medium mb-2 font-serif">blog</h2>
              <Button variant="link" size="icon" className="mb-6 text-sm">
                <Link className="ml-4 flex items-center gap-2" href="/blog">
                  see recent posts <Arrow direction="right" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <div className="col-span-1 hidden lg:block">
        <RecentPosts />
      </div>
    </div>
  );
}
