/**
 * lib/apiAuth.ts — server-side session guard for API route handlers.
 *
 * Usage in any route handler:
 *
 *   const session = await requireSession();
 *   if (session instanceof NextResponse) return session; // 401
 *   // session.user.id / session.user.role are available here
 */

import { getServerSession } from "next-auth/next";
import { NextResponse }     from "next/server";
import { authOptions }      from "@/lib/auth";
import type { Session }     from "next-auth";

/**
 * Returns the authenticated session or a 401 NextResponse.
 * Call this at the top of any route handler that must be protected.
 */
export async function requireSession(): Promise<Session | NextResponse> {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { success: false, error: "Unauthorized — please sign in." },
      { status: 401 }
    );
  }
  return session;
}

/**
 * Returns the session or a 401 NextResponse AND enforces at least one of the
 * allowed roles.
 *
 *   const session = await requireRole(["Super Admin", "President"]);
 *   if (session instanceof NextResponse) return session; // 401 or 403
 */
export async function requireRole(
  allowedRoles: string[]
): Promise<Session | NextResponse> {
  const result = await requireSession();
  if (result instanceof NextResponse) return result;

  if (!allowedRoles.includes(result.user.role)) {
    return NextResponse.json(
      {
        success: false,
        error: `Forbidden — requires one of: ${allowedRoles.join(", ")}.`,
      },
      { status: 403 }
    );
  }

  return result;
}
