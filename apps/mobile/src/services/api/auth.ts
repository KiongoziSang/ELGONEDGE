import type { AuthSession } from "../../types";
import { mockDelay } from "./client";

export async function loginTenant(identifier: string, password: string): Promise<AuthSession> {
  await mockDelay();

  if (!identifier.trim() || !password.trim()) {
    throw new Error("Enter your email or phone number and password.");
  }

  return {
    token: "mock-secure-token-grace-wanjiku",
    userId: "tenant-grace-wanjiku"
  };
}

export async function requestPasswordReset(identifier: string) {
  await mockDelay();

  if (!identifier.trim()) {
    throw new Error("Enter your email or phone number.");
  }

  return {
    message: "Password reset instructions will be sent when the backend is connected."
  };
}
