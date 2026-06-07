import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    message: "BUCC OS API is live",
    version: "1.0.0",
    semester: "Spring 2027",
  });
}
