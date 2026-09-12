import type { Metadata, Viewport } from "next";
import { fontClassNames } from "./fonts";
import { Reveal } from "@/components/Reveal";
import { education, links, site } from "@/content";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.role}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  authors: [{ name: site.name }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: site.url,
    siteName: site.name,
    title: `${site.name} | ${site.role}`,
    description: site.description,
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: `${site.name} | ${site.role}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.role}`,
    description: site.description,
    images: ["/opengraph-image.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a0a09",
  colorScheme: "dark",
};

/**
 * schema.org Person. This is what makes a search for his name resolve to him
 * rather than to a LinkedIn stub — `sameAs` is the bit that ties the profiles
 * together, so it is built from the same `links` array the page renders.
 *
 * Nothing here is a claim the CV does not already make.
 */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  description: site.description,
  email: `mailto:${site.email}`,
  url: site.url,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Mississauga",
    addressRegion: "ON",
    addressCountry: "CA",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: education.school,
  },
  knowsLanguage: ["en", "ar"],
  sameAs: links.filter((l) => l.external).map((l) => l.href),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning is scoped to <html> and is load-bearing: the
    // blocking script below stamps data-reveal-ready on this element before
    // React hydrates, so the server markup and the client tree legitimately
    // disagree about one attribute. Without this React logs a hydration
    // mismatch error on every page load. It suppresses warnings for this
    // element's own attributes only — children are unaffected.
    <html lang="en" className={fontClassNames} suppressHydrationWarning>
      <head>
        {/*
          Stamps the attribute that arms the scroll-reveal hidden state, before
          first paint.

          It has to be blocking and it has to be here. Set from an effect
          instead, the headings paint at full opacity and then flash back to
          hidden a frame later. Left unset entirely — JS off, or a script error
          — `.reveal` never hides at all and the page reads normally. That is
          the point of the attribute: the failure mode is "no animation",
          never "blank page".
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.setAttribute("data-reveal-ready","")`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="bg-bg text-fg">
        <a
          href="#main"
          className="kicker sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:border focus:border-accent-deep focus:bg-surface focus:px-4 focus:py-3 focus:text-fg"
        >
          Skip to content
        </a>
        {/* Each page owns its own <main>, so <header> and <footer> stay
            outside it rather than nested inside the main landmark. */}
        {children}
        <Reveal />
      </body>
    </html>
  );
}
