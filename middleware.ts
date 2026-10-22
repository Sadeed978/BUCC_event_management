/**
 * middleware.ts — Route protection.
 *
 * Rules:
 *  - Eventora public routes (/, /items/*, /about, /login, /register) are open.
 *  - /items/add and /items/manage are protected by client-side Firebase guards
 *    (not middleware, since Firebase auth runs client-side).
 *  - BUCC Dashboard routes require a valid NextAuth session cookie.
 *  - /api/auth/* and /api/* are passed through unconditionally.
 *
 * This runs on the Edge Runtime — keep it lightweight (no DB calls).
 */

import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Routes that are fully public (no auth needed at middleware level)
const PUBLIC_PREFIXES = [
  "/",
  "/items",
  "/about",
  "/login",
  "/register",
  "/api/auth",
  "/api/",
  "/_next",
  "/favicon.ico",
];

function isPublic(pathname: string): boolean {
  return PUBLIC_PREFIXES.some((prefix) =>
    prefix === "/" ? pathname === "/" : pathname.startsWith(prefix)
  );
}

const authMiddleware = withAuth(
  function middleware(_req) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized({ token }) {
        return !!token;
      },
    },
    pages: {
      signIn: "/login",
    },
  }
);

export function middleware(req: NextRequest) {
  if (isPublic(req.nextUrl.pathname)) {
    return NextResponse.next();
  }
  // Dashboard and all other routes require NextAuth session
  return (authMiddleware as (req: NextRequest) => Response | Promise<Response>)(req);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
