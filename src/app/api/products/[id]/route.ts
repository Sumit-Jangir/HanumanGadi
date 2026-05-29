import { NextResponse } from "next/server";

const TARGET_URL =
  "https://hanumangadi.com/hanumangadi/demoapi/getProductDetail";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;   // 🔥 FIX HERE

  console.log("Slug:", id);

  const slug = id;

  if (!slug) {
    return NextResponse.json(
      { msg: "Missing slug parameter", status: false },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `${TARGET_URL}?slug=${encodeURIComponent(slug)}`
    );

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    return NextResponse.json(
      {
        msg: "Failed to fetch product detail",
        status: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}