import { communityPosts } from "../../mocks/community";
import type { CommunityPost } from "../../types";
import { apiRequest, isMockMode, mockDelay } from "./client";

export async function getCommunityPosts() {
  if (!isMockMode()) {
    const response = await apiRequest<{ items?: Partial<CommunityPost>[] }>("/api/mobile/tenant/community");
    return Array.isArray(response.items) ? response.items.map(mapCommunityPost) : [];
  }

  await mockDelay();
  return communityPosts;
}

export async function submitCommunityPost(input: {
  title: string;
  type: CommunityPost["type"];
  message: string;
}): Promise<CommunityPost> {
  if (!isMockMode()) {
    const response = await apiRequest<Partial<CommunityPost>>("/api/mobile/tenant/community", {
      method: "POST",
      body: input
    });
    return mapCommunityPost(response, Date.now());
  }

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

export async function markCommunityPostRead(post: Pick<CommunityPost, "id">) {
  if (isMockMode()) {
    await mockDelay();
    return { success: true };
  }

  return apiRequest<{ success: boolean }>("/api/mobile/tenant/community/read", {
    method: "POST",
    body: post
  });
}

const communityTypes: CommunityPost["type"][] = [
  "Public resident post",
  "Private grievance",
  "Official notice",
  "Pinned update"
];

const communityStatuses: CommunityPost["status"][] = ["Pending review", "Approved", "Closed", "Private"];

function mapCommunityPost(item: Partial<CommunityPost>, index: number): CommunityPost {
  const type = communityTypes.includes(item.type as CommunityPost["type"])
    ? (item.type as CommunityPost["type"])
    : "Public resident post";

  return {
    id: readString(item.id) ?? `community-${index}`,
    title: readString(item.title) ?? (type === "Private grievance" ? "Private grievance" : "Community post"),
    type,
    date: readString(item.date) ?? "",
    status: communityStatuses.includes(item.status as CommunityPost["status"])
      ? (item.status as CommunityPost["status"])
      : type === "Private grievance"
        ? "Private"
        : "Pending review",
    message: readString(item.message) ?? "Details will appear when management updates this post.",
    read: Boolean(item.read)
  };
}

function readString(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}
