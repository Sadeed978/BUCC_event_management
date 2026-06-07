/**
 * lib/response.ts — typed API response helpers
 */

import { NextResponse } from "next/server";
import type { ApiResponse } from "@/lib/types";

export function ok<T>(data: T, extra?: { total?: number }): NextResponse {
  const body: ApiResponse<T> = { success: true, data, ...extra };
  return NextResponse.json(body, { status: 200 });
}

export function created<T>(data: T): NextResponse {
  const body: ApiResponse<T> = { success: true, data };
  return NextResponse.json(body, { status: 201 });
}

export function badRequest(error: string): NextResponse {
  return NextResponse.json({ success: false, error }, { status: 400 });
}

export function notFound(error = "Not found"): NextResponse {
  return NextResponse.json({ success: false, error }, { status: 404 });
}

export function serverError(error: unknown): NextResponse {
  const msg = error instanceof Error ? error.message : "Internal server error";
  console.error("[API Error]", error);
  return NextResponse.json({ success: false, error: msg }, { status: 500 });
}
