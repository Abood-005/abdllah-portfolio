import type { CSSProperties } from "react";
import Image from "next/image";
import { heroBlurb, site } from "@/content";

/**
 * The first screen.
 *
 * Server component, no state and no client JS. The entrance is pure CSS
 * `animation-delay`: five elements stepping 0/60/120/180/240ms, transform and
 * opacity only, `animation-fill-mode: both` so nothing flashes at full opacity
 * before its turn. `prefers-reduced-motion` drops it to the final state
 * (handled in globals.css).
 *
 * The role line types each of `site.roles` out, holds it, deletes it and moves
 * on. That is also CSS — see `.type-cycle` in globals.css for how a typewriter
 * gets built out of `transform` alone — which is why this is still a server
 * component. The only thing this file contributes is `--chars`: the character
 * count of each role, which is the number of steps its sweep takes.
 *
 * Nothing above the fold carries `data-reveal`. An IntersectionObserver that
 * fires on the first frame produces a visible flash.
 *
 * Deliberately absent, all of it rejected in v1:
 *   - the fake `terraform apply` terminal card (the CV says AWS/Azure
 *     *fundamentals*; it would not survive an interview question)
 *   - an availability pill
 *   - `100dvh` (a hero that ends mid-screen invites the scroll)
 *   - the GitHub / LinkedIn / SparkWebDigital / Email row. It was the third
 *     copy of the same four links, after the nav and the footer, and the
 *     Contact section renders them again as tiles.
 */

/** Seconds per role: ~1s typing, ~2s held, ~1s deleting. */
const ROLE_SECONDS = 4;

export function Hero() {
  return (
    <section className="grid items-center gap-10 pb-16 pt-16 md:grid-cols-[1fr_auto] md:gap-16 md:pt-24">
      <div>
        <p className="kicker rise">{site.location}</p>

        <h1
          className="display rise mt-4 text-[clamp(2.6rem,7vw,4.5rem)] font-extrabold"
          style={{ animationDelay: "60ms" }}
        >
          {site.name}
        </h1>

        <p
          className="mono rise mt-3 text-[clamp(1.05rem,2.4vw,1.5rem)] text-accent"
          style={{ animationDelay: "120ms" }}
        >
          {/* A screen reader gets the three roles once, as a list, and never
              sees the cycler. Announcing a span that types and deletes itself
              every four seconds is worse than useless. */}
          <span className="sr-only">{site.roles.join(", ")}</span>
          <span aria-hidden className="type-cycle">
            {site.roles.map((role, i) => (
              <span
                key={role}
                style={{ animationDelay: `${i * ROLE_SECONDS}s` }}
              >
                {role}
                {/* The cover. It sits over the whole role at rest and slides
                    off to the right one character at a time; its left edge,
                    drawn in --accent, is the caret. */}
                <span
                  className="type-cover"
                  style={
                    {
                      animationDelay: `${i * ROLE_SECONDS}s`,
                      "--chars": role.length,
                    } as CSSProperties
                  }
                />
              </span>
            ))}
          </span>
        </p>

        <p
          className="measure rise mt-6 text-fg-dim"
          style={{ animationDelay: "180ms" }}
        >
          {heroBlurb}
        </p>

        <div
          className="rise mt-8 flex flex-wrap items-center gap-3"
          style={{ animationDelay: "240ms" }}
        >
          <a
            href="#projects"
            className="rounded-lg bg-accent px-5 py-2.5 text-[0.9375rem] font-semibold text-bg transition-colors hover:bg-accent-bright"
          >
            View Projects
          </a>
          <a
            href={site.resume}
            className="rounded-lg border border-accent px-5 py-2.5 text-[0.9375rem] font-semibold text-accent transition-colors hover:bg-accent-wash"
          >
            View Resume
          </a>
        </div>
      </div>

      {/* The headshot. public/headshot.webp is a 640x640 WebP derivative, 26 KB;
          the 1145x1374 original Abdllah sent is source material and lives in
          docs/assets/headshot/, because next.config sets images.unoptimized and
          a static export ships whatever byte count is in public/.

          The explicit width/height are what stop the reflow: keep them, and
          keep the circular crop and the --accent-deep ring.

          `order-first md:order-none`: on one column the photo belongs above the
          name. Left in source order it landed a full screen down, so the phone
          opened on 220px of empty ground. It is also smaller there (150px);
          on a 375px viewport a 220px circle is most of the fold. */}
      <div
        className="rise order-first mx-auto md:order-none md:mx-0"
        style={{ animationDelay: "120ms" }}
      >
        <Image
          src="/headshot.webp"
          alt={site.name}
          width={640}
          height={640}
          priority
          className="h-[150px] w-[150px] rounded-full border-2 border-accent-deep object-cover md:h-[260px] md:w-[260px]"
        />
      </div>
    </section>
  );
}
