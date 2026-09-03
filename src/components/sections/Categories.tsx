"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { categories } from "@/lib/content";
import { Reveal, RevealWords } from "@/components/ui/Reveal";
import { ArrowUpRight } from "@/components/ui/Icons";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Editorial category card: photograph, floating cut-out product, sub-categories. */
function CategoryCard({
  category,
  span,
  index,
}: {
  category: (typeof categories)[number];
  span: string;
  index: number;
}) {
  return (
    <motion.article
      id={category.id}
      className={`group relative isolate scroll-mt-28 overflow-hidden rounded-[28px] bg-ink ${span}`}
      initial={{ opacity: 0, y: 44 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.9, ease: EASE, delay: (index % 2) * 0.1 }}
    >
      <a
        href="#visit"
        /* `relative` so the `fill` image below resolves against this box. */
        className="relative flex min-h-[460px] flex-col justify-end p-7 sm:min-h-[520px] sm:p-9 lg:min-h-[560px]"
        aria-label={`${category.title} footwear — explore in store`}
      >
        <Image
          src={category.image}
          alt=""
          fill
          sizes="(max-width: 1024px) 100vw, 55vw"
          className="-z-20 object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.07]"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(8,8,10,0.94)_0%,rgba(8,8,10,0.62)_42%,rgba(8,8,10,0.18)_78%,rgba(8,8,10,0.28)_100%)]"
        />

        {/* floating product, lifts on hover */}
        <div className="pointer-events-none absolute -right-6 top-6 z-10 w-[46%] max-w-[290px] sm:right-2 sm:top-8">
          <Image
            src={category.shoe}
            alt=""
            sizes="(max-width: 640px) 46vw, 290px"
            className="w-full -rotate-[9deg] drop-shadow-[0_28px_36px_rgba(0,0,0,0.6)] transition-transform duration-[900ms] ease-out group-hover:-translate-y-3 group-hover:rotate-[-4deg]"
          />
        </div>

        <div className="relative z-10">
          <h3 className="display text-[2.5rem] leading-none text-white sm:text-[3.2rem]">
            {category.title}
          </h3>
          <p className="mt-3 max-w-sm text-[0.9rem] leading-relaxed text-white/62">
            {category.blurb}
          </p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {category.items.map((item) => (
              <li
                key={item}
                className="rounded-full border border-white/18 bg-white/[0.07] px-3.5 py-1.5 text-[0.74rem] font-medium text-white/85 backdrop-blur-sm transition-colors duration-300 group-hover:border-white/28"
              >
                {item}
              </li>
            ))}
          </ul>

          <span className="mt-8 inline-flex items-center gap-2 text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-white">
            <span className="relative">
              Explore In Store
              <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-brand transition-transform duration-500 ease-out group-hover:scale-x-100" />
            </span>
            <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-out group-hover:translate-x-1 group-hover:-translate-y-1" />
          </span>
        </div>
      </a>
    </motion.article>
  );
}

const SPANS = [
  "lg:col-span-7",
  "lg:col-span-5",
  "lg:col-span-5",
  "lg:col-span-7",
];

export function Categories() {
  return (
    <section id="categories" className="scroll-mt-24 bg-white py-20 md:py-28 lg:py-32">
      <div className="container-x">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-12">
          <div className="min-w-0 md:flex-1">
            <Reveal>
              <span className="eyebrow text-brand">Shop by category</span>
            </Reveal>
            <h2 className="display text-section mt-4 max-w-[52rem]">
              <RevealWords text={"FIND YOUR FIT.\nWHOEVER IT'S FOR."} />
            </h2>
          </div>
          <Reveal delay={0.15} className="md:max-w-xs md:text-right">
            <p className="text-[0.93rem] leading-relaxed text-smoke">
              Four departments, one showroom. Try them on, walk a few steps, and
              take home the pair that actually fits.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 md:mt-16 lg:grid-cols-12">
          {categories.map((c, i) => (
            <CategoryCard key={c.id} category={c} span={SPANS[i]} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
