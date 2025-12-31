import { NextRequest, NextResponse } from "next/server";
const API = process.env.API_URL ?? "http://127.0.0.1:5566";

export async function GET(req: NextRequest) {
  const cookie = req.headers.get("cookie") || "";
  const upstream = await fetch(`${API}/api/users/me`, {
    method: "GET",
    headers: { cookie },
    cache: "no-store",
  });
  const contentType = upstream.headers.get("content-type") || "application/json";
  const body = await upstream.text();
  return new NextResponse(body, { status: upstream.status, headers: { "content-type": contentType } });
}
