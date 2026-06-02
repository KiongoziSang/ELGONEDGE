export const appConfig = {
  apiBaseUrl: process.env.EXPO_PUBLIC_ELGONOS_API_URL ?? "https://elgonos.elgonedge.com",
  mockMode: process.env.EXPO_PUBLIC_ELGONOS_MOCK_MODE !== "false"
};
