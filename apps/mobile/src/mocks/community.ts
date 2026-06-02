import type { CommunityPost } from "../types";

export const communityPosts: CommunityPost[] = [
  {
    id: "community-official",
    title: "Noise policy reminder",
    type: "Official notice",
    date: "2026-06-01",
    status: "Approved",
    message: "Quiet hours remain 10:00 PM to 6:00 AM. Please report repeated issues privately through grievances."
  },
  {
    id: "community-pinned",
    title: "June service provider list updated",
    type: "Pinned update",
    date: "2026-05-31",
    status: "Approved",
    message: "The approved cleaners and drinking water suppliers list has been refreshed for June."
  },
  {
    id: "community-private",
    title: "Parking bay concern",
    type: "Private grievance",
    date: "2026-05-29",
    status: "Private",
    message: "Private grievance submitted to management for follow-up."
  }
];
