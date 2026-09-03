import { nav, site } from "@/lib/site";
import { Wordmark } from "./Header";
import { Instagram, MapPin, Phone, WhatsApp } from "@/components/ui/Icons";

const YEAR = new Date().getFullYear();

export function Footer() {
  const contact = [
    { label: "Google Maps", href: site.mapsHref, Icon: MapPin, external: true },
    { label: "WhatsApp", href: site.whatsappHref, Icon: WhatsApp, external: true },
    { label: "Call Store", href: site.telHref, Icon: Phone, external: false },
    ...(site.instagram
      ? [{ label: "Instagram", href: site.instagram, Icon: Instagram, external: true }]
      : []),
  ];

  return (
    <footer className="grain relative overflow-hidden bg-ink-deep pt-20 text-white md:pt-24">
      <div className="grain-layer" />
      <div
        aria-hidden
        className="absolute -bottom-40 left-1/2 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(215,25,32,0.22)_0%,transparent_68%)] blur-3xl"
      />

      <div className="container-x relative">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* identity */}
          <div className="lg:col-span-5">
            <Wordmark dark />
            <p className="eyebrow mt-7 text-brand-bright">{site.tagline}</p>
            <p className="mt-5 max-w-sm text-[0.93rem] leading-relaxed text-white/55">
              A multi-brand footwear and sportswear showroom for the whole
              family — right here in {site.locality}.
            </p>

            <address className="mt-7 space-y-1 text-[0.88rem] not-italic leading-relaxed text-white/45">
              {site.address.lines.map((line) => (
                <p key={line}>{line}</p>
              ))}
              {site.hasPhone && (
                <p className="pt-2">
                  <a
                    href={site.telHref}
                    className="font-semibold text-white/75 transition-colors hover:text-brand-bright"
                  >
                    {site.phoneDisplay}
                  </a>
                </p>
              )}
            </address>
          </div>

          {/* quick links */}
          <nav aria-label="Footer" className="lg:col-span-4">
            <h2 className="eyebrow text-white/40">Quick links</h2>
            <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="group inline-flex items-center gap-2 text-[0.95rem] text-white/72 transition-colors duration-300 hover:text-white"
                  >
                    <span className="h-px w-0 bg-brand transition-all duration-400 ease-out group-hover:w-4" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* contact */}
          <div className="lg:col-span-3">
            <h2 className="eyebrow text-white/40">Find us</h2>
            <ul className="mt-6 space-y-3">
              {contact.map(({ label, href, Icon, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="group inline-flex items-center gap-3 text-[0.95rem] text-white/72 transition-colors duration-300 hover:text-white"
                  >
                    <span className="grid h-9 w-9 place-items-center rounded-full border border-white/15 transition-colors duration-300 group-hover:border-brand group-hover:bg-brand">
                      <Icon className="h-4 w-4" />
                    </span>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 py-8 pb-28 lg:pb-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="text-[0.8rem] text-white/40">
              © {YEAR} {site.legalName}. All rights reserved.
            </p>
            <p className="max-w-2xl text-[0.78rem] leading-relaxed text-white/35 md:text-right">
              Brand names and trademarks belong to their respective owners.
              Product availability may vary in store.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
