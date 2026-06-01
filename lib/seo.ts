import type { Metadata } from "next";
import { createElement } from "react";
import { elgonOsUrl, socialLinks } from "@/lib/site";

export const siteUrl = "https://www.elgonedge.com";
export const siteName = "Elgon Edge Consulting Limited";
export const defaultSeoTitle = `${siteName} | Data, AI and Digital Transformation Consulting`;
export const defaultSeoDescription =
  "Elgon Edge Consulting Limited helps organizations move from strategy to implementation through the EDGE Framework, data, AI, automation, governance, business intelligence, and digital platforms.";

export const seoKeywords = [
  "Elgon Edge Consulting Limited",
  "Elgon Edge Consulting",
  "ElgonOS",
  "ElgonOS property management",
  "property operations platform",
  "resident services marketplace",
  "resident community",
  "resident exchange",
  "EDGE Framework",
  "Explore Design Govern Execute",
  "data-driven governed execution",
  "strategy to implementation",
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
  canonicalPath?: string;
  keywords?: string[];
  absoluteTitle?: boolean;
  image?: {
    url: string;
    width: number;
    height: number;
    alt: string;
  };
};

export function createPageMetadata({
  title,
  description = defaultSeoDescription,
  path = "/",
  canonicalPath,
  keywords = [],
  absoluteTitle = false,
  image = ogImage
}: PageMetadataInput): Metadata {
  const url = `${siteUrl}${path === "/" ? "" : path}`;
  const canonicalUrl = `${siteUrl}${(canonicalPath ?? path) === "/" ? "" : canonicalPath ?? path}`;
  const pageTitle = absoluteTitle || title === siteName ? title : `${title} | ${siteName}`;

  return {
    title: {
      absolute: pageTitle
    },
    description,
    keywords: [...seoKeywords, ...keywords],
    alternates: {
      canonical: canonicalUrl
    },
    openGraph: {
      title: pageTitle,
      description,
      url,
      siteName,
      images: [image],
      locale: "en_KE",
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [image.url]
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
  sameAs: [elgonOsUrl, ...socialLinks.map((link) => link.href)],
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
    "EDGE Framework",
    "Explore Design Govern Execute",
    "Data-driven governed execution",
    "Intelligent automation",
    "SaaS development",
    "Property management software",
    "Property operations platform",
    "Resident services marketplace",
    "Resident community",
    "Resident exchange"
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
    "ElgonOS is property management software for Kenya built for landlords, property managers, and real estate teams to run billing, M-PESA payment routing, rent collection workflows, access control, Resident Community, resident services, resident exchange, tenant experience, intelligence, communication, and executive reporting from one operating layer.",
  creator: {
    "@id": `${siteUrl}/#organization`
  },
  featureList: [
    "M-PESA rent collection workflows",
    "Tenant and lease management",
    "Billing and receipt workflows",
    "Access control workflows",
    "Resident Community for official notices, private grievances, approved resident posts, pinned updates, closed threads, official replies, and notifications",
    "Resident Services Marketplace with approved provider directory",
    "Direct tenant call and WhatsApp contact for approved providers",
    "Moderated Resident Exchange listings for household items",
    "Optional property display board for approved listings and notices",
    "Executive dashboards",
    "Ask AI reporting",
    "Audit trail and operational controls"
  ],
  areaServed: {
    "@type": "Country",
    name: "Kenya"
  },
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/OnlineOnly",
    url: "https://elgonos.elgonedge.com"
  },
  keywords: [
    "ElgonOS",
    "ElgonOS property management",
    "property operations platform",
    "property management software Kenya",
    "property management platform",
    "resident services marketplace",
    "resident community",
    "resident exchange",
    "rent collection software Kenya",
    "tenant management software Kenya",
    "M-PESA rent collection software",
    "landlord software Kenya"
  ]
};
