import "server-only";

import { createHash } from "crypto";
import { cookies } from "next/headers";

const cookieName = "elgonedge_admin";

function getAdminPassword() {
  return process.env.ADMIN_DASHBOARD_PASSWORD || "";
}

function getCookieValue() {
  const password = getAdminPassword();
  const secret = process.env.ADMIN_DASHBOARD_SECRET || password;

  if (!password) {
    return "";
  }

  return createHash("sha256")
    .update(`${password}:${secret}:elgonedge-admin`)
    .digest("hex");
}

export function isAdminAuthenticated() {
  const expectedValue = getCookieValue();

  if (!expectedValue) {
    return false;
  }

  return cookies().get(cookieName)?.value === expectedValue;
}

export function setAdminSession() {
  const value = getCookieValue();

  if (!value) {
    return false;
  }

  cookies().set(cookieName, value, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/admin",
    maxAge: 60 * 60 * 8
  });

  return true;
}

export function clearAdminSession() {
  cookies().delete(cookieName);
}

export function verifyAdminPassword(password: string) {
  const expectedPassword = getAdminPassword();
  return Boolean(expectedPassword) && password === expectedPassword;
}

export function isAdminPasswordConfigured() {
  return Boolean(getAdminPassword());
}
