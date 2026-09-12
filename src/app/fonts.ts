import localFont from "next/font/local";

/**
 * Two families, three roles. All self-hosted, latin subset (U+0000–00FF),
 * woff2. 80KB total, nothing fetched at runtime.
 *
 * Deliberately NOT Inter — the reference site uses it and Abdllah asked for
 * something that is not "the basic one". Deliberately NOT a display serif
 * either: sparkwebdigital.ca leads with Fraunces, and this site has to read as
 * a different person's work.
 */

/** Display — the name, section titles, card headings. Wide, technical grotesk. */
export const display = localFont({
  src: "../fonts/ofl/Archivo-Variable.woff2",
  weight: "400 800",
  style: "normal",
  variable: "--font-display",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
  preload: true,
});

/** Body copy, nav, buttons. Neutral next to Archivo's width. */
export const sans = localFont({
  src: [
    {
      path: "../fonts/ofl/InstrumentSans-Variable.woff2",
      weight: "400 700",
      style: "normal",
    },
    {
      path: "../fonts/ofl/InstrumentSans-Italic-Variable.woff2",
      weight: "400 700",
      style: "italic",
    },
  ],
  variable: "--font-sans",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
  preload: true,
});

/** Meta — dates, tags, labels, kickers, terminal-ish accents. */
export const mono = localFont({
  src: "../fonts/ofl/DMMono-Regular.woff2",
  weight: "400",
  style: "normal",
  variable: "--font-mono",
  display: "swap",
  fallback: ["ui-monospace", "SFMono-Regular", "monospace"],
  preload: true,
});

export const fontClassNames = `${display.variable} ${sans.variable} ${mono.variable}`;
