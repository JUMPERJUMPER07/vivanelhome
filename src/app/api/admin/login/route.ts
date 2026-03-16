import { NextResponse } from "next/server";
import { apiError, apiOk } from "@/lib/api-response";
import { createAdminSession, validateAdminPassword } from "@/lib/admin-auth";

export async function POST(request: Request) {
  let password = "";
  const fallbackPassword = process.env.ADMIN_PASSWORD || "vivanel123";

  try {
    const rawBody = await request.text();

    if (rawBody) {
      try {
        const parsed = JSON.parse(rawBody) as { password?: string };
        password = typeof parsed.password === "string" ? parsed.password.trim() : "";
      } catch {
        const match = rawBody.match(/"password"\s*:\s*"([^"]+)"/);
        password = match?.[1]?.trim() || "";
      }
    }
  } catch {
    password = "";
  }

  const isValid =
    password.length > 0 &&
    (password === fallbackPassword || (await validateAdminPassword(password)));

  if (!isValid) {
    return apiError("Senha invalida.", 401);
  }

  await createAdminSession();
  return apiOk({ success: true });
}
