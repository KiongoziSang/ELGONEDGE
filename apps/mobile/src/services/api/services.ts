import { serviceProviders } from "../../mocks/services";
import { mockDelay } from "./client";

export async function getServiceProviders() {
  await mockDelay();
  return serviceProviders;
}
