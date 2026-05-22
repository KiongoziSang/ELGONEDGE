import type { Metadata } from "next";
import ElgonOsPage from "@/app/elgonos/page";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "ElgonOS | Property Management Software by Elgon Edge Consulting",
  path: "/elgonos-property-management-software",
  description:
    "ElgonOS is a digital property management platform for landlords, property managers, and real estate teams to manage properties, units, tenants, leases, billing, occupancy, and documents.",
  absoluteTitle: true,
  keywords: ["ElgonOS", "ElgonOS property management", "property management software Kenya"]
});

export default ElgonOsPage;
