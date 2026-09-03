"use client";

import { MotionConfig, MotionGlobalConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * `reducedMotion="user"` makes every transform animation on the site respect the
 * visitor's OS-level "reduce motion" setting — they get the final layout without
 * the travel, while opacity and colour transitions still read normally.
 *
 * The `?nomotion` escape hatch snaps animations straight to their end state so
 * layout can be inspected or screenshotted without waiting on scroll triggers.
 * It is gated to development and can never fire in a production build.
 */
if (
  process.env.NODE_ENV === "development" &&
  typeof window !== "undefined" &&
  new URLSearchParams(window.location.search).has("nomotion")
) {
  MotionGlobalConfig.skipAnimations = true;
}

export function Providers({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
