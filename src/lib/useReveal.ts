"use client";

import { useEffect } from "react";

/**
 * One IntersectionObserver for the whole document.
 *
 * Not one per component and not a context provider: every `[data-reveal]`
 * element on the page is watched by a single observer that adds `in` and then
 * unobserves. Reveals never re-hide on scroll up — an element that has been
 * seen stays seen.
 *
 * Under `prefers-reduced-motion` this bails out before observing anything.
 * That is only safe because the `.reveal` rules in globals.css leave elements
 * at full opacity in that case; if that ever changes, this bail-out strands the
 * entire page blank.
 *
 * The `data-reveal-ready` attribute is stamped on <html> by a blocking script
 * in layout.tsx, not from here. Setting it in an effect would let the headings
 * paint visible and then flash back to hidden a frame later.
 */
export function useReveal() {
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (targets.length === 0) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // No observer at all, and no IO in older browsers: reveal everything now.
    if (reduced || !("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      },
      // The negative bottom margin holds the reveal until the element is
      // properly on screen rather than one pixel past the fold.
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
    );

    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}
