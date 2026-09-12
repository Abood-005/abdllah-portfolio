"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { links, sections, site } from "@/content";
import { Close, Menu } from "@/components/ui/Icons";

/**
 * Sticky top bar. One of only two client components on the site — it needs
 * state for the scroll spy and the mobile panel.
 *
 * The background is solid --bg. No backdrop filter, ever: a translucent bar
 * forces a full-viewport repaint on every scroll frame.
 */
export function Nav() {
  const [active, setActive] = useState<string>(sections[0].id);
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  /* -- scroll spy: one observer, no scroll listener ---------------------- */
  useEffect(() => {
    const nodes = sections
      .map((s) => document.getElementById(s.id))
      .filter((n): n is HTMLElement => n !== null);
    if (nodes.length === 0) return;

    const visible = new Set<string>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        // Keep the document-order first of whatever is in the band, so the
        // highlight never flickers between two adjacent sections.
        const first = sections.find((s) => visible.has(s.id));
        if (first) setActive(first.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  /* -- mobile panel ------------------------------------------------------ */
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("hashchange", close);
    panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();

    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("hashchange", close);
      triggerRef.current?.focus();
    };
  }, [open, close]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg">
      <nav
        aria-label="Sections"
        className="shell flex h-[var(--nav-h)] items-center justify-between gap-6"
      >
        <a
          href="#main"
          className="display text-[0.95rem] tracking-tight transition-colors hover:text-accent"
        >
          {site.firstName}
          <span className="text-accent">.</span>
        </a>

        <ul className="hidden items-center gap-7 text-[0.875rem] md:flex">
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                aria-current={active === s.id ? "true" : undefined}
                className={
                  active === s.id
                    ? "text-accent underline decoration-1 underline-offset-8"
                    : "text-fg-dim transition-colors hover:text-accent"
                }
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={site.resume}
            className="rounded-lg border border-accent-deep bg-accent-wash px-3 py-1.5 text-[0.8125rem] text-accent-bright transition-colors hover:border-accent hover:text-accent"
          >
            Resume
          </a>
          {/* aria-haspopup, not aria-expanded. What opens is a modal dialog,
              not a region attached to this button, and the label is fixed at
              "Open menu" — pairing that with aria-expanded="true" makes a
              screen reader announce "Open menu, expanded", which is a
              contradiction. The panel has its own labelled Close button and
              traps focus, so the trigger is never the way back out. */}
          <button
            ref={triggerRef}
            type="button"
            onClick={() => setOpen(true)}
            aria-haspopup="dialog"
            aria-label="Open menu"
            className="grid h-11 w-11 place-items-center rounded-lg text-fg-dim transition-colors hover:text-accent md:hidden"
          >
            <Menu />
          </button>
        </div>
      </nav>

      {open ? (
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-50 bg-bg md:hidden"
        >
          <div className="shell flex h-[var(--nav-h)] items-center justify-between border-b border-line">
            <span className="display text-[0.95rem] tracking-tight">
              {site.firstName}
              <span className="text-accent">.</span>
            </span>
            <button
              type="button"
              onClick={close}
              aria-label="Close menu"
              className="grid h-11 w-11 place-items-center rounded-lg text-fg-dim transition-colors hover:text-accent"
            >
              <Close />
            </button>
          </div>

          <div className="shell flex flex-col gap-8 pt-10">
            {/* py-2/py-3 below, not gap. The links are the touch targets and they
                have to clear 44px on their own; the padding does that and the
                gap shrinks to match, so the visual rhythm is unchanged. */}
            <ul className="flex flex-col gap-1">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    onClick={close}
                    className="inline-block py-2 display text-[1.75rem] transition-colors hover:text-accent"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>

            <ul className="flex flex-col border-t border-line pt-6 text-[0.9375rem] text-fg-dim">
              {links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    onClick={close}
                    className="block py-3 transition-colors hover:text-accent"
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
        </div>
      ) : null}
    </header>
  );
}
