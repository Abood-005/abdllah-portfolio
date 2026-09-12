import type { MetadataRoute } from "next";
import { site } from "@/content";

// See the note in robots.ts: `output: "export"` needs this on every
// metadata route, otherwise the build stops at "Collecting page data".
export const dynamic = "force-static";

/**
 * One page, so one entry. Kept as a route rather than a hand-written XML file
 * in public/ so the domain comes from `site.url` and cannot drift.
 *
 * `output: "export"` requires this to be fully static — no request-time data,
 * no dynamic params. It is emitted as out/sitemap.xml at build.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
