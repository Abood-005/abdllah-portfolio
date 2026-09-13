import { site } from "@/content";

const year = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell site-footer-inner">
        <p>
          &copy; <span className="mono">{year}</span> {site.name}
        </p>
        <p className="site-footer-role">
          <span>{site.role}</span>
          <span aria-hidden>/</span>
          <span>{site.location}</span>
        </p>
        <a href="#main">Back to top</a>
      </div>
    </footer>
  );
}
