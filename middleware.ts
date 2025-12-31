import { NextResponse, NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const hasToken = req.cookies.has("access_token") || req.cookies.has("logged_in");
  const path = req.nextUrl.pathname;

  const PUBLIC = ["/sign/in", "/sign/up", "/_next", "/favicon.ico"];
  const isPublic = PUBLIC.some(p => req.nextUrl.pathname.startsWith(p));

  const isAuthPage = ["/sign/in", "/sign/up"].some(p => req.nextUrl.pathname.startsWith(p));
  const isPrivatePage = ["/dashboard"].some(p => req.nextUrl.pathname.startsWith(p));

  if (hasToken && isAuthPage) {
    const url = new URL("/dashboard", req.url);
    return NextResponse.redirect(url);
  }

  if (!hasToken && isPrivatePage) {
    const url = new URL("/sign/in", req.url);
    url.searchParams.set("next", path);
    url.searchParams.set("msg", "login-required");
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = { matcher: ["/dashboard/:path*", "/sign/:path*"] };
