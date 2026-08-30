import type { ReactNode } from "react";
import { FileNode } from "@/lib/FileSystem";
import { COMMANDS, LS_FLAGS, getPath, isDir, resolvePath } from "@/lib/terminal/fs";
import { commonPrefix } from "@/lib/terminal/readline";
import { PromptLine, Suggestions } from "@/components/terminal/display";

export function completeTab(
  input: string,
  cwd: FileNode,
): { input?: string; lines?: ReactNode[] } {
  const promptPath = getPath(cwd);
  const trimmed = input.trim();

  if (!trimmed) {
    return {
      lines: [
        <PromptLine key="tab" path={promptPath} cmd="" />,
        <Suggestions key="sugs" items={COMMANDS} />,
      ],
    };
  }

  const spaceIdx = trimmed.indexOf(" ");

  if (spaceIdx === -1) {
    const matches = COMMANDS.filter((c) => c.startsWith(trimmed));
    if (matches.length === 0) return {};
    if (matches.length === 1) return { input: matches[0] + " " };
    const cp = commonPrefix(matches);
    const next = cp.length > trimmed.length ? { input: cp } : {};
    return {
      ...next,
      lines: [
        <PromptLine key="tab" path={promptPath} cmd={input} />,
        <Suggestions key="sugs" items={matches} />,
      ],
    };
  }

  const cmd = trimmed.slice(0, spaceIdx).toLowerCase();
  const lastSp = input.lastIndexOf(" ");
  const partial = input.slice(lastSp + 1);
  const before = input.slice(0, lastSp + 1);

  if (cmd === "ls" && partial.startsWith("-")) {
    const matches = LS_FLAGS.filter((f) => f.startsWith(partial));
    if (matches.length === 0) return {};
    if (matches.length === 1) return { input: before + matches[0] + " " };
    const cp = commonPrefix(matches);
    const next = cp.length > partial.length ? { input: before + cp } : {};
    return {
      ...next,
      lines: [
        <PromptLine key="tab" path={promptPath} cmd={input} />,
        <Suggestions key="sugs" items={matches} />,
      ],
    };
  }

  const dirsOnly = cmd === "cd" || cmd === "ls";
  const slashIdx = partial.lastIndexOf("/");
  let dir = cwd;
  let namePrefix = partial;
  let pathPre = "";

  if (slashIdx >= 0) {
    pathPre = partial.slice(0, slashIdx + 1);
    namePrefix = partial.slice(slashIdx + 1);
    const resolved = resolvePath(cwd, partial.slice(0, slashIdx) || ".");
    if (!resolved || !isDir(resolved)) return {};
    dir = resolved;
  }

  const candidates = dir.children
    .filter((c) => !dirsOnly || isDir(c))
    .filter((c) => c.filename.startsWith(namePrefix))
    .map((c) => c.filename + (isDir(c) ? "/" : ""));

  if (candidates.length === 0) return {};
  if (candidates.length === 1) {
    const trail = candidates[0].endsWith("/") ? "" : " ";
    return { input: before + pathPre + candidates[0] + trail };
  }
  const cp = commonPrefix(candidates);
  const next =
    cp.length > namePrefix.length
      ? { input: before + pathPre + cp }
      : {};
  return {
    ...next,
    lines: [
      <PromptLine key="tab" path={promptPath} cmd={input} />,
      <Suggestions key="sugs" items={candidates} />,
    ],
  };
}
