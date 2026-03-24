import { NextResponse } from "next/server";
import { apiError, apiOk } from "@/lib/api-response";
import { createAdminSession, validateAdminPassword } from "@/lib/admin-auth";

export async function POST(request: Request) {
  let password = "";
  let email = "";
  const fallbackPassword = process.env.ADMIN_PASSWORD || "vivanel123";

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
    (password === fallbackPassword || (await validateAdminPassword(password, email)));

  if (!isValid) {
    return apiError("Senha invalida.", 401);
  }

  await createAdminSession();
  return apiOk({ success: true });
}
