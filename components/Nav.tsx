"use client";

import { TerminalIcon } from "lucide-react";
import { ModeToggle } from "./ui/mode-toggle";
import { useState } from "react";
import { Button } from "./ui/button";

const titles: string[] = [
    "Akshey Deokule",
    "Software Engineer",
    "Builder",
    "Student"
]

export default function Nav() {
    const [name, setName] = useState<string>(titles[0]);
    const [nameIndex, setNameIndex] = useState<number>(0);

    const handleClick = () => {
        const nextIndex = (nameIndex + 1) % titles.length;
        setNameIndex(nextIndex);
        setName(titles[nextIndex]);
    }

    // TODO: add a blog page
    return (
        <div className="relative flex h-14 items-center gap-2 px-4 py-2 border border-dashed bg-muted/50">
            <a href="/">
            <TerminalIcon className="h-4 w-4" />
            </a>
            {/* <Button onClick={handleClick}>
                <span className="font-mono text-sm animate-pulse-opacity">
                    {name}
                </span>
            </Button> */}

            <Button>
                <a href="/blog" target="_blank">
                    <span className="font-mono text-sm ml-10">
                        Blog
                    </span>
                </a>
            </Button>

            <Button>
                <a href="/terminal" target="">
                    <span className="font-mono text-sm ml-10">
                        Terminal
                    </span>
                </a>
            </Button>

            <nav className="absolute right-10">
                <ModeToggle />
            </nav>
        </div>
    );
}