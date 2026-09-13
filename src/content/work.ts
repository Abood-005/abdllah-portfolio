/**
 * Selected work. The detailed Barber's Touch content is grounded in the
 * résumé and the project's public showcase repository. The commissioned
 * source repository remains private, so this portfolio links to the technical
 * overview rather than implying that the application code is public.
 */

export type ProjectImage = {
  readonly src: string;
  readonly alt: string;
  readonly caption: string;
};

export type ProjectChapter = {
  readonly id: string;
  readonly label: string;
  readonly title: string;
  readonly description: string;
  readonly images: readonly ProjectImage[];
};

export type ArchitectureStep = {
  readonly label: string;
  readonly title: string;
  readonly description: string;
  readonly technologies: readonly string[];
};

export type Project = {
  readonly slug: string;
  readonly title: string;
  readonly role: string;
  readonly status: string;
  readonly summary: string;
  readonly brief: readonly {
    readonly label: string;
    readonly text: string;
  }[];
  readonly stack: readonly string[];
  readonly href: string;
  readonly repo: string;
  readonly architecture: readonly ArchitectureStep[];
  readonly integrations: readonly string[];
  readonly chapters: readonly ProjectChapter[];
};

export const projects: readonly Project[] = [
  {
    slug: "barbers-touch",
    title: "Barber's Touch",
    role: "Full-stack product build",
    status: "Live in production",
    summary:
      "A production platform connecting public booking with the barbershop's calendar, checkout, client records, staff scheduling, and revenue reporting.",
    brief: [
      {
        label: "Problem",
        text: "Bring customer booking and day-to-day shop operations into one system.",
      },
      {
        label: "Contribution",
        text: "Built end to end across requirements, UX, frontend, backend, database design, security, deployment, and maintenance.",
      },
      {
        label: "Shipped result",
        text: "A live platform actively used for online bookings and operational workflows.",
      },
    ],
    stack: [
      "React 19",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Edge Functions",
      "Vercel",
    ],
    href: "https://barberstouch.ca",
    repo: "https://github.com/Abood-005/barbers-touch-showcase",
    architecture: [
      {
        label: "Interface",
        title: "React + Vite",
        description:
          "Responsive customer, admin, and employee experiences share one product surface.",
        technologies: ["React 19", "TypeScript", "Vite"],
      },
      {
        label: "Server boundary",
        title: "Edge Functions",
        description:
          "Validated server-side workflows handle booking submission, email, and rate limits.",
        technologies: ["Deno", "Upstash Redis", "Resend"],
      },
      {
        label: "Data and access",
        title: "Supabase",
        description:
          "PostgreSQL, authentication, row-level security, and realtime subscriptions keep roles and records synchronized.",
        technologies: ["PostgreSQL", "Auth", "RLS", "Realtime"],
      },
    ],
    integrations: ["Google Maps / Places", "Resend", "Upstash Redis", "Vercel"],
    chapters: [
      {
        id: "customer",
        label: "Customer experience",
        title: "From discovery to booking",
        description:
          "Responsive marketing pages move visitors from services and work examples into multi-service booking, barber selection, and live slot availability.",
        images: [
          {
            src: "/projects/barbers-touch/home.webp",
            alt: "Barber's Touch home page with a split-screen hero and booking call to action.",
            caption: "Public home page",
          },
          {
            src: "/projects/barbers-touch/work.webp",
            alt: "Barber's Touch work gallery showing a collection of finished haircuts.",
            caption: "Work gallery",
          },
          {
            src: "/projects/barbers-touch/mobile.webp",
            alt: "Barber's Touch home page presented in its narrow mobile layout.",
            caption: "Mobile experience",
          },
        ],
      },
      {
        id: "scheduling",
        label: "Scheduling",
        title: "Availability before submission",
        description:
          "The booking flow accounts for selected services, barber hours, current bookings, and a no-preference path; the authenticated calendar organizes appointments by barber.",
        images: [
          {
            src: "/projects/barbers-touch/booking.webp",
            alt: "Booking form with service, barber, date, and time selection controls.",
            caption: "Customer booking flow",
          },
          {
            src: "/projects/barbers-touch/calendar.webp",
            alt: "Administrative day calendar with appointment columns for individual barbers.",
            caption: "Day-view staff calendar",
          },
        ],
      },
      {
        id: "operations",
        label: "Operations",
        title: "The shop behind the website",
        description:
          "Authenticated tools cover revenue, checkout, transactions, clients, recurring schedules, and staff management, with employee access separated from owner-only controls.",
        images: [
          {
            src: "/projects/barbers-touch/dashboard.webp",
            alt: "Administrative dashboard with booking, revenue, service, and activity summaries.",
            caption: "Owner dashboard",
          },
          {
            src: "/projects/barbers-touch/checkout.webp",
            alt: "Point-of-sale checkout interface with services, payment methods, discounts, and client details.",
            caption: "Point-of-sale checkout",
          },
        ],
      },
    ],
  },
] as const;
