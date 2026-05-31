import { NextResponse } from "next/server";

const TARGET_URL = "https://hanumangadi.com/hanumangadi/demoapi/addToCart";

export async function POST(req: Request) {
  const formData = await req.formData();
  const user_id = formData.get("user_id");
  const product_id = formData.get("product_id");
  const flag = formData.get("flag");
  const qty = formData.get("qty");

  if (!user_id || !product_id || !flag || !qty) {
    return NextResponse.json({ msg: "Missing parameters", status: false }, { status: 400 });
  }

  try {
    const remoteForm = new FormData();
    remoteForm.set("user_id", user_id.toString());
    remoteForm.set("product_id", product_id.toString());
    remoteForm.set("flag", flag.toString());
    remoteForm.set("qty", qty.toString());

    const response = await fetch(TARGET_URL, {
      method: "POST",
      body: remoteForm,
    });
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json({ msg: "Failed to add/remove cart item", status: false, error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
  }
}
