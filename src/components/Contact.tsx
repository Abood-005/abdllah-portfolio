import { links, sections, site } from "@/content";

const meta = sections[5];
const recruiterLinks = links.filter(
  (link) => link.label === "LinkedIn" || link.label === "GitHub",
);

export function Contact() {
  return (
    <section
      id={meta.id}
      aria-labelledby={`${meta.id}-title`}
      className="contact-section"
    >
      <div className="contact-topline mono">
        <span className="contact-availability">
          <span aria-hidden />
          Recruiter contact
        </span>
        <span>{site.location}</span>
      </div>

      <div className="contact-introduction">
        <h2 id={`${meta.id}-title`} className="contact-title display">
          {meta.title}
        </h2>
        <p>
          If your team is hiring for Winter or Summer 2027 in software
          development, cloud engineering, or QA, email me or choose a time to
          talk.
        </p>
      </div>

      <div className="contact-primary-actions">
        <a href={`mailto:${site.email}`} className="contact-channel">
          <span className="mono">Send an email</span>
          <strong className="display">{site.email}</strong>
        </a>
        <a
          href={site.booking}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Book a meeting with Abdllah using Google Calendar (opens in a new tab)"
          className="contact-channel contact-channel-booking"
        >
          <span className="mono">Google Calendar</span>
          <strong className="display">Book a meeting</strong>
        </a>
      </div>

      <ul className="contact-support-actions">
        <li>
          <a
            href={site.resume}
            download
            aria-label="Download Abdllah Abbara's résumé PDF"
          >
            <span>Download résumé</span>
            <span className="mono">PDF</span>
          </a>
        </li>
        {recruiterLinks.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${link.label} profile (opens in a new tab)`}
            >
              <span>{link.label}</span>
              <span className="mono">Profile</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
