import type { Metadata } from "next";
import ElgonOsPage from "@/app/elgonos/page";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "ElgonOS | Property Operations Platform by Elgon Edge Consulting",
  path: "/elgonos-property-management-software",
  description:
    "ElgonOS is a property operations platform for billing, payment routing, access control, tenant experience, intelligence, communication, and executive reporting.",
  absoluteTitle: true,
  keywords: ["ElgonOS", "property operations platform", "property management software Kenya"]
});

export default ElgonOsPage;
