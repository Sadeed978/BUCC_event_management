import type { Metadata } from "next";
import RegisterForm from "@/app/register/_components/RegisterForm";
import Link from "next/link";
import { Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Join Eventora to publish and manage your own events.",
};

export default function RegisterPage() {
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
            <h1 className="text-xl font-extrabold text-slate-900 text-center">Create your account</h1>
            <p className="text-sm text-slate-500 mt-1 text-center">Start discovering and sharing events</p>
          </div>

          <RegisterForm />

          <p className="text-center text-sm text-slate-500 mt-5">
            Already have an account?{" "}
            <Link href="/login" className="text-violet-700 font-semibold hover:text-violet-900 transition-colors">
              Log in
            </Link>
          </p>
        </div>

        <p className="text-center text-xs text-violet-300/50 mt-5">
          Free to use — no credit card required
        </p>
      </div>
    </div>
  );
}
