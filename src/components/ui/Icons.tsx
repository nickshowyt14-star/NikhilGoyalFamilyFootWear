import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
  "aria-hidden": true,
};

export const ArrowRight = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const ArrowUpRight = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

export const Phone = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M21 16.9v2.2a2 2 0 0 1-2.2 2 19.6 19.6 0 0 1-8.5-3 19.3 19.3 0 0 1-6-6 19.6 19.6 0 0 1-3-8.6A2 2 0 0 1 3.3 1H5.5a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L6.8 8.7a16 16 0 0 0 6 6l1.1-1.1a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
  </svg>
);

export const WhatsApp = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M12.04 2A9.9 9.9 0 0 0 2.1 11.9a9.8 9.8 0 0 0 1.35 4.95L2 22l5.3-1.38a9.9 9.9 0 0 0 4.74 1.2h.01a9.9 9.9 0 0 0 9.9-9.9A9.9 9.9 0 0 0 12.04 2Zm0 18.03h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.1.81.83-3.03-.2-.31a8.2 8.2 0 1 1 6.96 3.86Zm4.52-6.16c-.25-.13-1.46-.72-1.69-.8-.22-.08-.39-.12-.55.12-.16.25-.63.8-.78.97-.14.16-.29.18-.53.06a6.72 6.72 0 0 1-3.36-2.94c-.25-.43.25-.4.72-1.33.08-.16.04-.3-.02-.42-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47a.9.9 0 0 0-.65.3c-.22.25-.85.83-.85 2.02s.87 2.35.99 2.51c.12.17 1.71 2.62 4.15 3.67 1.54.67 2.15.72 2.92.61.47-.07 1.46-.6 1.66-1.17.21-.58.21-1.07.15-1.17-.06-.11-.22-.17-.47-.29Z" />
  </svg>
);

export const MapPin = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export const Layers = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="m12 2 9 5-9 5-9-5 9-5ZM3 12l9 5 9-5M3 17l9 5 9-5" />
  </svg>
);

export const Users = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M16 20v-1.5a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4V20" />
    <circle cx="9" cy="7" r="3.5" />
    <path d="M22 20v-1.5a4 4 0 0 0-3-3.85M16.5 3.7a4 4 0 0 1 0 7.1" />
  </svg>
);

export const Ruler = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M3.5 14.5 14.5 3.5l6 6-11 11z" />
    <path d="M7 11l2 2M10 8l2 2M13 5l2 2" />
  </svg>
);

export const Sparkle = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 3v4M12 17v4M5 12H1M23 12h-4M6.5 6.5 4 4M20 20l-2.5-2.5M6.5 17.5 4 20M20 4l-2.5 2.5" />
    <circle cx="12" cy="12" r="3.2" />
  </svg>
);

export const Activity = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M22 12h-4l-3 8-6-16-3 8H2" />
  </svg>
);

export const Flame = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.07-2.14-.22-4.05 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.15.43-2.29 1-3a2.5 2.5 0 0 0 2.5 2.5Z" />
  </svg>
);

export const Dumbbell = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 9v6M7.5 6.5v11M16.5 6.5v11M20 9v6M7.5 12h9" />
  </svg>
);

export const Trophy = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M6 9H4.6a2.6 2.6 0 0 1 0-5.2H6M18 9h1.4a2.6 2.6 0 0 0 0-5.2H18M4.5 22h15" />
    <path d="M18 2.8H6V9a6 6 0 0 0 12 0V2.8ZM10 14.7V17c0 .8-.9 1.2-1.6 1.6-.9.6-1.4 1.9-1.4 3.4M14 14.7V17c0 .8.9 1.2 1.6 1.6.9.6 1.4 1.9 1.4 3.4" />
  </svg>
);

export const Stopwatch = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="14" r="8" />
    <path d="M12 10.5V14l2.2 2.2M9.5 2h5M18.8 6.2l1.4-1.4" />
  </svg>
);

export const Heart = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M20.8 5.6a5.5 5.5 0 0 0-7.8 0L12 6.6l-1-1a5.5 5.5 0 1 0-7.8 7.8l8.8 8.8 8.8-8.8a5.5 5.5 0 0 0 0-7.8Z" />
  </svg>
);

export const Instagram = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
  </svg>
);
