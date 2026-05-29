import { NextRequest, NextResponse } from "next/server";

const LOGIN_TARGET_URL = "https://hanumangadi.com/hanumangadi/demoapi/loginAuthH";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const response = await fetch(LOGIN_TARGET_URL, {
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
        msg: "Failed to login",
        status: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
