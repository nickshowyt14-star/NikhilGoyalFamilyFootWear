"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { img } from "@/lib/images";
import { founderCredentials } from "@/lib/content";
import { Reveal, RevealWords, Stagger, StaggerItem } from "@/components/ui/Reveal";
import {
  Dumbbell,
  Flame,
  Heart,
  Stopwatch,
  Trophy,
} from "@/components/ui/Icons";

const CRED_ICONS = {
  flame: Flame,
  dumbbell: Dumbbell,
  trophy: Trophy,
  stopwatch: Stopwatch,
  heart: Heart,
} as const;

export function Founder() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // The figure rises slightly faster than the panel behind it, so the cut-out
  // reads as standing in front of the artwork rather than pasted onto it.
  const figureY = useTransform(scrollYProgress, [0, 1], [70, -70]);
  const nameY = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const ringScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 1.1]);

  return (
    <section
      ref={ref}
      /* No overflow-hidden: the cut-out is meant to break past the panel edge.
         z-10 lets it paint over the (unpositioned) section that follows. */
      className="grain relative z-10 bg-ink-deep pt-20 text-white md:pt-28 lg:pt-32"
    >
      <div className="grain-layer" />

      <div className="container-x relative">
        <div className="grid items-end gap-y-10 lg:grid-cols-12 lg:gap-x-10">
          {/* ── copy ─────────────────────────────────────────────── */}
          <div className="order-2 pb-16 lg:order-1 lg:col-span-6 lg:pb-28">
            <Reveal>
              <span className="eyebrow text-brand-bright">Meet the founder</span>
            </Reveal>

            <h2 className="display mt-5 text-[2.6rem] leading-[0.9] sm:text-[3.6rem] lg:text-[4.2rem]">
              <RevealWords text={"NIKHIL\nGOYAL"} />
            </h2>

            <Reveal delay={0.15}>
              <span className="mt-6 inline-block h-[3px] w-20 bg-brand" />
              <div className="mt-7 space-y-5 text-[1rem] leading-relaxed text-white/70">
                <p>
                  Built around a simple idea — give families more choice,
                  dependable brands and a better shopping experience close to home.
                </p>
                <p>
                  Nikhil Goyal represents the next generation behind Family
                  Footwear, combining the trust of a neighbourhood footwear store
                  with a more modern approach to footwear, sports and lifestyle
                  retail.
                </p>
                <p>
                  That interest is not only professional. The sports side of the
                  store is picked by someone who trains seriously himself — which
                  is a useful thing in whoever is helping you choose a pair.
                </p>
              </div>
            </Reveal>

            {/* athletic credentials */}
            <Reveal delay={0.2}>
              <p className="eyebrow mt-10 text-white/40">Off the shop floor</p>
            </Reveal>
            <Stagger className="mt-5 flex flex-wrap gap-2.5">
              {founderCredentials.map((c) => {
                const Icon = CRED_ICONS[c.icon];
                return (
                  <StaggerItem key={c.label}>
                    <span className="group inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.05] py-2.5 pl-3 pr-4 transition-colors duration-400 hover:border-brand hover:bg-brand/12">
                      <span className="grid h-7 w-7 place-items-center rounded-full bg-white/8 text-brand-bright transition-colors duration-400 group-hover:bg-brand group-hover:text-white">
                        <Icon className="h-[15px] w-[15px]" />
                      </span>
                      <span className="text-[0.82rem] font-semibold tracking-[0.02em] text-white/88">
                        {c.label}
                      </span>
                    </span>
                  </StaggerItem>
                );
              })}
            </Stagger>

            <Reveal delay={0.25}>
              <figure className="mt-10 border-l-2 border-brand pl-6">
                <blockquote className="display text-[1.25rem] leading-snug text-white/92 sm:text-[1.5rem]">
                  &ldquo;Good footwear isn&apos;t only about how it looks. It has
                  to feel right for the person wearing it.&rdquo;
                </blockquote>
                <figcaption className="eyebrow mt-4 text-white/45">
                  Nikhil Goyal · Family Footwear
                </figcaption>
              </figure>
            </Reveal>
          </div>

          {/* ── figure ───────────────────────────────────────────── */}
          <div className="relative order-1 lg:order-2 lg:col-span-6">
            {/* outlined surname sits behind the figure */}
            <motion.span
              aria-hidden
              style={{ y: nameY }}
              /* No text-* colour utility — it would fill the outlined glyphs. */
              className="display text-outline pointer-events-none absolute inset-x-0 top-[6%] z-0 text-center text-[19vw] leading-none lg:text-[9rem]"
            >
              GOYAL
            </motion.span>

            {/* red graphical shapes */}
            <motion.div
              aria-hidden
              style={{ scale: ringScale }}
              className="absolute left-1/2 top-[18%] z-0 h-[62vw] w-[62vw] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(215,25,32,0.42)_0%,rgba(215,25,32,0.10)_46%,transparent_70%)] blur-2xl lg:h-[30rem] lg:w-[30rem]"
            />
            <motion.div
              aria-hidden
              style={{ scale: ringScale }}
              className="absolute left-1/2 top-[22%] z-0 h-[46vw] w-[46vw] -translate-x-1/2 rounded-full border border-brand/35 lg:h-[22rem] lg:w-[22rem]"
            />

            {/* Fixed height + object-contain means any portrait crop the store
                supplies sits correctly without redesigning the section, and
                object-bottom keeps the figure grounded rather than floating. */}
            {/* Reveal wraps the sized box, so the `fill` image's immediate
                parent is the positioned element it should resolve against. */}
            <Reveal y={50} duration={1}>
              <motion.div
                style={{ y: figureY }}
                className="relative z-10 mx-auto h-[26rem] w-full max-w-[420px] sm:h-[32rem] lg:h-[38rem] lg:max-w-none"
              >
                <Image
                  src={img.founder}
                  alt="Nikhil Goyal, founder of Family Footwear"
                  fill
                  sizes="(max-width: 1024px) 78vw, 34vw"
                  className="object-contain object-bottom drop-shadow-[0_40px_50px_rgba(0,0,0,0.7)]"
                />
              </motion.div>
            </Reveal>

            {/* soft floor shadow so the cut-out does not float */}
            <div
              aria-hidden
              className="absolute bottom-0 left-1/2 z-0 h-10 w-[58%] -translate-x-1/2 rounded-[100%] bg-black/60 blur-2xl"
            />
          </div>
        </div>
      </div>

      {/* the figure overlaps this divider, which sells the cut-out */}
      <div aria-hidden className="h-px w-full bg-white/10" />
    </section>
  );
}
