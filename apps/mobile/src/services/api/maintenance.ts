import { maintenanceRequests } from "../../mocks/maintenance";
import type { MaintenanceCategory, MaintenanceRequest, Priority } from "../../types";
import { apiRequest, isMockMode, mockDelay } from "./client";

export async function getMaintenanceRequests() {
  if (!isMockMode()) {
    const response = await apiRequest<{ items?: MaintenanceRequest[] }>("/api/mobile/tenant/maintenance");
    return response.items ?? [];
  }

  await mockDelay();
  return maintenanceRequests;
}

export async function createMaintenanceRequest(input: {
  category: MaintenanceCategory;
  description: string;
  priority: Priority;
}): Promise<MaintenanceRequest> {
  if (!isMockMode()) {
    return apiRequest<MaintenanceRequest>("/api/mobile/tenant/maintenance", {
      method: "POST",
      body: input
    });
  }

  await mockDelay();

  return {
    id: `mnt-${Date.now()}`,
    title: `${input.category} request`,
    category: input.category,
    description: input.description,
    priority: input.priority,
    date: new Date().toISOString().slice(0, 10),
    status: "Submitted"
  };
}
