import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function GET(req: NextRequest) {
  console.log("POST hi");
  return NextResponse.json({ message: "hi" }, { status: 200 });
}

//curl -i -X 'POST'  -H 'Content-Type: application/json'  --data-raw '{"owner":"Significant-Gravitas","repo":"Auto-GPT"}' "http://localhost:5175/api/hi"
