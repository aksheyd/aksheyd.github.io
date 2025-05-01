import socialAccounts from "@/lib/Socials";
import projects from "@/lib/Projects";
import Link from "next/link";

export default function Page() {
  return (
    <section className="grid grid-cols-12 h-[calc(100vh-3.5rem)] w-full border-l border-r border-b border-dashed bg-card overflow-hidden">
      <div className="h-full col-start-3 col-span-3 py-6 px-10 overflow-auto flex flex-col justify-center">
        <div className="mb-6">
          <p className="text-xl font-semibold font-serif">akshey deokule</p>
          <p className="text-base">software engineer</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-medium mb-1 font-serif">socials</h2>
          <ul className="">
            {socialAccounts.map((account) => (
              <li key={account.name}>
                <a
                  href={account.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs hover:underline"
                >
                  {account.pretty}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-medium mb-2 font-serif">projects</h2>
          <ul className="space-y-1">
            {projects.map((project) => (
              <li key={project.name}>
                {project.link && project.link.startsWith("/") ? (
                  <Link href={project.link} className="text-xs hover:underline">
                    {project.name}
                  </Link>
                ) : project.link ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs hover:underline">
                    {project.name}
                  </a>
                ) : (
                  <span>{project.name} (No Link)</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right Column: Terminal Prompt */}
      <div className="h-full col-start-7 col-span-3 py-6 px-10 flex flex-col justify-center items-center text-center">
        <div className="space-y-5">
           <p className="text-2xl font-semibold">Interact with my work!</p>
           <p className="text-lg text-muted-foreground">
             Explore projects and more through a simulated terminal experience.
           </p>
           {/* Proper link to terminal page */}
           <Link 
             href="/terminal" 
             className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
           >
             Launch Terminal
           </Link>
        </div>
      </div>
    </section>
  );
}