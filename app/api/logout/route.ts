import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const response = NextResponse.redirect(new URL("/sign/in", req.url));

  response.cookies.delete("access_token");
  response.cookies.delete("refresh_token");
  response.cookies.delete("logged_in");

  const API = process.env.API_URL ?? "http://127.0.0.1:5566";
  try {
     fetch(`${API}/api/auth/logout`, { 
        method: "GET",
        headers: { cookie: req.headers.get("cookie") || "" }
     }).catch((err) => console.log("Logout backend silent fail:", err));
  } catch {}

  return response;
}

export const dynamic = "force-dynamic";