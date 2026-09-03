"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { img } from "@/lib/images";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";

const HIGHLIGHTS = ["All Genders", "All Sizes", "Fresh Stock", "Latest Arrivals"];

const COLUMNS = [
  { head: "Who", body: "Men • Women • Kids" },
  { head: "What", body: "Multiple styles • Multiple sizes" },
  { head: "When", body: "Everyday • Sports • Lifestyle" },
];

export function Everyone() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Counter-drifting display lines give the block a sense of scale. The range is
  // deliberately small: any wider and the longest line clips at the drift extremes.
  const leftX = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);
  const rightX = useTransform(scrollYProgress, [0, 1], ["4%", "-4%"]);

  return (
    <section
      ref={ref}
      className="grain relative overflow-hidden bg-ink-deep py-20 text-white md:py-28 lg:py-36"
    >
      <div className="grain-layer" />
      <div
        aria-hidden
        className="absolute left-1/2 top-0 -z-0 h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(215,25,32,0.22)_0%,transparent_68%)] blur-3xl"
      />

      <div className="relative">
        <div className="container-x">
          <Reveal>
            <span className="eyebrow text-brand-bright">All genders · All sizes</span>
          </Reveal>
        </div>

        {/* oversized display type */}
        <div className="mt-8 select-none md:mt-10">
          <motion.h2
            style={{ x: leftX }}
            className="display text-mega whitespace-nowrap pl-[3vw] leading-[0.84]"
          >
            FOR EVERYONE.
          </motion.h2>
          {/* No text-* colour utility here — it would override the outline's
              transparent fill and render the line solid. */}
          <motion.p
            style={{ x: rightX }}
            aria-hidden
            className="display text-mega text-outline whitespace-nowrap pl-[8vw] leading-[0.84]"
          >
            FOR EVERY STEP.
          </motion.p>
          {/* the outlined line is decorative above; keep it in the a11y tree once */}
          <span className="sr-only">For every step.</span>
        </div>

        <div className="container-x mt-14 md:mt-20">
          <Stagger className="grid gap-8 border-t border-white/12 pt-10 sm:grid-cols-3">
            {COLUMNS.map((c) => (
              <StaggerItem key={c.head}>
                <span className="eyebrow text-white/40">{c.head}</span>
                <p className="mt-3 text-[1.05rem] font-medium leading-snug text-white/90">
                  {c.body}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>

      {/* highlight ticker */}
      <div className="marquee relative mt-14 overflow-hidden border-y border-white/12 bg-brand py-4 md:mt-20">
        <div
          className="marquee-track items-center"
          style={{ ["--marquee-duration" as string]: "38s" }}
          aria-hidden
        >
          {[...HIGHLIGHTS, ...HIGHLIGHTS, ...HIGHLIGHTS, ...HIGHLIGHTS].map((h, i) => (
            <span key={i} className="flex shrink-0 items-center">
              <span className="display px-7 text-[1.35rem] uppercase text-white sm:text-[1.7rem]">
                {h}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-white/60" />
            </span>
          ))}
        </div>
        <ul className="sr-only">
          {HIGHLIGHTS.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      </div>

      {/* fresh stock note + supporting imagery */}
      <div className="container-x mt-16 grid gap-10 md:mt-20 lg:grid-cols-12 lg:items-center">
        <Reveal className="lg:col-span-5">
          <h3 className="display text-[1.9rem] leading-tight sm:text-[2.4rem]">
            Fresh stock arriving regularly.
          </h3>
          <p className="mt-5 max-w-md text-[0.98rem] leading-relaxed text-white/65">
            The shelves change through the season, so there is usually something
            new to try. Rather than guess online, visit the store for today&apos;s
            available styles and sizes — and get a proper fitting while you are here.
          </p>
          <p className="mt-4 text-[0.82rem] leading-relaxed text-white/40">
            Styles shown across this site are indicative of the categories stocked.
            Availability varies day to day.
          </p>
        </Reveal>

        <div className="grid grid-cols-2 gap-4 lg:col-span-7">
          <Reveal delay={0.05} className="col-span-1">
            <div className="relative aspect-4/5 overflow-hidden rounded-3xl">
              <Image
                src={img.sceneActive}
                alt="Training in activewear"
                fill
                sizes="(max-width: 1024px) 45vw, 28vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.15} className="col-span-1 pt-8">
            <div className="relative aspect-4/5 overflow-hidden rounded-3xl">
              <Image
                src={img.catKids}
                alt="A child in everyday footwear"
                fill
                sizes="(max-width: 1024px) 45vw, 28vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
