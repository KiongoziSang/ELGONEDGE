import type { MetadataRoute } from "next";
import { insights } from "@/lib/insights";
import { siteUrl } from "@/lib/seo";
import { services } from "@/lib/site";

const publicRoutes = [
  "",
  "/services",
  ...services.map((service) => `/services/${service.slug}`),
  "/about",
  "/elgonos",
  "/elgonos-property-management-software",
  "/contact",
  ...insights.map((insight) => `/insights/${insight.slug}`)
];

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8
  }));
}
