"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { img } from "@/lib/images";
import { site } from "@/lib/site";
import { Reveal, RevealWords } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { MapPin } from "@/components/ui/Icons";

const FACTS: [string, string][] = [
  ["Format", "Multi-brand showroom"],
  ["Range", "Footwear & sportswear"],
  ["Shoppers", "Men, women & kids"],
  ["Location", site.locality],
];

export function About() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);
  const badgeY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section
      id="about"
      ref={ref}
      className="relative scroll-mt-24 overflow-hidden bg-white py-20 md:py-28 lg:py-32"
    >
      <div className="container-x">
        <div className="grid gap-y-16 lg:grid-cols-12 lg:gap-x-14">
          {/* asymmetric photo composition */}
          <div className="relative lg:col-span-7">
            <Reveal y={44}>
              <div className="relative">
                {/* offset plate breaks the photo out of a plain rectangle */}
                <div
                  aria-hidden
                  className="absolute -left-3 -top-4 h-full w-full rounded-[26px] bg-brand/12 sm:-left-5 sm:-top-6"
                />
                <div className="relative aspect-4/3 overflow-hidden rounded-[26px] shadow-[0_40px_80px_-40px_rgba(0,0,0,0.5)]">
                  <motion.div style={{ y: photoY }} className="absolute inset-0">
                    <Image
                      src={img.storefront}
                      alt={`The ${site.legalName} storefront in ${site.locality}`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 56vw"
                      className="scale-110 object-cover"
                    />
                  </motion.div>
                </div>
              </div>
            </Reveal>

            {/* floating badge overlapping the photo edge */}
            <motion.div
              style={{ y: badgeY }}
              className="absolute -bottom-8 right-4 hidden max-w-[15rem] rounded-2xl bg-ink p-5 text-white shadow-[0_28px_60px_-24px_rgba(0,0,0,0.7)] sm:block lg:-right-6"
            >
              <MapPin className="h-5 w-5 text-brand-bright" />
              <p className="display mt-3 text-[1.05rem] leading-tight">
                {site.legalName}
              </p>
              <p className="mt-1.5 text-[0.78rem] leading-relaxed text-white/55">
                {site.locality} · Uttar Pradesh
              </p>
            </motion.div>
          </div>

          {/* copy */}
          <div className="lg:col-span-5 lg:pt-6">
            <Reveal>
              <span className="eyebrow text-brand">About the store</span>
            </Reveal>
            <h2 className="display mt-4 text-[2.2rem] leading-[0.95] sm:text-[3rem] lg:text-[3.4rem]">
              <RevealWords text={"YOUR NEIGHBOURHOOD\nFOOTWEAR DESTINATION."} />
            </h2>

            <Reveal delay={0.15}>
              <div className="mt-7 space-y-5 text-[0.98rem] leading-relaxed text-smoke">
                <p>
                  Family Footwear brings trusted footwear and activewear brands
                  together under one roof in {site.locality}.
                </p>
                <p>
                  From everyday essentials and school shoes to sneakers, running
                  shoes, activewear and family footwear, the focus is simple —
                  offer customers plenty of choice, fresh stock and the right fit.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.25}>
              <dl className="mt-9 grid grid-cols-2 gap-6 border-t border-ink/10 pt-8">
                {FACTS.map(([k, v]) => (
                  <div key={k}>
                    <dt className="eyebrow text-smoke/70">{k}</dt>
                    <dd className="mt-2 text-[0.95rem] font-medium text-ink">{v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={0.3}>
              <Button href="#visit" variant="ink" size="lg" className="mt-9">
                <MapPin className="h-4 w-4" /> Plan Your Visit
              </Button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
