export const PIN_SLACK = 5;
export const PASTE_CAP = 32;

export function inputRangeSelected(el: HTMLInputElement | null): boolean {
  return (
    !!el &&
    el.selectionStart !== null &&
    el.selectionEnd !== null &&
    el.selectionStart !== el.selectionEnd
  );
}

export function windowSelectionText(): string {
  return window.getSelection()?.toString() ?? "";
}

export function isNearBottom(el: HTMLElement): boolean {
  return el.scrollHeight - el.scrollTop - el.clientHeight < PIN_SLACK;
}

export function pushHistory(prev: string[], cmd: string): string[] {
  const t = cmd.trim();
  if (!t) return prev;
  if (prev[prev.length - 1] === t) return prev;
  return [...prev, t];
}

const isWordBound = (ch: string) => /\s/.test(ch) || ch === "/";

export function deletePreviousWord(
  value: string,
  cursor: number,
): { value: string; cursor: number } {
  let i = cursor;
  while (i > 0 && isWordBound(value[i - 1]!)) i--;
  while (i > 0 && !isWordBound(value[i - 1]!)) i--;
  return { value: value.slice(0, i) + value.slice(cursor), cursor: i };
}

export function splitPastePayload(text: string): {
  commands: string[];
  remainder: string;
} {
  const normalized = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  const trailingNl = normalized.endsWith("\n");
  const parts = normalized.split("\n");
  if (trailingNl && parts[parts.length - 1] === "") parts.pop();
  if (!trailingNl) {
    const remainder = parts.pop() ?? "";
    return {
      commands: parts.filter((l) => l.trim().length > 0),
      remainder,
    };
  }
  return {
    commands: parts.filter((l) => l.trim().length > 0),
    remainder: "",
  };
}

function damerauLevenshtein(a: string, b: string): number {
  const n = a.length;
  const m = b.length;
  const dp: number[][] = Array.from({ length: n + 1 }, () =>
    Array<number>(m + 1).fill(0),
  );
  for (let i = 0; i <= n; i++) dp[i]![0] = i;
  for (let j = 0; j <= m; j++) dp[0]![j] = j;
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i]![j] = Math.min(
        dp[i - 1]![j]! + 1,
        dp[i]![j - 1]! + 1,
        dp[i - 1]![j - 1]! + cost,
      );
      if (
        i > 1 &&
        j > 1 &&
        a[i - 1] === b[j - 2] &&
        a[i - 2] === b[j - 1]
      ) {
        dp[i]![j] = Math.min(dp[i]![j]!, dp[i - 2]![j - 2]! + 1);
      }
    }
  }
  return dp[n]![m]!;
}

export function suggestCommand(
  cmd: string,
  commands: readonly string[],
): string | null {
  let best: string | null = null;
  let bestD = Infinity;
  let ties = 0;
  for (const c of commands) {
    const d = damerauLevenshtein(cmd, c);
    if (d < bestD) {
      bestD = d;
      best = c;
      ties = 1;
    } else if (d === bestD) {
      ties++;
    }
  }
  if (!best || ties !== 1 || bestD === 0 || bestD > 2) return null;
  return best;
}

export function commonPrefix(strs: string[]): string {
  if (!strs.length) return "";
  let p = strs[0];
  for (const s of strs) {
    while (!s.startsWith(p)) p = p.slice(0, -1);
  }
  return p;
}
