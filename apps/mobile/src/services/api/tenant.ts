import { dashboardSummary, leaseDetails, tenantProfile } from "../../mocks/tenant";
import type { Announcement, DashboardSummary, LeaseDetails, MaintenanceRequest, TenantProfile } from "../../types";
import { apiRequest, isMockMode, mockDelay } from "./client";

export async function getTenantProfile(): Promise<TenantProfile> {
  if (isMockMode()) {
    await mockDelay();
    return tenantProfile;
  }

  const response = await apiRequest<TenantProfileResponse>("/api/mobile/tenant/me");
  return mapTenantProfile(response);
}

export async function getDashboardSummary(): Promise<DashboardSummary> {
  if (isMockMode()) {
    await mockDelay();
    return dashboardSummary;
  }

  const response = await apiRequest<DashboardSummaryResponse>("/api/mobile/tenant/dashboard");
  return mapDashboardSummary(response);
}

export async function getLeaseDetails(): Promise<LeaseDetails> {
  if (isMockMode()) {
    await mockDelay();
    return leaseDetails;
  }

  const response = await apiRequest<LeaseDetailsResponse>("/api/mobile/lease");
  return mapLeaseDetails(response);
}

export async function updateEmergencyContact(input: { name: string; phone: string }) {
  if (isMockMode()) {
    await mockDelay();
    tenantProfile.emergencyContact = `${input.name} - ${input.phone}`;
    return {
      success: true,
      message: "Emergency contact updated.",
      emergencyContact: {
        name: input.name,
        phone: input.phone
      }
    };
  }

  return apiRequest<{ success?: boolean; message?: string }>("/api/mobile/profile", {
    method: "PATCH",
    body: {
      emergencyContact: input
    }
  });
}

type TenantProfileResponse = Partial<TenantProfile> & {
  tenant?: Partial<TenantProfile>;
  property?: {
    id?: string;
    name?: string;
  };
  unit?: {
    id?: string;
    number?: string;
    unitNumber?: string;
  };
  lease?: {
    id?: string;
    startDate?: string;
    endDate?: string;
    status?: string;
  };
};

type DashboardSummaryResponse = Partial<DashboardSummary> & {
  tenant?: {
    name?: string;
    fullName?: string;
  };
  property?: {
    name?: string;
  };
  unit?: {
    number?: string;
    unitNumber?: string;
  };
  currentRentBalance?: number;
  nextPaymentDueDate?: string;
  documentStatus?: string;
  documentCount?: number;
  openRequestCount?: number;
  unreadNotificationCount?: number;
  announcementCount?: number;
  unreadAnnouncementCount?: number;
  communityCount?: number;
  exchangeCount?: number;
  servicesCount?: number;
  accessStatus?: string;
  activeGatePassCount?: number;
  pendingApprovalCount?: number;
  auditTrailCount?: number;
  constructionPhase?: string;
  constructionProgress?: number;
  estimatedReadyDate?: string;
  tenantPredictability?: string;
  arrearsRisk?: string;
  aiInsightSummary?: string;
  savedAiReportCount?: number;
  residentServiceRequestCount?: number;
  openCommunityThreadCount?: number;
  serviceBacklogCount?: number;
  exceptionCount?: number;
  reportHighlights?: DashboardSummary["reportHighlights"];
  recentAnnouncement?: Partial<Announcement>;
  recentMaintenance?: Partial<MaintenanceRequest>;
};

type LeaseDetailsResponse = Partial<LeaseDetails> & {
  lease?: Partial<LeaseDetails>;
};

function mapTenantProfile(response: TenantProfileResponse): TenantProfile {
  const tenant = response.tenant ?? response;
  const lease = response.lease;
  const emergencyContact = formatEmergencyContact(response.emergencyContact ?? tenant.emergencyContact);

  return {
    id: readString(tenant.id ?? response.id, ""),
    fullName: readString(tenant.fullName ?? response.fullName, "Tenant"),
    phone: readString(tenant.phone ?? response.phone, ""),
    email: readString(tenant.email ?? response.email, ""),
    propertyId: readOptionalString(response.propertyId ?? response.property?.id),
    propertyName: readString(response.propertyName ?? response.property?.name, "Property"),
    unitId: readOptionalString(response.unitId ?? response.unit?.id),
    unitNumber: readString(response.unitNumber ?? response.unit?.unitNumber ?? response.unit?.number, "Unit"),
    leaseId: readOptionalString(response.leaseId ?? lease?.id),
    leaseStartDate: readString(response.leaseStartDate ?? lease?.startDate, ""),
    leaseEndDate: readString(response.leaseEndDate ?? lease?.endDate, ""),
    leaseStatus: mapLeaseStatus(response.leaseStatus ?? lease?.status),
    emergencyContact
  };
}

function mapDashboardSummary(response: DashboardSummaryResponse): DashboardSummary {
  return {
    tenantName: readOptionalString(response.tenantName ?? response.tenant?.fullName ?? response.tenant?.name),
    propertyName: readOptionalString(response.propertyName ?? response.property?.name),
    unitNumber: readOptionalString(response.unitNumber ?? response.unit?.unitNumber ?? response.unit?.number),
    rentBalance: readNumber(response.rentBalance ?? response.currentRentBalance, 0),
    currency: readOptionalString(response.currency),
    nextDueDate: readString(response.nextDueDate ?? response.nextPaymentDueDate, ""),
    paymentStatus: readString(response.paymentStatus, "Unknown"),
    leaseStatus: readString(response.leaseStatus, "Unknown"),
    documentStatus: readOptionalString(response.documentStatus),
    documentCount: readOptionalNumber(response.documentCount),
    openRequestCount: readOptionalNumber(response.openRequestCount),
    unreadNotificationCount: readOptionalNumber(response.unreadNotificationCount),
    announcementCount: readOptionalNumber(response.announcementCount),
    unreadAnnouncementCount: readOptionalNumber(response.unreadAnnouncementCount),
    communityCount: readOptionalNumber(response.communityCount),
    exchangeCount: readOptionalNumber(response.exchangeCount),
    servicesCount: readOptionalNumber(response.servicesCount),
    accessStatus: readOptionalString(response.accessStatus),
    activeGatePassCount: readOptionalNumber(response.activeGatePassCount),
    pendingApprovalCount: readOptionalNumber(response.pendingApprovalCount),
    auditTrailCount: readOptionalNumber(response.auditTrailCount),
    constructionPhase: readOptionalString(response.constructionPhase),
    constructionProgress: readOptionalNumber(response.constructionProgress),
    estimatedReadyDate: readOptionalString(response.estimatedReadyDate),
    tenantPredictability: readOptionalString(response.tenantPredictability),
    arrearsRisk: readOptionalString(response.arrearsRisk),
    aiInsightSummary: readOptionalString(response.aiInsightSummary),
    savedAiReportCount: readOptionalNumber(response.savedAiReportCount),
    residentServiceRequestCount: readOptionalNumber(response.residentServiceRequestCount),
    openCommunityThreadCount: readOptionalNumber(response.openCommunityThreadCount),
    serviceBacklogCount: readOptionalNumber(response.serviceBacklogCount),
    exceptionCount: readOptionalNumber(response.exceptionCount),
    reportHighlights: mapReportHighlights(response.reportHighlights),
    recentAnnouncement: mapAnnouncement(response.recentAnnouncement),
    recentMaintenance: mapMaintenance(response.recentMaintenance)
  };
}

function mapLeaseDetails(response: LeaseDetailsResponse): LeaseDetails {
  const lease = response.lease ?? response;

  return {
    id: readString(lease.id, ""),
    propertyName: readString(lease.propertyName ?? response.propertyName, "Property"),
    unitNumber: readString(lease.unitNumber ?? response.unitNumber, "Unit"),
    startDate: readString(lease.startDate, ""),
    endDate: readString(lease.endDate, ""),
    rentAmount: readOptionalNumber(lease.rentAmount ?? response.rentAmount),
    depositAmount: readOptionalNumber(lease.depositAmount ?? response.depositAmount),
    status: mapLeaseStatus(lease.status ?? response.status)
  };
}

function mapAnnouncement(value: Partial<Announcement> | undefined): Announcement {
  return {
    id: readString(value?.id, ""),
    title: readString(value?.title, "No recent announcement"),
    propertyName: readString(value?.propertyName, ""),
    date: readString(value?.date, ""),
    message: readString(value?.message, ""),
    read: Boolean(value?.read)
  };
}

function mapMaintenance(value: Partial<MaintenanceRequest> | undefined): MaintenanceRequest {
  return {
    id: readString(value?.id, ""),
    title: readString(value?.title, "No recent maintenance"),
    category: value?.category ?? "Other",
    description: readString(value?.description, ""),
    priority: value?.priority ?? "Low",
    date: readString(value?.date, ""),
    status: value?.status ?? "Submitted"
  };
}

function mapReportHighlights(value: DashboardSummaryResponse["reportHighlights"]): DashboardSummary["reportHighlights"] {
  if (!Array.isArray(value)) {
    return undefined;
  }

  const reports: NonNullable<DashboardSummary["reportHighlights"]> = [];

  value.forEach((item) => {
    const title = readOptionalString(item?.title);
    const reportValue = readOptionalString(item?.value);
    const detail = readOptionalString(item?.detail);

    if (!title || !reportValue || !detail) {
      return;
    }

    reports.push({
      title,
      value: reportValue,
      detail,
      status: readOptionalString(item?.status)
    });
  });

  return reports.length ? reports : undefined;
}

function mapLeaseStatus(value: unknown): TenantProfile["leaseStatus"] {
  if (typeof value !== "string") {
    return "Active";
  }

  const normalized = value.trim().toLowerCase();

  if (normalized === "expiring") {
    return "Expiring";
  }

  if (normalized === "ended") {
    return "Ended";
  }

  return "Active";
}

function readString(value: unknown, fallback: string) {
  return typeof value === "string" && value.trim() ? value : fallback;
}

function readOptionalString(value: unknown) {
  return typeof value === "string" && value.trim() ? value : undefined;
}

function readNumber(value: unknown, fallback: number) {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function readOptionalNumber(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

function formatEmergencyContact(value: unknown) {
  if (typeof value === "string" && value.trim()) {
    return value;
  }

  if (value && typeof value === "object" && !Array.isArray(value)) {
    const contact = value as { name?: unknown; phone?: unknown };
    const parts = [readOptionalString(contact.name), readOptionalString(contact.phone)].filter(Boolean);
    return parts.length ? parts.join(" - ") : "Not provided";
  }

  return "Not provided";
}
