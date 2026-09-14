import { FileNode } from "@/lib/FileSystem";
import projects, {
  PROJECT_CATEGORIES,
  type ProjectCategory,
} from "@/lib/Projects";
import contributions from "@/lib/Contributions";
import models from "@/lib/Models";
import socialAccounts from "@/lib/Socials";

export const root = new FileNode("root", undefined, undefined);
const projFolder = new FileNode("projects", root, undefined);
const contribFolder = new FileNode("contributions", root, undefined);
const fineTunesFolder = new FileNode("fine-tunes", root, undefined);
root.children.push(projFolder, contribFolder, fineTunesFolder);

const categoryFolders = Object.fromEntries(
  PROJECT_CATEGORIES.map((category) => {
    const folder = new FileNode(category, projFolder, undefined);
    projFolder.children.push(folder);
    return [category, folder];
  }),
) as Record<ProjectCategory, FileNode>;

projects.forEach((p) => {
  const folder = categoryFolders[p.category];
  folder.children.push(new FileNode(p.name, folder, p));
});

const openSourceFolder = new FileNode("open-source", contribFolder, undefined);
contribFolder.children.push(openSourceFolder);

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
