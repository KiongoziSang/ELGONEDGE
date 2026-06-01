import type { Metric, QuickAction, WorkItem } from "./types";

export const tenantMetrics: Metric[] = [
  { label: "Rent balance", value: "KES 18,500", detail: "Due Jun 5" },
  { label: "Open requests", value: "2", detail: "1 maintenance, 1 access" },
  { label: "Receipts", value: "14", detail: "Synced to documents" }
];

export const tenantActions: QuickAction[] = [
  { id: "pay", title: "Pay rent", detail: "M-PESA workflow and receipt tracking", tone: "blue" },
  { id: "maintenance", title: "Maintenance", detail: "Create request with photos and updates", tone: "teal" },
  { id: "gate", title: "Gate pass", detail: "Pre-register visitors for guard review", tone: "amber" },
  { id: "services", title: "Resident services", detail: "Approved providers and direct contact", tone: "blue" }
];

export const tenantFeed: WorkItem[] = [
  { id: "notice", title: "Water interruption notice", meta: "Resident Community", status: "Official" },
  { id: "lease", title: "Lease renewal document ready", meta: "Documents", status: "Review" },
  { id: "exchange", title: "Dining set listed in Resident Exchange", meta: "Moderated listing", status: "New" }
];

export const guardQueue: WorkItem[] = [
  { id: "v1", title: "Brian Otieno", meta: "Expected at 2:30 PM - Unit B12", status: "Pre-approved" },
  { id: "v2", title: "Zuri Cleaners", meta: "Service provider - Block C", status: "Verify ID" },
  { id: "v3", title: "Delivery rider", meta: "One-time gate pass", status: "Log entry" }
];

export const guardMetrics: Metric[] = [
  { label: "Expected visitors", value: "18", detail: "Today" },
  { label: "Open exceptions", value: "3", detail: "Need manager review" },
  { label: "Pass checks", value: "46", detail: "Logged today" }
];

export const managerApprovals: WorkItem[] = [
  { id: "a1", title: "Approve community post", meta: "Resident Community", status: "Pending" },
  { id: "a2", title: "Review plumber provider", meta: "Services Marketplace", status: "Pending" },
  { id: "a3", title: "Reserve tenant pipeline slot", meta: "Construction - Unit D04", status: "Ready date check" },
  { id: "a4", title: "Escalated gate exception", meta: "Access control", status: "Urgent" }
];

export const managerMetrics: Metric[] = [
  { label: "Collection visibility", value: "92%", detail: "Rent workflow coverage" },
  { label: "Construction progress", value: "67%", detail: "Phase 3 average" },
  { label: "AI insights", value: "8", detail: "Ask AI prompts prepared" }
];
