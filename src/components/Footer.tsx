import { links, site } from "@/content";

/**
 * Server component. Deliberately plain: a hairline, the credit line, and the
 * four links as text.
 *
 * The year is computed at module scope — with output: "export" that bakes in
 * at build time, which is what we want on a static site.
 */
const year = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="shell flex flex-col gap-6 py-10 md:flex-row md:items-start md:justify-between">
        <div className="text-[0.875rem] text-fg-dim">
          {/* The year goes through .mono like every other digit on the site.
              It was the one numeral rendering in Instrument Sans. */}
          <p>
            &copy; <span className="mono">{year}</span> {site.name}
          </p>
          <p className="mt-1 text-fg-faint">{site.location}</p>
        </div>

        <ul className="flex flex-wrap gap-x-5 gap-y-2 text-[0.875rem] text-fg-dim">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className="tap link-underline hover:text-accent"
                {...(l.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
