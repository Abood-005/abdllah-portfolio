import Image from "next/image";
import type { Certification } from "@/content";
import { certifications, sections } from "@/content";

const meta = sections[4];

function CertificateEntry({
  certificate,
}: {
  certificate: Certification;
}) {
  return (
    <li className="proof-entry">
      <div className="proof-preview">
        {certificate.image ? (
          <Image
            src={certificate.image}
            alt={`${certificate.title} certificate, issued by ${certificate.issuer}`}
            width={1000}
            height={773}
            sizes="(max-width: 700px) 88px, 128px"
          />
        ) : null}
      </div>

      <div className="proof-details">
        <div className="proof-status-line mono">
          <span>{certificate.status === "completed" ? "Completed" : "In progress"}</span>
          <span>{certificate.issued}</span>
        </div>
        <h3 className="display">{certificate.title}</h3>
        <p>{certificate.issuer}</p>
      </div>

      {certificate.href ? (
        <div className="proof-actions">
          <a
            href={certificate.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${certificate.title} certificate PDF (opens in a new tab)`}
          >
            View PDF
          </a>
          <a
            href={certificate.href}
            download
            aria-label={`Download ${certificate.title} certificate PDF`}
          >
            Download
          </a>
        </div>
      ) : null}
    </li>
  );
}

export function Certifications() {
  return (
    <section
      id={meta.id}
      aria-labelledby={`${meta.id}-title`}
      className="phase-four-section proof-section"
    >
      <div className="phase-four-heading">
        <h2 id={`${meta.id}-title`} className="phase-four-title display">
          {meta.title}
        </h2>
        <p>
          Completed MongoDB learning, with the original certificate available
          to inspect or download.
        </p>
      </div>

      <ul className="proof-ledger">
        {certifications.map((certificate) => (
          <CertificateEntry key={certificate.slug} certificate={certificate} />
        ))}
      </ul>
    </section>
  );
}
