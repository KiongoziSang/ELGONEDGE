import { announcements } from "../../mocks/announcements";
import { mockDelay } from "./client";

export async function getAnnouncements() {
  await mockDelay();
  return announcements;
}
