/**
 * Projects. Source: docs/resume.md § Projects.
 *
 * One entry, deliberately. Reseller Panel, Database Design and Network
 * Architecture Analysis were here and Abdllah cut all three: the last two were
 * coursework, and a section where three of four cards are assignments makes the
 * fourth look like one too. He is building a second real project to sit beside
 * Barber's Touch. The CV still lists all four.
 *
 * `href` is barberstouch.ca, supplied by Abdllah on 2026-09-12. It was absent
 * for a long time and the section was built to render cleanly without it, so a
 * future entry with no live URL is still safe: omit the field rather than
 * pointing a dead "Live" link at "#". The CV gives no project dates either way.
 *
 * `gallery` exists only for Barber's Touch. Its seven raw captures live in
 * docs/assets/barbers-touch/ (1900x1080 PNGs, up to 1.7 MB each); the card uses
 * 1280x720 WebP derivatives at public/projects/barbers-touch/ instead, because
 * next.config sets images.unoptimized: a static export ships whatever byte count
 * is in public/, and a 1.1 MB card image is how a portfolio earns the word
 * "laggy". All seven derivatives together are about 170 KB.
 *
 * The raw captures are in docs/, not public/, for the same reason: they were
 * 3.4 MB of the 4.6 MB export while nothing on the site linked to them. Source
 * material goes in docs/; only derivatives go in public/. Regenerate a
 * derivative for any new screenshot; never point a gallery frame at a raw PNG.
 *
 * mobile.webp is the one portrait capture (376x848). It is centred on a
 * #111823 (--surface) canvas rather than cropped, so it fills the same 16:9 box
 * as the other six and the card never changes height mid-cycle.
 *
 * Cards without a gallery render no image and no grey placeholder box: a row of
 * empty rectangles reads worse than no images.
 */

export type Project = {
  readonly slug: string;
  readonly title: string;
  /** e.g. "Full-stack", "Academic". Describes the kind of work, not a claim. */
  readonly role: string;
  /** One sentence, the card's visible description. */
  readonly summary: string;
  /** The CV bullets, shown in the card's disclosure. */
  readonly detail: readonly string[];
  readonly stack: readonly string[];
  /** Not on the CV. Fill in when Abdllah supplies it. */
  readonly year?: string;
  readonly href?: string;
  /** GitHub URL. Rendered as the GitHub mark plus "More info", not "Code". */
  readonly repo?: string;
  /**
   * Screenshots, cross-faded in this order, one every 2.5s. Paths are under
   * public/ and every frame is an optimized 16:9 WebP derivative.
   *
   * `alt` is written only for the first frame: it is the one that describes the
   * project for a screen reader. The rest are the same subject re-shot and
   * carry alt="" so they are skipped rather than announced seven times.
   */
  readonly gallery?: readonly { readonly src: string; readonly alt: string }[];
};

export const projects: readonly Project[] = [
  {
    slug: "barbers-touch",
    title: "Barber's Touch",
    role: "Full-stack",
    summary:
      "A full-stack appointment booking app for a barbershop, with authentication, scheduling and an admin dashboard.",
    detail: [
      "Built a full-stack appointment booking application using React, Node.js and Supabase (PostgreSQL), with user authentication, appointment scheduling and an admin dashboard.",
      "Integrated the Google Maps API for location display and the Resend API for automated email appointment reminders.",
    ],
    stack: [
      "React",
      "Node.js",
      "Supabase",
      "PostgreSQL",
      "Google Maps API",
      "Resend API",
    ],
    href: "https://barberstouch.ca",
    repo: "https://github.com/Abood-005/barbers-touch-showcase",
    gallery: [
      {
        src: "/projects/barbers-touch/home.webp",
        alt: "The Barber's Touch home page: a barbershop landing page with a booking call to action.",
      },
      { src: "/projects/barbers-touch/work.webp", alt: "" },
      { src: "/projects/barbers-touch/booking.webp", alt: "" },
      { src: "/projects/barbers-touch/dashboard.webp", alt: "" },
      { src: "/projects/barbers-touch/calendar.webp", alt: "" },
      { src: "/projects/barbers-touch/checkout.webp", alt: "" },
      { src: "/projects/barbers-touch/mobile.webp", alt: "" },
    ],
  },
] as const;
