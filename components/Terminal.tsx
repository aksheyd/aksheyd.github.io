"use client";

import { FileNode } from "@/lib/FileSystem";
import { Project } from "@/lib/Projects";
import projects from "@/lib/Projects";
import { Contribution } from "@/lib/Contributions";
import contributions from "@/lib/Contributions";
import { Model } from "@/lib/Models";
import models from "@/lib/Models";
import socialAccounts from "@/lib/Socials";
import React, { useRef, useState, useEffect, type ReactNode } from "react";

// ── File system construction ─────────────────────────────────────────────

const root = new FileNode("root", undefined, undefined);
const projFolder = new FileNode("projects", root, undefined);
const contribFolder = new FileNode("contributions", root, undefined);
const fineTunesFolder = new FileNode("fine-tunes", root, undefined);
root.children.push(projFolder, contribFolder, fineTunesFolder);

const videoGamesFolder = new FileNode("video-games", projFolder, undefined);
const webDevFolder = new FileNode("web-dev", projFolder, undefined);
const aiFolder = new FileNode("ai", projFolder, undefined);
const researchFolder = new FileNode("research", projFolder, undefined);
projFolder.children.push(
  videoGamesFolder,
  webDevFolder,
  aiFolder,
  researchFolder,
);

const openSourceFolder = new FileNode("open-source", contribFolder, undefined);
contribFolder.children.push(openSourceFolder);

// Map each project to its correct category folder by name
const projectFolders: Record<string, FileNode> = {
  "whats-up": webDevFolder,
  "personal-portfolio": webDevFolder,
  "duelers-providence": videoGamesFolder,
  "destroy-the-wormhole": videoGamesFolder,
  "legend-of-zelda": videoGamesFolder,
  "easy-train": aiFolder,
  "nba-mlp": aiFolder,
  "gemini-ai-asl-translator": aiFolder,
  "deep-ocean-research": researchFolder,
};

projects.forEach((p) => {
  const folder = projectFolders[p.name];
  if (folder) folder.children.push(new FileNode(p.name, folder, p));
});

contributions.forEach((c) =>
  openSourceFolder.children.push(
    new FileNode(c.project, openSourceFolder, c),
  ),
);

models.forEach((m) =>
  fineTunesFolder.children.push(new FileNode(m.name, fineTunesFolder, m)),
);

// ── Social lookup ────────────────────────────────────────────────────────

const socialMap = new Map(socialAccounts.map((a) => [a.name, a]));

// ── Constants ────────────────────────────────────────────────────────────

const COMMANDS = [
  "ls",
  "cd",
  "cat",
  "open",
  "pwd",
  "whoami",
  "tree",
  "clear",
  "help",
  "exit",
  ...socialAccounts.map((a) => a.name),
];

const LS_FLAGS = ["-a", "-l", "-la", "-al"];

// ── Utilities ────────────────────────────────────────────────────────────

const isDir = (n: FileNode) => n.data === undefined;

const getPath = (node: FileNode): string => {
  if (!node.parent) return "~";
  const parts: string[] = [];
  let cur: FileNode | undefined = node;
  while (cur?.parent) {
    parts.unshift(cur.filename);
    cur = cur.parent;
  }
  return "~/" + parts.join("/");
};

const resolvePath = (from: FileNode, path: string): FileNode | null => {
  if (path === "~" || path === "/") return root;
  let node: FileNode | undefined = from;
  if (path.startsWith("~/")) {
    node = root;
    path = path.slice(2);
  } else if (path.startsWith("/")) {
    node = root;
    path = path.slice(1);
  }
  for (const part of path.split("/").filter(Boolean)) {
    if (!node) return null;
    if (part === ".") continue;
    if (part === "..") {
      node = node.parent ?? node;
      continue;
    }
    const child: FileNode | undefined = node.children.find(
      (c: FileNode) => c.filename === part,
    );
    if (!child) return null;
    node = child;
  }
  return node ?? null;
};

const commonPrefix = (strs: string[]): string => {
  if (!strs.length) return "";
  let p = strs[0];
  for (const s of strs) {
    while (!s.startsWith(p)) p = p.slice(0, -1);
  }
  return p;
};

const getDate = (n: FileNode): string =>
  n.data && "date" in n.data ? (n.data as { date: string }).date : "";

// ── Display components (stable module-level references) ──────────────────

const PromptLine = ({ path, cmd }: { path: string; cmd: string }) => (
  <div className="flex gap-1 flex-wrap">
    <span className="font-semibold whitespace-nowrap mr-2">
      {path} $
    </span>
    <span className="break-all">{cmd}</span>
  </div>
);

const Err = ({ msg }: { msg: string }) => (
  <span className="text-red-600 dark:text-red-400">{msg}</span>
);

const DirSpan = ({ name }: { name: string }) => (
  <span className="text-blue-600 dark:text-blue-400 font-bold">{name}/</span>
);

const Suggestions = ({ items }: { items: string[] }) => (
  <div className="flex flex-wrap gap-x-4 gap-y-0.5">
    {items.map((s) => (
      <span
        key={s}
        className={
          s.endsWith("/")
            ? "text-blue-600 dark:text-blue-400 font-bold"
            : ""
        }
      >
        {s}
      </span>
    ))}
  </div>
);

const Field = ({ label, value }: { label: string; value: ReactNode }) => (
  <div className="flex">
    <span className="text-muted-foreground whitespace-pre shrink-0">
      {(label + ":").padEnd(10)}
    </span>
    <span className="min-w-0">{value}</span>
  </div>
);

const Link = ({ url }: { url: string }) => (
  <a
    href={url}
    target={url.startsWith("/") ? "_self" : "_blank"}
    rel="noopener noreferrer"
    className="underline text-blue-600 dark:text-blue-400 hover:opacity-80"
  >
    {url}
  </a>
);

// ── Terminal component ───────────────────────────────────────────────────

export default function Terminal() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<ReactNode[]>([
    "Welcome to my terminal.",
    <span key="welcome-hint" className="text-muted-foreground">
      {"Type 'help' for available commands."}
    </span>,
  ]);
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [cwd, setCwd] = useState(root);

  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [output]);

  const promptPath = getPath(cwd);

  const append = (...lines: ReactNode[]) =>
    setOutput((prev) => [...prev, ...lines]);

  // ── Tab completion ─────────────────────────────────────────────────

  const handleTab = () => {
    const trimmed = input.trim();

    // Empty input → show all commands
    if (!trimmed) {
      append(
        <PromptLine path={promptPath} cmd="" />,
        <Suggestions items={COMMANDS} />,
      );
      return;
    }

    const spaceIdx = trimmed.indexOf(" ");

    // Completing command name
    if (spaceIdx === -1) {
      const matches = COMMANDS.filter((c) => c.startsWith(trimmed));
      if (matches.length === 0) return;
      if (matches.length === 1) {
        setInput(matches[0] + " ");
        return;
      }
      const cp = commonPrefix(matches);
      if (cp.length > trimmed.length) setInput(cp);
      append(
        <PromptLine path={promptPath} cmd={input} />,
        <Suggestions items={matches} />,
      );
      return;
    }

    // Completing argument
    const cmd = trimmed.slice(0, spaceIdx).toLowerCase();
    const lastSp = input.lastIndexOf(" ");
    const partial = input.slice(lastSp + 1);
    const before = input.slice(0, lastSp + 1);

    // Flag completion for ls
    if (cmd === "ls" && partial.startsWith("-")) {
      const matches = LS_FLAGS.filter((f) => f.startsWith(partial));
      if (matches.length === 0) return;
      if (matches.length === 1) {
        setInput(before + matches[0] + " ");
        return;
      }
      const cp = commonPrefix(matches);
      if (cp.length > partial.length) setInput(before + cp);
      append(
        <PromptLine path={promptPath} cmd={input} />,
        <Suggestions items={matches} />,
      );
      return;
    }

    // Path-aware file/folder completion
    const dirsOnly = cmd === "cd" || cmd === "ls";
    const slashIdx = partial.lastIndexOf("/");
    let dir = cwd;
    let namePrefix = partial;
    let pathPre = "";

    if (slashIdx >= 0) {
      pathPre = partial.slice(0, slashIdx + 1);
      namePrefix = partial.slice(slashIdx + 1);
      const resolved = resolvePath(cwd, partial.slice(0, slashIdx) || ".");
      if (!resolved || !isDir(resolved)) return;
      dir = resolved;
    }

    const candidates = dir.children
      .filter((c) => !dirsOnly || isDir(c))
      .filter((c) => c.filename.startsWith(namePrefix))
      .map((c) => c.filename + (isDir(c) ? "/" : ""));

    if (candidates.length === 0) return;
    if (candidates.length === 1) {
      const trail = candidates[0].endsWith("/") ? "" : " ";
      setInput(before + pathPre + candidates[0] + trail);
      return;
    }
    const cp = commonPrefix(candidates);
    if (cp.length > namePrefix.length) setInput(before + pathPre + cp);
    append(
      <PromptLine path={promptPath} cmd={input} />,
      <Suggestions items={candidates} />,
    );
  };

  // ── Process command ────────────────────────────────────────────────

  const processCommand = (raw: string) => {
    const trimmed = raw.trim();
    const prompt = <PromptLine path={getPath(cwd)} cmd={trimmed} />;

    // Empty enter → show prompt line
    if (!trimmed) {
      append(prompt);
      return;
    }

    setHistory((prev) => [...prev, trimmed]);
    setHistIdx(-1);

    const parts = trimmed.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    // ── ls ───────────────────────────────────────────────────────────

    if (cmd === "ls") {
      const flags = new Set<string>();
      let target: string | null = null;
      for (const a of args) {
        if (a.startsWith("-")) {
          for (const ch of a.slice(1)) flags.add(ch);
        } else {
          target = a;
        }
      }

      const showAll = flags.has("a");
      const showLong = flags.has("l");

      let dir = cwd;
      if (target) {
        const resolved = resolvePath(cwd, target);
        if (!resolved) {
          append(
            prompt,
            <Err msg={`ls: ${target}: No such file or directory`} />,
          );
          return;
        }
        if (!isDir(resolved)) {
          append(prompt, <span>{resolved.filename}</span>);
          return;
        }
        dir = resolved;
      }

      if (showLong) {
        const lines: ReactNode[] = [prompt];
        if (showAll) {
          lines.push(
            <div key="dot" className="flex gap-3">
              <span className="text-muted-foreground shrink-0">drwxr-xr-x</span>
              <span className="shrink-0">aksheyd</span>
              <span className="text-muted-foreground shrink-0 min-w-[130px]" />
              <DirSpan name="." />
            </div>,
            <div key="dotdot" className="flex gap-3">
              <span className="text-muted-foreground shrink-0">drwxr-xr-x</span>
              <span className="shrink-0">aksheyd</span>
              <span className="text-muted-foreground shrink-0 min-w-[130px]" />
              <DirSpan name=".." />
            </div>,
          );
        }
        dir.children.forEach((child) => {
          const perm = isDir(child) ? "drwxr-xr-x" : "-rw-r--r--";
          const date = getDate(child) || "—";
          lines.push(
            <div key={child.filename} className="flex gap-3">
              <span className="text-muted-foreground shrink-0">{perm}</span>
              <span className="shrink-0">aksheyd</span>
              <span className="text-muted-foreground shrink-0 min-w-[130px]">
                {date}
              </span>
              {isDir(child) ? (
                <DirSpan name={child.filename} />
              ) : (
                <span>{child.filename}</span>
              )}
            </div>,
          );
        });
        append(...lines);
      } else {
        const items: ReactNode[] = [];
        if (showAll) {
          items.push(
            <DirSpan key="." name="." />,
            <DirSpan key=".." name=".." />,
          );
        }
        dir.children.forEach((child) => {
          items.push(
            isDir(child) ? (
              <DirSpan key={child.filename} name={child.filename} />
            ) : (
              <span key={child.filename}>{child.filename}</span>
            ),
          );
        });
        append(
          prompt,
          <div className="flex flex-wrap gap-x-4 gap-y-0.5">{items}</div>,
        );
      }
    }

    // ── cd ────────────────────────────────────────────────────────────

    else if (cmd === "cd") {
      if (args.length === 0 || args[0] === "~") {
        append(prompt);
        setCwd(root);
      } else {
        const target = resolvePath(cwd, args[0]);
        if (!target) {
          append(prompt, <Err msg={`cd: ${args[0]}: No such directory`} />);
        } else if (!isDir(target)) {
          append(prompt, <Err msg={`cd: ${args[0]}: Not a directory`} />);
        } else {
          append(prompt);
          setCwd(target);
        }
      }
    }

    // ── cat ───────────────────────────────────────────────────────────

    else if (cmd === "cat") {
      if (args.length === 0) {
        append(prompt, <Err msg="cat: missing file operand" />);
        return;
      }
      const target = resolvePath(cwd, args[0]);
      if (!target) {
        append(prompt, <Err msg={`cat: ${args[0]}: No such file`} />);
        return;
      }
      if (isDir(target)) {
        append(prompt, <Err msg={`cat: ${args[0]}: Is a directory`} />);
        return;
      }

      const d = target.data!;
      const box = (children: ReactNode) => (
        <div className="border border-dashed rounded p-3 my-1 space-y-0.5">
          {children}
        </div>
      );

      if ("baseModel" in d) {
        const m = d as Model;
        append(
          prompt,
          box(
            <>
              <Field label="name" value={m.name} />
              <Field label="desc" value={m.desc} />
              <Field label="base" value={m.baseModel} />
              <Field label="date" value={m.date} />
              <Field label="link" value={<Link url={m.link} />} />
            </>,
          ),
        );
      } else if ("name" in d) {
        const p = d as Project;
        append(
          prompt,
          box(
            <>
              <Field label="name" value={p.name} />
              <Field label="desc" value={p.desc} />
              <Field label="date" value={p.date} />
              <Field label="tech" value={p.tech.join(", ")} />
              {p.link && <Field label="link" value={<Link url={p.link} />} />}
              {p.repo && <Field label="repo" value={<Link url={p.repo} />} />}
            </>,
          ),
        );
      } else {
        const c = d as Contribution;
        append(
          prompt,
          box(
            <>
              <Field label="title" value={c.title} />
              <Field label="project" value={`${c.org}/${c.project}`} />
              <Field label="desc" value={c.desc} />
              <Field label="type" value={c.type} />
              <Field
                label="status"
                value={
                  <span
                    className={
                      c.status === "Merged"
                        ? "text-green-600 dark:text-green-400"
                        : ""
                    }
                  >
                    {c.status}
                  </span>
                }
              />
              <Field label="date" value={c.date} />
              <Field label="tech" value={c.tech.join(", ")} />
              <Field label="link" value={<Link url={c.link} />} />
            </>,
          ),
        );
      }
    }

    // ── open ──────────────────────────────────────────────────────────

    else if (cmd === "open") {
      if (args.length === 0) {
        append(prompt, <Err msg="open: missing file operand" />);
        return;
      }
      const target = resolvePath(cwd, args[0]);
      if (!target || !target.data) {
        append(prompt, <Err msg={`open: ${args[0]}: No such file`} />);
        return;
      }
      if (isDir(target)) {
        append(prompt, <Err msg={`open: ${args[0]}: Is a directory`} />);
        return;
      }

      const d = target.data;
      let url: string | undefined;
      if ("link" in d && d.link) url = d.link as string;
      if (!url && "repo" in d) url = (d as Project).repo;

      if (url) {
        append(
          prompt,
          <span className="text-muted-foreground">
            Opening {target.filename}...
          </span>,
        );
        window.open(url, url.startsWith("/") ? "_self" : "_blank");
      } else {
        append(
          prompt,
          <Err msg={`open: no link available for ${target.filename}`} />,
        );
      }
    }

    // ── pwd ───────────────────────────────────────────────────────────

    else if (cmd === "pwd") {
      append(prompt, <span>{getPath(cwd)}</span>);
    }

    // ── whoami ────────────────────────────────────────────────────────

    else if (cmd === "whoami") {
      append(prompt, <span>aksheyd</span>);
    }

    // ── tree ──────────────────────────────────────────────────────────

    else if (cmd === "tree") {
      let target = cwd;
      if (args.length > 0) {
        const resolved = resolvePath(cwd, args[0]);
        if (!resolved || !isDir(resolved)) {
          append(prompt, <Err msg={`tree: ${args[0]}: Not a directory`} />);
          return;
        }
        target = resolved;
      }

      const lines: string[] = ["."];
      const walk = (node: FileNode, prefix: string) => {
        node.children.forEach((child, i) => {
          const last = i === node.children.length - 1;
          const connector = last ? "└── " : "├── ";
          const name = isDir(child) ? child.filename + "/" : child.filename;
          lines.push(prefix + connector + name);
          if (isDir(child))
            walk(child, prefix + (last ? "    " : "│   "));
        });
      };
      walk(target, "");

      const dirCount = lines.filter((l) => l.endsWith("/")).length;
      const fileCount = lines.length - 1 - dirCount;
      lines.push(`\n${dirCount} directories, ${fileCount} files`);

      append(
        prompt,
        <pre className="leading-relaxed text-xs">{lines.join("\n")}</pre>,
      );
    }

    // ── clear ─────────────────────────────────────────────────────────

    else if (cmd === "clear") {
      setOutput([]);
    }

    // ── help ──────────────────────────────────────────────────────────

    else if (cmd === "help") {
      append(
        prompt,
        <div className="my-1 space-y-3">
          <div>
            <div className="text-muted-foreground mb-1">Navigation</div>
            <div className="grid grid-cols-[150px_1fr] gap-y-0.5 ml-2">
              <span>
                <span className="text-yellow-600 dark:text-yellow-400">cd</span>{" "}
                <span className="text-muted-foreground">[dir]</span>
              </span>
              <span>Change directory</span>
              <span>
                <span className="text-yellow-600 dark:text-yellow-400">ls</span>{" "}
                <span className="text-muted-foreground">[-al] [dir]</span>
              </span>
              <span>List contents</span>
              <span className="text-yellow-600 dark:text-yellow-400">pwd</span>
              <span>Print working directory</span>
              <span>
                <span className="text-yellow-600 dark:text-yellow-400">
                  tree
                </span>{" "}
                <span className="text-muted-foreground">[dir]</span>
              </span>
              <span>Show directory tree</span>
            </div>
          </div>
          <div>
            <div className="text-muted-foreground mb-1">Files</div>
            <div className="grid grid-cols-[150px_1fr] gap-y-0.5 ml-2">
              <span>
                <span className="text-yellow-600 dark:text-yellow-400">cat</span>{" "}
                <span className="text-muted-foreground">&lt;file&gt;</span>
              </span>
              <span>Show file details</span>
              <span>
                <span className="text-yellow-600 dark:text-yellow-400">
                  open
                </span>{" "}
                <span className="text-muted-foreground">&lt;file&gt;</span>
              </span>
              <span>Open link in browser</span>
            </div>
          </div>
          <div>
            <div className="text-muted-foreground mb-1">Social</div>
            <div className="grid grid-cols-[150px_1fr] gap-y-0.5 ml-2">
              {socialAccounts.map((a) => (
                <React.Fragment key={a.name}>
                  <span className="text-yellow-600 dark:text-yellow-400">
                    {a.name}
                  </span>
                  <span className="text-muted-foreground">
                    Open my {a.pretty}
                  </span>
                </React.Fragment>
              ))}
            </div>
          </div>
          <div>
            <div className="text-muted-foreground mb-1">Other</div>
            <div className="grid grid-cols-[150px_1fr] gap-y-0.5 ml-2">
              <span className="text-yellow-600 dark:text-yellow-400">
                whoami
              </span>
              <span>Who am I?</span>
              <span className="text-yellow-600 dark:text-yellow-400">
                clear
              </span>
              <span>Clear terminal</span>
              <span className="text-yellow-600 dark:text-yellow-400">help</span>
              <span>Show this message</span>
              <span className="text-yellow-600 dark:text-yellow-400">exit</span>
              <span>Return to homepage</span>
            </div>
          </div>
        </div>,
      );
    }

    // ── exit ──────────────────────────────────────────────────────────

    else if (cmd === "exit") {
      append(prompt);
      window.location.href = "/";
    }

    // ── social commands ──────────────────────────────────────────────

    else if (socialMap.has(cmd)) {
      const acct = socialMap.get(cmd)!;
      append(
        prompt,
        <span className="text-muted-foreground">
          Opening {acct.pretty}...
        </span>,
      );
      window.open(acct.website, "_blank");
    }

    // ── unknown command ──────────────────────────────────────────────

    else {
      append(prompt, <Err msg={`command not found: ${cmd}`} />);
    }
  };

  // ── Key handler ────────────────────────────────────────────────────

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      processCommand(input);
      setInput("");
    } else if (e.key === "Tab") {
      e.preventDefault();
      handleTab();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0 && histIdx < history.length - 1) {
        const i = histIdx + 1;
        setHistIdx(i);
        setInput(history[history.length - 1 - i]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx > 0) {
        const i = histIdx - 1;
        setHistIdx(i);
        setInput(history[history.length - 1 - i]);
      } else if (histIdx === 0) {
        setHistIdx(-1);
        setInput("");
      }
    } else if (e.ctrlKey && e.key === "c") {
      e.preventDefault();
      append(<PromptLine path={promptPath} cmd={input + "^C"} />);
      setInput("");
      setHistIdx(-1);
    } else if (e.ctrlKey && e.key === "u") {
      e.preventDefault();
      setInput("");
    } else if (e.ctrlKey && e.key === "l") {
      e.preventDefault();
      setOutput([]);
    }
  };

  // ── Render ─────────────────────────────────────────────────────────

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] h-[calc(100vh-3.5rem)] w-full border-l border-r border-b border-dashed">
      {/* Terminal */}
      <div
        className="h-full overflow-y-auto cursor-text"
        onClick={() => inputRef.current?.focus()}
      >
        <div className="p-4 font-mono text-xs">
          <div className="space-y-0.5">
            {output.map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </div>

          {/* Active prompt */}
          <div className="flex items-center gap-1 mt-1 text-base sm:text-xs">
            <span className="whitespace-nowrap mr-2">
              {promptPath} $ 
            </span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none caret-current text-[16px] sm:text-xs"
              spellCheck={false}
              autoFocus
              autoComplete="off"
              autoCapitalize="off"
              aria-label="Terminal input"
            />
          </div>
          <div ref={endRef} />
        </div>
      </div>

      {/* Guide panel */}
      <div className="hidden lg:block h-full p-4 border-l border-dashed font-mono overflow-y-auto">
        <h2 className="text-lg font-bold mb-4">Guide</h2>
        <div className="space-y-4 text-xs">
          <div>
            <h3 className="text-sm font-semibold mb-1">About</h3>
            <p className="text-muted-foreground">
              Navigate my projects using UNIX-style commands.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-2">Quick Start</h3>
            <div className="space-y-1.5 text-muted-foreground">
              <div>
                <code className="text-foreground">ls</code> — see what&apos;s
                here
              </div>
              <div>
                <code className="text-foreground">cd projects</code> — enter a
                folder
              </div>
              <div>
                <code className="text-foreground">cd web-dev</code> — go deeper
              </div>
              <div>
                <code className="text-foreground">cat whats-up</code> — inspect
                a project
              </div>
              <div>
                <code className="text-foreground">open whats-up</code> — open
                its link
              </div>
              <div>
                <code className="text-foreground">cd ..</code> — go back
              </div>
              <div>
                <code className="text-foreground">tree</code> — see full
                structure
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-2">Tips</h3>
            <div className="space-y-1.5 text-muted-foreground">
              <div>
                <code className="text-foreground">Tab</code> — autocomplete
              </div>
              <div>
                <code className="text-foreground">↑ ↓</code> — command history
              </div>
              <div>
                <code className="text-foreground">Ctrl+C</code> — cancel
              </div>
              <div>
                <code className="text-foreground">Ctrl+L</code> — clear screen
              </div>
              <div>
                <code className="text-foreground">help</code> — all commands
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
