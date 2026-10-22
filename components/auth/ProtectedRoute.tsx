"use client";

/**
 * components/auth/ProtectedRoute.tsx
 *
 * Wraps a page that requires Firebase authentication.
 * - Shows a loading spinner while Firebase restores session.
 * - Redirects to /login (preserving the intended destination) if not signed in.
 *
 * NOTE: This is a client-side guard — it controls navigation UX only.
 * It does NOT prevent a determined user from seeing the page HTML if they
 * bypass JS execution. Use server-side auth + database rules for real security.
 */

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/components/auth/AuthProvider";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router  = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      router.replace(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
    }
  }, [user, loading, router, pathname]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fafaf8]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-violet-600 border-t-transparent animate-spin" />
          <p className="text-sm text-slate-500">Loading…</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return <>{children}</>;
}
