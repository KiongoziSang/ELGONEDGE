import { announcements } from "../../mocks/announcements";
import type { Announcement } from "../../types";
import { apiRequest, isMockMode, mockDelay } from "./client";

export async function getAnnouncements() {
  if (!isMockMode()) {
    const response = await apiRequest<{ items?: Announcement[] }>("/api/mobile/tenant/announcements");
    return response.items ?? [];
  }

  await mockDelay();
  return announcements;
}

export async function markAnnouncementRead(announcement: Pick<Announcement, "id" | "source">) {
  if (isMockMode()) {
    await mockDelay();
    return { success: true };
  }

  return apiRequest<{ success: boolean }>("/api/mobile/tenant/announcements/read", {
    method: "POST",
    body: announcement
  });
}
