import type { Role } from "@/content";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { TagRow } from "@/components/ui/Tag";
import { sections, technicalRoles } from "@/content";

const meta = sections[1];

/**
 * The work ledger — newest first, one `Card` per technical role.
 *
 * Server component. Nothing here needs state.
 *
 * Education is NOT repeated in this section. It lives in About. v1 rendered
 * the same timeline component twice and that padding is part of what read as
 * slop. Neither are the retail roles: they were a compact "Also" card here
 * until Abdllah asked for the section to carry professional work only.
 *
 * The reveal delay steps by index and caps at 240ms: past four cards a longer
 * cascade stops reading as a cascade and starts reading as a slow page.
 */

/** Mono date chip. Every digit on the site goes through --font-mono. */
function Dates({ role }: { role: Role }) {
  return (
    <span className="mono shrink-0 rounded-md border border-line bg-surface-2 px-2.5 py-1 text-[0.75rem] text-fg-dim">
      {role.start} &ndash; {role.end}
    </span>
  );
}

function RoleCard({ role, index }: { role: Role; index: number }) {
  const bullets = role.webBullets
    ? role.bullets.slice(0, role.webBullets)
    : role.bullets;

  return (
    <Card
      as="li"
      className="reveal block p-6"
      data-reveal
      style={{ transitionDelay: `${Math.min(index * 60, 240)}ms` }}
    >
      {/* items-start, not items-center: on a narrow card the title wraps to two
          lines and a centred chip would float against the second one. */}
      <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
        <div>
          <h3 className="display text-[1.125rem] text-accent">{role.title}</h3>
          <p className="mt-1 font-semibold">
            {role.orgHref ? (
              <a
                href={role.orgHref}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline hover:text-accent"
              >
                {role.org}
              </a>
            ) : (
              role.org
            )}
          </p>
          {role.location ? (
            <p className="mt-0.5 text-[0.875rem] text-fg-faint">
              {role.location}
            </p>
          ) : null}
        </div>

        {/* One signal for a live role, not a dot *and* a word. The chip sits
            above the dates so the two never compete for the same line. */}
        <div className="flex flex-wrap items-center gap-2">
          {role.current ? (
            <span className="mono shrink-0 rounded-md border border-ok/40 px-2 py-1 text-[0.6875rem] uppercase tracking-[0.12em] text-ok">
              Current
            </span>
          ) : null}
          <Dates role={role} />
        </div>
      </div>

      <TagRow items={role.stack} className="mt-4" />

      <p className="kicker mt-5">Key achievements</p>
      <ul className="bullets mt-2.5 space-y-2 text-[0.9375rem] text-fg-dim">
        {bullets.map((b) => (
          <li key={b.slice(0, 32)}>{b}</li>
        ))}
      </ul>
    </Card>
  );
}

export function Experience() {
  return (
    <Section id={meta.id} title={meta.title}>
      <ol className="mt-10 space-y-6">
        {technicalRoles.map((role, i) => (
          <RoleCard key={role.slug} role={role} index={i} />
        ))}
      </ol>
    </Section>
  );
}
