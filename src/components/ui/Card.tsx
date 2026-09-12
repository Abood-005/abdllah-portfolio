import type { ElementType, ReactNode } from "react";

/**
 * The one shape the site is built from — experience entries, projects, skill
 * groups, certifications, contact tiles.
 *
 * Everything visual lives in the `.card` class in globals.css: --surface fill,
 * 1px --line border, 12px radius, hover goes --accent-deep and lifts 2px.
 *
 * Solid background. Never add a backdrop filter — a frosted card re-rasterises
 * the viewport on every scroll frame, which is what made v1 lag.
 */
export function Card({
  as: Tag = "div",
  className = "",
  children,
  ...rest
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
} & Record<string, unknown>) {
  return (
    <Tag className={`card ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  );
}
