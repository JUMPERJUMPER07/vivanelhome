import { cookies } from "next/headers";
import { findCollaboratorByEmail } from "@/lib/collaborator-service";
import { verifyPasswordHash } from "@/lib/password-hash";
import { getAdminPassword, getAdminPasswordHash } from "@/lib/env";
import { createSignedToken, verifySignedToken } from "@/lib/session-token";

const SESSION_COOKIE = "vivanelhome_admin_session";

export async function validateAdminPassword(password: string, email?: string) {
  const adminEmail = process.env.ADMIN_EMAIL || "";
  const adminPassword = getAdminPassword();
  const configuredHash = getAdminPasswordHash();

  // Valida colaborador pelo e-mail (banco de dados)
  if (email && email.includes("@") && email !== adminEmail) {
    try {
      const collaborator = await findCollaboratorByEmail(email);
      if (collaborator && collaborator.password_hash) {
        return verifyPasswordHash(password, collaborator.password_hash);
      }
    } catch {
      // Ignora e tenta credenciais de master
    }
    return false;
  }

  // Valida e-mail do admin (se configurado)
  if (adminEmail && email && email !== adminEmail) {
    return false;
  }

  // Valida senha via hash ou texto puro
  if (configuredHash) {
    return verifyPasswordHash(password, configuredHash);
  }

  return password === adminPassword;
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
