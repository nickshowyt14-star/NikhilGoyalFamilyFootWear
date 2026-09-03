"use client";

import Image from "next/image";
import { AnimatePresence, motion, useInView, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { revealChapters } from "@/lib/content";
import { ArrowUpRight } from "@/components/ui/Icons";

const EASE = [0.16, 1, 0.3, 1] as const;

function Chapter({
  chapter,
  index,
  total,
  onEnter,
}: {
  chapter: (typeof revealChapters)[number];
  index: number;
  total: number;
  onEnter: (i: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5 });

  useEffect(() => {
    if (inView) onEnter(index);
  }, [inView, index, onEnter]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Product: drifts up, scales through the middle of the viewport, tilts a few degrees.
  const imgY = useTransform(scrollYProgress, [0, 1], [90, -90]);
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.84, 1.05, 0.94]);
  const imgRotate = useTransform(scrollYProgress, [0, 1], [-6, 3]);
  const glowScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.7, 1.15, 0.8]);

  const flip = index % 2 === 1;

  return (
    <div
      ref={ref}
      className="relative flex min-h-[95svh] items-center py-20 md:min-h-screen"
    >
      <div className="container-x w-full">
        <div
          className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
            flip ? "lg:[&>*:first-child]:order-2" : ""
          }`}
        >
          {/* product */}
          <motion.div
            style={{ y: imgY }}
            className="relative mx-auto w-full max-w-[560px]"
          >
            <motion.div
              aria-hidden
              style={{ scale: glowScale, backgroundColor: chapter.accent }}
              className="absolute left-1/2 top-1/2 -z-10 h-[74%] w-[74%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[70px]"
            />
            <motion.div style={{ scale: imgScale, rotate: imgRotate }}>
              <Image
                src={chapter.image}
                alt={`${chapter.label} footwear at Family Footwear`}
                sizes="(max-width: 1024px) 90vw, 44vw"
                className="w-full drop-shadow-[0_40px_50px_rgba(0,0,0,0.35)]"
              />
            </motion.div>
          </motion.div>

          {/* Copy enters from the side opposite the product. This is a one-shot
              reveal rather than a scroll-linked value, so the text can never sit
              at zero opacity once it has been seen — including for visitors who
              deep-link to a chapter or have reduced motion enabled. */}
          <motion.div
            initial={{ opacity: 0, x: flip ? -70 : 70 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <div className="mb-6 flex items-center gap-4">
              <span
                className="display text-[0.95rem] tabular-nums"
                style={{ color: chapter.accent }}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="h-px w-14 bg-current opacity-25" />
              <span className="eyebrow opacity-45">
                {String(total).padStart(2, "0")}
              </span>
            </div>

            <p
              className="display text-[3.4rem] uppercase leading-[0.85] sm:text-[4.6rem]"
              style={{ color: chapter.accent }}
            >
              {chapter.label}
            </p>

            <h3 className="display mt-5 text-[1.8rem] leading-[1.05] sm:text-[2.5rem]">
              {chapter.heading.split("\n").map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </h3>

            <p className="mt-5 max-w-md text-[0.98rem] leading-relaxed opacity-65">
              {chapter.copy}
            </p>

            <a
              href="#visit"
              className="group mt-8 inline-flex items-center gap-2 text-[0.76rem] font-semibold uppercase tracking-[0.16em]"
            >
              <span className="relative">
                Explore In Store
                <span
                  className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100"
                  style={{ backgroundColor: chapter.accent }}
                />
              </span>
              <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-out group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export function ProductReveal() {
  const [active, setActive] = useState(0);
  const chapter = revealChapters[active];
  const sectionRef = useRef<HTMLElement>(null);
  // The rail is fixed-position, so it must only exist while this section is on screen.
  const railVisible = useInView(sectionRef, { amount: 0.05 });

  return (
    <motion.section
      id="arrivals"
      ref={sectionRef}
      className="scroll-mt-24"
      animate={{ backgroundColor: chapter.bg, color: chapter.fg }}
      transition={{ duration: 0.75, ease: EASE }}
    >
      <div className="container-x pt-20 md:pt-28">
        <motion.span
          className="eyebrow"
          animate={{ color: chapter.accent }}
          transition={{ duration: 0.75, ease: EASE }}
        >
          Fresh arrivals
        </motion.span>
        <h2 className="display text-section mt-4 max-w-3xl">
          ONE STORE.
          <br />
          EVERY KIND OF STEP.
        </h2>
      </div>

      {revealChapters.map((c, i) => (
        <Chapter
          key={c.id}
          chapter={c}
          index={i}
          total={revealChapters.length}
          onEnter={setActive}
        />
      ))}

      {/* progress rail */}
      <AnimatePresence>
        {railVisible && (
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 12 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="pointer-events-none fixed right-4 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-2.5 lg:flex"
            aria-hidden
          >
            {revealChapters.map((c, i) => (
              <motion.span
                key={c.id}
                className="block w-[3px] rounded-full"
                animate={{
                  height: i === active ? 30 : 12,
                  backgroundColor: i === active ? chapter.accent : chapter.fg,
                  opacity: i === active ? 1 : 0.22,
                }}
                transition={{ duration: 0.5, ease: EASE }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
