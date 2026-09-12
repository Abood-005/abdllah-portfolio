import Image from "next/image";
import type { Project } from "@/content";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { Github } from "@/components/ui/Icons";
import { TagRow } from "@/components/ui/Tag";
import { projects, sections } from "@/content";

const meta = sections[2];

/**
 * One `Card` per project, two up from `sm` once there is more than one.
 *
 * Server component with zero client JS. The detail bullets use a native
 * `<details>` disclosure: it is keyboard accessible, it works before hydration
 * and it works with JS switched off entirely.
 *
 * Three things render only when the data exists, and render *nothing* when it
 * does not: no greyed-out "Live" text, no `#` anchors, no grey placeholder
 * rectangle where a screenshot would go.
 *
 * The grid collapses to a single centred column while `projects` holds one
 * entry. A lone card in a two-column grid sits in the left half of the shell
 * with an equal amount of nothing beside it, which reads as a card that failed
 * to load rather than as a decision. Add a second project and the `sm:` split
 * comes back on its own.
 *
 * `href` is still the section's biggest weakness and it is a content gap, not
 * a code one: nothing here is deployed to a URL a recruiter can open.
 */

/** `Live ↗`. Rendered only for a URL that actually exists. */
function ProjectLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="mono link-underline text-[0.8125rem] text-accent hover:text-accent-bright"
    >
      {label}{" "}
      <span aria-hidden className="text-[0.75rem]">
        &#8599;
      </span>
    </a>
  );
}

/**
 * The repo link. "More info" rather than "Code", because what it points at is
 * a showcase repository: screenshots and a write-up, not the application
 * source. The mark is the local inline GitHub path from ui/Icons, so still no
 * icon package, and it inherits currentColor and picks up the hover with the
 * text beside it.
 */
function RepoLink({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="mono link-underline inline-flex items-center gap-1.5 text-[0.8125rem] text-accent hover:text-accent-bright"
    >
      <Github size={14} />
      More info
    </a>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <Card
      as="li"
      // flex-col + mt-auto on the foot keeps the disclosure and links aligned
      // across a row of cards whose descriptions are different lengths.
      className="reveal flex flex-col overflow-hidden"
      data-reveal
      style={{ transitionDelay: `${Math.min(index * 60, 240)}ms` }}
    >
      {project.gallery ? (
        // Seven frames stacked in one grid cell, cross-fading every 2.5s.
        // Pure CSS, see `.photo-cycle` in globals.css, so this card and this
        // whole section still ship zero client JS.
        <div className="photo-cycle border-b border-line">
          {project.gallery.map((shot, i) => (
            <Image
              key={shot.src}
              src={shot.src}
              alt={shot.alt}
              width={1280}
              height={720}
              // Explicit dimensions plus aspect-video: the box is reserved
              // before the bytes land, so a card never jumps when a frame
              // decodes, and every frame occupies exactly the same box.
              className="aspect-video w-full object-cover object-top"
              style={{ animationDelay: `${i * 2.5}s` }}
            />
          ))}
        </div>
      ) : null}

      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-2">
          <h3 className="display text-[1.0625rem] text-accent">
            {project.title}
          </h3>
          <span className="mono shrink-0 text-[0.6875rem] uppercase tracking-[0.12em] text-fg-faint">
            {project.role}
          </span>
        </div>

        <p className="mt-3 text-[0.9375rem] leading-relaxed text-fg-dim">
          {project.summary}
        </p>

        <TagRow items={project.stack} className="mt-4" />

        <div className="mt-auto pt-5">
          {/* The disclosure and the links are siblings. Putting the links
              inside <summary> would make clicking one toggle the panel. */}
          <details className="disclosure group">
            <summary className="mono cursor-pointer list-none text-[0.8125rem] text-fg-dim transition-colors hover:text-accent">
              <span aria-hidden className="disclosure-chevron">
                &#9656;
              </span>
              Details
            </summary>
            <ul className="bullets mt-3 space-y-2 text-[0.9375rem] text-fg-dim">
              {project.detail.map((d) => (
                <li key={d.slice(0, 32)}>{d}</li>
              ))}
            </ul>
          </details>

          {project.href || project.repo ? (
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
              {project.href ? (
                <ProjectLink href={project.href} label="Live" />
              ) : null}
              {project.repo ? <RepoLink href={project.repo} /> : null}
            </div>
          ) : null}
        </div>
      </div>
    </Card>
  );
}

export function Projects() {
  return (
    <Section id={meta.id} title={meta.title}>
      <ul
        className={`mt-10 grid gap-6 ${
          projects.length > 1 ? "sm:grid-cols-2" : "mx-auto max-w-2xl"
        }`}
      >
        {projects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </ul>
    </Section>
  );
}
