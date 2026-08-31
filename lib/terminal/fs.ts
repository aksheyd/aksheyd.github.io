import { FileNode } from "@/lib/FileSystem";
import projects from "@/lib/Projects";
import contributions from "@/lib/Contributions";
import models from "@/lib/Models";
import socialAccounts from "@/lib/Socials";

export const root = new FileNode("root", undefined, undefined);
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
  openSourceFolder.children.push(new FileNode(c.project, openSourceFolder, c)),
);

models.forEach((m) =>
  fineTunesFolder.children.push(new FileNode(m.name, fineTunesFolder, m)),
);

export const socialMap = new Map(socialAccounts.map((a) => [a.name, a]));

export const COMMANDS = [
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

export const LS_FLAGS = ["-a", "-l", "-la", "-al"];

export const HELP: Record<string, string> = {
  cd: "Change directory (`-` = previous)",
  ls: "List contents",
  cat: "Show file details",
  open: "Open link in browser",
  pwd: "Print working directory",
  whoami: "Who am I?",
  tree: "Show directory tree",
  clear: "Clear terminal",
  help: "Show this message",
  exit: "Return to homepage",
  ...Object.fromEntries(
    socialAccounts.map((a) => [a.name, `Open my ${a.pretty}`]),
  ),
};

export const isDir = (n: FileNode) => n.data === undefined;

export const getPath = (node: FileNode): string => {
  if (!node.parent) return "~";
  const parts: string[] = [];
  let cur: FileNode | undefined = node;
  while (cur?.parent) {
    parts.unshift(cur.filename);
    cur = cur.parent;
  }
  return "~/" + parts.join("/");
};

export const resolvePath = (from: FileNode, path: string): FileNode | null => {
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

export const getDate = (n: FileNode): string =>
  n.data && "date" in n.data ? (n.data as { date: string }).date : "";
