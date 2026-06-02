import { dashboardSummary, tenantProfile } from "../../mocks/tenant";
import type { DashboardSummary, TenantProfile } from "../../types";
import { mockDelay } from "./client";

export async function getTenantProfile(): Promise<TenantProfile> {
  await mockDelay();
  return tenantProfile;
}

export async function getDashboardSummary(): Promise<DashboardSummary> {
  await mockDelay();
  return dashboardSummary;
}
