import { NextResponse } from "next/server";

const TARGET_URL = "https://hanumangadi.com/hanumangadi/api1/get_yagya";

export async function GET() {
  try {
    const response = await fetch(TARGET_URL, {
      method: "GET",
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
    });

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    return NextResponse.json(
      {
        msg: "Failed to fetch yagya products",
        status: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
