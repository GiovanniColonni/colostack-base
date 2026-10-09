"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import Magnet from "@/components/Magnet";

type Props = {
  href: string;
  label: string;
  value: string;
  icon: ReactNode;
  /** When set, clicking copies `copyText` instead of following the link on first click. */
  copyText?: string;
};

export default function ContactLink({ href, label, value, icon, copyText }: Props) {
  const [copied, setCopied] = useState(false);

  const onClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!copyText || !navigator.clipboard) return;
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(copyText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      window.location.href = href;
    }
  };

  return (
    <Magnet padding={60} magnetStrength={14} wrapperClassName="inline-block">
      <motion.a
        href={href}
        onClick={onClick}
        whileHover="hover"
        whileTap={{ scale: 0.97 }}
        initial="rest"
        animate="rest"
        className="group relative flex items-center gap-3 rounded-sm border border-paper/15 bg-ink/60 px-4 py-3 font-mono text-sm backdrop-blur-sm transition-colors hover:border-brand/70 focus-visible:border-brand focus-visible:outline-none"
      >
        {/* corner brackets */}
        <Corner className="left-0 top-0 border-l border-t" />
        <Corner className="right-0 top-0 border-r border-t" />
        <Corner className="bottom-0 left-0 border-b border-l" />
        <Corner className="bottom-0 right-0 border-b border-r" />

        <motion.span
          className="text-brand"
          variants={{ rest: { rotate: 0 }, hover: { rotate: [0, -12, 8, 0] } }}
          transition={{ duration: 0.4 }}
        >
          {icon}
        </motion.span>

        <span className="flex flex-col leading-tight">
          <span className="text-[10px] uppercase tracking-[0.2em] text-paper/45">{label}</span>
          <span className="relative overflow-hidden text-paper">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={copied ? "copied" : "value"}
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -12, opacity: 0 }}
                transition={{ duration: 0.18 }}
                className={`block ${copied ? "text-brand" : ""}`}
              >
                {copied ? "copied to clipboard ✓" : value}
              </motion.span>
            </AnimatePresence>
          </span>
        </span>

        {/* underline sweep */}
        <motion.span
          className="absolute bottom-0 left-0 h-px bg-brand"
          variants={{ rest: { width: 0 }, hover: { width: "100%" } }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </motion.a>
    </Magnet>
  );
}

function Corner({ className }: { className: string }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute h-2 w-2 border-brand opacity-0 transition-opacity duration-200 group-hover:opacity-100 ${className}`}
    />
  );
}
