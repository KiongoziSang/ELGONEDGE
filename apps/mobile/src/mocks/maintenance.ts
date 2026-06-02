import type { MaintenanceCategory, MaintenanceRequest, Priority } from "../types";

export const maintenanceCategories: MaintenanceCategory[] = [
  "Plumbing",
  "Electrical",
  "Security",
  "Cleaning",
  "Internet",
  "Access / Gate",
  "Other"
];

export const priorities: Priority[] = ["Low", "Medium", "High"];

export const maintenanceRequests: MaintenanceRequest[] = [
  {
    id: "mnt-001",
    title: "Kitchen sink leak",
    category: "Plumbing",
    description: "Slow leak under the kitchen sink cabinet.",
    priority: "Medium",
    date: "2026-06-01",
    status: "Assigned"
  },
  {
    id: "mnt-002",
    title: "Internet outage",
    category: "Internet",
    description: "Router has no connection since last night.",
    priority: "High",
    date: "2026-05-28",
    status: "In review"
  }
];
