import type { AppNotification } from "../../types";
import { announcements } from "../../mocks/announcements";
import { communityPosts } from "../../mocks/community";
import { apiRequest, isMockMode, mockDelay } from "./client";

export async function getNotifications() {
  if (!isMockMode()) {
    const response = await apiRequest<{ items?: AppNotification[] }>("/api/mobile/tenant/notifications");
    return response.items ?? [];
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
