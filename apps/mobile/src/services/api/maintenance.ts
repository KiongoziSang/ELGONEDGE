import { maintenanceRequests } from "../../mocks/maintenance";
import type { MaintenanceCategory, MaintenanceRequest, Priority } from "../../types";
import { mockDelay } from "./client";

export async function getMaintenanceRequests() {
  await mockDelay();
  return maintenanceRequests;
}

export async function createMaintenanceRequest(input: {
  category: MaintenanceCategory;
  description: string;
  priority: Priority;
}): Promise<MaintenanceRequest> {
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
