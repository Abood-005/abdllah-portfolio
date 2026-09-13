import { About } from "@/components/About";
import { Certifications } from "@/components/Certifications";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";

/**
 * The whole page, in the order the nav lists.
 *
 * Every section owns its own component and pulls its own copy from
 * src/content/, so this file is an assembly order and nothing else — there is
 * no markup here to drift out of sync with a section.
 *
 * Every string traces to docs/resume.md.
 */
export default function Home() {
  return (
    <>
      <Nav />

      <main id="main" tabIndex={-1} className="shell pb-24">
        <Hero />

        <About />

        <Experience />

        <Projects />

        <Skills />

        <Certifications />

        <Contact />
      </main>

      <Footer />
    </>
  );
}
