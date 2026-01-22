import socialAccounts from "@/lib/Socials";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Arrow } from "@/components/ui/arrow";
import RecentPosts from "@/components/RecentPosts";

export default function HomePage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3">
      <main className="col-span-2 min-h-[calc(100vh-3.5rem)] w-full border-l border-r border-b border-dashed bg-card">
        <div className="mt-10 mx-6 md:mx-10">
          <div className="mb-6">
            <p className="text-sm">
              hi, my name is akshey deokule. i love coding, a lot.
            </p>
            <p className="text-sm">currently coding at xAI.</p>
          </div>

          <hr className="border-dashed mb-6 -mx-6 md:-mx-10 w-[calc(100%+3rem)] md:w-[calc(100%+5rem)]" />

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
            <h2 className="text-xl font-medium mb-2 font-serif">projects</h2>
            <Button variant="link" size="icon" className="text-sm">
              <Link className="flex items-center gap-2" href="/terminal">
                launch terminal <Arrow direction="right" />
              </Link>
            </Button>
          </div>
        </div>
      </main>

      <div className="col-span-1 hidden lg:block">
        <RecentPosts />
      </div>
    </div>
  );
}
