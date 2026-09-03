"use client";

import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { nav, site } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { MapPin, WhatsApp } from "@/components/ui/Icons";
import { MobileNav } from "./MobileNav";

/** Wordmark + locality lock-up, reused in the header and the footer. */
export function Wordmark({
  dark = false,
  className = "",
}: {
  dark?: boolean;
  className?: string;
}) {
  return (
    <a href="#home" className={`group flex items-center gap-3 ${className}`}>
      <span
        aria-hidden
        className="grid h-9 w-9 shrink-0 place-items-center rounded-[10px] bg-brand text-white shadow-[0_6px_18px_-6px_rgba(215,25,32,0.8)] transition-transform duration-500 ease-out group-hover:rotate-[-6deg]"
      >
        <span className="display text-[1.05rem] leading-none">FF</span>
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={`display whitespace-nowrap text-[1.02rem] leading-none sm:text-[1.15rem] ${
            dark ? "text-white" : "text-ink"
          }`}
        >
          FAMILY FOOTWEAR
        </span>
        {/* Locality sits directly beneath the name, as a smaller subtitle. */}
        <span
          className={`eyebrow mt-[5px] whitespace-nowrap text-[0.56rem] sm:text-[0.6rem] ${
            dark ? "text-white/55" : "text-smoke"
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
  const onLight = scrolled || open;

  return (
    <>
      <motion.header
        initial={{ y: -110 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color,backdrop-filter] duration-500 ${
          scrolled && !open
            ? "border-b border-ink/8 bg-white/85 shadow-[0_1px_30px_-12px_rgba(0,0,0,0.25)] backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="container-x flex h-20 items-center justify-between gap-6 md:h-24">
          <Wordmark dark={!onLight || open} />

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => {
                const isActive = active === item.href.slice(1);
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      aria-current={isActive ? "true" : undefined}
                      className={`relative rounded-full px-3.5 py-2 text-[0.78rem] font-medium transition-colors duration-300 xl:px-4 ${
                        scrolled
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
                          className="absolute inset-x-3.5 -bottom-0.5 h-[2px] rounded-full bg-brand"
                          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2.5">
            {/* Display classes live on the wrapper, not the Button — see Button.tsx. */}
            <span className="hidden md:block">
              <Button
                href={site.directionsHref}
                external
                size="sm"
                variant={scrolled ? "outline" : "outlineLight"}
              >
                <MapPin className="h-3.5 w-3.5" />
                <span className="hidden lg:inline">Get Directions</span>
                <span className="lg:hidden">Directions</span>
              </Button>
            </span>

            <span className="hidden sm:block">
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
                onLight && !open
                  ? "border-ink/15 text-ink"
                  : "border-white/30 text-white"
              }`}
            >
              <span className="relative block h-3 w-5">
                <motion.span
                  className="absolute left-0 block h-[1.6px] w-5 rounded-full bg-current"
                  animate={open ? { top: 5.5, rotate: 45 } : { top: 0, rotate: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                />
                <motion.span
                  className="absolute left-0 block h-[1.6px] rounded-full bg-current"
                  animate={
                    open
                      ? { top: 5.5, rotate: -45, width: 20 }
                      : { top: 11, rotate: 0, width: 13 }
                  }
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
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
