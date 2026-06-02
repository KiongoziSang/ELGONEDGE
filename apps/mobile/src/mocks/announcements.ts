import type { Announcement } from "../types";

export const announcements: Announcement[] = [
  {
    id: "ann-water",
    title: "Scheduled water maintenance",
    propertyName: "Elgon Heights Apartments",
    date: "2026-06-02",
    message:
      "Water service will be interrupted on Thursday from 10:00 AM to 1:00 PM while the rooftop tank pump is serviced.",
    read: false
  },
  {
    id: "ann-security",
    title: "Visitor registration reminder",
    propertyName: "Elgon Heights Apartments",
    date: "2026-05-30",
    message:
      "Please pre-register expected visitors where possible. This helps the guard team keep entry checks fast and controlled.",
    read: true
  }
];
