import type { Metadata } from "next";
import ElgonOsPage from "@/app/elgonos/page";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "ElgonOS AI-Powered Property Management Software Kenya | M-PESA, Tenants, Construction and Maintenance",
  path: "/elgonos-property-management-software",
  canonicalPath: "/elgonos",
  description:
    "ElgonOS is AI-powered property management software for Kenya by Elgon Edge, with rent collection, M-PESA workflows, tenants, leases, units, billing, receipts, documents, Ask AI, construction tracking, maintenance, access control, resident services, and dashboards.",
  absoluteTitle: true,
  keywords: [
    "ElgonOS",
    "AI-powered property management software Kenya",
    "property management software Kenya",
    "M-PESA rent collection software",
    "rent collection software Kenya",
    "tenant management software Kenya",
    "construction tracking software Kenya",
    "property maintenance software Kenya",
    "landlord software Kenya"
  ]
});

export default ElgonOsPage;
