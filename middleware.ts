import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { ADMIN_LOGIN_PATH } from "@/lib/admin-routes";
import { verifySignedToken } from "@/lib/session-token";

const SESSION_COOKIE = "vivanelhome_admin_session";

async function isValidSession(token?: string) {
  if (!token) {
    return false;
  }

  const session = await verifySignedToken<{ expiresAt: number }>(token);

  if (!session) {
    return false;
  }

  return session.expiresAt > Date.now();
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isLoginPage = pathname.startsWith("/admin-acesso-seguro/login");
  const isPanelPage = pathname.startsWith("/admin-acesso-seguro");
  const isProtectedApi =
    (pathname.startsWith("/api/custom-products") || pathname.startsWith("/api/store-settings")) &&
    request.method !== "GET";

  if (!isPanelPage && !isProtectedApi) {
    return NextResponse.next();
  }

  if (isLoginPage) {
    return NextResponse.next();
  }

  const sessionToken = request.cookies.get(SESSION_COOKIE)?.value;

  if (await isValidSession(sessionToken)) {
    return NextResponse.next();
  }

  if (isProtectedApi) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const loginUrl = new URL(ADMIN_LOGIN_PATH, request.url);
  loginUrl.searchParams.set("redirect", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin-acesso-seguro/:path*", "/api/custom-products/:path*", "/api/store-settings/:path*"],
};
