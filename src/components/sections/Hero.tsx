"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { img } from "@/lib/images";
import { Button } from "@/components/ui/Button";
import { ArrowRight, MapPin } from "@/components/ui/Icons";

const EASE = [0.16, 1, 0.3, 1] as const;
const PILLS = ["Men", "Women", "Kids", "Sports"];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Layered parallax: the backdrop drifts slowest, the product sits in front.
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.06, 1.18]);
  const shoeY = useTransform(scrollYProgress, [0, 1], [0, -110]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-ink-deep pt-24 pb-20 text-white md:pt-28"
    >
      {/* backdrop */}
      <motion.div style={{ y: bgY, scale: bgScale }} className="absolute inset-0 -z-20">
        <Image
          src={img.sceneTrack}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-[0.42]"
        />
      </motion.div>

      {/* tonal wash keeps the type legible over any part of the photograph */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(120%_80%_at_15%_20%,rgba(10,10,10,0.55)_0%,rgba(10,10,10,0.88)_55%,rgba(10,10,10,0.97)_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-ink-deep"
      />

      {/* red signage accent, drawn from the shop board */}
      <motion.div
        aria-hidden
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, ease: EASE, delay: 0.5 }}
        className="absolute left-0 top-[14%] -z-10 h-[3px] w-[30vw] origin-left bg-gradient-to-r from-brand via-brand-bright to-transparent"
      />
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 0.5, scale: 1 }}
        transition={{ duration: 1.8, ease: EASE, delay: 0.3 }}
        className="absolute -right-[12vw] top-[8%] -z-10 h-[46vw] w-[46vw] rounded-full bg-[radial-gradient(circle,rgba(215,25,32,0.55)_0%,transparent_66%)] blur-3xl"
      />
      <div className="grain-layer -z-10" />

      <div className="container-x relative w-full">
        <div className="grid items-center gap-y-10 lg:grid-cols-12 lg:gap-x-8">
          {/* ── copy ─────────────────────────────────────────────── */}
          <motion.div style={{ y: copyY }} className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.35 }}
              className="mb-7 flex flex-wrap items-center gap-x-2 gap-y-2"
            >
              {PILLS.map((p, i) => (
                <span key={p} className="flex items-center gap-2">
                  {i > 0 && (
                    <span className="hidden text-brand sm:inline" aria-hidden>
                      •
                    </span>
                  )}
                  <span className="eyebrow rounded-full border border-white/18 bg-white/[0.06] px-3 py-1.5 text-white/85 backdrop-blur-sm">
                    {p}
                  </span>
                </span>
              ))}
            </motion.div>

            <h1 className="display text-hero">
              {["EVERY STEP.", "YOUR STYLE."].map((line, i) => (
                <span key={line} className="block overflow-hidden">
                  <motion.span
                    className="block"
                    initial={{ y: "105%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 1.15, ease: EASE, delay: 0.2 + i * 0.13 }}
                  >
                    {i === 1 ? (
                      <>
                        YOUR STYLE<span className="text-brand">.</span>
                      </>
                    ) : (
                      line
                    )}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.62 }}
              className="mt-7 max-w-lg text-[0.98rem] leading-relaxed text-white/70 md:text-[1.06rem]"
            >
              Footwear &amp; activewear for every member of the family.
              <br className="hidden sm:block" /> Fresh styles. Trusted brands. All sizes.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.76 }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <Button href="#categories" variant="primary" size="lg">
                Explore Collection <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href="#visit" variant="outlineLight" size="lg">
                <MapPin className="h-4 w-4" /> Visit Our Store
              </Button>
            </motion.div>
          </motion.div>

          {/* ── product ──────────────────────────────────────────── */}
          <motion.div
            style={{ y: shoeY }}
            className="relative lg:col-span-5"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.86, rotate: -12 }}
              animate={{ opacity: 1, scale: 1, rotate: -7 }}
              transition={{ duration: 1.35, ease: EASE, delay: 0.5 }}
              className="relative mx-auto w-[86%] max-w-[560px] lg:w-full"
            >
              <motion.div
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image
                  src={img.shoeHero}
                  alt="A red sports shoe from the Family Footwear range"
                  priority
                  sizes="(max-width: 1024px) 86vw, 42vw"
                  className="w-full drop-shadow-[0_50px_60px_rgba(0,0,0,0.65)]"
                />
              </motion.div>
              {/* contact shadow grounds the floating product */}
              <div
                aria-hidden
                className="mx-auto mt-2 h-8 w-[62%] rounded-[100%] bg-black/55 blur-2xl"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* scroll cue */}
      <motion.div
        style={{ opacity: fade }}
        className="pointer-events-none absolute inset-x-0 bottom-7 flex flex-col items-center gap-3 text-white/45"
      >
        <span className="eyebrow text-[0.55rem]">Scroll</span>
        <span className="scroll-cue relative h-9 w-5 rounded-full border border-white/25" />
      </motion.div>
    </section>
  );
}
