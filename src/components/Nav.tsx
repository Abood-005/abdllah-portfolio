"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Close, Menu } from "@/components/ui/Icons";
import { links, sections, site } from "@/content";

const mobileLinks = links.filter((link) => link.label !== "SparkWebDigital");

/**
 * Floating navigation strip. The solid surface keeps text legible without a
 * costly blur, while the inset frame separates navigation from page content.
 */
export function Nav() {
  const [active, setActive] = useState<string>(sections[0].id);
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const nodes = sections
      .map((section) => document.getElementById(section.id))
      .filter((node): node is HTMLElement => node !== null);
    if (nodes.length === 0) return;

    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        const first = sections.find((section) => visible.has(section.id));
        if (first) setActive(first.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
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
    <header className="pointer-events-none sticky top-0 z-40 h-[var(--nav-h)]">
      <nav aria-label="Sections" className="shell flex h-full items-center">
        <div className="nav-frame pointer-events-auto flex w-full items-center justify-between gap-5">
          <a
            href="#main"
            className="display inline-flex min-h-11 shrink-0 items-center text-[0.95rem] tracking-tight transition-colors hover:text-accent"
          >
            {site.firstName}
            <span className="text-signal">.</span>
          </a>

          <ul className="hidden items-center gap-5 text-[0.8125rem] lg:flex">
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  aria-current={active === section.id ? "location" : undefined}
                  className={
                    active === section.id
                      ? "inline-flex min-h-11 items-center text-fg"
                      : "inline-flex min-h-11 items-center text-fg-faint transition-colors hover:text-fg"
                  }
                >
                  {section.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={site.booking}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Book a meeting (opens in a new tab)"
              className="nav-booking"
            >
              Book a meeting
            </a>
            <button
              ref={triggerRef}
              type="button"
              onClick={() => setOpen(true)}
              aria-haspopup="dialog"
              aria-expanded={open}
              aria-controls="mobile-site-menu"
              aria-label="Open menu"
              className="grid h-11 w-11 place-items-center rounded-md text-fg-dim transition-colors hover:text-fg lg:hidden"
            >
              <Menu />
            </button>
          </div>
        </div>
      </nav>

      {open ? (
        <div
          id="mobile-site-menu"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="pointer-events-auto fixed inset-0 z-50 bg-bg lg:hidden"
        >
          <div className="shell flex h-[var(--nav-h)] items-center justify-between border-b border-line">
            <span className="display text-[0.95rem] tracking-tight">
              {site.firstName}
              <span className="text-signal">.</span>
            </span>
            <button
              type="button"
              onClick={close}
              aria-label="Close menu"
              className="grid h-11 w-11 place-items-center rounded-md text-fg-dim transition-colors hover:text-fg"
            >
              <Close />
            </button>
          </div>

          <nav
            aria-label="Mobile sections"
            className="shell flex flex-col gap-8 pt-10"
          >
            <ul className="flex flex-col gap-1">
              {sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    onClick={close}
                    aria-current={
                      active === section.id ? "location" : undefined
                    }
                    className="display inline-block py-2 text-[1.75rem] transition-colors hover:text-accent"
                  >
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>

            <a
              href={site.booking}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Book a meeting (opens in a new tab)"
              onClick={close}
              className="flex items-center justify-center rounded-md bg-accent px-5 py-3 font-semibold text-bg transition-colors hover:bg-accent-bright"
            >
              Book a meeting
            </a>

            <ul className="flex flex-col border-t border-line pt-6 text-[0.9375rem] text-fg-dim">
              {mobileLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={close}
                    aria-label={
                      link.external
                        ? `${link.label} (opens in a new tab)`
                        : undefined
                    }
                    className="block py-3 transition-colors hover:text-accent"
                    {...(link.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
