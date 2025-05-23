"use client";

import { FileNode } from "@/lib/FileSystem";
import { Project } from "@/lib/Projects";
import projects from "@/lib/Projects";
import socialAccounts from "@/lib/Socials";
import { perm_types } from "@/lib/Utils";
import { useRef, useState, useEffect } from "react";

// Create file system for the terminal
const root = new FileNode("root", undefined, undefined);
const projFolder = new FileNode("projects", root, undefined);
const videoGamesFolder = new FileNode("video-games", projFolder, undefined);
const webDevFolder = new FileNode("web-dev", projFolder, undefined);
const aiFolder = new FileNode("ai", projFolder, undefined);

root.children.push(projFolder);

projFolder.children.push(videoGamesFolder);
projFolder.children.push(webDevFolder);
projFolder.children.push(aiFolder);

videoGamesFolder.children.push(new FileNode(projects[1].name, videoGamesFolder, projects[1]));
videoGamesFolder.children.push(new FileNode(projects[2].name, videoGamesFolder, projects[2]));
videoGamesFolder.children.push(new FileNode(projects[3].name, videoGamesFolder, projects[3]));

webDevFolder.children.push(new FileNode(projects[0].name, webDevFolder, projects[0]));
webDevFolder.children.push(new FileNode(projects[5].name, webDevFolder, projects[5]));

aiFolder.children.push(new FileNode(projects[4].name, aiFolder, projects[4]));

// populate set with all social commands
let socials: Set<string> = new Set<string>
let socialsHelp: string = "";
socialAccounts.forEach(acct => {
  socials.add(acct.name);
  socialsHelp += `  ${acct.name}${acct.spacing}Open my ${acct.pretty} account\n`
})

const commands: string[] = [
  "ls",
  "cd",
  "cat",
  "open",
  "x",
  "github",
  "linkedin",
  "clear",
  "help",
  ...Array.from(socials)
]

const helpDocString: string = `  Available commands:
  ------------- 
  cd [..]           Enter/exit a folder
  ls [-a] [-l]      List files/folders

  ------------- 
  cat <project>     Show project details
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
  const [sublineText, setSublineText] = useState<string>("");
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [fileIndex, setFileIndex] = useState<number>(0);
  const [currentFolder, setCurrentFolder] = useState<FileNode>(root);

  // fix scrolling behaviour when long text
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputElementRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [output]);

  const handleFocus = () => {
    setTimeout(() => {
      inputElementRef.current?.scrollIntoView({ block: 'nearest' })
    }, 100);
  }

  const setCommandAndClearSubline = (value: string) => {
    setCommand(value);
    setSublineText("");
  };

  // for key presses (not commands)
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
      setCommandAndClearSubline("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0 && historyIndex < history.length - 1) {
        const newIndex: number = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCommandAndClearSubline(history[history.length - 1 - newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();

      if (historyIndex >= 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        if (newIndex === -1) {
          setCommandAndClearSubline("");
        } else {
          setCommandAndClearSubline(history[history.length - 1 - newIndex]);
        }
      }
    } else if (e.ctrlKey && e.key === "u") {
      e.preventDefault();

      setHistoryIndex(-1);
      setCommandAndClearSubline("");
    } else if (e.ctrlKey && e.key === "c") {
      if (!command) {
        return;
      }
      const cmd = command.trim().toLowerCase();

      if (cmd) {
        setHistory(prev => [...prev, cmd]);
        setHistoryIndex(-1);
        setOutput([...output, `${currentFolder.filename} $ ${cmd}`]);
      }
      setCommandAndClearSubline("");
    } else if (e.key === "Tab") {
      e.preventDefault();
      if (!command || !command.trim()) {
        setCommandAndClearSubline(command + "  ");
        return;
      }

      const input: string[] = command.toLowerCase().split(" ");

      // -- system commands -- 
      if (input.length === 1) {
        const candidates = commands.filter(c => c.startsWith(input[0]))
        if (candidates.length === 1) {
          // Autocomplete to closest match (ordering of commands matters)
          setCommandAndClearSubline(`${candidates[0]}`);
        } else if (candidates.length > 1) {
          setSublineText(candidates.join('\n'))
        }
      }

      // -- file display --
      else if (input.length >= 2) {
        // The last word is what we're trying to autocomplete
        const lastWord = input[input.length - 1];
        const baseCommand = input.slice(0, -1).join(" ");

        const candidates = currentFolder.children
          .map(child => child.filename)
          .filter(filename => filename.startsWith(lastWord));

        if (candidates.length === 1) {
          setCommandAndClearSubline(`${baseCommand} ${candidates[0]}`);
        } else if (candidates.length > 1) {
          setSublineText(candidates.join('\n'))
        }
      }
    }
  }

  // actually handle what command was entered
  const processCommand = (cmd: string) => {
    let newOutput: string[] = [...output, `${currentFolder.filename} $ ${cmd}`]

    // --- ls commands ---
    if (cmd === "ls") {
      newOutput.push(currentFolder.children.map(child => child.filename).join(" "));
    } else if (cmd.startsWith("ls ")) {
      const subcommand = cmd.split(" ")[1].trim();

      if (subcommand === "-a") {
        newOutput.push(".");
        newOutput.push("..");
        newOutput.push(".lit");
        currentFolder.children.forEach(child => {
          newOutput.push(child.filename);
        })
      } else if (subcommand === "-l") {
        currentFolder.children.map(project => {
          const permission: string = perm_types[Math.floor(Math.random() * perm_types.length)]
          const type: number = Math.floor(Math.random() * 30)
          const size: number = Math.floor(Math.random() * 600)

          newOutput.push(
            `${permission}  ${type} aksheydeokule  staff  ${size} aksheydeokule staff ${project.filename}`,
          );
        })
      } else {
        const files = currentFolder.children
          .filter(c => c.data === undefined);

        const folderName = subcommand;
        const project = files.find(p => p.filename === folderName)
        if (project) {
          newOutput.push(project.children.map(child => child.filename).join(" "));
        } else {
          newOutput.push(`folder not found: ${folderName}`);
        }
      }
    }
    // -- cd commands ---
    else if (cmd === "cd" || cmd === "cd .." || cmd.startsWith("cd ") && cmd.split(" ").filter(Boolean).join(" ") === "cd ..") {
      if (currentFolder.filename !== "root") {
        if (currentFolder.parent) {
          setCurrentFolder(currentFolder.parent);
        } else {
          console.error(`filenode ${currentFolder.filename} has no parent but is not root.`)
        }
      }
    }
    else if (cmd.startsWith("cd ")) {
      const reducedCmd = cmd.split(" ").filter(Boolean).join(" ");
      if (!(reducedCmd === "cd ." || reducedCmd === "cd ..")) {
        const folders = currentFolder.children
          .filter(c => c.data === undefined);
        console.log(folders);

        const folderName = reducedCmd.split(" ")[1].trim();
        const folder = folders.find(p => p.filename === folderName)
        if (folder) {
          setCurrentFolder(folder);
        } else {
          newOutput.push(`not a folder: ${folderName}`);
        }
      }
    }
    else if (cmd === "cd ." || cmd.startsWith("cd ") && cmd.split(" ").filter(Boolean).join(" ") === "cd .") {
      // do nothing
    }
    // --- social network commands ---
    else if (socials.has(cmd)) {
      const acct = socialAccounts.find(s => s.name === cmd);
      if (!acct) {
        return;
      }

      newOutput.push(`opening my ${acct.pretty}`);
      window.open(acct.website);

      // --- utility commands ---
    } else if (cmd === "clear") {
      setOutput([]);
      return;
    } else if (cmd === "help") {
      newOutput.push(helpDocString);
    }
    else if (cmd === "cat") {
      newOutput.push("please specify which project to inspect");
    }
    // -- cat commands ---
    else if (cmd.startsWith("cat ")) {
      const subcommand = cmd.split(" ")[1].trim();

      const files = currentFolder.children
        .filter(c => c.data !== undefined && c.data !== null)
        .map(p => p.data as Project);

      const projectName = subcommand;
      const project = files.find(p => p.name === projectName)
      if (project) {
        newOutput.push(
          `name: ${project.name}`,
          `desc: ${project.desc}`,
          `date: ${project.date}`,
          `tech: ${project.tech.join(", ")}`,
          `url: ${project.link}`,
          ...(project.repo ? [`repo: ${project.repo}`] : []),
        );
      } else {
        newOutput.push(`project not found: ${projectName}`);
      }
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
        window.open(projectToOpen.link, "_blank")
      } else if (projectToOpen.repo) {
        window.open(projectToOpen.repo, "_blank")
      }
    } else {
      newOutput.push(`command not found: ${cmd}`);
    }

    setOutput(newOutput);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-[calc(100vh-3.5rem)] w-full border-l border-r border-b border-dashed">
      {/* Terminal Section (75%) */}
      <div className="cols-start-1 h-full overflow-y-auto">
        <div className="h-full p-4 font-mono text-xs">
          <div className="space-y-1">
            {output.map((line, i) => (
              <pre key={i} className="whitespace-pre-wrap text-xs">{line}</pre>
            ))}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span>{`${currentFolder.filename}`} $</span>
            <input
              type="text"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              onKeyDown={handleCommand}
              className="flex-1 bg-transparent outline-none"
              spellCheck={false}
              autoFocus
              onFocus={handleFocus}
              ref={inputElementRef}
            />
          </div>
          <div ref={terminalEndRef} />
          <pre>{sublineText}</pre>
        </div>
      </div>

      {/* Help Section (25%) */}
      <div className="cols-start-2 h-full hidden lg:block p-4 border-l border-dashed font-mono overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Guide</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-md font-semibold mb-1">About</h3>
            <p className="text-xs mb-4">Type unix-like commands to discover what I've built.</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-md font-semibold mb-1">Example Usage</h3>
            <ul className="list-disc list-inside text-xs space-y-1 mb-4">
              <li><code>cd projects</code></li>
              <li><code>cd web-dev</code></li>
              <li><code>cat whats-up</code></li>
              <li><code>open whats-up</code></li>
            </ul>
          </div>

          <div>
            <h3 className="text-md font-semibold mb-1">Extras</h3>
            <p className="text-xs">Type <code>help</code> for all available commands</p>
            <p className="text-xs">Type <code>clear</code> to reset the screen</p>
            <p className="text-xs">Use <code>TAB</code> to auto-complete commands</p>
          </div>
        </div>
      </div>
    </div>
  );
}