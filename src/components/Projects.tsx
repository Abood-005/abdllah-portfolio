import Image from "next/image";
import type { Project, ProjectImage } from "@/content";
import { Github } from "@/components/ui/Icons";
import { projects, sections } from "@/content";

const meta = sections[2];

function ProjectFigure({ image }: { image: ProjectImage }) {
  return (
    <figure className="case-figure">
      <Image
        src={image.src}
        alt={image.alt}
        width={1280}
        height={720}
        sizes="(max-width: 760px) 100vw, (max-width: 1100px) 60vw, 720px"
        className="case-image"
      />
      <figcaption className="case-caption mono">{image.caption}</figcaption>
    </figure>
  );
}

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="case-links">
      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${project.title} live product (opens in a new tab)`}
        className="case-link case-link-primary"
      >
        Visit live product
      </a>
      <a
        href={project.repo}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${project.title} technical overview (opens in a new tab)`}
        className="case-link case-link-secondary"
      >
        <Github size={15} />
        Technical overview
      </a>
    </div>
  );
}

function CaseStudy({ project }: { project: Project }) {
  const titleId = `${project.slug}-title`;
  const architectureId = `${project.slug}-architecture-title`;

  return (
    <article className="case-study" aria-labelledby={titleId}>
      <header className="case-cover">
        <div className="case-meta mono">
          <span>{project.role}</span>
          <span className="case-status">
            <span aria-hidden className="case-status-dot" />
            {project.status}
          </span>
        </div>

        <div className="case-title-grid">
          <h3 id={titleId} className="case-title display">
            {project.title}
          </h3>
          <div className="case-introduction">
            <p>{project.summary}</p>
            <ProjectLinks project={project} />
          </div>
        </div>
      </header>

      <dl className="case-brief">
        {project.brief.map((item) => (
          <div key={item.label}>
            <dt className="mono">{item.label}</dt>
            <dd>{item.text}</dd>
          </div>
        ))}
      </dl>

      <div className="case-stack-row">
        <p className="mono">Core stack</p>
        <ul aria-label="Core project technologies">
          {project.stack.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <section className="case-architecture" aria-labelledby={architectureId}>
        <header className="case-architecture-header">
          <h4 id={architectureId} className="display">
            How the system fits together
          </h4>
          <p>
            A protected request path connects public and authenticated
            interfaces to server-side workflows and shared operational data.
          </p>
        </header>

        <ol className="architecture-flow">
          {project.architecture.map((step, index) => (
            <li key={step.label} className="architecture-step">
              <div className="architecture-step-top mono">
                <span>{index + 1}</span>
                <span>{step.label}</span>
              </div>
              <h5 className="display">{step.title}</h5>
              <p>{step.description}</p>
              <ul aria-label={`${step.title} technologies`}>
                {step.technologies.map((technology) => (
                  <li key={technology}>{technology}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>

        <div className="case-integrations">
          <p className="mono">Connected services</p>
          <ul>
            {project.integrations.map((integration) => (
              <li key={integration}>{integration}</li>
            ))}
          </ul>
        </div>
      </section>

      <nav className="case-index" aria-label={`${project.title} case study`}>
        <span className="mono">Explore the build</span>
        <ol>
          {project.chapters.map((chapter, index) => (
            <li key={chapter.id}>
              <a href={`#${project.slug}-${chapter.id}`}>
                <span className="mono">
                  {index + 1}
                </span>
                {chapter.label}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="case-chapters">
        {project.chapters.map((chapter, index) => (
          <section
            key={chapter.id}
            id={`${project.slug}-${chapter.id}`}
            className="case-chapter"
            aria-labelledby={`${project.slug}-${chapter.id}-title`}
          >
            <header className="case-chapter-header">
              <p className="case-chapter-label mono">
                {index + 1} / {chapter.label}
              </p>
              <h4
                id={`${project.slug}-${chapter.id}-title`}
                className="display"
              >
                {chapter.title}
              </h4>
              <p>{chapter.description}</p>
            </header>

            <div className={`case-gallery case-gallery-${chapter.id}`}>
              {chapter.images.map((image) => (
                <ProjectFigure key={image.src} image={image} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}

export function Projects() {
  return (
    <section id={meta.id} aria-labelledby={`${meta.id}-title`} className="case-section">
      <div className="case-section-heading">
        <h2 id={`${meta.id}-title`} className="case-section-title display">
          {meta.title}
        </h2>
        <p>
          One production build, examined through the product experience and the
          engineering behind it.
        </p>
      </div>

      {projects.map((project) => (
        <CaseStudy key={project.slug} project={project} />
      ))}
    </section>
  );
}
