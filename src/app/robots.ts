import type { MetadataRoute } from "next";
import { site } from "@/content";

/**
 * Required by `output: "export"`. Without it Next refuses to collect page
 * data for this route at build time and the whole export fails — a metadata
 * route is treated as a request handler until it is told otherwise.
 */
export const dynamic = "force-static";

/**
 * Everything is indexable — this page exists to be found by recruiters.
 * Emitted as out/robots.txt at build.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
