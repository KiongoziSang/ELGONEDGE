import type { TenantDocument } from "../types";

export const documents: TenantDocument[] = [
  {
    id: "lease-agreement",
    title: "Lease agreement - Unit B-204",
    type: "Lease agreement",
    date: "2025-09-01",
    status: "Available"
  },
  {
    id: "invoice-jun-doc",
    title: "June 2026 rent invoice",
    type: "Rent invoice",
    date: "2026-06-01",
    status: "Available",
    amount: 18500
  },
  {
    id: "receipt-may-doc",
    title: "May 2026 payment receipt",
    type: "Payment receipt",
    date: "2026-05-04",
    status: "Available",
    amount: 18500
  },
  {
    id: "notice-water",
    title: "Water maintenance notice",
    type: "Notice",
    date: "2026-06-01",
    status: "Available"
  },
  {
    id: "access-card",
    title: "Access card acknowledgement",
    type: "Access card",
    date: "2026-01-15",
    status: "Pending"
  }
];
