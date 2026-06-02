import { documents } from "../../mocks/documents";
import { mockDelay } from "./client";

export async function getDocuments() {
  await mockDelay();
  return documents;
}
