import { announcements } from "../../mocks/announcements";
import type { Announcement } from "../../types";
import { apiRequest, isMockMode, mockDelay } from "./client";

export async function getAnnouncements() {
  if (!isMockMode()) {
    const response = await apiRequest<{ items?: Partial<Announcement>[] }>("/api/mobile/tenant/announcements");
    return Array.isArray(response.items) ? response.items.map(mapAnnouncement) : [];
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

function mapAnnouncement(item: Partial<Announcement>, index: number): Announcement {
  return {
    id: readString(item.id) ?? `announcement-${index}`,
    source: item.source === "community" ? "community" : "notification",
    title: readString(item.title) ?? "Property announcement",
    propertyName: readString(item.propertyName) ?? "",
    date: readString(item.date) ?? "",
    message: readString(item.message) ?? "Details will appear when the property team updates this notice.",
    read: Boolean(item.read)
  };
}

function readString(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}
