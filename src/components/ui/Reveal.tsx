"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Seconds to wait before animating in. */
  delay?: number;
  /** Travel distance in px. Negative values enter from below the baseline. */
  y?: number;
  x?: number;
  duration?: number;
  once?: boolean;
};

/** Fades and lifts its children into view the first time they are scrolled to. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 30,
  x = 0,
  duration = 0.85,
  once = true,
}: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once, margin: "-90px" }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

/** Wraps a list so its `<StaggerItem>` children animate in one after another. */
export function Stagger({
  children,
  className,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-80px" }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}

/**
 * Splits a heading into words that rise into place individually.
 * `\n` in `text` forces a line break.
 */
export function RevealWords({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const lines = text.split("\n");
  let index = 0;

  return (
    <span className={className}>
      {lines.map((line, li) => (
        <span key={li} className="block overflow-hidden">
          {line.split(" ").map((word) => {
            const i = index++;
            return (
              <motion.span
                key={`${word}-${i}`}
                className="inline-block whitespace-pre"
                initial={{ y: "110%", opacity: 0 }}
                whileInView={{ y: "0%", opacity: 1 }}
                viewport={{ once: true, margin: "-70px" }}
                transition={{
                  duration: 0.95,
                  delay: delay + i * 0.07,
                  ease: EASE,
                }}
              >
                {word}{" "}
              </motion.span>
            );
          })}
        </span>
      ))}
    </span>
  );
}
