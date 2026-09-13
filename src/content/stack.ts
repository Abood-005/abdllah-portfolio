/**
 * Interview-facing capabilities and certifications. Every item comes from the
 * résumé; the four groupings organize the same facts around the work a
 * technical interviewer is likely to discuss. The fundamentals qualifiers on
 * AWS and Azure remain explicit.
 */

export type Capability = {
  readonly slug: string;
  readonly title: string;
  readonly summary: string;
  readonly items: readonly string[];
};

export const capabilities: readonly Capability[] = [
  {
    slug: "building",
    title: "Building",
    summary: "Application interfaces, backend logic, APIs, and automation.",
    items: [
      "JavaScript (ES6+)",
      "React",
      "Node.js",
      "Python",
      "HTML5",
      "CSS3",
      "C#",
      "REST APIs",
      "Responsive design",
    ],
  },
  {
    slug: "data",
    title: "Data",
    summary: "Operational databases, SQL, and relational modelling.",
    items: [
      "MongoDB",
      "Supabase (PostgreSQL)",
      "SQL",
      "T-SQL",
      "Relational design (ER diagrams)",
      "Normalization to 3NF",
    ],
  },
  {
    slug: "infrastructure",
    title: "Infrastructure",
    summary: "Cloud fundamentals and production web configuration.",
    items: [
      "AWS (fundamentals)",
      "Azure (fundamentals)",
      "Linux CLI",
      "Bash",
      "DNS & domain management",
      "SSL certificates",
      "Hosting and deployment",
    ],
  },
  {
    slug: "delivery",
    title: "Delivery",
    summary: "Version control, CI/CD, deployment, and team tooling.",
    items: [
      "Git",
      "GitHub",
      "GitHub Actions CI/CD",
      "VS Code",
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
   * public/, behind the archive row's View and Download buttons. Without an
   * href the row renders no buttons.
   */
  readonly href?: string;
  /**
   * Page one of `href`, rendered to WebP at public/certificates/<slug>.webp.
   * A static export cannot embed a PDF viewer, so the row shows the picture
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
