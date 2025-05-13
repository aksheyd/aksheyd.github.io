import socialAccounts from "@/lib/Socials";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import RecentPosts from '@/components/RecentPosts';

export default function HomePage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3">
      <main className="col-span-2">
        <section className="h-[calc(100vh-3.5rem)] w-full flex justify-center border-l border-r border-b border-dashed bg-card overflow-hidden">
          <div className="h-full mt-10 overflow-auto text-center">
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
              <h2 className="text-xl font-medium mb-2 font-serif">skills</h2>
              <ul className="space-y-1 mb-6">
                <li className="text-xs">python</li>
                <li className="text-xs">typescript</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-medium mb-2 font-serif">projects</h2>
              <Button
              variant="link"
              size="icon"
              className="mb-6 text-sm"
              >
              <Link 
                 href="/terminal" 
               >
                 launch terminal
               </Link>
               </Button>
            </div>

            <div>
              <h2 className="text-xl font-medium mb-2 font-serif">blog</h2>
              <Button
              variant="link"
              size="icon"
              className="mb-6 text-sm"
              >
              <Link 
                 href="https://aksheyd.substack.com" 
                 target="_blank"
               >
                 open substack
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