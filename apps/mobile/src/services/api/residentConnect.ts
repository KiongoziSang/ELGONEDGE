import type { ResidentConnectData } from "../../types";
import { apiRequest, isMockMode, mockDelay } from "./client";

const mockData: ResidentConnectData = {
  targetUnits: [
    { id: "unit-a-101", label: "A-101" },
    { id: "unit-b-205", label: "B-205" }
  ],
  categories: [
    { value: "PARKING", label: "Parking" },
    { value: "CHILD_SAFETY", label: "Child safety", safety: true },
    { value: "VISITOR_GATE", label: "Visitor/gate issue" },
    { value: "WATER_LEAKAGE", label: "Water/leakage", safety: true },
    { value: "NOISE_CONCERN", label: "Noise concern" },
    { value: "LOST_FOUND", label: "Lost and found" },
    { value: "SECURITY_CONCERN", label: "Security concern", safety: true },
    { value: "GENERAL", label: "General neighbor notice" }
  ],
  templates: [
    "Your car is blocking mine. Kindly move it when possible.",
    "Your car lights appear to be on.",
    "Your child appears to be outside near the gate.",
    "There seems to be water leaking near your unit.",
    "Your visitor is waiting at the gate/security desk.",
    "Please check something outside your unit.",
    "Kindly reduce the noise when possible.",
    "I found an item that may belong to your household."
  ],
  items: []
};

export async function getResidentConnect() {
  if (isMockMode()) {
    await mockDelay();
    return mockData;
  }
  return apiRequest<ResidentConnectData>("/api/mobile/tenant/connect");
}

export async function createResidentConnectNotice(input: {
  recipientUnitId: string;
  category: string;
  template?: string;
  message?: string;
}) {
  if (isMockMode()) {
    await mockDelay();
    mockData.items.unshift({
      id: `mock-connect-${Date.now()}`,
      direction: "sent",
      category: input.category,
      categoryLabel: mockData.categories.find((item) => item.value === input.category)?.label ?? "General neighbor notice",
      message: input.message || input.template || "",
      status: "SENT",
      statusLabel: "Sent",
      urgent: ["CHILD_SAFETY", "WATER_LEAKAGE", "SECURITY_CONCERN"].includes(input.category),
      senderUnitLabel: "B-204",
      recipientUnitLabel: mockData.targetUnits.find((unit) => unit.id === input.recipientUnitId)?.label ?? "Unit",
      createdAt: new Date().toISOString(),
      reported: false,
      replies: []
    });
    return { success: true, message: "Resident Connect notice sent." };
  }

  return apiRequest<{ success?: boolean; message?: string }>("/api/mobile/tenant/connect", {
    method: "POST",
    body: input
  });
}

export async function replyResidentConnectNotice(noticeId: string, message: string) {
  if (isMockMode()) {
    await mockDelay();
    return { success: true, message: "Reply sent." };
  }

  return apiRequest<{ success?: boolean; message?: string }>("/api/mobile/tenant/connect/reply", {
    method: "POST",
    body: { noticeId, message }
  });
}

export async function reportResidentConnectNotice(noticeId: string, reason: string) {
  if (isMockMode()) {
    await mockDelay();
    return { success: true, message: "Notice reported for review." };
  }

  return apiRequest<{ success?: boolean; message?: string }>("/api/mobile/tenant/connect/report", {
    method: "POST",
    body: { noticeId, reason }
  });
}
