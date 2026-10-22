/**
 * app/(dashboard)/layout.tsx — Dashboard shell with server-side auth guard.
 *
 * getServerSession() is called here as a defence-in-depth check.
 * The real enforcement happens in middleware.ts, but verifying on the
 * server component ensures no dashboard HTML is ever rendered for
 * unauthenticated requests that somehow bypass middleware (e.g. direct
 * server-rendered navigation).
 */

import { getServerSession } from "next-auth/next";
import { redirect }         from "next/navigation";
import { authOptions }      from "@/lib/auth";
import Sidebar              from "@/app/_components/Sidebar";
import Topbar               from "@/app/_components/Topbar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#f4f6f9]">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
