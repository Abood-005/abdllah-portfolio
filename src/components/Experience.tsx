import type { Role } from "@/content";
import { sections, technicalRoles } from "@/content";

const meta = sections[1];

function ExperienceEntry({ role }: { role: Role }) {
  const highlights = role.webBullets
    ? role.bullets.slice(0, role.webBullets)
    : role.bullets;

  return (
    <li className="experience-entry">
      <div className="experience-when">
        {role.current ? <span className="experience-current mono">Current</span> : null}
        <p className="mono experience-dates">
          {role.start}
          <span>to</span>
          {role.end}
        </p>
      </div>

      <div className="experience-rail-marker" aria-hidden>
        <span />
      </div>

      <div className="experience-identity">
        <h3 className="display">{role.title}</h3>
        <p className="experience-organization">
          {role.orgHref ? (
            <a
              href={role.orgHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${role.org} (opens in a new tab)`}
              className="link-underline"
            >
              {role.org}
            </a>
          ) : (
            role.org
          )}
        </p>
        {role.location ? <p className="experience-location">{role.location}</p> : null}
        <ul className="experience-technologies" aria-label={`${role.title} technologies`}>
          {role.stack.map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>
      </div>

      <ul className="experience-highlights">
        {highlights.map((highlight) => (
          <li key={highlight.slice(0, 40)}>{highlight}</li>
        ))}
      </ul>
    </li>
  );
}

export function Experience() {
  return (
    <section
      id={meta.id}
      aria-labelledby={`${meta.id}-title`}
      className="phase-three-section experience-section"
    >
      <div className="phase-three-heading">
        <h2 id={`${meta.id}-title`} className="phase-three-title display">
          {meta.title}
        </h2>
        <p>
          Current technical work spanning backend collaboration and production
          systems for small businesses.
        </p>
      </div>

      <ul className="experience-rail">
        {technicalRoles.map((role) => (
          <ExperienceEntry key={role.slug} role={role} />
        ))}
      </ul>
    </section>
  );
}
