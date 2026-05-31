import { NextResponse } from "next/server";

const TARGET_URL =
  "https://hanumangadi.com/hanumangadi/demoapi/createOrder";

export async function POST(req: Request) {
  try {
    console.log("Received order creation request");

    const formData = await req.formData();
    const token = req.headers.get("authorization") || "";

    const response = await fetch(TARGET_URL, {
      method: "POST",
      body: formData,
      headers: token ? { Authorization: token } : undefined,
    });

    const text = await response.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = {
        status: false,
        msg: "Invalid JSON response from order API",
        raw: text,
      };
    }

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      {
        msg: "Failed to create order",
        status: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}