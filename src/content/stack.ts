/**
 * Skills and certifications. Source: docs/resume.md § Technical skills and
 * § Certifications.
 *
 * The five groups are the CV's own categories, in the CV's own order. Do not
 * re-bucket them into invented headings, and do not drop the "(fundamentals)"
 * qualifiers on AWS and Azure — overstating that depth is exactly what a
 * technical interviewer will probe.
 */

export type SkillGroup = {
  readonly slug: string;
  readonly title: string;
  readonly items: readonly string[];
};

export const skills: readonly SkillGroup[] = [
  {
    slug: "languages",
    title: "Languages & Frameworks",
    items: [
      "JavaScript (ES6+)",
      "React",
      "Node.js",
      "Python",
      "HTML5",
      "CSS3",
      "C#",
      "SQL",
      "T-SQL",
      "Bash",
    ],
  },
  {
    slug: "databases",
    title: "Databases",
    items: [
      "MongoDB",
      "Supabase (PostgreSQL)",
      "Relational design (ER diagrams)",
      "Normalization to 3NF",
    ],
  },
  {
    slug: "cloud",
    title: "Cloud & DevOps",
    items: [
      "AWS (fundamentals)",
      "Azure (fundamentals)",
      "GitHub Actions CI/CD",
      "Git",
      "Linux CLI",
    ],
  },
  {
    slug: "web",
    title: "Web & APIs",
    items: [
      "REST APIs",
      "DNS & domain management",
      "SSL certificates",
      "Responsive design",
      "Hosting and deployment",
    ],
  },
  {
    slug: "tools",
    title: "Tools & Platforms",
    items: [
      "VS Code",
      "GitHub",
      "Google Workspace",
      "Microsoft 365",
      "Remote access tools",
      "Ticketing systems",
    ],
  },
] as const;

export type CertificationStatus = "completed" | "in-progress";

export type Certification = {
  readonly slug: string;
  readonly title: string;
  readonly issuer: string;
  readonly issued: string;
  readonly status: CertificationStatus;
  /**
   * Certificate URL. Each of the three MongoDB certificates is a PDF in
   * public/, behind the card's View and Download buttons. Without an href
   * the card renders no buttons.
   */
  readonly href?: string;
  /**
   * Page one of `href`, rendered to WebP at public/certificates/<slug>.webp.
   * A static export cannot embed a PDF viewer, so the card shows the picture
   * and the buttons hand over the document itself. Regenerate with pymupdf at
   * 1000px wide if a certificate is ever replaced; never point this at a PDF.
   */
  readonly image?: string;
};

/**
 * The three MongoDB University certificates, in the order the courses are
 * taken: connect, then read and write, then aggregate.
 *
 * The phase 1 preview showed an "AWS Certified Cloud Practitioner, In
 * Progress" chip purely to demonstrate the --pending colour; it is not on the
 * CV and does not ship unless Abdllah confirms it.
 *
 * "Connecting to MongoDB in Python" is NOT in docs/resume.md. Abdllah supplied
 * the certificate itself, so the PDF is the source here and the CV is the file
 * that is out of date. Every issue date is read off the certificates:
 * 13 March 2026 on all three.
 */
export const certifications: readonly Certification[] = [
  {
    slug: "mongodb-connecting",
    title: "Connecting to MongoDB in Python",
    issuer: "MongoDB",
    issued: "Mar 2026",
    status: "completed",
    href: "/Connection_to_MongoDB_in_Python_Abdllah_Abbara.pdf",
    image: "/certificates/mongodb-connecting.webp",
  },
  {
    slug: "mongodb-crud",
    title: "MongoDB CRUD Operations in Python",
    issuer: "MongoDB",
    issued: "Mar 2026",
    status: "completed",
    href: "/MongoDB_CRUD_Operations_in_Python_Abdllah_Abbara.pdf",
    image: "/certificates/mongodb-crud.webp",
  },
  {
    slug: "mongodb-aggregation",
    title: "MongoDB Aggregation in Python",
    issuer: "MongoDB",
    issued: "Mar 2026",
    status: "completed",
    href: "/MongoDB_Aggregation_in_Python_Abdllah_Abbara.pdf",
    image: "/certificates/mongodb-aggregation.webp",
  },
] as const;
