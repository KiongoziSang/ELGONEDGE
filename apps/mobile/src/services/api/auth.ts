import type { AuthLoginRequest, AuthSession } from "../../types";
import { mockDelay } from "./client";

export async function loginTenant(identifier: string, password: string): Promise<AuthSession> {
  await mockDelay();
  const request: AuthLoginRequest = { identifier, password };

  if (!request.identifier.trim() || !request.password.trim()) {
    throw new Error("Enter your email or phone number and password.");
  }

  const normalizedIdentifier = request.identifier.trim().toLowerCase();
  const allowedIdentifiers = ["grace.wanjiku@example.com", "+254712345678", "0712345678"];

  if (!allowedIdentifiers.includes(normalizedIdentifier) || request.password !== "password") {
    throw new Error("Invalid mock credentials. Use grace.wanjiku@example.com and password.");
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
