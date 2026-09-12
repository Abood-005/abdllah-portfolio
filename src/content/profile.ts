/**
 * Who he is: the summary, education and languages.
 *
 * Every sentence here is a rewrite of docs/resume.md for the web — first
 * person, shorter clauses. No fact is added, removed or upgraded.
 */

/**
 * The professional summary, split into paragraphs for reading rhythm.
 * Source: docs/resume.md § Professional summary.
 *
 * "third-year" is the one word here that is not lifted from the CV. It is
 * arithmetic, not a claim: the degree started Sep 2024, so the 2026/27 year is
 * the third. Recruiters filter co-op postings by year of study, which is why
 * it earns a place in the first sentence.
 */
export const summary: readonly string[] = [
  "I'm a third-year Computer Science student at Sheridan College, specializing in " +
    "Cloud Computing. My hands-on experience is in building full-stack web applications, " +
    "automating workflows with Python, and managing cloud-hosted infrastructure.",
  "I run SparkWebDigital, a freelance web development business serving small business " +
    "clients across the GTA, from requirements gathering through to production deployment, " +
    "including DNS, SSL and hosting.",
  "I work in JavaScript, React, Python, SQL and MongoDB, with foundational knowledge of " +
    "AWS, Azure, Linux and networking.",
] as const;

/**
 * The hero paragraph. Three clauses, first person, deliberately shorter than
 * `summary` — the hero is a hook, not a bio. Every claim is a clause of the
 * CV's professional summary.
 *
 * Kept separate from `site.description`, which is the <meta> string: search
 * results want the third-person full sentence, the page does not.
 */
export const heroBlurb =
  "I build full-stack web applications, automate workflows with Python, and manage " +
  "cloud-hosted infrastructure. I also run SparkWebDigital, a freelance web development " +
  "studio serving small businesses across the GTA.";

/**
 * What he is looking for, in one sentence.
 *
 * This used to live in Contact as `contactIntro`, and About carried a separate
 * `Seeking` row listing the same three areas as bare labels. Two statements of
 * one fact, in two sections, is the kind of padding that reads as filler — so
 * there is now exactly one, and it sits in the "What I Do" card in About where
 * a recruiter is already reading about him.
 *
 * The term is Winter/Summer 2027, not Fall 2026: Abdllah moved the target.
 * Both halves still trace to the CV — the co-op objective, and SparkWebDigital
 * as a going concern rather than a past project.
 */
export const seekingStatement =
  "Open to 2027 winter/summer co-op and internship roles in software development, " +
  "cloud engineering and QA, and to freelance work through SparkWebDigital.";

/**
 * The four lines of the "What I Do" card in About. Each is a compression of a
 * clause in the CV's professional summary — nothing here is a new claim.
 */
export const whatIDo: readonly string[] = [
  "Build and ship full-stack web applications",
  "Automate workflows with Python",
  "Deploy and manage cloud-hosted infrastructure",
  "Run SparkWebDigital, a freelance web development studio in the GTA",
] as const;

export type Education = {
  readonly degree: string;
  readonly field: string;
  readonly school: string;
  readonly location: string;
  /** Year of study. Co-op postings filter on it. */
  readonly standing: string;
  readonly start: string;
  readonly end: string;
  readonly coursework: readonly string[];
};

export const education: Education = {
  degree: "Bachelor of Science",
  field: "Computer Science, Cloud Computing",
  school: "Sheridan College",
  location: "Oakville, ON",
  standing: "Third year",
  start: "Sep 2024",
  end: "Present",
  coursework: [
    "Cloud Infrastructure",
    "Networking & Communications",
    "Web Application Development",
    "Database Management",
    "Operating Systems",
    "Cybersecurity Fundamentals",
    "Linear Algebra",
    "Programming Languages & Compilers",
  ],
} as const;

export type Language = {
  readonly name: string;
  readonly level: string;
};

export const languages: readonly Language[] = [
  { name: "English", level: "Fluent, native" },
  { name: "Arabic", level: "Fluent, native" },
] as const;
