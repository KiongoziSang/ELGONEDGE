import { documents } from "../../mocks/documents";
import type { TenantDocument } from "../../types";
import { apiRequest, isMockMode, mockDelay } from "./client";

export async function getDocuments() {
  if (!isMockMode()) {
    const response = await apiRequest<{ items?: TenantDocument[] }>("/api/mobile/tenant/documents");
    return response.items ?? [];
  }

  await mockDelay();
  return documents;
}
