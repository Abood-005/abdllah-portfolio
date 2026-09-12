import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { contactTiles, sections, site } from "@/content";

const meta = sections[5];

/**
 * The closing section. One idea: make it trivially easy to email him.
 *
 * Deliberately absent:
 *   - a contact form. This is a static export with no backend, and a form that
 *     silently posts nowhere is worse than no form at all.
 *   - "Let's build something amazing together", and any other paragraph. The
 *     one sentence that used to open this section said what he is looking for,
 *     which About already says in the "What I Do" card. Saying it twice on one
 *     page is padding; the email is the whole section now.
 *   - a big gradient CTA block.
 *   - his phone number. It is on the CV; a public page gets scraped, so it
 *     stays in the downloadable PDF. See the note in site.ts.
 */
export function Contact() {
  return (
    <Section id={meta.id} title={meta.title}>
      <div className="reveal" data-reveal>
        {/* The email is the section, not a tile. `break-words` plus
            overflow-wrap:anywhere is what keeps it inside a 375px screen
            instead of forcing the page to scroll sideways. */}
        <p className="text-center">
          <a
            href={`mailto:${site.email}`}
            className="display inline-block break-words text-[clamp(1.5rem,5vw,3.25rem)] transition-colors hover:text-accent"
            style={{ overflowWrap: "anywhere" }}
          >
            {site.email}
          </a>
        </p>
      </div>

      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {contactTiles.map((tile, i) => (
          <Card
            as="li"
            key={tile.label}
            className="reveal"
            data-reveal
            style={{ transitionDelay: `${Math.min(i * 60, 240)}ms` }}
          >
            {/* The whole tile is the target — a card-sized hit area, not a
                4-character link floating inside one. */}
            <a
              href={tile.href}
              {...(tile.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              {...(tile.download ? { download: true } : {})}
              className="flex h-full items-start justify-between gap-3 p-5"
            >
              <span className="min-w-0">
                <span className="kicker block">{tile.label}</span>
                <span className="mt-1.5 block truncate text-[0.9375rem] text-fg">
                  {tile.handle}
                </span>
              </span>
              <span
                aria-hidden
                className="mono shrink-0 text-[0.875rem] text-accent"
              >
                {tile.download ? <>&#8595;</> : <>&#8599;</>}
              </span>
            </a>
          </Card>
        ))}
      </ul>
    </Section>
  );
}
