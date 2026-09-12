import type { ReactNode } from "react";
import type { SectionId } from "@/content";

/**
 * The section header treatment used by all six sections: a hairline above, a
 * centred display heading in --accent, and an optional one-paragraph lead.
 *
 * Server component. The heading carries .reveal so phase 7's single shared
 * observer can pick it up. Until that lands, .reveal is inert: the hidden
 * state is gated behind [data-reveal-ready] on <html>, which nothing sets yet.
 * IntersectionObserver can animate it in; the CSS already leaves it visible
 * under prefers-reduced-motion.
 */
export function Section({
  id,
  title,
  intro,
  className = "",
  children,
}: {
  id: SectionId;
  title: string;
  intro?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`scroll-mt-24 border-t border-line pt-14 ${className}`.trim()}
    >
      <div className="reveal" data-reveal>
        <h2
          id={`${id}-title`}
          className="display text-center text-[clamp(1.75rem,4vw,2.5rem)] text-accent"
        >
          {title}
        </h2>
        {intro ? (
          <p className="measure mx-auto mt-4 text-center text-fg-dim">{intro}</p>
        ) : null}
      </div>
      {children}
    </section>
  );
}
