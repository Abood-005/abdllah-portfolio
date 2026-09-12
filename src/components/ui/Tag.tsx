import type { ReactNode } from "react";

/**
 * A small mono label — a tech tag on a project, a competency in About.
 *
 * Rule: a tag lives INSIDE the card that owns it. It never appears on a
 * heading, in the nav, or floating in hero copy. Scattered badges were a named
 * reason v1 was rejected; this is the disciplined version of the same idea.
 */
export function Tag({ children }: { children: ReactNode }) {
  return <span className="tag">{children}</span>;
}

/** Convenience for the common case: a row of tags from a string list. */
export function TagRow({
  items,
  className = "",
}: {
  items: readonly string[];
  className?: string;
}) {
  if (items.length === 0) return null;
  return (
    <div className={`flex flex-wrap gap-2 ${className}`.trim()}>
      {items.map((item) => (
        <Tag key={item}>{item}</Tag>
      ))}
    </div>
  );
}
