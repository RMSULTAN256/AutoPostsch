import { NextRequest } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const BASE_URL = process.env.API_URL || "http://127.0.0.1:5566";

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const cookieIn = req.headers.get("cookie") || "";

    const upstream = await fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        cookie: cookieIn,
      },
      body,
      redirect: "manual",
    });

    const text = await upstream.text();

    const out = new Headers();
    out.set("content-type", upstream.headers.get("content-type") ?? "application/json");

    const setCookies =
      upstream.headers.getSetCookie?.() ??
      (upstream.headers.get("set-cookie")
        ? [upstream.headers.get("set-cookie")!]
        : []);

    for (const c of setCookies) out.append("set-cookie", c);

    return new Response(text, { status: upstream.status, headers: out });
  } catch (error) {
    console.error("Login Proxy Error:", error);
    return new Response(JSON.stringify({ error: "upstream-error" }), {
      status: 502,
      headers: { "content-type": "application/json" },
    });
  }
}