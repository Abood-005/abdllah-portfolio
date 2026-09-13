import Image from "next/image";
import { SystemMap } from "@/components/SystemMap";
import { coOpAvailability, heroBlurb, site } from "@/content";

/**
 * Recruiter-first identity canvas. The name supplies the visual impact; the
 * capability map supplies the technical idea. Both remain static and readable
 * when motion or client-side JavaScript is unavailable.
 */
export function Hero() {
  return (
    <section className="hero-stage" aria-labelledby="hero-title">
      <div className="hero-topline hero-enter">
        <p className="hero-availability">
          <span aria-hidden className="hero-availability-dot" />
          {coOpAvailability}
        </p>
        <p className="mono text-[0.6875rem] text-fg-faint">{site.location}</p>
      </div>

      <div className="hero-title-block hero-enter hero-enter-delay-1">
        <h1 id="hero-title" className="hero-name display">
          <span>Abdllah</span>
          <span>Abbara</span>
        </h1>
        <p className="hero-discipline">Cloud &amp; Software Developer</p>
      </div>

      <div className="hero-lower">
        <div className="hero-intro hero-enter hero-enter-delay-2">
          <div className="hero-summary">
            <div className="hero-portrait-frame">
              <Image
                src="/headshot.webp"
                alt="Portrait of Abdllah Abbara"
                width={640}
                height={640}
                priority
                className="hero-portrait"
              />
            </div>
            <p className="hero-blurb">{heroBlurb}</p>
          </div>

          <div className="hero-actions">
            <a href="#projects" className="hero-action-primary">
              View selected work
            </a>
            <a href={site.resume} className="hero-action-secondary">
              View résumé
            </a>
          </div>

          <dl className="hero-facts">
            <div>
              <dt>Study</dt>
              <dd>Computer Science</dd>
            </div>
            <div>
              <dt>Focus</dt>
              <dd>Cloud Computing</dd>
            </div>
            <div>
              <dt>Standing</dt>
              <dd>Third year</dd>
            </div>
          </dl>
        </div>

        <div className="hero-enter hero-enter-delay-3">
          <SystemMap />
        </div>
      </div>
    </section>
  );
}
