import { NextResponse, NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const access_token = req.cookies.get("access_token")
  const refresh_token = req.cookies.get("refresh_token")

  const PUBLIC = ["/sign/in", "/sign/up", "/_next", "/favicon.ico"];
  const isPublic = PUBLIC.some(p => req.nextUrl.pathname.startsWith(p));

  const isAuthPage = ["/sign/in", "/sign/up"].some(p => req.nextUrl.pathname.startsWith(p));
  const isPrivatePage = ["/dashboard"].some(p => req.nextUrl.pathname.startsWith(p));

  if (!access_token && refresh_token && isPrivatePage) {
    console.log("Refreshing access token...");

    try {
      const refresher = await fetch(`http://127.0.0.1:5566/api/auth/refresh`, {
        method: "GET",
        headers: { cookie: `refresh_token=${refresh_token.value}`,
         },
      });

      if (refresher.ok) {
        console.log("Access token refreshed.");
        const res = NextResponse.next();
        const setCookies = refresher.headers.getSetCookie();
        setCookies.forEach((cookieStr) => {
          const [firstPart] = cookieStr.split(";");
          const [key, value] = firstPart.split("=");
          if (key && value) {
            res.cookies.set(key.trim(), value.trim());
          }
        });
        return res;
      } else {
        console.log("Failed to refresh access token.");
      }
    } catch (error) {
      console.error("Error refreshing access token:", error);
    }
  }

  const isPostLogout = req.nextUrl.searchParams.get("post_logout") === "true";
  const hasToken = access_token || refresh_token;

  if (hasToken && isAuthPage) {
    const url = new URL("/dashboard", req.url);
    return NextResponse.redirect(url);
  }

  if (!hasToken && !refresh_token && isPrivatePage) {
    const url = new URL("/sign/in", req.url);
    url.searchParams.set("next", path);
    url.searchParams.set("msg", "login-required");
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = { matcher: 
  [
    "/dashboard/:path*", 
    "/sign/:path*",
    "/post/:path*",
    "/schedule/:path*",
    "/bots/:path*",
    "/team/:path*",
    "/settings/:path*"
  ] };
