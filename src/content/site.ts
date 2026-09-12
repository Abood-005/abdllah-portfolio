/**
 * Identity, links and the section index.
 *
 * Everything here traces to docs/resume.md. Do not add a fact that is not in
 * that file.
 *
 * The longer-form copy lives in the sibling modules: profile.ts (summary,
 * education, languages), experience.ts, work.ts, stack.ts.
 */

export const site = {
  name: "Abdllah Abbara",
  firstName: "Abdllah",
  lastName: "Abbara",
  role: "Cloud & Software Developer",
  // Rotated through by the hero type line. Every one traces to docs/resume.md.
  roles: ["Cloud Computing", "Full-Stack Development", "Python Automation"],
  location: "Mississauga, ON",
  // Lower-case, as Abdllah writes it. The CV renders it capitalised; the
  // address itself is case-insensitive, so this is presentation only.
  email: "abdllahabbara@icloud.com",
  resume: "/Abdllah_Abbara_Resume.pdf",
  // One-line meta description. Feeds <meta name="description"> and the OG
  // tags; the longer first-person version is heroBlurb in profile.ts.
  description:
    "Computer Science student at Sheridan College specializing in Cloud Computing. " +
    "Full-stack web development, Python automation and cloud-hosted infrastructure. " +
    "Runs SparkWebDigital, a freelance web development studio in the GTA.",
  // Confirmed with Abdllah on 2026-09-12: this is the domain he registered.
  // It feeds metadataBase, the canonical URL, robots.txt, sitemap.xml and the
  // OpenGraph tags, so a change here has to be matched by the custom domain
  // set on the host and the DNS records at the registrar (GoDaddy).
  url: "https://abdllahabbara.ca",
} as const;

export type Link = {
  readonly label: string;
  readonly handle: string;
  readonly href: string;
  readonly external: boolean;
  /** Renders a download arrow instead of the external one. */
  readonly download?: boolean;
};

export const links: readonly Link[] = [
  {
    label: "GitHub",
    handle: "Abood-005",
    href: "https://github.com/Abood-005",
    external: true,
  },
  {
    label: "LinkedIn",
    handle: "abdllah-abbara",
    href: "https://www.linkedin.com/in/abdllah-abbara/",
    external: true,
  },
  {
    label: "SparkWebDigital",
    handle: "sparkwebdigital.ca",
    href: "https://www.sparkwebdigital.ca/",
    external: true,
  },
  {
    label: "Email",
    handle: site.email,
    href: `mailto:${site.email}`,
    external: false,
  },
] as const;

/**
 * The Contact section's tiles.
 *
 * Derived from `links` rather than retyped, so a changed URL cannot go stale
 * in one place and not the other. Email is filtered out on purpose: it is the
 * headline of that section, not one tile among four.
 *
 * The phone number on the CV is deliberately absent from the whole site. A
 * public page gets scraped; the number stays in the downloadable PDF, which is
 * the right place for it. Add it back only if Abdllah asks.
 */
export const contactTiles: readonly Link[] = [
  ...links.filter((l) => l.label !== "Email"),
  {
    label: "Résumé",
    handle: "PDF",
    href: site.resume,
    external: false,
    download: true,
  },
] as const;

/**
 * Drives the nav links, the scroll spy and the section headers — one array so
 * the navigation cannot drift out of sync with the section ids. `label` is the
 * short nav word; `title` is the section heading.
 */
export const sections = [
  { id: "about", label: "About", title: "About Me" },
  { id: "experience", label: "Experience", title: "Experience" },
  { id: "projects", label: "Projects", title: "Projects" },
  { id: "skills", label: "Skills", title: "Skills & Expertise" },
  { id: "certifications", label: "Certifications", title: "Certifications" },
  { id: "contact", label: "Contact", title: "Get In Touch" },
] as const;

export type SectionId = (typeof sections)[number]["id"];
