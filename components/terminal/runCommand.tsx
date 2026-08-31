import type { Dispatch, MutableRefObject, ReactNode, SetStateAction } from "react";
import { FileNode } from "@/lib/FileSystem";
import type { Project } from "@/lib/Projects";
import {
  COMMANDS,
  HELP,
  getPath,
  isDir,
  resolvePath,
  root,
  socialMap,
  getDate,
} from "@/lib/terminal/fs";
import { suggestCommand } from "@/lib/terminal/readline";
import {
  DirSpan,
  Err,
  HelpListing,
  LsLongRow,
  PromptLine,
  type OutputLine,
  renderCatCard,
} from "@/components/terminal/display";

export type CommandCtx = {
  dir: FileNode;
  append: (...nodes: ReactNode[]) => void;
  setCwd: (n: FileNode) => void;
  cwdRef: MutableRefObject<FileNode>;
  prevCwdRef: MutableRefObject<FileNode | null>;
  pinnedRef: MutableRefObject<boolean>;
  setOutput: Dispatch<SetStateAction<OutputLine[]>>;
};

export function runCommand(raw: string, ctx: CommandCtx): { exit: boolean } {
  const { dir, append, setCwd, cwdRef, prevCwdRef, pinnedRef, setOutput } =
    ctx;
  const trimmed = raw.trim();
  const prompt = <PromptLine path={getPath(dir)} cmd={trimmed} />;

  if (!trimmed) {
    append(prompt);
    return { exit: false };
  }

  const parts = trimmed.split(/\s+/);
  const cmd = parts[0]!.toLowerCase();
  const args = parts.slice(1);

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

    let listDir = dir;
    if (target) {
      const resolved = resolvePath(dir, target);
      if (!resolved) {
        append(prompt, <Err msg={`ls: ${target}: No such file or directory`} />);
        return { exit: false };
      }
      if (!isDir(resolved)) {
        append(prompt, <span>{resolved.filename}</span>);
        return { exit: false };
      }
      listDir = resolved;
    }

    if (showLong) {
      const lines: ReactNode[] = [prompt];
      if (showAll) {
        lines.push(
          <LsLongRow key="dot" perm="drwxr-xr-x" date="" name={<DirSpan name="." />} />,
          <LsLongRow
            key="dotdot"
            perm="drwxr-xr-x"
            date=""
            name={<DirSpan name=".." />}
          />,
        );
      }
      listDir.children.forEach((child) => {
        lines.push(
          <LsLongRow
            key={child.filename}
            perm={isDir(child) ? "drwxr-xr-x" : "-rw-r--r--"}
            date={getDate(child)}
            name={
              isDir(child) ? (
                <DirSpan name={child.filename} />
              ) : (
                child.filename
              )
            }
          />,
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
      listDir.children.forEach((child) => {
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
        <div className="flex flex-wrap gap-x-4 gap-y-0">{items}</div>,
      );
    }
    return { exit: false };
  }

  if (cmd === "cd") {
    const arg = args[0];

    if (arg === "-") {
      const dest = prevCwdRef.current;
      if (!dest) {
        append(prompt, <Err msg="cd: OLDPWD not set" />);
        return { exit: false };
      }
      prevCwdRef.current = dir;
      cwdRef.current = dest;
      setCwd(dest);
      append(prompt, <span>{getPath(dest)}</span>);
      return { exit: false };
    }

    const dest =
      args.length === 0 || arg === "~" || arg === "/"
        ? root
        : resolvePath(dir, arg);

    if (!dest) {
      append(prompt, <Err msg={`cd: ${arg}: No such directory`} />);
      return { exit: false };
    }
    if (!isDir(dest)) {
      append(prompt, <Err msg={`cd: ${arg}: Not a directory`} />);
      return { exit: false };
    }

    prevCwdRef.current = dir;
    cwdRef.current = dest;
    setCwd(dest);
    append(prompt);
    return { exit: false };
  }

  if (cmd === "cat") {
    if (args.length === 0) {
      append(prompt, <Err msg="cat: missing file operand" />);
      return { exit: false };
    }
    const lines: ReactNode[] = [prompt];
    for (const arg of args) {
      const target = resolvePath(dir, arg);
      if (!target) {
        lines.push(<Err key={`miss-${arg}`} msg={`cat: ${arg}: No such file`} />);
        continue;
      }
      if (isDir(target)) {
        lines.push(
          <Err key={`dir-${arg}`} msg={`cat: ${arg}: Is a directory`} />,
        );
        continue;
      }
      lines.push(
        <span key={`cat-${arg}`} className="block">
          {renderCatCard(target.data!)}
        </span>,
      );
    }
    append(...lines);
    return { exit: false };
  }

  if (cmd === "open") {
    if (args.length === 0) {
      append(prompt, <Err msg="open: missing file operand" />);
      return { exit: false };
    }
    const target = resolvePath(dir, args[0]);
    if (!target || !target.data) {
      append(prompt, <Err msg={`open: ${args[0]}: No such file`} />);
      return { exit: false };
    }
    if (isDir(target)) {
      append(prompt, <Err msg={`open: ${args[0]}: Is a directory`} />);
      return { exit: false };
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
    return { exit: false };
  }

  if (cmd === "pwd") {
    append(prompt, <span>{getPath(dir)}</span>);
    return { exit: false };
  }

  if (cmd === "whoami") {
    append(prompt, <span>aksheyd</span>);
    return { exit: false };
  }

  if (cmd === "tree") {
    let target = dir;
    if (args.length > 0) {
      const resolved = resolvePath(dir, args[0]);
      if (!resolved || !isDir(resolved)) {
        append(prompt, <Err msg={`tree: ${args[0]}: Not a directory`} />);
        return { exit: false };
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
        if (isDir(child)) walk(child, prefix + (last ? "    " : "│   "));
      });
    };
    walk(target, "");

    const dirCount = lines.filter((l) => l.endsWith("/")).length;
    const fileCount = lines.length - 1 - dirCount;
    lines.push(`\n${dirCount} directories, ${fileCount} files`);

    append(prompt, <pre className="leading-[1.5]">{lines.join("\n")}</pre>);
    return { exit: false };
  }

  if (cmd === "clear") {
    pinnedRef.current = true;
    setOutput([]);
    return { exit: false };
  }

  if (cmd === "help") {
    if (args[0]) {
      const topic = args[0].toLowerCase();
      const text = HELP[topic];
      if (!text) {
        append(prompt, <Err msg={`help: no help for ${args[0]}`} />);
        return { exit: false };
      }
      append(
        prompt,
        <span>
          <span className="text-yellow-600 dark:text-yellow-400">{topic}</span>
          {` — ${text}`}
        </span>,
      );
      return { exit: false };
    }

    append(prompt, <HelpListing />);
    return { exit: false };
  }

  if (cmd === "exit") {
    append(prompt);
    window.location.href = "/";
    return { exit: true };
  }

  if (socialMap.has(cmd)) {
    const acct = socialMap.get(cmd)!;
    append(
      prompt,
      <span className="text-muted-foreground">Opening {acct.pretty}...</span>,
    );
    window.open(acct.website, "_blank");
    return { exit: false };
  }

  const hint = suggestCommand(cmd, COMMANDS);
  append(prompt, <Err msg={`command not found: ${cmd}`} />);
  if (hint) {
    append(
      <span className="text-muted-foreground">{`did you mean: ${hint}`}</span>,
    );
  }
  return { exit: false };
}
