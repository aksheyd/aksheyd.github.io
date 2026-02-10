"use client";

import { FileNode } from "@/lib/FileSystem";
import { Project } from "@/lib/Projects";
import projects from "@/lib/Projects";
import { Contribution } from "@/lib/Contributions";
import contributions from "@/lib/Contributions";
import { Model } from "@/lib/Models";
import models from "@/lib/Models";
import socialAccounts from "@/lib/Socials";
import { perm_types } from "@/lib/Utils";
import { useRef, useState, useEffect } from "react";

// Create file system for the terminal
const root = new FileNode("root", undefined, undefined);
const projFolder = new FileNode("projects", root, undefined);
const contribFolder = new FileNode("contributions", root, undefined);
const fineTunesFolder = new FileNode("fine-tunes", root, undefined);

const videoGamesFolder = new FileNode("video-games", projFolder, undefined);
const webDevFolder = new FileNode("web-dev", projFolder, undefined);
const aiFolder = new FileNode("ai", projFolder, undefined);
const researchFolder = new FileNode("research", projFolder, undefined);
const openSourceFolder = new FileNode("open-source", contribFolder, undefined);

root.children.push(projFolder);
root.children.push(contribFolder);
root.children.push(fineTunesFolder);

projFolder.children.push(videoGamesFolder);
projFolder.children.push(webDevFolder);
projFolder.children.push(aiFolder);
projFolder.children.push(researchFolder);

contribFolder.children.push(openSourceFolder);

// Projects organization
webDevFolder.children.push(
  new FileNode(projects[0].name, webDevFolder, projects[0]),
); // whats-up
webDevFolder.children.push(
  new FileNode(projects[7].name, webDevFolder, projects[7]),
); // personal-portfolio

videoGamesFolder.children.push(
  new FileNode(projects[3].name, videoGamesFolder, projects[3]),
); // duelers-providence
videoGamesFolder.children.push(
  new FileNode(projects[4].name, videoGamesFolder, projects[4]),
); // destroy-the-wormhole
videoGamesFolder.children.push(
  new FileNode(projects[5].name, videoGamesFolder, projects[5]),
); // legend-of-zelda

aiFolder.children.push(new FileNode(projects[2].name, aiFolder, projects[2])); // nba-mlp
aiFolder.children.push(new FileNode(projects[6].name, aiFolder, projects[6])); // gemini-ai-asl-translator

researchFolder.children.push(
  new FileNode(projects[1].name, researchFolder, projects[1]),
); // deep-ocean-research

// Contributions
openSourceFolder.children.push(
  new FileNode(contributions[0].project, openSourceFolder, contributions[0]),
);
openSourceFolder.children.push(
  new FileNode(contributions[1].project, openSourceFolder, contributions[1]),
);

// Models / Fine-Tunes
models.forEach((model) => {
  fineTunesFolder.children.push(
    new FileNode(model.name, fineTunesFolder, model),
  );
});

// populate set with all social commands
let socials: Set<string> = new Set<string>();
let socialsHelp: string = "";
socialAccounts.forEach((acct) => {
  socials.add(acct.name);
  socialsHelp += `  ${acct.name}${acct.spacing}Open my ${acct.pretty} account\n`;
});

const commands: string[] = [
  "ls",
  "cd",
  "cat",
  "open",
  // "x",
  // "github",
  // "linkedin",
  "clear",
  "help",
  "exit",
  ...Array.from(socials),
];

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
`;

export default function Terminal() {
  const [command, setCommand] = useState<string | undefined>("");
  const [history, setHistory] = useState<string[]>([]);
  const [output, setOutput] = useState<string[]>([
    "Welcome to my terminal.",
    "Type 'help' for available commands",
  ]);
  const [sublineText, setSublineText] = useState<string>("");
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [currentFolder, setCurrentFolder] = useState<FileNode>(root);

  // fix scrolling behaviour when long text
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputElementRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [output]);

  const handleFocus = () => {
    setTimeout(() => {
      inputElementRef.current?.scrollIntoView({ block: "nearest" });
    }, 100);
  };

  const setCommandAndClearSubline = (value: string) => {
    setCommand(value);
    setSublineText("");
  };

  // Helper functions for autocomplete
  const getAvailableFlags = (cmd: string): string[] => {
    if (cmd === "ls") {
      return ["-a", "-l"];
    }
    return [];
  };

  const getFolderNames = (folder: FileNode): string[] => {
    return folder.children
      .filter((child) => child.data === undefined)
      .map((child) => child.filename);
  };

  const getFileNames = (folder: FileNode): string[] => {
    return folder.children
      .filter((child) => child.data !== undefined)
      .map((child) => child.filename);
  };

  const autocompleteForCommand = (
    cmd: string,
    args: string[],
    folder: FileNode,
    currentInput: string,
  ): { completion: string | null; suggestions: string[] } => {
    // No arguments - just autocomplete the command itself
    if (args.length === 0) {
      const candidates = commands.filter((c) => c.startsWith(cmd));
      if (candidates.length === 1) {
        return { completion: candidates[0], suggestions: [] };
      } else if (candidates.length > 1) {
        return { completion: null, suggestions: candidates };
      }
      return { completion: null, suggestions: [] };
    }

    const lastArg = args[args.length - 1];

    // ls command - autocomplete flags or folder names
    if (cmd === "ls") {
      // If last arg starts with -, autocomplete flags
      if (lastArg.startsWith("-")) {
        const flags = getAvailableFlags("ls");
        const candidates = flags.filter((f) => f.startsWith(lastArg));
        if (candidates.length === 1) {
          const baseCommand = [cmd, ...args.slice(0, -1)].join(" ");
          return {
            completion: `${baseCommand} ${candidates[0]}`.trim(),
            suggestions: [],
          };
        } else if (candidates.length > 1) {
          return { completion: null, suggestions: candidates };
        }
      }
      // Otherwise autocomplete folder names
      const folders = getFolderNames(folder);
      const candidates = folders.filter((f) => f.startsWith(lastArg));
      if (candidates.length === 1) {
        const baseCommand = [cmd, ...args.slice(0, -1)].join(" ");
        return {
          completion: `${baseCommand} ${candidates[0]}`.trim(),
          suggestions: [],
        };
      } else if (candidates.length > 1) {
        return { completion: null, suggestions: candidates };
      }
    }

    // cd command - only autocomplete folders
    else if (cmd === "cd") {
      // Special cases
      if (lastArg === "." || lastArg === "..") {
        return { completion: null, suggestions: [] };
      }

      const folders = getFolderNames(folder);
      const candidates = folders.filter((f) => f.startsWith(lastArg));
      if (candidates.length === 1) {
        const baseCommand = [cmd, ...args.slice(0, -1)].join(" ");
        return {
          completion: `${baseCommand} ${candidates[0]}`.trim(),
          suggestions: [],
        };
      } else if (candidates.length > 1) {
        return { completion: null, suggestions: candidates };
      }
    }

    // cat and open commands - only autocomplete files
    else if (cmd === "cat" || cmd === "open") {
      const files = getFileNames(folder);
      const candidates = files.filter((f) => f.startsWith(lastArg));
      if (candidates.length === 1) {
        const baseCommand = [cmd, ...args.slice(0, -1)].join(" ");
        return {
          completion: `${baseCommand} ${candidates[0]}`.trim(),
          suggestions: [],
        };
      } else if (candidates.length > 1) {
        return { completion: null, suggestions: candidates };
      }
    }

    // For other commands, autocomplete from all children
    else {
      const allNames = folder.children.map((child) => child.filename);
      const candidates = allNames.filter((name) => name.startsWith(lastArg));
      if (candidates.length === 1) {
        const baseCommand = [cmd, ...args.slice(0, -1)].join(" ");
        return {
          completion: `${baseCommand} ${candidates[0]}`.trim(),
          suggestions: [],
        };
      } else if (candidates.length > 1) {
        return { completion: null, suggestions: candidates };
      }
    }

    return { completion: null, suggestions: [] };
  };

  // for key presses (not commands)
  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (!command) {
        return;
      }
      const cmd = command.trim().toLowerCase();

      if (cmd) {
        setHistory((prev) => [...prev, cmd]);
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
        setHistory((prev) => [...prev, cmd]);
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

      const input = command.toLowerCase().trim().split(/\s+/);
      const cmd = input[0];
      const args = input.slice(1);

      const result = autocompleteForCommand(cmd, args, currentFolder, command);

      if (result.completion) {
        setCommandAndClearSubline(result.completion);
      } else if (result.suggestions.length > 0) {
        setSublineText(result.suggestions.join("\n"));
      }
    }
  };

  // actually handle what command was entered
  const processCommand = (cmd: string) => {
    let newOutput: string[] = [...output, `${currentFolder.filename} $ ${cmd}`];

    // --- ls commands ---
    if (cmd === "ls") {
      newOutput.push(
        currentFolder.children.map((child) => child.filename).join(" "),
      );
    } else if (cmd.startsWith("ls ")) {
      const subcommand = cmd.split(" ")[1].trim();

      if (subcommand === "-a") {
        newOutput.push(".");
        newOutput.push("..");
        newOutput.push(".lit");
        currentFolder.children.forEach((child) => {
          newOutput.push(child.filename);
        });
      } else if (subcommand === "-l") {
        currentFolder.children.map((project) => {
          const permission: string =
            perm_types[Math.floor(Math.random() * perm_types.length)];
          const type: number = Math.floor(Math.random() * 30);
          const size: number = Math.floor(Math.random() * 600);

          newOutput.push(
            `${permission}  ${type} aksheydeokule  staff  ${size} aksheydeokule staff ${project.filename}`,
          );
        });
      } else {
        const files = currentFolder.children.filter(
          (c) => c.data === undefined,
        );

        const folderName = subcommand;
        const project = files.find((p) => p.filename === folderName);
        if (project) {
          newOutput.push(
            project.children.map((child) => child.filename).join(" "),
          );
        } else {
          newOutput.push(`folder not found: ${folderName}`);
        }
      }
    }
    // -- cd commands ---
    else if (
      cmd === "cd" ||
      cmd === "cd .." ||
      (cmd.startsWith("cd ") &&
        cmd.split(" ").filter(Boolean).join(" ") === "cd ..")
    ) {
      if (currentFolder.filename !== "root") {
        if (currentFolder.parent) {
          setCurrentFolder(currentFolder.parent);
        } else {
          console.error(
            `filenode ${currentFolder.filename} has no parent but is not root.`,
          );
        }
      }
    } else if (cmd.startsWith("cd ")) {
      const reducedCmd = cmd.split(" ").filter(Boolean).join(" ");
      if (!(reducedCmd === "cd ." || reducedCmd === "cd ..")) {
        const folders = currentFolder.children.filter(
          (c) => c.data === undefined,
        );
        console.log(folders);

        const folderName = reducedCmd.split(" ")[1].trim();
        const folder = folders.find((p) => p.filename === folderName);
        if (folder) {
          setCurrentFolder(folder);
        } else {
          newOutput.push(`not a folder: ${folderName}`);
        }
      }
    } else if (
      cmd === "cd ." ||
      (cmd.startsWith("cd ") &&
        cmd.split(" ").filter(Boolean).join(" ") === "cd .")
    ) {
      // do nothing
    }
    // --- social network commands ---
    else if (socials.has(cmd)) {
      const acct = socialAccounts.find((s) => s.name === cmd);
      if (!acct) {
        return;
      }

      newOutput.push(`opening my ${acct.pretty}`);
      window.open(acct.website);

      // --- utility commands ---
    } else if (cmd === "clear") {
      setOutput([]);
      return;
    } else if (cmd === "exit") {
      window.location.href = "/";
      return;
    } else if (cmd === "help") {
      newOutput.push(helpDocString);
    } else if (cmd === "cat") {
      newOutput.push("please specify which project to inspect");
    }
    // -- cat commands ---
    else if (cmd.startsWith("cat ")) {
      const subcommand = cmd.split(" ")[1].trim();

      const files = currentFolder.children.filter(
        (c) => c.data !== undefined && c.data !== null,
      );

      const fileName = subcommand;
      const file = files.find((f) => {
        const data = f.data;
        if (data && "name" in data) {
          return (data as Project | Model).name === fileName;
        } else if (data && "project" in data) {
          return (data as Contribution).project === fileName;
        }
        return false;
      });

      if (file) {
        const data = file.data;
        // Check if it's a project, contribution, or model
        if (data && "name" in data && "tech" in data) {
          // It's a Project
          const project = data as Project;
          newOutput.push(
            `name: ${project.name}`,
            `desc: ${project.desc}`,
            `date: ${project.date}`,
            `tech: ${project.tech.join(", ")}`,
            `url: ${project.link}`,
            ...(project.repo ? [`repo: ${project.repo}`] : []),
          );
        } else if (data && "name" in data && "baseModel" in data) {
          // It's a Model
          const model = data as Model;
          newOutput.push(
            `name: ${model.name}`,
            `desc: ${model.desc}`,
            `base model: ${model.baseModel}`,
            `link: ${model.link}`,
          );
        } else {
          // It's a Contribution
          const contrib = data as Contribution;
          newOutput.push(
            `title: ${contrib.title}`,
            `project: ${contrib.org}/${contrib.project}`,
            `desc: ${contrib.desc}`,
            `type: ${contrib.type}`,
            `status: ${contrib.status}`,
            `date: ${contrib.date}`,
            `tech: ${contrib.tech.join(", ")}`,
            `link: ${contrib.link}`,
          );
        }
      } else {
        newOutput.push(`file not found: ${fileName}`);
      }
      // --- open commands ---
    } else if (cmd === "open") {
      newOutput.push("please specify which file to open");
    } else if (cmd.startsWith("open ")) {
      const subcommand = cmd.split(" ")[1].trim();

      // Try to find as project first
      const projectToOpen = projects.find((proj) => proj.name === subcommand);
      if (projectToOpen) {
        if (!projectToOpen.repo && !projectToOpen.link) {
          newOutput.push("apologies, there is no link for this project yet");
        } else if (projectToOpen.link) {
          window.open(projectToOpen.link, "_blank");
        } else if (projectToOpen.repo) {
          window.open(projectToOpen.repo, "_blank");
        }
        setOutput(newOutput);
        return;
      }

      // Try to find as model
      const modelToOpen = models.find((model) => model.name === subcommand);
      if (modelToOpen) {
        window.open(modelToOpen.link, "_blank");
        setOutput(newOutput);
        return;
      }

      // Try to find as contribution
      const contribToOpen = contributions.find(
        (contrib) => contrib.project === subcommand,
      );
      if (contribToOpen) {
        window.open(contribToOpen.link, "_blank");
        setOutput(newOutput);
        return;
      }

      newOutput.push(`file not found: ${subcommand}`);
    } else {
      newOutput.push(`command not found: ${cmd}`);
    }

    setOutput(newOutput);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-[calc(100vh-3.5rem)] w-full border-l border-r border-b border-dashed">
      {/* Terminal Section (75%) */}
      <div className="cols-start-1 h-full overflow-y-auto">
        <div className="h-full p-4 font-mono text-xs">
          <div className="space-y-1">
            {output.map((line, i) => (
              <pre key={i} className="whitespace-pre-wrap text-xs">
                {line}
              </pre>
            ))}
          </div>
          <div className="flex items-center gap-2 mt-2 text-base sm:text-xs">
            <span>{`${currentFolder.filename}`} $</span>
            <input
              type="text"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              onKeyDown={handleCommand}
              className="flex-1 bg-transparent outline-none text-[16px] sm:text-xs"
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
            <p className="text-xs mb-4">
              Type unix-like commands to discover what I've built.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-md font-semibold mb-1">Example Usage</h3>
            <ul className="list-disc list-inside text-xs space-y-1 mb-4">
              <li>
                <code>cd projects</code>
              </li>
              <li>
                <code>cd web-dev</code>
              </li>
              <li>
                <code>cat whats-up</code>
              </li>
              <li>
                <code>open whats-up</code>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-md font-semibold mb-1">Extras</h3>
            <p className="text-xs">
              Type <code>help</code> for all available commands
            </p>
            <p className="text-xs">
              Type <code>clear</code> to reset the screen
            </p>
            <p className="text-xs">
              Use <code>TAB</code> to auto-complete commands
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
