
import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { Zap } from "lucide-react";
import EventoraLoginForm from "@/app/login/_components/EventoraLoginForm";

export const metadata: Metadata = {
  title: "Log In — Eventora",
  description:
    "Sign in to Eventora to discover, manage, and share amazing events.",
};

export default function LoginPage() {
  return (
    <div
      className="relative min-h-screen overflow-hidden flex items-center justify-center px-4 py-16"
      style={{
        background:
          "linear-gradient(135deg, #0a0118 0%, #150636 35%, #1e0a4a 65%, #2d1060 100%)",
      }}
    >
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-violet-700/25 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-24 h-80 w-80 rounded-full bg-purple-500/20 blur-[100px]" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/10 blur-[80px]" />

      {/* Subtle grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 w-full max-w-md">
        {/* Card */}
        <div className="overflow-hidden rounded-3xl bg-white/[0.97] shadow-[0_32px_80px_rgba(0,0,0,0.45)] ring-1 ring-white/10 backdrop-blur-xl">
          {/* Top accent bar */}
          <div className="h-1 w-full bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500" />

          <div className="px-8 pb-10 pt-9 sm:px-10">
            {/* Logo */}
            <div className="mb-8 flex flex-col items-center gap-1">
              <Link href="/" className="group mb-4 flex items-center gap-2.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-purple-700 shadow-lg shadow-violet-900/40 transition-transform group-hover:scale-105">
                  <Zap
                    size={19}
                    className="text-white"
                    strokeWidth={2.5}
                  />
                </div>

                <span className="text-2xl font-extrabold tracking-tight text-slate-900">
                  Eventora
                </span>
              </Link>

              <h1 className="text-2xl font-extrabold text-slate-900">
                Welcome back!
              </h1>

              <p className="mt-1 text-center text-sm leading-relaxed text-slate-500">
                Log in to discover, manage, and share amazing events.
              </p>
            </div>

            {/* Form */}
            <Suspense fallback={null}>
              <EventoraLoginForm />
            </Suspense>

            {/* Register link */}
            <p className="mt-6 text-center text-sm text-slate-500">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-semibold text-violet-700 transition-colors hover:text-violet-900 focus-visible:outline-none focus-visible:underline"
              >
                Create one
              </Link>
            </p>
          </div>
        </div>

        {/* Footer note */}
        <p className="mt-5 text-center text-xs text-violet-300/40">
          Your data is protected by Firebase Authentication.
        </p>
      </div>
    </div>
  );
}
