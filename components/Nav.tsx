"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { ModeToggle } from "./ui/mode-toggle";

export default function Nav() {
  return (
    <header className="flex h-14 items-center justify-center border border-dashed bg-background/95 px-4">
      <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 mx-6">
        <Button variant="ghost" size="sm" className="h-8 px-2">
          File
        </Button>
        <Button variant="ghost" size="sm" className="h-8 px-2">
          Edit
        </Button>
        <Button variant="ghost" size="sm" className="h-8 px-2">
          View
        </Button>
        <Button variant="ghost" size="sm" className="h-8 px-2">
          Help
        </Button>
      </nav>

      <nav className="absolute right-10">
        <ModeToggle/>
      </nav>
    </header>

  );
}