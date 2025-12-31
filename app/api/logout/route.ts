import { NextRequest, NextResponse } from "next/server";
const API = process.env.API_URL ?? "http://127.0.0.1:5566";

export async function GET(req: NextRequest) {
  try {
    const cookie = req.headers.get("cookie") || "";
    const upstream = await fetch(`${API}/api/auth/logout`, {
      method: "GET",
      headers: { cookie },
      redirect: "manual",
    });

    const text = await upstream.text();
    const res = new NextResponse(text, {
      status: upstream.status,
      headers: {
        "content-type": upstream.headers.get("content-type") || "application/json",
      },
    });
    const setCookie = upstream.headers.getSetCookie?.() ?? [];
    setCookie.forEach((c) => res.headers.append("set-cookie", c));
    
    return NextResponse.redirect(new URL("/sign/in", req.url), {
      headers: res.headers,
    });
  } catch {
    return NextResponse.json({ error: "upstream-error" }, { status: 502 });
  } 
}

export const dynamic = "force-dynamic";
