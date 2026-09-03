"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { nav, site } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { MapPin, Phone, WhatsApp } from "@/components/ui/Icons";

const EASE = [0.16, 1, 0.3, 1] as const;

export function MobileNav({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  // Lock background scrolling and allow Escape to dismiss.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          className="fixed inset-0 z-40 flex flex-col bg-ink-deep text-white lg:hidden"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <div className="grain-layer" />

          <nav
            aria-label="Mobile"
            className="container-x flex flex-1 flex-col justify-center pt-24 pb-8"
          >
            <ul className="space-y-1">
              {nav.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, y: 26 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.16 + i * 0.055, duration: 0.6, ease: EASE }}
                >
                  <a
                    href={item.href}
                    onClick={onClose}
                    className="group flex items-baseline gap-4 py-2"
                  >
                    <span className="w-6 text-[0.6rem] font-semibold tabular-nums text-white/35">
                      0{i + 1}
                    </span>
                    <span className="display text-[2.1rem] leading-none transition-colors duration-300 group-hover:text-brand-bright">
                      {item.label}
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>

            <motion.div
              className="mt-10 space-y-3 border-t border-white/12 pt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.5 }}
            >
              <Button
                href={site.directionsHref}
                external
                variant="primary"
                size="lg"
                className="w-full"
              >
                <MapPin className="h-4 w-4" /> Get Directions
              </Button>
              <div className="grid grid-cols-2 gap-3">
                <Button href={site.whatsappHref} external variant="outlineLight" size="lg">
                  <WhatsApp className="h-4 w-4" /> WhatsApp
                </Button>
                <Button href={site.telHref} variant="outlineLight" size="lg">
                  <Phone className="h-4 w-4" /> Call
                </Button>
              </div>
              <p className="pt-3 text-center text-[0.7rem] leading-relaxed text-white/45">
                {site.address.lines.join(" · ")}
              </p>
            </motion.div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
