"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { MapPin, Phone, WhatsApp } from "@/components/ui/Icons";

const ACTIONS = [
  { label: "Directions", href: site.directionsHref, Icon: MapPin, external: true },
  { label: "Call", href: site.telHref, Icon: Phone, external: false },
  { label: "WhatsApp", href: site.whatsappHref, Icon: WhatsApp, external: true },
];

/**
 * Thumb-reachable contact bar for phones — the three actions a local shopper
 * actually needs. Appears once the hero has been scrolled past.
 */
export function MobileActionBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 bottom-0 z-30 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden"
        >
          <div className="flex items-stretch gap-1.5 rounded-2xl border border-white/12 bg-ink-deep/95 p-1.5 shadow-[0_-10px_40px_-12px_rgba(0,0,0,0.6)] backdrop-blur-xl">
            {ACTIONS.map(({ label, href, Icon, external }, i) => (
              <a
                key={label}
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className={`flex flex-1 flex-col items-center justify-center gap-1 rounded-xl px-2 py-2.5 text-[0.66rem] font-semibold uppercase tracking-[0.1em] transition-colors duration-300 ${
                  i === 0
                    ? "bg-brand text-white active:bg-brand-dark"
                    : "text-white/75 active:bg-white/10"
                }`}
              >
                <Icon className="h-[18px] w-[18px]" />
                {label}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
