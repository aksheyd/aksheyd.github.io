"use client";

import projects from "@/lib/projects";
import socialAccounts from "@/lib/socials";
import { useState } from "react";

// TODO: ADD TAB Auto complete????
// TODO: convert folder and socials into folder structure?

const perm_types: string[] = [
  '-r--r--r--',
  'drwxr-xr-x',
  '-rw-r--r--',
  'drwxr-xr-x@'
]

const commands: string[] = [
  "ls",
  "open",
  "x",
  "github",
  "linkedin",
  "clear",
  "help"
]

// populate set with all social commands
let socials : Set<string> = new Set<string>
let socialsHelp : string =  "";
socialAccounts.forEach(acct => {
  socials.add(acct.name);
  socialsHelp += `  ${acct.name}${acct.spacing}Open my ${acct.pretty} account\n`
})

const helpDocString : string = `  Available commands:
  ------------- 
  ls [-a] [-l]      List all projects
  ls <project>      Show project details
  open <project>    Open link to project

  -------------
${socialsHelp}

  -------------
  clear             Clear terminal
  help              Show this help message
`

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
    } else if (e.key === "Tab") {
      e.preventDefault();
      if (!command) {
        return;
      }
      const cmd = command.trim().toLowerCase();
      const len = cmd.split(" ").length;
      if (len == 0) {
        return;
      }
      // -- system commands -- 
      // TODO

      // -- ls  --
      if (len > 0) {
        const file = cmd.split(" ");
        console.log(file)
        if (!file) {
          return;
        }
      }

      

    }
  }

  const processCommand = (cmd: string) => {
    let newOutput: string[] = [...output, `$ ${cmd}`]

    // --- ls commands ---
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
          newOutput.push(`not found: ${projectName}`);
        }
      }
    
    // --- social network commands ---
    } else if (socials.has(cmd)) {
      const acct = socialAccounts.find(s => s.name === cmd);
      if (!acct) {
        return;
      }

      newOutput.push(`opening my ${acct.pretty}`); 
      window.open(acct.website);
    
    // --- utility commands ---
    } else if (cmd === "clear") {
      newOutput = [];
    } else if (cmd === "help") {
      newOutput.push(helpDocString);

    // --- open commands ---
    } else if (cmd === "open") { 
      newOutput.push("please specify which project to open");
    } else if (cmd.startsWith("open ")) { 
      const subcommand = cmd.split(" ")[1].trim()

      const projectToOpen = projects.find(proj => proj.name === subcommand);
      if (!projectToOpen) {
        newOutput.push(`project not found: ${subcommand}`);
        setOutput(newOutput);
        return;
      }

      if (!projectToOpen.repo && !projectToOpen.link) {
        newOutput.push("apologies, there is not link for this project yet");
      }

      if (projectToOpen.link) {
        window.open(projectToOpen.link, "_self")
      } else if (projectToOpen.repo) {
        window.open(projectToOpen.repo, "_self")
      }
    } else {
      newOutput.push(`command not found: ${cmd}`);
    }

    setOutput(newOutput);
  }

  // useEffect(() => {
  //   if ()
  // }, []);

  return (
    <section className="h-[calc(100vh-3.5rem)] w-full border-l border-r border-b border-dashed bg-card overflow-hidden">
      <div className="h-full p-4 font-mono text-xs overflow-auto">
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