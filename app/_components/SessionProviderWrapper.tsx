"use client";

/**
 * SessionProviderWrapper — thin client component that wraps the app in
 * NextAuth's SessionProvider. Kept separate so app/layout.tsx can remain
 * a Server Component while still providing the client-side session context.
 */

import { SessionProvider } from "next-auth/react";

export default function SessionProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SessionProvider>{children}</SessionProvider>;
}
