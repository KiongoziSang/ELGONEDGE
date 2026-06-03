import type { ReactNode } from "react";
import * as SecureStore from "expo-secure-store";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { loginTenant, logoutTenant, requestPasswordReset, restoreTenantSession } from "../services/api/auth";
import { setApiAuthToken } from "../services/api/client";
import type { AuthSession } from "../types";

const sessionKey = "elgonos-mobile-session";

type AuthContextValue = {
  session: AuthSession | null;
  loading: boolean;
  restoring: boolean;
  error: string | null;
  login: (identifier: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (identifier: string) => Promise<string>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [loading, setLoading] = useState(false);
  const [restoring, setRestoring] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function restoreSession() {
      try {
        const stored = await readStoredSession();
        if (mounted && stored) {
          const parsedSession = JSON.parse(stored) as AuthSession;
          const restoredSession = await restoreTenantSession(parsedSession);

          if (!mounted) {
            return;
          }

          if (restoredSession) {
            await writeStoredSession(restoredSession);
            setSession(restoredSession);
          } else {
            await clearStoredSession();
            setSession(null);
          }
        }
      } catch {
        if (mounted) {
          await clearStoredSession();
          setSession(null);
        }
      } finally {
        if (mounted) {
          setRestoring(false);
        }
      }
    }

    void restoreSession();

    return () => {
      mounted = false;
    };
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      loading,
      restoring,
      error,
      async login(identifier, password) {
        setLoading(true);
        setError(null);
        try {
          const nextSession = await loginTenant(identifier, password);
          await writeStoredSession(nextSession);
          setSession(nextSession);
        } catch (err) {
          const message = err instanceof Error ? err.message : "Unable to log in.";
          setError(message);
          throw err;
        } finally {
          setLoading(false);
        }
      },
      async logout() {
        await logoutTenant(session);
        await clearStoredSession();
        setSession(null);
        setError(null);
      },
      async resetPassword(identifier) {
        setLoading(true);
        setError(null);
        try {
          const response = await requestPasswordReset(identifier);
          return response.message;
        } catch (err) {
          const message = err instanceof Error ? err.message : "Unable to request password reset.";
          setError(message);
          throw err;
        } finally {
          setLoading(false);
        }
      }
    }),
    [error, loading, restoring, session]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}

async function readStoredSession() {
  const available = await SecureStore.isAvailableAsync();
  return available ? SecureStore.getItemAsync(sessionKey) : null;
}

async function writeStoredSession(session: AuthSession) {
  const available = await SecureStore.isAvailableAsync();
  if (available) {
    await SecureStore.setItemAsync(sessionKey, JSON.stringify(session));
  }
  setApiAuthToken(session.token);
}

async function clearStoredSession() {
  const available = await SecureStore.isAvailableAsync();
  if (available) {
    await SecureStore.deleteItemAsync(sessionKey);
  }
  setApiAuthToken(null);
}
