import { announcements } from "../../mocks/announcements";
import { communityPosts } from "../../mocks/community";
import type { AppNotification } from "../../types";
import { apiRequest, isMockMode, mockDelay } from "./client";

export async function getNotifications() {
  if (!isMockMode()) {
    const response = await apiRequest<{ items?: Partial<AppNotification>[] }>("/api/mobile/tenant/notifications");
    return Array.isArray(response.items) ? response.items.map(mapNotification) : [];
  }

  await mockDelay();
  return [
    ...announcements.map((item) => ({
      id: item.id,
      source: "notification" as const,
      type: "announcement",
      title: item.title,
      message: item.message,
      date: item.date,
      read: item.read
    })),
    ...communityPosts.map((item) => ({
      id: item.id,
      source: "community" as const,
      type: item.type,
      title: item.title,
      message: item.message,
      date: item.date,
      read: Boolean(item.read)
    }))
  ];
}

export async function markNotificationRead(notification: Pick<AppNotification, "id" | "source" | "type">) {
  if (isMockMode()) {
    await mockDelay();
    return { success: true };
  }

  return apiRequest<{ success: boolean }>("/api/mobile/tenant/notifications", {
    method: "POST",
    body: notification
  });
}

function mapNotification(item: Partial<AppNotification>, index: number): AppNotification {
  return {
    id: readString(item.id) ?? `notification-${index}`,
    source: item.source === "community" ? "community" : "notification",
    type: readString(item.type) ?? "update",
    title: readString(item.title) ?? "Tenant update",
    message: readString(item.message) ?? "Details will appear when this update is available.",
    date: readString(item.date) ?? "",
    read: Boolean(item.read)
  };
}

function readString(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}
