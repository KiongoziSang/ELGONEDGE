import type { Metadata } from "next";
import { createElement } from "react";
import { elgonOsUrl, services, socialLinks, solutionAccelerators } from "@/lib/site";

export const siteUrl = "https://www.elgonedge.com";
export const siteName = "Elgon Edge Consulting Limited";
export const defaultSeoTitle = `${siteName} | Data, AI and Digital Transformation Consulting`;
export const defaultSeoDescription =
  "Elgon Edge Consulting Limited helps organizations in Kenya design, build, and govern data, AI, cloud, automation, BI, semantic layers, governance frameworks, and digital platforms that turn strategy into measurable execution.";

export const seoKeywords = [
  "Elgon Edge Consulting Limited",
  "Elgon Edge Consulting",
  "ElgonOS",
  "property operations platform",
  "EDGE Framework",
  "Explore Design Govern Execute",
  "data-driven governed execution",
  "strategy to implementation",
  "data consulting Kenya",
  "data analytics consulting Kenya",
  "AI consulting Kenya",
  "cloud consulting Kenya",
  "digital transformation consulting Kenya",
  "data governance consulting Kenya",
  "data governance consulting",
  "modern data platform consulting",
  "AI strategy consulting",
  "data quality management",
  "Power BI consulting Kenya",
  "BigQuery consulting",
  "AI automation consulting Kenya",
  "enterprise AI governance Kenya",
  "enterprise technology consulting",
  "technology consulting firm Kenya",
  "responsible AI governance",
  "business intelligence consulting Kenya",
  "business intelligence consulting",
  "automation consulting Kenya",
  "digital platform development Kenya",
  "product engineering Kenya",
  "SaaS development Kenya",
  "enterprise data model accelerators",
  "enterprise data model consulting",
  "semantic layer consulting",
  "KPI definition frameworks",
  "metric layer design",
  "data governance operating model",
  "data governance framework",
  "data stewardship model",
  "data ownership framework",
  "data quality controls",
  "AI-ready data foundations",
  "analytics foundations",
  "data management consulting Kenya",
  "business intelligence foundations",
  "Customer 360 data model",
  "executive dashboard data model",
  "data training Kenya",
  "AI training Kenya",
  "Power BI training Kenya",
  "data analytics training Kenya",
  "data governance training",
  "responsible AI training",
  "business intelligence training",
  "dashboard training for teams",
  "executive AI workshops",
  "digital transformation training",
  "workflow automation training",
  "cloud data platform training",
  "technology staff augmentation Kenya",
  "IT staff augmentation Kenya",
  "data engineering talent Kenya",
  "BI developer outsourcing Kenya",
  "AI talent support Kenya",
  "cloud engineering talent",
  "software engineering staff augmentation",
  "business analyst outsourcing",
  "product management support",
  "automation specialist support",
  "data and AI delivery teams"
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
  makesOffer: [
    ...services.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.title,
        description: service.description,
        url: `${siteUrl}/services/${service.slug}`
      }
    })),
    ...solutionAccelerators.map((accelerator) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: accelerator.title,
        description: accelerator.description,
        url: `${siteUrl}${accelerator.href}`
      }
    }))
  ],
  knowsAbout: [
    "Data consulting",
    "Data analytics consulting Kenya",
    "AI consulting",
    "AI strategy consulting",
    "AI consulting Kenya",
    "Cloud consulting Kenya",
    "Digital transformation",
    "Digital transformation consulting Kenya",
    "Enterprise technology consulting",
    "Technology consulting firm Kenya",
    "Modern data platform consulting",
    "Data governance",
    "Data governance consulting",
    "Data quality management",
    "Business intelligence",
    "Business intelligence consulting",
    "Power BI consulting Kenya",
    "BigQuery consulting",
    "Responsible AI governance",
    "Enterprise AI governance Kenya",
    "EDGE Framework",
    "Explore Design Govern Execute",
    "Data-driven governed execution",
    "Intelligent automation",
    "SaaS development",
    "Product engineering",
    "Digital platform development Kenya",
    "Property operations platform",
    "Workflow automation accelerators",
    "Executive dashboard frameworks",
    "Enterprise data model accelerators",
    "Enterprise data model consulting",
    "Semantic layer consulting",
    "KPI definition frameworks",
    "Metric layer design",
    "Data governance operating model",
    "Data governance framework",
    "Data stewardship model",
    "Data ownership framework",
    "Data quality controls",
    "AI-ready data foundations",
    "Analytics foundations",
    "Data management consulting Kenya",
    "Business intelligence foundations",
    "Customer 360 data model",
    "Executive dashboard data model",
    "Training and capability building",
    "Data training Kenya",
    "AI training Kenya",
    "Power BI training Kenya",
    "Data analytics training Kenya",
    "Data governance training",
    "Responsible AI training",
    "Business intelligence training",
    "Dashboard training for teams",
    "Executive AI workshops",
    "Digital transformation training",
    "Workflow automation training",
    "Cloud data platform training",
    "Technology staff augmentation Kenya",
    "IT staff augmentation Kenya",
    "Data engineering talent Kenya",
    "BI developer outsourcing Kenya",
    "AI talent support Kenya",
    "Cloud engineering talent",
    "Software engineering staff augmentation",
    "Business analyst outsourcing",
    "Product management support",
    "Automation specialist support",
    "Data and AI delivery teams"
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
    "ElgonOS is AI-powered property management software for Kenya built by Elgon Edge for landlords, property managers, and real estate teams to run rent collection, M-PESA workflows, tenant management, leases, units, billing, receipts, documents, construction tracking, maintenance, access control, Resident Community, Resident Services Marketplace, Resident Exchange, AI-assisted reporting, tenant predictability, Ask AI, executive dashboards, operational automation, approvals, reminders, audit trails, communication, and operational insights from one operating layer.",
  creator: {
    "@id": `${siteUrl}/#organization`
  },
  featureList: [
    "M-PESA rent collection workflows",
    "Tenant, lease, unit, billing, receipt, and document management",
    "AI-assisted reporting and Ask AI portfolio and property questions",
    "Tenant predictability and operational intelligence",
    "Construction tracking for properties and units with phases, progress percentages, estimated ready dates, dashboards, reports, and tenant pipeline reservations",
    "Maintenance request, assignment, status, update, and history workflows",
    "Access control, gate pass, visitor, and guard workflows",
    "Resident Community for official notices, private grievances, approved resident posts, pinned updates, closed threads, official replies, and notifications",
    "Resident Services Marketplace with approved provider directory",
    "Direct tenant call and WhatsApp contact for approved providers",
    "Moderated Resident Exchange listings for household items",
    "Optional property display board for approved listings and notices",
    "Executive dashboards",
    "Operational insights and exception visibility",
    "Operational automation, approvals, reminders, audit trails, and controls"
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
    "AI-powered property management software Kenya",
    "AI property management software Kenya",
    "property operations platform",
    "property management software Kenya",
    "property management platform",
    "resident services marketplace",
    "resident community",
    "resident exchange",
    "rent collection software Kenya",
    "tenant management software Kenya",
    "M-PESA rent collection software",
    "construction tracking software Kenya",
    "property maintenance software Kenya",
    "Ask AI property management",
    "tenant predictability",
    "landlord software Kenya"
  ]
};
