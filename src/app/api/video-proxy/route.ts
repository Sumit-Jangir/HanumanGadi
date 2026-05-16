import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");
  if (!url) return new NextResponse("Missing url", { status: 400 });

  // Forward range header for seeking support
  const range = req.headers.get("range");
  const headers: Record<string, string> = { "User-Agent": req.headers.get("user-agent") || "" };
  if (range) headers["Range"] = range;

  const videoRes = await fetch(url, { headers });
  if (!videoRes.ok || !videoRes.body) return new NextResponse("Failed to fetch video", { status: 502 });

  // Stream the video response
  const res = new NextResponse(videoRes.body, {
    status: videoRes.status,
    headers: {
      "Content-Type": videoRes.headers.get("content-type") || "video/mp4",
      "Content-Length": videoRes.headers.get("content-length") || "",
      "Accept-Ranges": videoRes.headers.get("accept-ranges") || "bytes",
      "Content-Range": videoRes.headers.get("content-range") || "",
      "Access-Control-Allow-Origin": "*",
    },
  });
  return res;
}
