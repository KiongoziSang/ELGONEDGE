import { appConfig } from "../../config";
import type { ApiError, JsonValue } from "../../types";

type ApiRequestOptions = Omit<RequestInit, "body" | "headers"> & {
  body?: JsonValue;
  headers?: Record<string, string>;
  token?: string;
  timeoutMs?: number;
};

let activeAuthToken: string | null = null;
let runtimeMockFallback = false;

export type AuthMode = "real-api" | "demo" | "api-unavailable-fallback";

export class ApiClientError extends Error {
  apiError: ApiError;

  constructor(apiError: ApiError) {
    super(apiError.message);
    this.apiError = apiError;
    this.name = "ApiClientError";
  }

  get code() {
    return this.apiError.code;
  }

  get status() {
    return this.apiError.status;
  }
}

export class MockModeError extends Error {
  constructor() {
    super("Mock mode is enabled. Use module mock handlers instead.");
    this.name = "MockModeError";
  }
}

export function isMockMode() {
  return appConfig.mockMode || runtimeMockFallback;
}

export function getAuthMode(): AuthMode {
  if (appConfig.mockMode) {
    return "demo";
  }

  return runtimeMockFallback ? "api-unavailable-fallback" : "real-api";
}

export function getApiBaseUrl() {
  return appConfig.apiBaseUrl;
}

export function createSessionAuthHeader(token: string | null | undefined) {
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export function setApiAuthToken(token: string | null) {
  activeAuthToken = token;
}

export function enableRuntimeMockFallback() {
  runtimeMockFallback = true;
}

export function isEndpointUnavailableError(error: unknown) {
  if (!(error instanceof ApiClientError)) {
    return true;
  }

  return (
    error.status === 404 ||
    error.status === 405 ||
    (typeof error.status === "number" && error.status >= 500) ||
    error.code === "INVALID_RESPONSE" ||
    error.code === "REQUEST_TIMEOUT" ||
    error.code === "REQUEST_ERROR"
  );
}

export function isInvalidCredentialsError(error: unknown) {
  return error instanceof ApiClientError && (error.status === 401 || error.status === 403);
}

export function toApiError(error: unknown): ApiError {
  if (error instanceof ApiClientError) {
    return error.apiError;
  }

  if (error instanceof Error) {
    return {
      code: "REQUEST_ERROR",
      message: error.message
    };
  }

  return {
    code: "REQUEST_ERROR",
    message: "Unable to complete request."
  };
}

export async function mockDelay() {
  await new Promise((resolve) => setTimeout(resolve, 180));
}

export async function apiRequest<TResponse>(path: string, options: ApiRequestOptions = {}): Promise<TResponse> {
  if (appConfig.mockMode) {
    throw new MockModeError();
  }

  const { body, headers, token = activeAuthToken ?? undefined, timeoutMs = appConfig.requestTimeoutMs, ...init } = options;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    logApiDebug("request", { path, baseUrl: appConfig.apiBaseUrl, method: init.method ?? "GET" });
    const response = await fetch(createUrl(path), {
      ...init,
      body: body === undefined ? undefined : JSON.stringify(body),
      headers: createHeaders(headers, token),
      signal: controller.signal
    });

    logApiDebug("response", { path, status: response.status });
    return await parseResponse<TResponse>(response);
  } catch (error) {
    if (isAbortError(error)) {
      throw new ApiClientError({
        code: "REQUEST_TIMEOUT",
        message: "Request timed out. Please try again."
      });
    }

    if (error instanceof ApiClientError) {
      throw error;
    }

    throw new ApiClientError(toApiError(error));
  } finally {
    clearTimeout(timeout);
  }
}

function logApiDebug(event: string, details: Record<string, string | number>) {
  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.log(`[mobile-api] ${event}`, details);
  }
}

function createUrl(path: string) {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const baseUrl = appConfig.apiBaseUrl.replace(/\/+$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return `${baseUrl}${normalizedPath}`;
}

function createHeaders(headers: Record<string, string> | undefined, token: string | undefined) {
  const nextHeaders = new Headers();
  nextHeaders.set("Accept", "application/json");
  nextHeaders.set("Content-Type", "application/json");

  if (token) {
    nextHeaders.set("Authorization", `Bearer ${token}`);
  }

  Object.entries(headers ?? {}).forEach(([key, value]) => {
    nextHeaders.set(key, value);
  });

  return nextHeaders;
}

async function parseResponse<TResponse>(response: Response): Promise<TResponse> {
  const text = await response.text();
  const contentType = response.headers.get("content-type") ?? "";
  const parsed = parseJson(text, contentType, response.status);

  if (!response.ok) {
    throw new ApiClientError(readErrorResponse(parsed, response.status));
  }

  return parsed as TResponse;
}

function parseJson(text: string, contentType: string, status: number): JsonValue | undefined {
  if (!text.trim()) {
    return undefined;
  }

  if (!contentType.toLowerCase().includes("application/json")) {
    throw new ApiClientError({
      code: "INVALID_RESPONSE",
      message:
        status === 404
          ? "Backend endpoint was not found. Check EXPO_PUBLIC_API_BASE_URL and confirm the mobile auth API is deployed."
          : "Backend returned a non-JSON response. Check EXPO_PUBLIC_API_BASE_URL and backend API routing.",
      status
    });
  }

  try {
    return JSON.parse(text) as JsonValue;
  } catch {
    throw new ApiClientError({
      code: "INVALID_JSON",
      message: "Server returned an invalid JSON response."
    });
  }
}

function readErrorResponse(parsed: JsonValue | undefined, status: number): ApiError {
  if (isJsonObject(parsed)) {
    const error = parsed.error;

    if (isJsonObject(error)) {
      return {
        code: readString(error.code, "API_ERROR"),
        message: readString(error.message, "Unable to complete request."),
        status,
        details: error.details
      };
    }

    return {
      code: readString(parsed.code, "API_ERROR"),
      message: readString(parsed.message, "Unable to complete request."),
      status,
      details: parsed.details
    };
  }

  return {
    code: "API_ERROR",
    message: "Unable to complete request.",
    status
  };
}

function isJsonObject(value: JsonValue | undefined): value is { [key: string]: JsonValue } {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readString(value: JsonValue | undefined, fallback: string) {
  return typeof value === "string" && value.trim() ? value : fallback;
}

function isAbortError(error: unknown) {
  return error instanceof Error && error.name === "AbortError";
}
