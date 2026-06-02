import { communityPosts } from "../../mocks/community";
import type { CommunityPost } from "../../types";
import { mockDelay } from "./client";

export async function getCommunityPosts() {
  await mockDelay();
  return communityPosts;
}

export async function submitCommunityPost(input: {
  title: string;
  type: CommunityPost["type"];
  message: string;
}): Promise<CommunityPost> {
  await mockDelay();

  return {
    id: `community-${Date.now()}`,
    title: input.title,
    type: input.type,
    date: new Date().toISOString().slice(0, 10),
    status: input.type === "Private grievance" ? "Private" : "Pending review",
    message: input.message
  };
}
