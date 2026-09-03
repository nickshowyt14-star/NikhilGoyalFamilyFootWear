"use client";

import { promises } from "@/lib/content";
import { Reveal, RevealWords, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Activity, Layers, Ruler, Sparkle, Users } from "@/components/ui/Icons";

const ICONS = {
  layers: Layers,
  users: Users,
  ruler: Ruler,
  sparkle: Sparkle,
  activity: Activity,
} as const;

export function WhyUs() {
  return (
    <section className="bg-sand py-20 md:py-28 lg:py-32">
      <div className="container-x">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-12">
          <div className="min-w-0 md:flex-1">
            <Reveal>
              <span className="eyebrow text-brand">Why Family Footwear</span>
            </Reveal>
            <h2 className="display text-section mt-4 max-w-[52rem]">
              <RevealWords text={"REASONS TO WALK IN."} />
            </h2>
          </div>
          <Reveal delay={0.15} className="md:max-w-xs md:text-right">
            <p className="text-[0.93rem] leading-relaxed text-smoke">
              No queues for a courier, no guessing your size — just shelves you
              can browse and staff who know the stock.
            </p>
          </Reveal>
        </div>

        <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 md:mt-16 lg:grid-cols-5">
          {promises.map((p) => {
            const Icon = ICONS[p.icon];
            return (
              <StaggerItem key={p.title} className="h-full">
                <article className="group flex h-full flex-col justify-between gap-10 rounded-3xl border border-ink/10 bg-white p-6 transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-brand/45 hover:shadow-[0_28px_50px_-30px_rgba(215,25,32,0.55)] lg:min-h-[15rem]">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-mist text-ink transition-colors duration-500 group-hover:bg-brand group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="display text-[1.15rem] leading-tight">
                      {p.title}
                    </h3>
                    <p className="mt-2.5 text-[0.86rem] leading-relaxed text-smoke">
                      {p.copy}
                    </p>
                  </div>
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
