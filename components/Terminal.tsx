"use client";

import projects from "@/lib/projects";
import { randomInt } from "crypto";
import { useState } from "react";

// TODO: ADD TAB Auto complete????

const perm_types: string[] = [
  '-r--r--r--',
  'drwxr-xr-x',
  '-rw-r--r--',
  'drwxr-xr-x@'
]

export default function Terminal() {
  const [command, setCommand] = useState<string | undefined>("");
  const [history, setHistory] = useState<string[]>([]);
  const [output, setOutput] = useState<string[]>([
    "Welcome to my terminal.",
    "Type 'help' for available commands"
  ]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (!command) {
        return;
      }
      const cmd = command.trim().toLowerCase();

      if (cmd) {
        setHistory(prev => [...prev, cmd]);
        setHistoryIndex(-1);
        processCommand(cmd);
      }
      setCommand("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0 && historyIndex < history.length - 1) {
        const newIndex: number = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCommand(history[history.length - 1 - newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();

      if (historyIndex >= 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        if (newIndex === -1) {
          setCommand("");
        } else {
          setCommand(history[history.length - 1 - newIndex]);
        }
      }
    } else if (e.ctrlKey && e.key === "u") {
      e.preventDefault();

      setHistoryIndex(-1);
      setCommand("");
    } else if (e.ctrlKey && e.key === "c") {
      if (!command) {
        return;
      }
      const cmd = command.trim().toLowerCase();

      if (cmd) {
        setHistory(prev => [...prev, cmd]);
        setHistoryIndex(-1);
        setOutput([...output, `$ ${cmd}`]);
      }
      setCommand("");
    }
  }

  const processCommand = (cmd: string) => {
    let newOutput: string[] = [...output, `$ ${cmd}`]

    if (cmd === "ls") {
      newOutput.push(projects.map(p => p.name).join("  "));
    } else if (cmd.startsWith("ls ")) {
      const subcommand = cmd.split(" ")[1].trim();
      
      if (subcommand === "-a") {
        projects.forEach(project => {
          newOutput.push(
            `name: ${project.name}`,
            `desc: ${project.desc}`,
            `date: ${project.date}`,
            `tech: ${project.tech.join(", ")}`,
            `url: ${project.link}`,
            " ",
          );
        })
      } else if (subcommand === "-l") {
        projects.map(project => {
          const permission: string = perm_types[Math.floor(Math.random() * perm_types.length)]
          const type : number = Math.floor(Math.random() * 30)
          const size : number = Math.floor(Math.random() * 600)

          newOutput.push(
            `${permission}  ${type} aksheydeokule  staff  ${size} ${project.date} aksheydeokule staff ${project.name}`,
          );
        })
      } else {
        const projectName = subcommand;
        const project = projects.find(p => p.name === projectName)
        if (project) {
          newOutput.push(
            `name: ${project.name}`,
            `desc: ${project.desc}`,
            `date: ${project.date}`,
            `tech: ${project.tech.join(", ")}`,
            `url: ${project.link}`,
          );
        } else {
          newOutput.push(`project/command not found: ${projectName}`);
        }
      }

    } else if (cmd === "x") {
      newOutput.push("https://x.com/_aksheyd")
      window.open("https://x.com/_aksheyd", "_blank");
    } else if (cmd === "linkedin") {
      newOutput.push("http://linkedin.com/in/aksheydeokule/")
      window.open("http://linkedin.com/in/aksheydeokule/", "_blank");
    } else if (cmd === "clear") {
      newOutput = [];
    } else if (cmd === "help") {
      newOutput.push(
        "Available commands:",
        "  Projects          ---------------------",
        "  ls [-a] [-l]      List all projects",
        "  ls <project>      Show project details",
        "  open <project>    Open link to project",
        " ",
        "  Socials           ---------------------",
        "  x                 Open my X account",
        "  linkedin          Open my LinkedIn profile",
        " ",
        "  Extra             ---------------------",
        "  clear             Clear terminal",
        "  help              Show this help message"
      );
    } else {
      newOutput.push(`command not found: ${cmd}`);
    }

    setOutput(newOutput);
  }

  // TODO: make terminal height of screen minus h-14

  return (
    <section className="w-full border-l border-r border-b border-dashed bg-card overflow-hidden">
      <div className="p-4 font-mono text-xs overflow-auto">
        <div className="space-y-1">
          {output.map((line, i) => (
            <pre key={i} className="whitespace-pre-wrap text-xs">{line}</pre>
          ))}
        </div>
        <div className="flex items-center gap-2 mt-2">
          <span>$</span>
          <input
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            onKeyDown={handleCommand}
            className="flex-1 bg-transparent outline-none"
            spellCheck={false}
            autoFocus
          />
        </div>
      </div>
    </section>
  );
}