import type { DashboardSummary, LeaseDetails, TenantProfile } from "../types";
import { announcements } from "./announcements";
import { maintenanceRequests } from "./maintenance";
import { communityPosts } from "./community";
import { documents } from "./documents";
import { exchangeListings } from "./exchange";
import { serviceProviders } from "./services";

export const tenantProfile: TenantProfile = {
  id: "tenant-grace-wanjiku",
  fullName: "Grace Wanjiku",
  phone: "+254 712 345 678",
  email: "grace.wanjiku@example.com",
  propertyId: "property-elgon-heights",
  propertyName: "Demo Apartments",
  unitId: "unit-b-204",
  unitNumber: "B-204",
  leaseId: "lease-grace-b-204",
  leaseStartDate: "2025-09-01",
  leaseEndDate: "2026-08-31",
  leaseStatus: "Active",
  emergencyContact: "Peter Mwangi - +254 722 100 200"
};

export const dashboardSummary: DashboardSummary = {
  tenantName: tenantProfile.fullName,
  propertyName: tenantProfile.propertyName,
  unitNumber: tenantProfile.unitNumber,
  rentBalance: 18500,
  currency: "KES",
  nextDueDate: "2026-06-05",
  paymentStatus: "Due",
  leaseStatus: tenantProfile.leaseStatus,
  documentStatus: "Available",
  documentCount: documents.length,
  openRequestCount: maintenanceRequests.filter((item) => !["Resolved", "Closed"].includes(item.status)).length,
  unreadNotificationCount: announcements.filter((item) => !item.read).length,
  announcementCount: announcements.length,
  unreadAnnouncementCount: announcements.filter((item) => !item.read).length,
  communityCount: communityPosts.length,
  exchangeCount: exchangeListings.length,
  servicesCount: serviceProviders.length,
  recentAnnouncement: announcements[0],
  recentMaintenance: maintenanceRequests[0]
};

export const leaseDetails: LeaseDetails = {
  id: "lease-grace-b-204",
  propertyName: tenantProfile.propertyName,
  unitNumber: tenantProfile.unitNumber,
  startDate: tenantProfile.leaseStartDate,
  endDate: tenantProfile.leaseEndDate,
  rentAmount: 18500,
  depositAmount: 18500,
  status: tenantProfile.leaseStatus
};
