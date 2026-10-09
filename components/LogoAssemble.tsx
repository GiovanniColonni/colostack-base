"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

/**
 * The Colostack mark (5 bars from colostack-icon.svg) that assembles bar by bar,
 * then glitches periodically / on hover / on click.
 */

const BARS = [
  { x: 80, y: 67, w: 200, h: 34, brand: false },
  { x: 80, y: 115, w: 48, h: 34, brand: false },
  { x: 80, y: 163, w: 48, h: 34, brand: true },
  { x: 80, y: 211, w: 48, h: 34, brand: false },
  { x: 80, y: 259, w: 200, h: 34, brand: false },
] as const;

const PAPER = "#F2F5EE";
const BRAND = "#F2771A";

const ASSEMBLE_STAGGER = 0.14;
const ASSEMBLE_DURATION = 0.55;
const GLITCH_MS = 260;

type Props = {
  className?: string;
  onAssembled?: () => void;
};

export default function LogoAssemble({ className = "", onAssembled }: Props) {
  const reduce = useReducedMotion();
  const [assembled, setAssembled] = useState(!!reduce);
  const [glitching, setGlitching] = useState(false);
  const glitchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const loopTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const triggerGlitch = useCallback(() => {
    if (reduce || !assembled) return;
    setGlitching(true);
    if (glitchTimer.current) clearTimeout(glitchTimer.current);
    glitchTimer.current = setTimeout(() => setGlitching(false), GLITCH_MS);
  }, [reduce, assembled]);

  // Random ambient glitch loop once the mark is assembled.
  useEffect(() => {
    if (!assembled || reduce) return;
    const schedule = () => {
      const wait = 2800 + Math.random() * 3200;
      loopTimer.current = setTimeout(() => {
        triggerGlitch();
        schedule();
      }, wait);
    };
    schedule();
    return () => {
      if (loopTimer.current) clearTimeout(loopTimer.current);
      if (glitchTimer.current) clearTimeout(glitchTimer.current);
    };
  }, [assembled, reduce, triggerGlitch]);

  const totalAssemble = ASSEMBLE_STAGGER * (BARS.length - 1) + ASSEMBLE_DURATION;

  return (
    <motion.div
      className={`relative select-none ${className}`}
      onHoverStart={triggerGlitch}
      onTap={triggerGlitch}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      aria-label="Colostack logo"
      role="img"
    >
      {/* Orange glow behind the brand bar, fades in once assembled */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-full blur-3xl"
        style={{ background: `radial-gradient(circle at 30% 50%, ${BRAND}55, transparent 60%)` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: assembled ? 1 : 0 }}
        transition={{ duration: 1.2 }}
      />

      <svg
        viewBox="0 0 360 360"
        className="relative h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Ghost copies: only visible during a glitch */}
        <Ghost
          color={BRAND}
          visible={glitching}
          clip="inset(18% 0 52% 0)"
          dx={-9}
        />
        <Ghost
          color={PAPER}
          visible={glitching}
          clip="inset(58% 0 12% 0)"
          dx={8}
        />

        <motion.g
          animate={
            glitching
              ? { x: [0, -4, 3, -2, 0], skewX: [0, -3, 2, 0] }
              : { x: 0, skewX: 0 }
          }
          transition={{ duration: GLITCH_MS / 1000, ease: "linear" }}
          style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
        >
          {BARS.map((b, i) => (
            <motion.rect
              key={i}
              x={b.x}
              y={b.y}
              width={b.w}
              height={b.h}
              style={{ transformBox: "fill-box", transformOrigin: "0% 50%" }}
              initial={reduce ? false : { scaleX: 0, opacity: 0, fill: PAPER }}
              animate={{
                scaleX: 1,
                opacity: 1,
                fill: b.brand ? [PAPER, PAPER, BRAND] : PAPER,
              }}
              transition={{
                scaleX: {
                  delay: i * ASSEMBLE_STAGGER,
                  duration: ASSEMBLE_DURATION,
                  ease: [0.22, 1, 0.36, 1],
                },
                opacity: { delay: i * ASSEMBLE_STAGGER, duration: 0.2 },
                fill: b.brand
                  ? { delay: totalAssemble - 0.1, duration: 0.35, times: [0, 0.6, 1] }
                  : { duration: 0 },
              }}
              onAnimationComplete={
                i === BARS.length - 1
                  ? () => {
                      setAssembled(true);
                      onAssembled?.();
                    }
                  : undefined
              }
            />
          ))}
        </motion.g>

        {/* Scanline sweep right after assembly */}
        {!reduce && (
          <motion.rect
            x={60}
            width={240}
            height={3}
            fill={BRAND}
            opacity={0.7}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: [50, 310], opacity: [0, 0.8, 0] }}
            transition={{ delay: totalAssemble, duration: 0.7, ease: "easeInOut" }}
          />
        )}

        {/* Thin frame that pulses once, like a target lock */}
        {!reduce && (
          <motion.rect
            x={52}
            y={39}
            width={256}
            height={282}
            fill="none"
            stroke={BRAND}
            strokeWidth={1}
            strokeDasharray="6 10"
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: [0, 0.6, 0], scale: [1.08, 1, 1] }}
            transition={{ delay: totalAssemble + 0.3, duration: 1.1, ease: "easeOut" }}
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          />
        )}
      </svg>
    </motion.div>
  );
}

function Ghost({
  color,
  visible,
  clip,
  dx,
}: {
  color: string;
  visible: boolean;
  clip: string;
  dx: number;
}) {
  return (
    <motion.g
      initial={false}
      animate={{ opacity: visible ? 0.9 : 0, x: visible ? [0, dx, -dx / 2, 0] : 0 }}
      transition={{ duration: GLITCH_MS / 1000, ease: "linear" }}
      style={{ clipPath: clip, transformBox: "fill-box" }}
      fill={color}
    >
      {BARS.map((b, i) => (
        <rect key={i} x={b.x} y={b.y} width={b.w} height={b.h} />
      ))}
    </motion.g>
  );
}
