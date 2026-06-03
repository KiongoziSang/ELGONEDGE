function readBoolean(value: string | undefined, fallback: boolean) {
  if (value === undefined) {
    return fallback;
  }

  return value.trim().toLowerCase() === "true";
}

export const appConfig = {
  apiBaseUrl:
    process.env.EXPO_PUBLIC_API_BASE_URL ??
    process.env.EXPO_PUBLIC_ELGONOS_API_URL ??
    "https://elgonos.elgonedge.com",
  mockMode: readBoolean(
    process.env.EXPO_PUBLIC_USE_MOCKS ?? process.env.EXPO_PUBLIC_ELGONOS_MOCK_MODE,
    true
  ),
  requestTimeoutMs: 12000
};
