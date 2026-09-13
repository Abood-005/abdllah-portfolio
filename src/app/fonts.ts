import localFont from "next/font/local";

/**
 * Two self-hosted families. Anybody carries the identity; Instrument Sans
 * stays quiet wherever recruiters need to read quickly. Both files use a
 * latin subset (U+0000–00FF), with nothing fetched at runtime.
 */

/** Display — expressive variable width without turning the page into a poster. */
export const display = localFont({
  src: "../fonts/ofl/Anybody-Variable.woff2",
  weight: "100 900",
  style: "normal",
  variable: "--font-display",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
  preload: true,
});

/** Body copy, metadata, navigation, and controls. */
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

export const fontClassNames = `${display.variable} ${sans.variable}`;
