"use client";

import { brands } from "@/lib/site";
import { Reveal, RevealWords } from "@/components/ui/Reveal";

/** One seamless row. The list is rendered twice so the -50% loop never gaps. */
function Row({
  duration,
  reverse = false,
}: {
  duration: number;
  reverse?: boolean;
}) {
  const items = [...brands, ...brands];

  return (
    <div className="marquee overflow-hidden py-3" aria-hidden>
      <div
        className="marquee-track brand-row items-center"
        data-reverse={reverse}
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        {items.map((b, i) => (
          <div
            key={`${b.name}-${i}`}
            className="brand-item mx-2 flex shrink-0 items-center gap-4 rounded-2xl border border-ink/10 bg-white px-8 py-5 transition-all duration-500 ease-out sm:px-10 sm:py-6"
          >
            <span className="display text-[1.6rem] whitespace-nowrap text-ink sm:text-[2.1rem]">
              {b.name}
            </span>
            <span className="h-8 w-px bg-ink/10" />
            <span className="eyebrow text-[0.5rem] leading-tight text-smoke">
              In
              <br />
              Store
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Brands() {
  return (
    <section
      id="brands"
      className="grain relative overflow-hidden border-y border-ink/8 bg-sand py-20 md:py-28"
    >
      <div className="grain-layer" />

      <div className="container-x relative">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-12">
          <div className="min-w-0 md:flex-1">
            <Reveal>
              <span className="eyebrow text-brand">The line-up</span>
            </Reveal>
            <h2 className="display text-section mt-4 max-w-[52rem]">
              <RevealWords text={"BRANDS YOU KNOW.\nCHOICES YOU'LL LOVE."} />
            </h2>
          </div>
          <Reveal delay={0.15} className="md:max-w-xs md:text-right">
            <p className="text-[0.93rem] leading-relaxed text-smoke">
              A multi-brand showroom — so you can compare fit, feel and price
              side by side, in one visit.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="relative mt-14 md:mt-16">
        {/* soft edge masks so rows fade rather than clip */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-sand to-transparent sm:w-32"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-sand to-transparent sm:w-32"
        />
        <Row duration={46} />
        <Row duration={58} reverse />
      </div>

      {/* Screen-reader-friendly equivalent of the decorative marquee. */}
      <div className="container-x mt-10">
        <h3 className="sr-only">Brands stocked at Family Footwear</h3>
        <ul className="sr-only">
          {brands.map((b) => (
            <li key={b.name}>{b.name}</li>
          ))}
        </ul>
        <Reveal>
          <p className="max-w-3xl text-[0.8rem] leading-relaxed text-smoke">
            Brand names and trademarks belong to their respective owners.
            Availability and selection vary — visit the store for today&apos;s range.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
