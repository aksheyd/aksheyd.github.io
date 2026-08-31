"use client";

import React, {
  useRef,
  useState,
  useLayoutEffect,
  type ReactNode,
} from "react";
import { FileNode } from "@/lib/FileSystem";
import { getPath, root } from "@/lib/terminal/fs";
import {
  PASTE_CAP,
  deletePreviousWord,
  inputRangeSelected,
  isNearBottom,
  pushHistory,
  splitPastePayload,
  windowSelectionText,
} from "@/lib/terminal/readline";
import { completeTab } from "@/components/terminal/completeTab";
import {
  Err,
  PromptRow,
  SHELL_TEXT,
  type OutputLine,
} from "@/components/terminal/display";
import { runCommand } from "@/components/terminal/runCommand";

export default function Terminal() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<OutputLine[]>([
    { id: 0, node: "Welcome to my terminal." },
    {
      id: 1,
      node: (
        <span className="text-muted-foreground">
          Type &apos;help&apos; for available commands.
        </span>
      ),
    },
  ]);
  const [, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [cwd, setCwd] = useState(root);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef(true);
  const cwdRef = useRef<FileNode>(root);
  const prevCwdRef = useRef<FileNode | null>(null);
  const historyRef = useRef<string[]>([]);
  const draftRef = useRef("");
  const caretRef = useRef<number | null>(null);
  const freezeScrollRef = useRef<number | null>(null);
  const nextId = useRef(2);

  const promptPath = getPath(cwd);

  const focusPrompt = () => {
    inputRef.current?.focus({ preventScroll: true });
  };

  const applyPromptCaret = () => {
    const el = inputRef.current;
    const caret = caretRef.current;
    if (el && caret != null) {
      el.setSelectionRange(caret, caret);
      caretRef.current = null;
    }
  };

  const syncScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    if (pinnedRef.current) {
      el.scrollTop = el.scrollHeight;
    } else if (freezeScrollRef.current != null) {
      el.scrollTop = freezeScrollRef.current;
    }
  };

  const freezeScrollIfUnpinned = () => {
    const el = scrollRef.current;
    if (!el || isNearBottom(el) || freezeScrollRef.current != null) return;
    freezeScrollRef.current = el.scrollTop;
    requestAnimationFrame(() => {
      applyPromptCaret();
      syncScroll();
      freezeScrollRef.current = null;
    });
  };

  useLayoutEffect(() => {
    applyPromptCaret();
    syncScroll();
  }, [output, input]);

  const append = (...nodes: ReactNode[]) => {
    setOutput((prev) => [
      ...prev,
      ...nodes.map((node) => ({ id: nextId.current++, node })),
    ]);
  };

  const applyKill = (nextValue: string, nextCursor: number) => {
    setHistIdx(-1);
    const el = inputRef.current;
    if (nextValue === input) {
      el?.setSelectionRange(nextCursor, nextCursor);
      caretRef.current = null;
      return;
    }
    caretRef.current = nextCursor;
    setInput(nextValue);
  };

  const processCommand = (raw: string): { exit: boolean } => {
    const trimmed = raw.trim();
    if (trimmed) {
      historyRef.current = pushHistory(historyRef.current, trimmed);
      setHistory(historyRef.current);
      setHistIdx(-1);
    }
    return runCommand(raw, {
      dir: cwdRef.current,
      append,
      setCwd,
      cwdRef,
      prevCwdRef,
      pinnedRef,
      setOutput,
    });
  };

  const handleTab = () => {
    const result = completeTab(input, cwdRef.current);
    if (result.input !== undefined) setInput(result.input);
    if (result.lines) append(...result.lines);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      e.nativeEvent.isComposing ||
      e.key === "Process" ||
      e.keyCode === 229
    ) {
      return;
    }

    freezeScrollIfUnpinned();

    const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;

    if ((e.ctrlKey || e.metaKey) && key === "c" && !e.altKey) {
      if (inputRangeSelected(inputRef.current)) return;
      const text = windowSelectionText();
      if (text.length > 0) {
        e.preventDefault();
        try {
          void navigator.clipboard?.writeText(text)?.catch(() => {});
        } catch {
          /* clipboard missing — do not cancel */
        }
        return;
      }
      if (e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        append(
          <PromptRow path={getPath(cwdRef.current)}>{input + "^C"}</PromptRow>,
        );
        setInput("");
        setHistIdx(-1);
      }
      return;
    }

    if (key === "Enter") {
      e.preventDefault();
      processCommand(input);
      setInput("");
      setHistIdx(-1);
      return;
    }

    if (key === "Tab") {
      e.preventDefault();
      handleTab();
      return;
    }

    if (key === "ArrowUp") {
      e.preventDefault();
      const hist = historyRef.current;
      if (hist.length === 0) return;
      let nextIdx = histIdx;
      if (nextIdx === -1) draftRef.current = input;
      if (nextIdx < hist.length - 1) {
        nextIdx += 1;
        setHistIdx(nextIdx);
        setInput(hist[hist.length - 1 - nextIdx]!);
      }
      return;
    }

    if (key === "ArrowDown") {
      e.preventDefault();
      if (histIdx === -1) return;
      const hist = historyRef.current;
      if (histIdx === 0) {
        setHistIdx(-1);
        setInput(draftRef.current);
      } else {
        const nextIdx = histIdx - 1;
        setHistIdx(nextIdx);
        setInput(hist[hist.length - 1 - nextIdx]!);
      }
      return;
    }

    if (e.ctrlKey && key === "u") {
      e.preventDefault();
      applyKill("", 0);
      return;
    }

    if (e.metaKey && key === "Backspace") {
      e.preventDefault();
      applyKill("", 0);
      return;
    }

    if (e.ctrlKey && key === "l") {
      e.preventDefault();
      pinnedRef.current = true;
      setOutput([]);
      return;
    }

    if (
      (e.ctrlKey && key === "w") ||
      (e.altKey && key === "Backspace") ||
      (e.ctrlKey && key === "Backspace")
    ) {
      e.preventDefault();
      const el = inputRef.current;
      const start = el?.selectionStart ?? input.length;
      const end = el?.selectionEnd ?? start;
      if (start !== end) {
        applyKill(input.slice(0, start) + input.slice(end), start);
      } else {
        const result = deletePreviousWord(input, start);
        applyKill(result.value, result.cursor);
      }
      return;
    }

    if (e.ctrlKey && !e.metaKey && key === "a") {
      e.preventDefault();
      inputRef.current?.setSelectionRange(0, 0);
      return;
    }

    if (e.ctrlKey && !e.metaKey && key === "e") {
      e.preventDefault();
      const len = input.length;
      inputRef.current?.setSelectionRange(len, len);
      return;
    }

    if (e.ctrlKey && key === "k") {
      e.preventDefault();
      const cursor = inputRef.current?.selectionStart ?? input.length;
      applyKill(input.slice(0, cursor), cursor);
      return;
    }

    if (e.ctrlKey && key === "d" && input.length === 0) {
      e.preventDefault();
      processCommand("exit");
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    freezeScrollIfUnpinned();
    const clip =
      e.clipboardData?.getData("text/plain") ||
      e.clipboardData?.getData("text") ||
      "";
    if (!clip) return;
    if (!/[\n\r]/.test(clip)) return;

    e.preventDefault();
    const el = inputRef.current;
    const value = input;
    const start = el?.selectionStart ?? value.length;
    const end = el?.selectionEnd ?? start;
    const combined = value.slice(0, start) + clip + value.slice(end);
    const { commands, remainder } = splitPastePayload(combined);

    const toRun = commands.slice(0, PASTE_CAP);
    const truncated = commands.length > PASTE_CAP;
    for (const line of toRun) {
      const { exit } = processCommand(line);
      if (exit) return;
    }
    if (truncated) {
      append(<Err msg="paste: truncated after 32 commands" />);
      setInput("");
    } else {
      setInput(remainder);
    }
    setHistIdx(-1);
  };

  const onSurfaceClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement | null;
    if (target?.closest("a")) return;
    if (target === inputRef.current) return;
    const sel = window.getSelection();
    if (sel && !sel.isCollapsed) return;
    focusPrompt();
  };

  const onSurfaceScroll = () => {
    if (freezeScrollRef.current != null) return;
    const el = scrollRef.current;
    if (!el) return;
    pinnedRef.current = isNearBottom(el);
  };

  return (
    <div
      ref={scrollRef}
      className="h-[calc(100dvh-3.5rem)] w-full cursor-text overflow-y-auto border-x border-b border-dashed [overflow-anchor:none]"
      onClick={onSurfaceClick}
      onScroll={onSurfaceScroll}
    >
      <div className={`${SHELL_TEXT} p-4`}>
        {output.map((line) => (
          <div key={line.id} className="min-h-[1.5em]">
            {line.node}
          </div>
        ))}

        <PromptRow path={promptPath}>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onBeforeInput={() => freezeScrollIfUnpinned()}
            onPaste={handlePaste}
            className="m-0 block h-[1.5em] w-full min-w-0 appearance-none border-0 bg-transparent p-0 text-[length:inherit] leading-[inherit] outline-none caret-current"
            spellCheck={false}
            autoFocus
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            enterKeyHint="enter"
            aria-label="Terminal input"
          />
        </PromptRow>
      </div>
    </div>
  );
}
