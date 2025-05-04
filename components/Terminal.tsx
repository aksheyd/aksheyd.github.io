"use client";

import { FileNode } from "@/lib/FileSystem";
import { Project } from "@/lib/Projects";
import projects from "@/lib/Projects";
import socialAccounts from "@/lib/Socials";
import { perm_types } from "@/lib/Utils";
import { useRef, useState, useEffect } from "react";

// TODO: ADD TAB Auto complete????
// TODO: convert folder and socials into folder structure?

const root : FileNode = new FileNode("root", undefined, undefined);
const projFolder : FileNode = new FileNode("projects", root, undefined);
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
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [fileIndex, setFileIndex] = useState<number>(0);
  const [currentFolder, setCurrentFolder] = useState<FileNode>(root);

  // fix scrolling behaviour when long text
  const terminalEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [output]);

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
        setOutput([...output, `${currentFolder.filename} $ ${cmd}`]);
      }
      setCommand("");
    } else if (e.key === "Tab") {
      // e.preventDefault();
      // if (!command || !command.trim()) {
      //   setCommand(command + "  ");
      //   return;
      // }

      // const cmd: string = command.toLowerCase();
      // const cmd_split: string[] = cmd.split(" ");
      // // how do i split "ls " vs "ls"

      // // trim down cmd_split
      // // const trimmedCmdSplit = cmd_split.filter(part => part !== "");
      // const len: number = cmd_split.length;
      // const fileCmd: Set<string> = new Set(['ls', 'open']);


      // // -- system commands -- 
      // if (len === 1) {
      //   let stringMatchScore = -1;
      //   let stringMatchIndex = -1;
      //   for (let i = 0; i < commands.length; i++) {
      //     let j = 0;
      //     let tempScore = 0;

      //     while (j < commands[i].length) {
      //       if (commands[i][j] === cmd[j]) {
      //         tempScore += 1;
      //         j += 1;
      //       } else {
      //         break;
      //       }
      //     }

      //     if (tempScore > stringMatchScore) {
      //       stringMatchScore = tempScore;
      //       stringMatchIndex = i;
      //     }
      //   }

      //   setCommand(commands[stringMatchIndex]);
      // }
      // // -- ls  --
      // // ls <project>
      // // ls ____ <project>
      // // open <project>
      // // open ____ <project>
      // else if (
      //   ((len === 2 && fileCmd.has(cmd_split[0])) || (len >= 2 && cmd_split[0] === 'ls')) &&
      //   (cmd_split[len - 1] === "" || projects.some(proj => proj.name === cmd_split[len - 1]))
      // ) {
      //   if (cmd_split[0] === 'ls') {
      //     setCommand(cmd_split.slice(0, len - 1).join(" ") + " " + projects[fileIndex].name);
      //     setFileIndex((fileIndex + 1) % projects.length);
      //   }
      // }
      // // if (len > 0) {
      // //   const file = cmd.split(" ");
      // //   console.log(file)
      // //   if (!file) {
      // //     return;
      // //   }
      // // }
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
          <span>{`${currentFolder.filename}`} $</span>
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
        <div ref={terminalEndRef} />
      </div>
    </section>
  );
}