import type { DashboardSummary, TenantProfile } from "../types";
import { announcements } from "./announcements";
import { maintenanceRequests } from "./maintenance";

export const tenantProfile: TenantProfile = {
  id: "tenant-grace-wanjiku",
  fullName: "Grace Wanjiku",
  phone: "+254 712 345 678",
  email: "grace.wanjiku@example.com",
  propertyName: "Elgon Heights Apartments",
  unitNumber: "B-204",
  leaseStartDate: "2025-09-01",
  leaseEndDate: "2026-08-31",
  leaseStatus: "Active",
  emergencyContact: "Peter Mwangi - +254 722 100 200"
};

export const dashboardSummary: DashboardSummary = {
  rentBalance: 18500,
  nextDueDate: "2026-06-05",
  paymentStatus: "Due",
  leaseStatus: tenantProfile.leaseStatus,
  recentAnnouncement: announcements[0],
  recentMaintenance: maintenanceRequests[0]
};
