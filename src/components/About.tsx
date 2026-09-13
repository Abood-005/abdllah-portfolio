import {
  coOpAvailability,
  education,
  languages,
  sections,
  seekingStatement,
  site,
  studioSummary,
} from "@/content";

const meta = sections[0];

export function About() {
  return (
    <section
      id={meta.id}
      aria-labelledby={`${meta.id}-title`}
      className="phase-three-section profile-section"
    >
      <div className="phase-three-heading phase-three-heading-solo">
        <h2 id={`${meta.id}-title`} className="phase-three-title display">
          {meta.title}
        </h2>
      </div>

      <div className="education-sheet">
        <div className="education-degree">
          <p className="mono">Education</p>
          <h3 className="display">{education.degree}</h3>
          <p>{education.field}</p>
        </div>

        <dl className="education-facts">
          <div>
            <dt className="mono">School</dt>
            <dd>{education.school}</dd>
            <dd>{education.location}</dd>
          </div>
          <div>
            <dt className="mono">Standing</dt>
            <dd>{education.standing}</dd>
            <dd>
              {education.start} &ndash; {education.end}
            </dd>
          </div>
        </dl>
      </div>

      <div className="profile-context-grid">
        <section className="opportunity-panel" aria-labelledby="opportunity-title">
          <div className="opportunity-status">
            <span aria-hidden />
            <h3 id="opportunity-title" className="display">
              {coOpAvailability}
            </h3>
          </div>
          <p>{seekingStatement}</p>
        </section>

        <div className="profile-context">
          <p>{studioSummary}</p>
          <dl>
            <div>
              <dt className="mono">Based in</dt>
              <dd>{site.location}</dd>
            </div>
            <div>
              <dt className="mono">Languages</dt>
              <dd>{languages.map((language) => language.name).join(" / ")}</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="coursework-row">
        <p className="mono">Relevant coursework</p>
        <ul>
          {education.coursework.map((course) => (
            <li key={course}>{course}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
