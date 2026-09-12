import type { ReactNode } from "react";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import {
  education,
  languages,
  sections,
  seekingStatement,
  site,
  summary,
  whatIDo,
} from "@/content";

const meta = sections[0];

/** One row of the education definition list. Label mono/faint, value sans/fg. */
function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid gap-1 sm:grid-cols-[7.5rem_1fr] sm:gap-4">
      <dt className="kicker pt-1">{label}</dt>
      <dd className="text-[0.9375rem]">{children}</dd>
    </div>
  );
}

/**
 * About: the summary, what he does, and the facts a recruiter scans for.
 *
 * Server component. Every string comes from src/content/profile.ts, which is a
 * first-person rewrite of docs/resume.md — no fact added, removed or upgraded.
 *
 * No stat cards. v1 invented "3+ years" and "10+ projects"; nothing in the CV
 * supports a number, and a made-up stat is the fastest way to lose a recruiter.
 *
 * Two things were removed here at Abdllah's request and should not come back:
 *   - the five-tag competency row (Cloud Computing / Full-Stack / Python /
 *     Databases / Networking). Every one of those words was already in the
 *     paragraph beside it, so the row was decoration wearing the .tag class.
 *   - the "Seeking" definition row. The same fact is now one sentence in the
 *     card on the right, stated once.
 */
export function About() {
  return (
    <Section id={meta.id} title={meta.title}>
      <div className="mt-10 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <div className="measure space-y-4 text-[1.0625rem] leading-[1.75] text-fg-dim">
          {summary.map((para) => (
            <p key={para.slice(0, 24)}>{para}</p>
          ))}
        </div>

        <Card className="h-fit p-6">
          <h3 className="display text-[1.0625rem] text-accent">What I Do</h3>
          <ul className="bullets mt-4 space-y-2.5 text-[0.9375rem] text-fg-dim">
            {whatIDo.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>

          {/* The one statement of what he is looking for. It sits under a
              hairline rather than as a fifth bullet: it is a different kind of
              sentence from the four above it, and a recruiter scanning this
              card should land on it last. */}
          <p className="mt-5 border-t border-line pt-5 text-[0.9375rem] text-fg">
            {seekingStatement}
          </p>
        </Card>
      </div>

      <Card className="mt-6 p-6">
        <dl className="space-y-5">
          <Row label="Education">
            <span className="font-semibold text-fg">
              {education.degree} in {education.field}
            </span>
            <br />
            {education.school} &middot; {education.location}
            <br />
            <span className="mono text-[0.8125rem] text-fg-faint">
              {education.start} &ndash; {education.end} &middot;{" "}
              {education.standing}
            </span>
          </Row>

          <Row label="Languages">
            {languages.map((l) => `${l.name} (${l.level})`).join(" · ")}
          </Row>

          <Row label="Based in">{site.location}</Row>
        </dl>

        {/* Coursework is one wrapped line, not eight tags — tags are for the
            card that owns them, and eight in a row reads as badge spam. */}
        <p className="mt-6 border-t border-line pt-5 text-[0.875rem] text-fg-dim">
          <span className="kicker mr-2">Coursework</span>
          {education.coursework.join(", ")}
        </p>
      </Card>
    </Section>
  );
}
