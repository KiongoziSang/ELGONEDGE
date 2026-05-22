import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

const publicRoutes = ["", "/services", "/about", "/elgonos", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8
  }));
}
