import type { Metadata } from "next";
import { createElement } from "react";

export const siteUrl = "https://www.elgonedge.com";
export const siteName = "Elgon Edge Consulting Limited";
export const defaultSeoDescription =
  "Elgon Edge Consulting Limited helps organizations modernize operations through data, AI, automation, governance, and digital platforms — from strategy to implementation.";

export const seoKeywords = [
  "Elgon Edge Consulting Limited",
  "Elgon Edge Consulting",
  "ElgonOS",
  "ElgonOS property management",
  "data consulting Kenya",
  "AI consulting Kenya",
  "digital transformation consulting Kenya",
  "data governance consulting Kenya",
  "business intelligence consulting Kenya",
  "automation consulting Kenya",
  "property management software Kenya",
  "SaaS development Kenya"
];

const ogImage = {
  url: "/elgon-edge-consulting-logo.png",
  width: 2048,
  height: 669,
  alt: "Elgon Edge Consulting Limited logo"
};

type PageMetadataInput = {
  title: string;
  description?: string;
  path?: string;
  keywords?: string[];
};

export function createPageMetadata({
  title,
  description = defaultSeoDescription,
  path = "/",
  keywords = []
}: PageMetadataInput): Metadata {
  const url = `${siteUrl}${path === "/" ? "" : path}`;
  const pageTitle = title === siteName ? title : `${title} | ${siteName}`;

  return {
    title,
    description,
    keywords: [...seoKeywords, ...keywords],
    alternates: {
      canonical: url
    },
    openGraph: {
      title: pageTitle,
      description,
      url,
      siteName,
      images: [ogImage],
      locale: "en_KE",
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [ogImage.url]
    }
  };
}

export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return createElement("script", {
      type: "application/ld+json",
      dangerouslySetInnerHTML: {
        __html: JSON.stringify(data).replace(/</g, "\\u003c")
      }
    });
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: siteName,
  alternateName: "Elgon Edge Consulting",
  url: siteUrl,
  logo: `${siteUrl}/elgon-edge-consulting-logo.png`,
  email: "elgonedge@gmail.com",
  description: defaultSeoDescription,
  sameAs: ["https://elgonos.elgonedge.com"],
  areaServed: {
    "@type": "Country",
    name: "Kenya"
  },
  knowsAbout: [
    "Data consulting",
    "AI consulting",
    "Digital transformation",
    "Data governance",
    "Business intelligence",
    "Intelligent automation",
    "SaaS development",
    "Property management software"
  ]
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  name: siteName,
  url: siteUrl,
  publisher: {
    "@id": `${siteUrl}/#organization`
  },
  inLanguage: "en-KE"
};

export const elgonOsSoftwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": `${siteUrl}/elgonos#software`,
  name: "ElgonOS",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: "https://elgonos.elgonedge.com",
  description:
    "ElgonOS is a digital property management platform for landlords, property managers, and real estate teams to manage properties, units, tenants, leases, occupancy, billing, and documents from one platform.",
  creator: {
    "@id": `${siteUrl}/#organization`
  },
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/OnlineOnly",
    url: "https://elgonos.elgonedge.com"
  },
  keywords: [
    "ElgonOS",
    "ElgonOS property management",
    "property management software Kenya",
    "property management platform"
  ]
};
