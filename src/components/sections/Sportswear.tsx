"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { img } from "@/lib/images";
import { sportswearItems } from "@/lib/content";
import { Reveal, RevealWords, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/Icons";

export function Sportswear() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const stackY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section
      id="sportswear"
      ref={ref}
      className="grain relative scroll-mt-24 overflow-hidden bg-ink py-20 text-white md:py-28 lg:py-32"
    >
      <div className="grain-layer" />
      <div
        aria-hidden
        className="absolute -left-[10vw] top-1/3 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(215,25,32,0.28)_0%,transparent_68%)] blur-3xl"
      />

      <div className="container-x relative">
        <div className="grid gap-y-10 lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:col-span-5">
            <Reveal>
              <span className="eyebrow text-brand-bright">Active sportswear</span>
            </Reveal>
            <h2 className="display text-section mt-4">
              <RevealWords text={"MORE THAN\nFOOTWEAR."} />
            </h2>
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-md text-[1.05rem] leading-relaxed text-white/75">
                Active sportswear for every move.
              </p>
              <p className="mt-4 max-w-md text-[0.95rem] leading-relaxed text-white/55">
                Alongside the footwear wall you will find kit for training days
                and rest days alike — including everyday essentials from{" "}
                <span className="font-semibold text-white/85">Jockey</span>, one
                of the brands carried in store.
              </p>
            </Reveal>

            <Stagger className="mt-8 flex flex-wrap gap-2">
              {sportswearItems.map((item) => (
                <StaggerItem key={item}>
                  <span className="inline-block rounded-full border border-white/18 bg-white/[0.06] px-4 py-2 text-[0.78rem] font-medium text-white/85 transition-colors duration-300 hover:border-brand hover:text-white">
                    {item}
                  </span>
                </StaggerItem>
              ))}
            </Stagger>

            <Reveal delay={0.25}>
              <Button href="#visit" variant="primary" size="lg" className="mt-9">
                Explore Sports Collection <ArrowRight className="h-4 w-4" />
              </Button>
            </Reveal>
          </div>

          {/* image composition */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-12 gap-4">
              <Reveal className="col-span-12 sm:col-span-8" y={40}>
                <motion.div
                  style={{ y: heroY }}
                  className="relative aspect-16/11 overflow-hidden rounded-3xl"
                >
                  <Image
                    src={img.sceneRunners}
                    alt="Runners training at first light"
                    fill
                    sizes="(max-width: 640px) 100vw, 46vw"
                    className="scale-110 object-cover"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent"
                  />
                  <span className="eyebrow absolute bottom-5 left-5 text-white/90">
                    Run · Walk · Train
                  </span>
                </motion.div>
              </Reveal>

              <motion.div style={{ y: stackY }} className="col-span-12 sm:col-span-4">
                <Reveal delay={0.12} y={40}>
                  <div className="relative aspect-3/4 overflow-hidden rounded-3xl">
                    <Image
                      src={img.sportTee}
                      alt="Sports t-shirt"
                      fill
                      sizes="(max-width: 640px) 100vw, 22vw"
                      className="object-cover"
                    />
                  </div>
                </Reveal>
              </motion.div>

              <Reveal className="col-span-6 sm:col-span-5" delay={0.18} y={40}>
                <div className="relative aspect-4/3 overflow-hidden rounded-3xl">
                  <Image
                    src={img.sportLift}
                    alt="Strength training session"
                    fill
                    sizes="(max-width: 640px) 50vw, 24vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>

              <Reveal className="col-span-6 sm:col-span-7" delay={0.24} y={40}>
                <div className="relative aspect-4/3 overflow-hidden rounded-3xl">
                  <Image
                    src={img.sportClass}
                    alt="Group fitness class in activewear"
                    fill
                    sizes="(max-width: 640px) 50vw, 32vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
