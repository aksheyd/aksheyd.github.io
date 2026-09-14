import type { ReactNode } from "react";

type KeyRow = { input: string; action: string };

function KeyList({ title, rows }: { title: string; rows: KeyRow[] }) {
  return (
    <div>
      <h2 className="font-serif text-lg mb-2">{title}</h2>
      <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 font-mono text-xs">
        {rows.map((row) => (
          <div key={row.input} className="contents">
            <dt className="text-muted-foreground whitespace-nowrap">
              {row.input}
            </dt>
            <dd>{row.action}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default function GamePage({
  title,
  authors,
  description,
  controls,
  special,
  game,
}: {
  title: string;
  authors: string;
  description: ReactNode;
  controls: KeyRow[];
  special?: KeyRow[];
  game: ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(16rem,1fr)_minmax(0,2fr)_minmax(12rem,18rem)] min-h-[calc(100dvh-3.5rem)] lg:h-[calc(100dvh-3.5rem)] lg:overflow-hidden w-full border-x border-b border-dashed">
      <aside className="lg:overflow-y-auto border-b lg:border-b-0 lg:border-r border-dashed p-6">
        <h1 className="font-serif text-2xl mb-1">{title}</h1>
        <p className="font-mono text-xs text-muted-foreground mb-4">
          {authors}
        </p>
        <div className="space-y-3 text-sm">{description}</div>
      </aside>

      <div className="min-h-[50dvh] lg:min-h-0 bg-black">{game}</div>

      <aside className="lg:overflow-y-auto border-t lg:border-t-0 lg:border-l border-dashed p-6 space-y-6">
        <KeyList title="Controls" rows={controls} />
        {special && special.length > 0 && (
          <KeyList title="Special" rows={special} />
        )}
      </aside>
    </div>
  );
}
