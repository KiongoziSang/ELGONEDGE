import { accessInfo } from "../../mocks/access";
import type { AccessInfo } from "../../types";
import { apiRequest, isMockMode, mockDelay } from "./client";

export async function getAccessInfo() {
  if (!isMockMode()) {
    return apiRequest<AccessInfo>("/api/mobile/tenant/access");
  }

  await mockDelay();
  return accessInfo;
}
