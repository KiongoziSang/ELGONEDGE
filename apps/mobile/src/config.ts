function readBoolean(value: string | undefined, fallback: boolean) {
  if (value === undefined) {
    return fallback;
  }

  return value.trim().toLowerCase() === "true";
}

const configuredApiBaseUrl = process.env.EXPO_PUBLIC_API_BASE_URL?.trim();
const legacyApiBaseUrl = process.env.EXPO_PUBLIC_ELGONOS_API_URL?.trim();
const mockMode = readBoolean(
  process.env.EXPO_PUBLIC_USE_MOCKS ?? process.env.EXPO_PUBLIC_ELGONOS_MOCK_MODE,
  true
);
const apiBaseUrl = configuredApiBaseUrl ?? legacyApiBaseUrl ?? (mockMode ? "https://elgonos.elgonedge.com" : "");

export const appConfig = {
  apiBaseUrl,
  apiBaseUrlSource: configuredApiBaseUrl ? "EXPO_PUBLIC_API_BASE_URL" : legacyApiBaseUrl ? "EXPO_PUBLIC_ELGONOS_API_URL" : "default",
  configError: !mockMode && !apiBaseUrl ? "Missing EXPO_PUBLIC_API_BASE_URL while EXPO_PUBLIC_USE_MOCKS=false." : null,
  mockMode,
  requestTimeoutMs: 12000
};
