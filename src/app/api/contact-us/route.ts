import { NextRequest, NextResponse } from "next/server";

const TARGET_URL = "https://hanumangadi.com/hanumangadi/api1/saveContactUs";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const response = await fetch(TARGET_URL, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    return NextResponse.json(
      {
        msg: "Failed to submit contact form",
        status: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
