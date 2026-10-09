"use client";

import { useState } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { Mail, Phone } from "lucide-react";

import ClickSpark from "@/components/ClickSpark";
import DotGrid from "@/components/DotGrid";
import DecryptedText from "@/components/DecryptedText";
import LogoAssemble from "@/components/LogoAssemble";
import ContactLink from "@/components/ContactLink";
import { site } from "@/lib/site";

const BRAND = "#F2771A";

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 14, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Landing() {
  const reduce = useReducedMotion();
  // Content reveals once the logo has finished assembling (immediately if reduced motion).
  const [ready, setReady] = useState(!!reduce);

  return (
    <ClickSpark sparkColor={BRAND} sparkSize={8} sparkRadius={22} sparkCount={8} duration={420}>
      <div className="relative flex min-h-dvh flex-col overflow-hidden">
        {/* Background: interactive dot grid in brand colours */}
        <div className="pointer-events-auto fixed inset-0 -z-10">
          <DotGrid
            dotSize={2}
            gap={22}
            baseColor="#2a2d2a"
            activeColor={BRAND}
            proximity={120}
            shockRadius={220}
            shockStrength={4}
            resistance={650}
            returnDuration={1.4}
          />
          {/* vignette */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,#0B0D0B_90%)]" />
          {/* moving scanline */}
          {!reduce && (
            <div className="pointer-events-none absolute inset-x-0 top-0 h-24 animate-scanline bg-gradient-to-b from-transparent via-paper/[0.035] to-transparent" />
          )}
        </div>

        {/* Top bar */}
        <header className="pointer-events-none flex items-center px-5 py-4 font-mono text-xs text-paper/50 sm:px-8">
          <span className="pointer-events-auto">
            <span className="text-brand">~</span>/{site.domain}
            <span className="ml-0.5 animate-blink text-brand">_</span>
          </span>
        </header>

        {/* Hero */}
        <main className="flex flex-1 flex-col items-center justify-center px-5 pb-12 pt-4 text-center sm:px-8">
          <LogoAssemble
            className="h-44 w-44 sm:h-56 sm:w-56 md:h-64 md:w-64"
            onAssembled={() => setReady(true)}
          />

          <motion.div
            variants={stagger}
            initial="hidden"
            animate={ready ? "show" : "hidden"}
            className="mt-2 flex w-full max-w-3xl flex-col items-center"
          >
            <motion.div variants={rise} className="font-mono text-[11px] uppercase tracking-[0.35em] text-brand">
              {site.badge}
            </motion.div>

            <motion.h1
              variants={rise}
              className="mt-3 font-mono text-4xl font-bold uppercase tracking-tight text-paper sm:text-6xl md:text-7xl"
            >
              {ready ? (
                <DecryptedText
                  text={site.name}
                  animateOn="view"
                  sequential
                  revealDirection="center"
                  speed={45}
                  maxIterations={14}
                  characters="01<>/\\|[]{}#$%&*"
                  encryptedClassName="text-brand/70"
                />
              ) : (
                site.name
              )}
            </motion.h1>

            <motion.p variants={rise} className="mt-4 font-mono text-sm text-paper/70 sm:text-base">
              <span className="text-paper">{site.owner}</span>
              <span className="mx-2 text-paper/30">—</span>
              {site.roles.map((r, i) => (
                <span key={r}>
                  {r}
                  {i < site.roles.length - 1 && <span className="mx-2 text-brand">•</span>}
                </span>
              ))}
            </motion.p>

            <motion.p variants={rise} className="mt-3 font-mono text-xs text-paper/45">
              <span className="text-brand">$</span> {site.tagline}
            </motion.p>

            {/* Contacts */}
            <motion.div
              variants={rise}
              className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-5"
            >
              <ContactLink
                href={`mailto:${site.email}`}
                label="email · click to copy"
                value={site.email}
                copyText={site.email}
                icon={<Mail size={16} />}
              />
              {site.phones.map((p) => (
                <ContactLink
                  key={p.label}
                  href={p.href}
                  label={`phone · ${p.label}`}
                  value={p.display}
                  icon={<Phone size={16} />}
                />
              ))}
            </motion.div>
          </motion.div>
        </main>

        <footer className="flex items-center justify-between px-5 py-4 font-mono text-[10px] uppercase tracking-[0.2em] text-paper/35 sm:px-8">
          <span>
            © {site.copyrightYear} {site.name}
          </span>
          <span>v0.1.0-alpha</span>
        </footer>
      </div>
    </ClickSpark>
  );
}
