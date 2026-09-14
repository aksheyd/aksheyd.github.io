"use client";

import { TerminalIcon } from "lucide-react";
import { ModeToggle } from "./ui/mode-toggle";
import { Button } from "./ui/button";
import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/terminal", label: "Terminal" },
  { href: "/chat", label: "Chat" },
  { href: "/blog", label: "Blog" },
] as const;

export default function Nav() {
  return (
    <div className="flex h-14 items-center px-4 py-2 border border-dashed bg-muted/50">
      <TerminalIcon className="h-4 w-4 shrink-0" />

      <div className="flex-1 flex justify-center items-center">
        {links.map((link) => (
          <Button key={link.href} variant="link" asChild>
            <Link href={link.href}>
              <span className="font-mono text-sm">{link.label}</span>
            </Link>
          </Button>
        ))}
      </div>

      <nav className="shrink-0">
        <ModeToggle />
      </nav>
    </div>
  );
}
