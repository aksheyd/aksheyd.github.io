"use client";

import { useState, useEffect, useRef, type FormEvent } from "react";
import type { MLCEngineInterface, InitProgressReport } from "@mlc-ai/web-llm";

const MODEL_ID = "SmolLM2-135M-Instruct-q0f16-MLC";
const MODEL_LABEL = "SmolLM2 135M";
const SYSTEM_PROMPT = "You are a helpful assistant. Your name is Akshey.";

const DEFAULTS = {
  temperature: 0.6,
  topP: 0.85,
  repetitionPenalty: 1.15,
  maxTokens: 256,
};

interface GenConfig {
  temperature: number;
  topP: number;
  repetitionPenalty: number;
  maxTokens: number;
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

function Param({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  const clamp = (v: number) => Math.min(max, Math.max(min, +v.toFixed(4)));
  const dec = () => onChange(clamp(value - step));
  const inc = () => onChange(clamp(value + step));

  return (
    <div className="flex items-center justify-between">
      <span className="font-mono text-xs text-muted-foreground">{label}</span>
      <span className="font-mono text-xs flex items-center gap-1">
        {value > min ? (
          <button
            onClick={dec}
            className="text-muted-foreground hover:text-foreground px-0.5"
          >
            {"<"}
          </button>
        ) : (
          <span className="px-0.5 invisible">{"<"}</span>
        )}
        <span className="w-10 text-center">{value}</span>
        {value < max ? (
          <button
            onClick={inc}
            className="text-muted-foreground hover:text-foreground px-0.5"
          >
            {">"}
          </button>
        ) : (
          <span className="px-0.5 invisible">{">"}</span>
        )}
      </span>
    </div>
  );
}

function Sidebar({
  config,
  setConfig,
}: {
  config: GenConfig;
  setConfig: (c: GenConfig) => void;
}) {
  const set = (key: keyof GenConfig) => (v: number) =>
    setConfig({ ...config, [key]: v });

  return (
    <div className="hidden lg:block h-full overflow-y-auto border-l border-dashed">
      <div className="mt-10 px-6">
        <h2 className="text-xl font-medium mb-4 font-serif">chat</h2>
        <div className="space-y-1">
          <p className="font-mono text-xs text-muted-foreground">
            <span className="text-foreground font-semibold">{">"}</span> you
          </p>
          <p className="font-mono text-xs text-muted-foreground">
            <span className="text-foreground font-semibold">{"<"}</span> model
          </p>
        </div>

        <hr className="border-dashed my-4" />

        <div className="space-y-3">
          <Param
            label="temperature"
            value={config.temperature}
            min={0}
            max={2}
            step={0.1}
            onChange={set("temperature")}
          />
          <Param
            label="top_p"
            value={config.topP}
            min={0}
            max={1}
            step={0.05}
            onChange={set("topP")}
          />
          <Param
            label="repetition_penalty"
            value={config.repetitionPenalty}
            min={1}
            max={2}
            step={0.05}
            onChange={set("repetitionPenalty")}
          />
          <Param
            label="max_tokens"
            value={config.maxTokens}
            min={64}
            max={1024}
            step={64}
            onChange={set("maxTokens")}
          />
        </div>

        <hr className="border-dashed my-4" />

        <p className="font-mono text-xs">
          Powered by{" "}
          <a
            href="https://webllm.mlc.ai/docs/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-dotted underline-offset-2 hover:decoration-solid"
          >
            WebLLM
          </a>
        </p>
      </div>
    </div>
  );
}

export default function Chat() {
  const [supported, setSupported] = useState<boolean | null>(null);
  const [engine, setEngine] = useState<MLCEngineInterface | null>(null);
  const [loadProgress, setLoadProgress] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [generating, setGenerating] = useState(false);
  const [config, setConfig] = useState<GenConfig>(DEFAULTS);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSupported(typeof navigator !== "undefined" && "gpu" in navigator);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const loadModel = async () => {
    setLoading(true);
    try {
      const { CreateMLCEngine } = await import("@mlc-ai/web-llm");
      const eng = await CreateMLCEngine(MODEL_ID, {
        initProgressCallback: (report: InitProgressReport) => {
          setLoadProgress(report.text);
        },
      });
      setEngine(eng);
    } catch {
      setLoadProgress(
        "Failed to load model. Your device may not have enough memory.",
      );
    }
    setLoading(false);
  };

  const handleSend = async (e: FormEvent) => {
    e.preventDefault();
    if (!engine || !input.trim() || generating) return;

    const userMsg: Message = { role: "user", content: input.trim() };
    const updated = [...messages, userMsg];
    setMessages([...updated, { role: "assistant", content: "" }]);
    setInput("");
    setGenerating(true);

    try {
      const stream = await engine.chat.completions.create({
        messages: [
          { role: "system" as const, content: SYSTEM_PROMPT },
          ...updated.map((m) => ({ role: m.role, content: m.content })),
        ],
        stream: true,
        temperature: config.temperature,
        top_p: config.topP,
        repetition_penalty: config.repetitionPenalty,
        max_tokens: config.maxTokens,
      });

      let full = "";
      for await (const chunk of stream) {
        full += chunk.choices[0]?.delta?.content ?? "";
        setMessages([...updated, { role: "assistant", content: full }]);
      }
    } catch {
      setMessages([
        ...updated,
        { role: "assistant", content: "Error generating response." },
      ]);
    }

    setGenerating(false);
  };

  const grid =
    "grid grid-cols-1 lg:grid-cols-[1fr_300px] h-[calc(100vh-3.5rem)] w-full border-l border-r border-b border-dashed";

  const sidebar = <Sidebar config={config} setConfig={setConfig} />;

  if (supported === null) {
    return (
      <div className={grid}>
        <div className="h-full flex items-center justify-center">
          <p className="font-mono text-sm text-muted-foreground animate-pulse">
            checking device compatibility...
          </p>
        </div>
        {sidebar}
      </div>
    );
  }

  if (!supported) {
    return (
      <div className={grid}>
        <div className="h-full flex items-center justify-center">
          <p className="font-mono text-sm text-muted-foreground">
            Your device does not support WebLLM.
          </p>
        </div>
        {sidebar}
      </div>
    );
  }

  if (!engine) {
    return (
      <div className={grid}>
        <div className="h-full flex items-center justify-center">
          <div className="text-center space-y-4 px-6">
            {!loading ? (
              <>
                <div className="space-y-1">
                  <p className="font-mono text-sm">{MODEL_LABEL}</p>
                  <p className="font-mono text-sm">entirely in your browser</p>
                </div>
                <button
                  onClick={loadModel}
                  className="font-mono text-sm underline decoration-dotted underline-offset-4 hover:decoration-solid"
                >
                  load model
                </button>
              </>
            ) : (
              <p className="font-mono text-xs text-muted-foreground">
                {loadProgress}
              </p>
            )}
          </div>
        </div>
        {sidebar}
      </div>
    );
  }

  return (
    <div className={grid}>
      <div className="h-full flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {messages.length === 0 && (
            <p className="font-mono text-xs text-muted-foreground">
              {MODEL_LABEL} loaded.
            </p>
          )}
          {messages.map((msg, i) => (
            <div key={i}>
              {i > 0 && <hr className="border-dashed my-3 opacity-30" />}
              <div className="font-mono text-sm whitespace-pre-wrap">
                <span className="text-muted-foreground">
                  {msg.role === "user" ? "> " : "< "}
                </span>
                <span
                  className={
                    msg.role === "assistant" ? "text-muted-foreground" : ""
                  }
                >
                  {msg.content}
                  {generating &&
                    i === messages.length - 1 &&
                    msg.role === "assistant" && (
                      <span className="animate-pulse">▊</span>
                    )}
                </span>
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        <form
          onSubmit={handleSend}
          className="border-t border-dashed px-6 py-3 flex gap-2"
        >
          <span className="font-mono text-sm text-muted-foreground self-center">
            {">"}
          </span>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={generating}
            placeholder="type a message..."
            className="flex-1 bg-transparent font-mono text-[16px] sm:text-sm outline-none placeholder:text-muted-foreground/50"
            spellCheck={false}
            autoFocus
            autoComplete="off"
            autoCapitalize="off"
            aria-label="Chat input"
          />
        </form>
      </div>
      {sidebar}
    </div>
  );
}
