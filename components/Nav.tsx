"use client";

import { TerminalIcon } from "lucide-react";
import { ModeToggle } from "./ui/mode-toggle";
import { useState } from "react";
import { Button } from "./ui/button";

const titles: string[] = [
  "Akshey Deokule",
  "Software Engineer",
  "Builder",
  "Student",
];

export default function Nav() {
  const [name, setName] = useState<string>(titles[0]);
  const [nameIndex, setNameIndex] = useState<number>(0);

  const handleClick = () => {
    const nextIndex = (nameIndex + 1) % titles.length;
    setNameIndex(nextIndex);
    setName(titles[nextIndex]);
  };

  return (
    <div className="flex h-14 items-center px-4 py-2 border border-dashed bg-muted/50">
      <TerminalIcon className="h-4 w-4 shrink-0" />

      <div className="flex-1 flex justify-center items-center">
        <Button variant="link">
          <a href="/" target="">
            <span className="font-mono text-sm">Home</span>
          </a>
        </Button>
        <Button variant="link">
          <a href="/terminal" target="">
            <span className="font-mono text-sm">Terminal</span>
          </a>
        </Button>
        <Button variant="link">
          <a href="/chat" target="">
            <span className="font-mono text-sm">Chat</span>
          </a>
        </Button>
        <Button variant="link">
          <a href="/blog" target="">
            <span className="font-mono text-sm">Blog</span>
          </a>
        </Button>
      </div>

      <nav className="shrink-0">
        <ModeToggle />
      </nav>
    </div>
  );
}
