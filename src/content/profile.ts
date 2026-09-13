/**
 * Who he is: the summary, education and languages.
 *
 * Every sentence here is a rewrite of docs/resume.md for the web — first
 * person, shorter clauses. No fact is added, removed or upgraded.
 */

/** Professional context shown once in the candidate profile. */
export const studioSummary =
  "I run SparkWebDigital, a freelance web development business serving small business " +
  "clients across the GTA, from requirements gathering through to production deployment, " +
  "including DNS, SSL and hosting.";

/**
 * The hero paragraph. Three clauses, first person, deliberately shorter than
 * the CV's professional summary. It stays separate from the studio context in
 * the candidate profile so the page does not repeat its opening paragraph.
 *
 * Kept separate from `site.description`, which is the <meta> string: search
 * results want the third-person full sentence, the page does not.
 */
export const heroBlurb =
  "I'm a third-year Computer Science student at Sheridan College specializing in " +
  "Cloud Computing. I build full-stack applications, automate workflows with Python, " +
  "and manage cloud-hosted infrastructure.";

/** The opportunity signal shown above the fold for recruiter scanning. */
export const coOpAvailability = "Open to Winter / Summer 2027 co‑op";

/**
 * What he is looking for, in one sentence.
 *
 * This used to live in Contact as `contactIntro`, and About carried a separate
 * `Seeking` row listing the same three areas as bare labels. The candidate
 * profile now pairs this sentence with the availability signal so the target
 * roles are stated once, where a recruiter is already checking education.
 *
 * The term is Winter/Summer 2027, not Fall 2026: Abdllah moved the target.
 * The target areas still trace directly to the CV's co-op objective.
 */
export const seekingStatement =
  "Targeting Winter and Summer 2027 co-op or internship roles in software " +
  "development, cloud engineering, and QA.";

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
