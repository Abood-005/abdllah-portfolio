/**
 * Work history, newest first. Source: docs/resume.md § Experience.
 *
 * Bullets are tightened from the CV's phrasing for the web — shorter clauses,
 * no change of meaning and no added claim.
 *
 * The two retail roles (Cashier / Server at Restaurante SUMAQ, Cashier Helper at
 * Adonis) were here until Abdllah asked for them off the site: "remove all
 * cashier stuff, i only want the professional ones". They are still on the CV in
 * public/Abdllah_Abbara_Resume.pdf, which is where an unbroken work history
 * belongs. Do not add them back to the page without asking him.
 *
 * `kind` survives the deletion because the section still reads better with an
 * explicit discriminator than with an array whose membership is implied.
 */

export type RoleKind = "technical" | "retail";

export type Role = {
  readonly slug: string;
  readonly title: string;
  readonly org: string;
  readonly orgHref?: string;
  readonly location?: string;
  readonly start: string;
  readonly end: string;
  readonly current: boolean;
  readonly kind: RoleKind;
  /** Tech surfaced as tags on the card. Drawn only from this role's bullets. */
  readonly stack: readonly string[];
  /**
   * Every bullet the CV carries for this role, strongest first.
   *
   * Note the ordering is the site's, not the PDF's: `webBullets` cuts from the
   * end, so the lines that survive on screen have to be at the front.
   */
  readonly bullets: readonly string[];
  /**
   * How many of `bullets` the card renders. Omitted means all of them.
   *
   * The PDF keeps the full list; a card with six bullets stops being scannable,
   * which is the whole job of this section. Trimming here rather than in the
   * component keeps the decision next to the copy it applies to.
   */
  readonly webBullets?: number;
};

export const experience: readonly Role[] = [
  {
    slug: "ignition-hacks",
    title: "Executive Developer (Backend)",
    org: "Ignition Hacks",
    start: "Jul 2026",
    end: "Present",
    current: true,
    kind: "technical",
    stack: ["Backend", "REST APIs", "Databases"],
    bullets: [
      "Collaborate with the executive and development teams to plan and build backend functionality supporting hackathon operations and participant-facing systems.",
      "Develop and maintain server-side logic, database integrations and APIs, troubleshooting issues and validating changes before deployment.",
      "Document technical workflows and coordinate development priorities with team members in a fast-paced, deadline-driven environment.",
    ],
  },
  {
    slug: "sparkwebdigital",
    title: "Freelance Web Developer & IT Consultant",
    org: "SparkWebDigital",
    orgHref: "https://www.sparkwebdigital.ca/",
    location: "Remote",
    start: "Jan 2026",
    end: "Present",
    current: true,
    kind: "technical",
    stack: [
      "JavaScript",
      "React",
      "Supabase",
      "GitHub Actions",
      "Python",
      "DNS / SSL",
    ],
    bullets: [
      "Built a client booking application with a Supabase backend, Google Maps API integration and automated email reminders via the Resend API.",
      "Configured CI/CD pipelines with GitHub Actions to automate testing and deployment across multiple client projects.",
      "Manage DNS configuration, SSL certificates, hosting environments and domain routing for every client site, troubleshooting connectivity and performance issues independently.",
      "Write Python scripts to automate data processing, reporting and repetitive administrative tasks for clients.",
      // Below the cut. Both stay in the PDF; neither earns card space here.
      // The first is the generic lifecycle opener, which the About paragraph
      // already says in Abdllah's own voice. The second is a soft skill that
      // reads as filler next to four concrete builds.
      "Design, develop and deploy responsive websites for small business clients using JavaScript, React, HTML, CSS and Supabase, covering the full project lifecycle from requirements gathering to production deployment.",
      "Communicate project updates, technical decisions and issue resolutions to non-technical stakeholders in clear, accessible language.",
    ],
    webBullets: 4,
  },
] as const;

/** The roles that get full cards. Every role is one, since the retail pair
    came off the site; the filter stays so adding a `kind: "retail"` entry
    back to the array cannot silently put it on the page. */
export const technicalRoles = experience.filter((r) => r.kind === "technical");
