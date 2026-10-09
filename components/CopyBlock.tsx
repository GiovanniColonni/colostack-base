"use client";

import { useState } from "react";

export default function CopyBlock({ label, code }: { label: string; code: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable; user can select the text manually */
    }
  };

  return (
    <div className="min-w-0 overflow-hidden rounded-sm border border-paper/15 bg-ink/60">
      <div className="flex items-center justify-between border-b border-paper/10 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-paper/45">
        <span>{label}</span>
        <button
          type="button"
          onClick={copy}
          className={`transition-colors hover:text-brand ${copied ? "text-brand" : ""}`}
        >
          {copied ? "copied ✓" : "copy"}
        </button>
      </div>
      <pre className="overflow-x-auto p-3 text-xs leading-relaxed text-paper/80">
        <code>{code}</code>
      </pre>
    </div>
  );
}
