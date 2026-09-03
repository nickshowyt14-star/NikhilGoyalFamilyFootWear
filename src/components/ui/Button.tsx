import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "ink" | "light" | "outline" | "outlineLight";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-brand text-white hover:bg-brand-dark shadow-[0_10px_30px_-12px_rgba(215,25,32,0.75)]",
  ink: "bg-ink text-white hover:bg-ink-soft shadow-[0_10px_30px_-14px_rgba(0,0,0,0.6)]",
  light: "bg-white text-ink hover:bg-mist shadow-[0_10px_30px_-16px_rgba(0,0,0,0.5)]",
  outline: "border border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-white",
  outlineLight: "border border-white/35 text-white hover:bg-white hover:text-ink backdrop-blur-sm",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-[0.72rem] gap-1.5",
  md: "h-12 px-6 text-[0.78rem] gap-2",
  lg: "h-14 px-8 text-[0.82rem] gap-2.5",
};

type Props = {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  external?: boolean;
  sheen?: boolean;
  onClick?: () => void;
  "aria-label"?: string;
};

/** Shared pill button. Renders an anchor when `href` is supplied, else a button. */
export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className = "",
  external,
  sheen = true,
  onClick,
  ...rest
}: Props) {
  // NOTE: `inline-flex` here is a display utility. Never pass a competing one
  // (`hidden`, `flex`, …) through `className` — Tailwind resolves conflicts by
  // stylesheet order, not class order, so the winner is unpredictable. To hide a
  // button responsively, wrap it in an element that carries the display classes.
  const cls = [
    "relative inline-flex items-center justify-center overflow-hidden rounded-full",
    "font-semibold uppercase tracking-[0.14em] transition-all duration-300 ease-out",
    "active:scale-[0.97] will-change-transform",
    sizes[size],
    variants[variant],
    sheen ? "btn-sheen" : "",
    className,
  ].join(" ");

  const inner = <span className="relative z-10 inline-flex items-center gap-[inherit]">{children}</span>;

  if (href) {
    const isHash = href.startsWith("#");
    if (external || !isHash) {
      return (
        <a
          href={href}
          className={cls}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          {...rest}
        >
          {inner}
        </a>
      );
    }
    return (
      <Link href={href} className={cls} {...rest}>
        {inner}
      </Link>
    );
  }

  return (
    <button type="button" className={cls} onClick={onClick} {...rest}>
      {inner}
    </button>
  );
}
