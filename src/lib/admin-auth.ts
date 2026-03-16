import { cookies } from "next/headers";
import { getAdminPassword, getAdminPasswordHash } from "@/lib/env";
import { verifyPasswordHash } from "@/lib/password-hash";
import { createSignedToken, verifySignedToken } from "@/lib/session-token";

const SESSION_COOKIE = "vivanelhome_admin_session";

export async function validateAdminPassword(password: string) {
  const configuredHash = getAdminPasswordHash();
  const plainPassword = getAdminPassword();

  if (configuredHash) {
    if (verifyPasswordHash(password, configuredHash)) {
      return true;
    }
  }

  return password === plainPassword;
}

export async function createAdminSession() {
  const cookieStore = await cookies();
  const expiresAt = Date.now() + 1000 * 60 * 60 * 24 * 7;
  const token = await createSignedToken({ expiresAt });

  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(expiresAt),
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (!token) {
    return false;
  }

  const session = await verifySignedToken<{ expiresAt: number }>(token);

  if (!session) {
    return false;
  }

  return session.expiresAt > Date.now();
}

export function getSessionCookieName() {
  return SESSION_COOKIE;
}
