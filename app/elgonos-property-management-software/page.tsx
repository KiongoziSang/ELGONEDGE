import type { Metadata } from "next";
import ElgonOsPage from "@/app/elgonos/page";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "ElgonOS Property Management Software Kenya | M-PESA Rent Collection and Tenant Management",
  path: "/elgonos-property-management-software",
  canonicalPath: "/elgonos",
  description:
    "ElgonOS is property management software for Kenya with rent collection workflows, M-PESA payment routing, tenant management, resident services, leases, access control, receipts, communication, and dashboards.",
  absoluteTitle: true,
  keywords: [
    "ElgonOS",
    "property management software Kenya",
    "M-PESA rent collection software",
    "rent collection software Kenya",
    "tenant management software Kenya",
    "landlord software Kenya"
  ]
});

export default ElgonOsPage;
