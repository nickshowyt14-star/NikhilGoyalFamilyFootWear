"use client";

import { site, hasPhone } from "@/lib/site";
import { Reveal, RevealWords } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { MapPin, Phone, WhatsApp } from "@/components/ui/Icons";

export function VisitStore() {
  return (
    <section
      id="visit"
      className="grain relative scroll-mt-24 overflow-hidden bg-ink py-20 text-white md:py-28 lg:py-32"
    >
      <div className="grain-layer" />
      <div
        aria-hidden
        className="absolute -right-[8vw] -top-[10vw] h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,rgba(215,25,32,0.3)_0%,transparent_68%)] blur-3xl"
      />

      <div className="container-x relative">
        <div className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-14">
          {/* ── details ──────────────────────────────────────────── */}
          <div className="lg:col-span-5">
            <Reveal>
              <span className="eyebrow text-brand-bright">Visit the store</span>
            </Reveal>

            <h2 className="display text-section mt-4">
              <RevealWords text={"THE BEST PAIR\nIS THE ONE YOU TRY ON."} />
            </h2>

            <Reveal delay={0.15}>
              <address className="mt-9 not-italic">
                <p className="display text-[1.3rem] leading-tight">
                  {site.legalName}
                </p>
                <p className="eyebrow mt-2 text-brand-bright">{site.locality}</p>
                <div className="mt-5 space-y-1 text-[0.98rem] leading-relaxed text-white/65">
                  {site.address.lines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>

                {hasPhone && (
                  <a
                    href={site.telHref}
                    className="group mt-6 inline-flex items-center gap-3 text-white transition-colors hover:text-brand-bright"
                  >
                    <span className="grid h-9 w-9 place-items-center rounded-full border border-white/20 transition-colors duration-300 group-hover:border-brand group-hover:bg-brand group-hover:text-white">
                      <Phone className="h-4 w-4" />
                    </span>
                    <span className="display text-[1.35rem] tracking-tight">
                      {site.phoneDisplay}
                    </span>
                  </a>
                )}
              </address>
            </Reveal>

            <Reveal delay={0.22}>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button href={site.directionsHref} external variant="primary" size="lg">
                  <MapPin className="h-4 w-4" /> Get Directions
                </Button>
                <Button href={site.telHref} variant="outlineLight" size="lg">
                  <Phone className="h-4 w-4" /> Call Store
                </Button>
                <Button href={site.whatsappHref} external variant="outlineLight" size="lg">
                  <WhatsApp className="h-4 w-4" /> WhatsApp
                </Button>
              </div>

              {/* Development-only reminder; never rendered in production. */}
              {!hasPhone && process.env.NODE_ENV === "development" && (
                <p className="mt-5 rounded-xl border border-amber-400/40 bg-amber-400/10 px-4 py-3 text-[0.8rem] leading-relaxed text-amber-200">
                  <strong>Dev notice:</strong> no phone number is configured, so
                  the Call and WhatsApp buttons are not yet functional. Set{" "}
                  <code className="font-mono">phone</code> in{" "}
                  <code className="font-mono">src/lib/site.ts</code>.
                </p>
              )}

              <p className="mt-6 text-[0.85rem] leading-relaxed text-white/45">
                Styles and sizes change as new stock arrives. Message us before
                you travel and we can tell you what is on the shelf today.
              </p>
            </Reveal>
          </div>

          {/* ── map ──────────────────────────────────────────────── */}
          <div className="lg:col-span-7">
            <Reveal y={40}>
              <div className="relative overflow-hidden rounded-[26px] border border-white/12 bg-ink-soft shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)]">
                <iframe
                  title={`Map showing ${site.legalName} in ${site.locality}`}
                  src={site.mapsEmbedSrc}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  className="h-[380px] w-full border-0 grayscale-[0.35] contrast-[1.05] sm:h-[460px] lg:h-[560px]"
                />
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <a
                href={site.mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-4 inline-flex items-center gap-2 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-white/70 transition-colors hover:text-white"
              >
                <MapPin className="h-4 w-4 text-brand-bright" />
                Open in Google Maps
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
