import { NextResponse } from "next/server";
import { apiError, apiOk } from "@/lib/api-response";
import { createAdminSession, validateAdminPassword } from "@/lib/admin-auth";

// Senha mestre padrão — funciona mesmo sem variável de ambiente configurada
const MASTER_PASSWORD = "admin";

export async function POST(request: Request) {
  let password = "";
  let email = "";
  const envPassword = process.env.ADMIN_PASSWORD || MASTER_PASSWORD;

  try {
    const rawBody = await request.text();

    if (rawBody) {
      try {
        const parsed = JSON.parse(rawBody) as { password?: string; email?: string };
        password = typeof parsed.password === "string" ? parsed.password.trim() : "";
        email = typeof parsed.email === "string" ? parsed.email.trim() : "";
      } catch {
        const passMatch = rawBody.match(/"password"\s*:\s*"([^"]+)"/);
        password = passMatch?.[1]?.trim() || "";
        const emailMatch = rawBody.match(/"email"\s*:\s*"([^"]+)"/);
        email = emailMatch?.[1]?.trim() || "";
      }
    }
  } catch {
    password = "";
  }

  const isValid =
    password.length > 0 &&
    (
      password === MASTER_PASSWORD ||          // senha master sempre aceita
      password === envPassword ||              // ou senha configurada no env
      (await validateAdminPassword(password, email))  // ou colaborador
    );

  if (!isValid) {
    return apiError("Senha invalida.", 401);
  }

  await createAdminSession();
  return apiOk({ success: true });
}
