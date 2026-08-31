import { Fragment, type ReactNode } from "react";
import type { Project } from "@/lib/Projects";
import type { Contribution } from "@/lib/Contributions";
import type { Model } from "@/lib/Models";
import socialAccounts from "@/lib/Socials";

export type OutputLine = { id: number; node: ReactNode };

/** Shared row metrics: history echo and live prompt occupy the same box. */
export const SHELL_TEXT =
  "font-mono text-[16px] sm:text-[13px] leading-[1.5] tracking-normal";

export function PromptRow({
  path,
  children,
}: {
  path: string;
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-[1.5em] items-center gap-2">
      <span className="shrink-0 whitespace-nowrap text-muted-foreground">
        <span className="text-foreground">{path}</span>
        {" $"}
      </span>
      <span className="min-w-0 flex-1 break-all">{children}</span>
    </div>
  );
}

export const PromptLine = ({ path, cmd }: { path: string; cmd: string }) => (
  <PromptRow path={path}>{cmd}</PromptRow>
);

export const Err = ({ msg }: { msg: string }) => (
  <span className="text-red-600 dark:text-red-400">{msg}</span>
);

export const DirSpan = ({ name }: { name: string }) => (
  <span className="font-medium text-blue-600 dark:text-blue-400">{name}/</span>
);

export const Suggestions = ({ items }: { items: string[] }) => (
  <div className="flex flex-wrap gap-x-4 gap-y-0">
    {items.map((s) => (
      <span
        key={s}
        className={
          s.endsWith("/")
            ? "font-medium text-blue-600 dark:text-blue-400"
            : undefined
        }
      >
        {s}
      </span>
    ))}
  </div>
);

const Field = ({ label, value }: { label: string; value: ReactNode }) => (
  <div className="flex gap-3">
    <span className="w-16 shrink-0 text-muted-foreground">{label}</span>
    <span className="min-w-0">{value}</span>
  </div>
);

const Link = ({ url }: { url: string }) => (
  <a
    href={url}
    target={url.startsWith("/") ? "_self" : "_blank"}
    rel="noopener noreferrer"
    className="text-blue-600 underline decoration-blue-600/40 underline-offset-2 hover:decoration-blue-600 dark:text-blue-400 dark:decoration-blue-400/40"
  >
    {url}
  </a>
);

const catBox = (children: ReactNode) => (
  <div className="my-[0.75em] space-y-0 border border-dashed border-foreground/25 px-3 py-2">
    {children}
  </div>
);

export const renderCatCard = (d: Project | Contribution | Model): ReactNode => {
  if ("baseModel" in d) {
    const m = d as Model;
    return catBox(
      <>
        <Field label="name" value={m.name} />
        <Field label="desc" value={m.desc} />
        <Field label="base" value={m.baseModel} />
        <Field label="date" value={m.date} />
        <Field label="link" value={<Link url={m.link} />} />
      </>,
    );
  }
  if ("name" in d) {
    const p = d as Project;
    return catBox(
      <>
        <Field label="name" value={p.name} />
        <Field label="desc" value={p.desc} />
        <Field label="date" value={p.date} />
        <Field label="tech" value={p.tech.join(", ")} />
        {p.link && <Field label="link" value={<Link url={p.link} />} />}
        {p.repo && <Field label="repo" value={<Link url={p.repo} />} />}
      </>,
    );
  }
  const c = d as Contribution;
  return catBox(
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
                : undefined
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
  );
};

export const LsLongRow = ({
  perm,
  date,
  name,
}: {
  perm: string;
  date: string;
  name: ReactNode;
}) => (
  <div className="grid grid-cols-[11ch_8ch_minmax(7rem,1fr)] items-baseline gap-x-3">
    <span className="text-muted-foreground">{perm}</span>
    <span className="text-muted-foreground">{date || "—"}</span>
    <span className="min-w-0 truncate">{name}</span>
  </div>
);

const Cmd = ({ children }: { children: ReactNode }) => (
  <span className="text-yellow-600 dark:text-yellow-400">{children}</span>
);

const HelpGrid = ({ rows }: { rows: ReactNode }) => (
  <div className="ml-2 grid grid-cols-[7.5rem_minmax(0,1fr)] gap-x-3 gap-y-0">
    {rows}
  </div>
);

export const HelpListing = () => (
  <div className="space-y-[1.5em] py-[0.75em]">
    <div>
      <div className="mb-[0.25em] text-muted-foreground">Navigation</div>
      <HelpGrid
        rows={
          <>
            <span>
              <Cmd>cd</Cmd>{" "}
              <span className="text-muted-foreground">[dir]</span>
            </span>
            <span>Change directory (`-` = previous)</span>
            <span>
              <Cmd>ls</Cmd>{" "}
              <span className="text-muted-foreground">[-al] [dir]</span>
            </span>
            <span>List contents</span>
            <Cmd>pwd</Cmd>
            <span>Print working directory</span>
            <span>
              <Cmd>tree</Cmd>{" "}
              <span className="text-muted-foreground">[dir]</span>
            </span>
            <span>Show directory tree</span>
          </>
        }
      />
    </div>
    <div>
      <div className="mb-[0.25em] text-muted-foreground">Files</div>
      <HelpGrid
        rows={
          <>
            <span>
              <Cmd>cat</Cmd>{" "}
              <span className="text-muted-foreground">&lt;file...&gt;</span>
            </span>
            <span>Show file details</span>
            <span>
              <Cmd>open</Cmd>{" "}
              <span className="text-muted-foreground">&lt;file&gt;</span>
            </span>
            <span>Open link in browser</span>
          </>
        }
      />
    </div>
    <div>
      <div className="mb-[0.25em] text-muted-foreground">Social</div>
      <HelpGrid
        rows={
          <>
            {socialAccounts.map((a) => (
              <Fragment key={a.name}>
                <Cmd>{a.name}</Cmd>
                <span className="text-muted-foreground">
                  Open my {a.pretty}
                </span>
              </Fragment>
            ))}
          </>
        }
      />
    </div>
    <div>
      <div className="mb-[0.25em] text-muted-foreground">Other</div>
      <HelpGrid
        rows={
          <>
            <Cmd>whoami</Cmd>
            <span>Who am I?</span>
            <Cmd>clear</Cmd>
            <span>Clear terminal</span>
            <Cmd>help</Cmd>
            <span>Show this message</span>
            <Cmd>exit</Cmd>
            <span>Return to homepage</span>
          </>
        }
      />
    </div>
  </div>
);
