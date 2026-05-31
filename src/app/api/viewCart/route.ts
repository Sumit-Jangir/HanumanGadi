import { NextResponse } from "next/server";

const TARGET_URL = "https://hanumangadi.com/hanumangadi/demoapi/viewCart";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const user_id = searchParams.get("user_id");
  if (!user_id) {
    return NextResponse.json({ msg: "Missing user_id", status: false }, { status: 400 });
  }
  try {
    const response = await fetch(`${TARGET_URL}?user_id=${encodeURIComponent(user_id)}`);
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json({ msg: "Failed to fetch cart", status: false, error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
  }
}
