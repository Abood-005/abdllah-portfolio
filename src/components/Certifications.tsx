import Image from "next/image";
import type { Certification } from "@/content";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { ArrowUpRight, Download } from "@/components/ui/Icons";
import { certifications, sections } from "@/content";

const meta = sections[4];

/**
 * Three certificates, one card each, showing the actual document.
 *
 * The site is a static export, so there is no PDF viewer to embed and no
 * server to render one. What ships instead is a WebP of page one — the same
 * "source in docs, derivative in public" rule the project screenshots follow,
 * except the source PDFs stay in public/ because they are what the buttons
 * link to. Each derivative is about 24 KB against a 370 KB PDF, so the section
 * costs 72 KB to show all three rather than 1.1 MB to embed them.
 *
 * The image is not a link. A certificate is a wide, dense document and a
 * thumbnail of one is unreadable at card width, so the two buttons underneath
 * are the real affordance: View opens the PDF, Download saves it.
 *
 * The phase 1 preview carried an "AWS Certified Cloud Practitioner, In
 * Progress" chip purely to demonstrate the --pending colour; it is not on the
 * CV and does not ship. The `in-progress` branch below stays because the
 * status type has two values, not because anything uses it today.
 */
function StatusChip({ status }: { status: Certification["status"] }) {
  const done = status === "completed";
  return (
    <span
      className={`mono shrink-0 rounded-md border px-2 py-0.5 text-[0.6875rem] ${
        done ? "border-ok/40 text-ok" : "border-pending/40 text-pending"
      }`}
    >
      {done ? "Completed" : "In Progress"}
    </span>
  );
}

function CertCard({ cert, index }: { cert: Certification; index: number }) {
  return (
    <Card
      as="li"
      className="reveal flex flex-col overflow-hidden"
      data-reveal
      style={{ transitionDelay: `${Math.min(index * 60, 240)}ms` }}
    >
      {cert.image ? (
        // Explicit intrinsic size, no crop: the certificate is landscape and
        // reserving its exact box is what stops the card jumping when the
        // bytes land. It sits on its own white ground by design — it is a
        // document, and a document that has been tinted to match a palette
        // stops looking like evidence.
        <Image
          src={cert.image}
          alt={`${cert.title} certificate, issued by ${cert.issuer}`}
          width={1000}
          height={773}
          className="w-full border-b border-line"
        />
      ) : null}

      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-2">
          <h3 className="text-[0.9375rem] font-semibold text-fg">
            {cert.title}
          </h3>
          <StatusChip status={cert.status} />
        </div>

        <p className="mono mt-1.5 text-[0.75rem] text-fg-faint">
          {cert.issuer} &middot; {cert.issued}
        </p>

        {cert.href ? (
          // mt-auto pins the buttons to the bottom edge, so all three cards
          // line up even though the titles wrap to different heights.
          <div className="mono mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-5 text-[0.8125rem]">
            <a
              href={cert.href}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline inline-flex items-center gap-1.5 text-accent hover:text-accent-bright"
            >
              View PDF
              <ArrowUpRight size={13} />
            </a>
            <a
              href={cert.href}
              download
              className="link-underline inline-flex items-center gap-1.5 text-fg-dim hover:text-accent"
            >
              Download
              <Download size={13} />
            </a>
          </div>
        ) : null}
      </div>
    </Card>
  );
}

export function Certifications() {
  return (
    <Section id={meta.id} title={meta.title}>
      <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((cert, i) => (
          <CertCard key={cert.slug} cert={cert} index={i} />
        ))}
      </ul>
    </Section>
  );
}
