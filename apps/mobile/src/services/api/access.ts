import { accessInfo } from "../../mocks/access";
import { mockDelay } from "./client";

export async function getAccessInfo() {
  await mockDelay();
  return accessInfo;
}
