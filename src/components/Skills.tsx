import { capabilities, sections } from "@/content";

const meta = sections[3];

export function Skills() {
  return (
    <section
      id={meta.id}
      aria-labelledby={`${meta.id}-title`}
      className="phase-three-section capability-section"
    >
      <div className="phase-three-heading">
        <h2 id={`${meta.id}-title`} className="phase-three-title display">
          {meta.title}
        </h2>
        <p>
          Technologies grouped by the engineering conversations they support,
          with foundational cloud knowledge labelled honestly.
        </p>
      </div>

      <div className="capability-matrix">
        {capabilities.map((capability) => (
          <article key={capability.slug} className="capability-row">
            <div className="capability-definition">
              <h3 className="display">{capability.title}</h3>
              <p>{capability.summary}</p>
            </div>
            <ul aria-label={`${capability.title} technologies`}>
              {capability.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
