import type { Metadata } from "next";
import Link from "next/link";
import { Zap } from "lucide-react";
import EventoraLoginForm from "@/app/login/_components/EventoraLoginForm";

export const metadata: Metadata = {
  title: "Log In",
  description: "Sign in to your Eventora account to manage and publish events.",
};

export default function LoginPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{ background: "linear-gradient(135deg, #0f0724 0%, #1e0a4a 50%, #2d1060 100%)" }}
    >
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-64 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-sm">
        <div className="bg-white rounded-2xl shadow-2xl px-8 py-10">

          {/* Logo */}
          <div className="flex flex-col items-center mb-7">
            <Link href="/" className="flex items-center gap-2 mb-5">
              <div className="w-9 h-9 rounded-xl bg-violet-600 flex items-center justify-center">
                <Zap size={17} className="text-white" strokeWidth={2.5} />
              </div>
              <span className="font-bold text-lg text-slate-900">Eventora</span>
            </Link>
            <h1 className="text-xl font-extrabold text-slate-900">Welcome back</h1>
            <p className="text-sm text-slate-500 mt-1">Sign in to your account</p>
          </div>

          <EventoraLoginForm />

          <p className="text-center text-sm text-slate-500 mt-5">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-violet-700 font-semibold hover:text-violet-900 transition-colors">
              Register
            </Link>
          </p>
        </div>

        <p className="text-center text-xs text-violet-300/50 mt-5">
          BUCC Dashboard members:{" "}
          <span className="text-violet-200/60">use your club credentials above</span>
        </p>
      </div>
    </div>
  );
}
