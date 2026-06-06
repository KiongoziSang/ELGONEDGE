import type { AuthLoginRequest, AuthLoginResponse, AuthSession, TenantProfile } from "../../types";
import {
  apiRequest,
  enableRuntimeMockFallback,
  getApiBaseUrl,
  getAuthMode,
  isEndpointUnavailableError,
  isInvalidCredentialsError,
  isMockMode,
  mockDelay,
  setApiAuthToken
} from "./client";

type LoginAuthMode = "real-api" | "demo" | "api-unavailable-fallback";

const demoIdentifiers = ["grace.wanjiku@example.com", "+254712345678", "0712345678"];
const demoPassword = "password";
const unavailableLoginMessage = "Tenant login service is not available yet. Please use demo access or contact support.";
const invalidRealCredentialsMessage = "Invalid email or password. Please check your credentials and try again.";
const invalidDemoCredentialsMessage = "Invalid demo credentials. Use grace.wanjiku@example.com / password for demo access.";

export async function loginTenant(identifier: string, password: string): Promise<AuthSession> {
  const request: AuthLoginRequest = { identifier, password };

  if (!request.identifier.trim() || !request.password.trim()) {
    throw new Error("Enter your email or phone number and password.");
  }

  const authMode = getAuthMode();

  if (authMode === "real-api") {
    try {
      logAuthDebug("login-attempt", {
        mode: authMode,
        baseUrl: getApiBaseUrl(),
        endpoint: "/api/mobile/auth/login"
      });
      const response = await apiRequest<AuthLoginResponse>("/api/mobile/auth/login", {
        method: "POST",
        body: request
      });
      const session = mapLoginResponse(response);
      setApiAuthToken(session.token);
      return session;
    } catch (error) {
      logAuthDebug("login-error", {
        mode: authMode,
        fallbackTriggered: isEndpointUnavailableError(error) ? "true" : "false"
      });

      if (!isEndpointUnavailableError(error)) {
        throw new Error(mapLoginError(error, authMode));
      }

      enableRuntimeMockFallback();

      if (isDemoCredentials(request)) {
        logAuthDebug("login-fallback", { mode: "api-unavailable-fallback" });
        return loginMockTenant(request, "api-unavailable-fallback");
      }

      throw new Error(mapLoginError(error, "api-unavailable-fallback"));
    }
  }

  return loginMockTenant(request, authMode);
}

export async function restoreTenantSession(storedSession: AuthSession): Promise<AuthSession | null> {
  if (storedSession.token.startsWith("mock-secure-token-")) {
    enableRuntimeMockFallback();
  }

  if (isMockMode()) {
    setApiAuthToken(storedSession.token);
    return storedSession;
  }

  if (!storedSession.token) {
    return null;
  }

  setApiAuthToken(storedSession.token);

  try {
    const refreshed = await refreshTenantSession(storedSession);
    if (refreshed) {
      setApiAuthToken(refreshed.token);
      return refreshed;
    }
  } catch {
    // Fall through to token validation. Some backends may not expose refresh during Phase 1B.
  }

  try {
    const profile = await apiRequest<Partial<TenantProfile>>("/api/mobile/auth/session", {
      method: "GET",
      token: storedSession.token
    });
    return mergeSessionProfile(storedSession, profile);
  } catch {
    try {
      const profile = await apiRequest<Partial<TenantProfile>>("/api/mobile/tenant/me", {
        method: "GET",
        token: storedSession.token
      });
      return mergeSessionProfile(storedSession, profile);
    } catch {
      setApiAuthToken(null);
      return null;
    }
  }
}

export async function logoutTenant(session: AuthSession | null): Promise<void> {
  if (!isMockMode() && session?.token) {
    try {
      await apiRequest<{ success?: boolean }>("/api/mobile/auth/logout", {
        method: "POST",
        body: session.refreshToken ? { refreshToken: session.refreshToken } : undefined,
        token: session.token
      });
    } catch {
      // SecureStore is cleared by AuthContext regardless of backend availability.
    }
  }

  setApiAuthToken(null);
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

function mapLoginError(error: unknown, authMode: LoginAuthMode) {
  if (authMode === "demo") {
    return invalidDemoCredentialsMessage;
  }

  if (authMode === "api-unavailable-fallback" || isEndpointUnavailableError(error)) {
    return unavailableLoginMessage;
  }

  if (isInvalidCredentialsError(error)) {
    return invalidRealCredentialsMessage;
  }

  return "Unable to log in. Please try again or contact support.";
}

async function loginMockTenant(request: AuthLoginRequest, authMode: LoginAuthMode): Promise<AuthSession> {
  await mockDelay();

  if (!isDemoCredentials(request)) {
    throw new Error(mapLoginError(new Error("Invalid demo credentials"), authMode));
  }

  const session = {
    token: "mock-secure-token-grace-wanjiku",
    userId: "tenant-grace-wanjiku",
    tenant: {
      id: "tenant-grace-wanjiku",
      fullName: "Grace Wanjiku",
      phone: "+254712345678",
      email: "grace.wanjiku@example.com"
    }
  };

  setApiAuthToken(session.token);
  return session;
}

function isDemoCredentials(request: AuthLoginRequest) {
  return demoIdentifiers.includes(request.identifier.trim().toLowerCase()) && request.password === demoPassword;
}

function logAuthDebug(event: string, details: Record<string, string>) {
  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.log(`[mobile-auth] ${event}`, details);
  }
}

async function refreshTenantSession(session: AuthSession): Promise<AuthSession | null> {
  if (!session.refreshToken) {
    return null;
  }

  const response = await apiRequest<Omit<AuthLoginResponse, "tenant"> & { tenant?: AuthLoginResponse["tenant"] }>(
    "/api/mobile/auth/refresh",
    {
      method: "POST",
      body: { refreshToken: session.refreshToken },
      token: session.token
    }
  );

  return {
    ...session,
    token: response.accessToken,
    refreshToken: response.refreshToken ?? session.refreshToken,
    expiresAt: response.expiresAt ?? calculateExpiresAt(response.expiresIn),
    tenant: response.tenant ?? session.tenant
  };
}

function mapLoginResponse(response: AuthLoginResponse): AuthSession {
  return {
    token: response.accessToken,
    refreshToken: response.refreshToken,
    expiresAt: response.expiresAt ?? calculateExpiresAt(response.expiresIn),
    userId: response.tenant.id,
    tenant: response.tenant
  };
}

function mergeSessionProfile(session: AuthSession, profile: Partial<TenantProfile>): AuthSession {
  return {
    ...session,
    userId: profile.id ?? session.userId,
    tenant: {
      id: profile.id ?? session.tenant?.id ?? session.userId,
      fullName: profile.fullName ?? session.tenant?.fullName ?? "Tenant",
      phone: profile.phone ?? session.tenant?.phone,
      email: profile.email ?? session.tenant?.email
    }
  };
}

function calculateExpiresAt(expiresIn: number | undefined) {
  return typeof expiresIn === "number" && Number.isFinite(expiresIn)
    ? new Date(Date.now() + expiresIn * 1000).toISOString()
    : undefined;
}
