"use client";

import { useReveal } from "@/lib/useReveal";

/**
 * Mounts the single scroll-reveal observer. Renders nothing.
 *
 * One of exactly two "use client" components on the site; the other is Nav.
 * It exists because a hook needs a component to live in, not because anything
 * here has UI.
 */
export function Reveal() {
  useReveal();
  return null;
}
