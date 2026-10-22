/**
 * app/api/auth/[...nextauth]/route.ts
 *
 * NextAuth v4 catch-all route handler for the App Router.
 * All configuration lives in lib/auth.ts — this file is intentionally thin.
 */

import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
