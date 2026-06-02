import { appConfig } from "../../config";

export class ApiError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
  }
}

export async function mockDelay() {
  await new Promise((resolve) => setTimeout(resolve, 180));
}

export async function apiRequest<T>(path: string, init?: RequestInit): Promise<T> {
  if (appConfig.mockMode) {
    throw new ApiError("Mock mode is enabled. Use module mock handlers instead.");
  }

  const response = await fetch(`${appConfig.apiBaseUrl}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {})
    }
  });

  if (!response.ok) {
    throw new ApiError("Unable to complete request", response.status);
  }

  return response.json() as Promise<T>;
}
