import { serviceProviders } from "../../mocks/services";
import type { ServiceProvider } from "../../types";
import { apiRequest, isMockMode, mockDelay } from "./client";

export async function getServiceProviders() {
  if (!isMockMode()) {
    const response = await apiRequest<{ items?: ServiceProvider[] }>("/api/mobile/tenant/services");
    return response.items ?? [];
  }

  await mockDelay();
  return serviceProviders;
}
