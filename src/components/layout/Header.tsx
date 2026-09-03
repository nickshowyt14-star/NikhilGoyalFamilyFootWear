"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { nav, site } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { MapPin, WhatsApp } from "@/components/ui/Icons";
import { MobileNav } from "./MobileNav";

const EASE = [0.16, 1, 0.3, 1] as const;

/** The red "FF" tile, shared by the masthead and the compact lock-up. */
function Badge({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`grid shrink-0 place-items-center rounded-xl bg-brand text-white shadow-[0_10px_28px_-10px_rgba(215,25,32,0.9)] transition-transform duration-500 ease-out group-hover:rotate-[-6deg] ${className}`}
    >
      <span className="display leading-none">FF</span>
    </span>
  );
}

/**
 * Compact lock-up: used in the footer, and in the sticky bar once the oversized
 * masthead has collapsed. In `compact` mode the name is dropped below xl and
 * only the tile shows — that is what leaves room for the full nav from lg up.
 */
export function Wordmark({
  dark = false,
  compact = false,
  className = "",
}: {
  dark?: boolean;
  compact?: boolean;
  className?: string;
}) {
  return (
    <a
      href="#home"
      className={`group flex items-center gap-3 ${className}`}
      aria-label={`${site.name} — ${site.locality}, home`}
    >
      <Badge className="h-10 w-10 text-[1.15rem] sm:h-11 sm:w-11 sm:text-[1.25rem]" />
      <span
        className={`flex-col leading-none ${compact ? "hidden xl:flex" : "flex"}`}
      >
        <span
          className={`display whitespace-nowrap text-[1.15rem] leading-none sm:text-[1.3rem] ${
            dark ? "text-white" : "text-ink"
          }`}
        >
          FAMILY FOOTWEAR
        </span>
        <span
          className={`eyebrow mt-1.5 whitespace-nowrap text-[0.56rem] sm:text-[0.62rem] ${
            dark ? "text-white/60" : "text-smoke"
          }`}
        >
          {site.locality}
        </span>
      </span>
    </a>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight whichever section currently occupies the middle of the viewport.
  useEffect(() => {
    const ids = nav.map((n) => n.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const close = useCallback(() => setOpen(false), []);
  const onLight = scrolled && !open;

  return (
    <>
      <motion.header
        initial={{ y: -140 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color,backdrop-filter] duration-500 ${
          onLight
            ? "border-b border-ink/8 bg-white/85 shadow-[0_1px_30px_-12px_rgba(0,0,0,0.25)] backdrop-blur-xl"
            : "border-b border-transparent bg-gradient-to-b from-ink-deep/85 via-ink-deep/40 to-transparent"
        }`}
      >
        {/* ── masthead: oversized brand, collapses away on scroll ─────────── */}
        <div
          className={`overflow-hidden transition-[height,opacity] duration-500 ease-out ${
            scrolled
              ? "h-0 opacity-0"
              : "h-[5rem] opacity-100 sm:h-[6.5rem] lg:h-[9rem] xl:h-[11rem] 2xl:h-[12rem]"
          }`}
        >
          <div className="container-x flex h-[calc(100%-1px)] items-center">
            <a
              href="#home"
              className="group flex items-center gap-3 sm:gap-3.5 lg:gap-5 2xl:gap-6"
              aria-label={`${site.name} — ${site.locality}, home`}
              tabIndex={scrolled ? -1 : 0}
            >
              <Badge className="h-11 w-11 text-[1.25rem] sm:h-14 sm:w-14 sm:text-[1.6rem] lg:h-20 lg:w-20 lg:rounded-2xl lg:text-[2.3rem] xl:h-24 xl:w-24 xl:text-[2.8rem] 2xl:h-28 2xl:w-28 2xl:text-[3.2rem]" />
              <span className="flex flex-col">
                {/* Display scale, deliberately close to the hero headline. */}
                <span className="display whitespace-nowrap text-[1.75rem] leading-[0.86] text-white sm:text-[2.9rem] lg:text-[5rem] xl:text-[6.6rem] 2xl:text-[7.6rem]">
                  FAMILY FOOTWEAR
                </span>
                <span className="eyebrow mt-2 whitespace-nowrap text-[0.6rem] text-white/55 sm:mt-2.5 sm:text-[0.72rem] lg:mt-3.5 lg:text-[0.82rem] xl:text-[0.9rem]">
                  {site.locality}
                </span>
              </span>
            </a>
          </div>

          {/* hairline tying the masthead into the nav row beneath it */}
          <div
            aria-hidden
            className="container-x h-px bg-gradient-to-r from-brand/70 via-white/14 to-transparent"
          />
        </div>

        {/* ── bar: navigation + calls to action ───────────────────────────── */}
        <div className="container-x flex h-16 items-center gap-4 lg:h-[4.5rem]">
          <AnimatePresence initial={false}>
            {scrolled && (
              <motion.div
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -14 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="mr-2 shrink-0"
              >
                <Wordmark dark={!onLight} compact />
              </motion.div>
            )}
          </AnimatePresence>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-0.5 xl:gap-1">
              {nav.map((item) => {
                const isActive = active === item.href.slice(1);
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      aria-current={isActive ? "true" : undefined}
                      className={`relative whitespace-nowrap rounded-full px-2.5 py-2 text-[0.78rem] font-medium transition-colors duration-300 2xl:px-4 ${
                        onLight
                          ? isActive
                            ? "text-brand"
                            : "text-ink/70 hover:text-ink"
                          : isActive
                            ? "text-white"
                            : "text-white/70 hover:text-white"
                      }`}
                    >
                      {item.label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-dot"
                          className="absolute inset-x-2.5 -bottom-0.5 h-[2px] rounded-full bg-brand 2xl:inset-x-4"
                          transition={{ duration: 0.45, ease: EASE }}
                        />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-2.5">
            {/* Display classes live on the wrapper, not the Button — see Button.tsx. */}
            <span className="hidden sm:block">
              <Button
                href={site.directionsHref}
                external
                size="sm"
                variant={onLight ? "outline" : "outlineLight"}
              >
                <MapPin className="h-3.5 w-3.5" />
                <span className="hidden 2xl:inline">Get Directions</span>
                <span className="2xl:hidden">Directions</span>
              </Button>
            </span>

            <span className="block">
              <Button
                href={site.whatsappHref}
                external
                size="sm"
                variant="primary"
                aria-label="Message Family Footwear on WhatsApp"
              >
                <WhatsApp className="h-3.5 w-3.5" />
                <span className="hidden md:inline">WhatsApp</span>
                <span className="md:hidden">Chat</span>
              </Button>
            </span>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className={`relative z-50 grid h-11 w-11 place-items-center rounded-full border transition-colors duration-300 lg:hidden ${
                onLight ? "border-ink/15 text-ink" : "border-white/30 text-white"
              }`}
            >
              <span className="relative block h-3 w-5">
                <motion.span
                  className="absolute left-0 block h-[1.6px] w-5 rounded-full bg-current"
                  animate={open ? { top: 5.5, rotate: 45 } : { top: 0, rotate: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                />
                <motion.span
                  className="absolute left-0 block h-[1.6px] rounded-full bg-current"
                  animate={
                    open
                      ? { top: 5.5, rotate: -45, width: 20 }
                      : { top: 11, rotate: 0, width: 13 }
                  }
                  transition={{ duration: 0.4, ease: EASE }}
                />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      <MobileNav open={open} onClose={close} />
    </>
  );
}
