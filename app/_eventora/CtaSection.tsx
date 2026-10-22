"use client";

import Link from "next/link";
import { ArrowRight, PlusCircle } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";

export default function CtaSection() {
  const { user } = useAuth();

  return (
    <section className="bg-[#fafaf8] py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="rounded-3xl p-10 sm:p-14 text-center"
          style={{ background: "linear-gradient(135deg, #1e0a4a 0%, #2d1060 100%)" }}
        >
          {/* Ambient glow */}
          <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-violet-500/20 rounded-full blur-3xl" />
          </div>

          <p className="text-xs font-semibold text-violet-300 uppercase tracking-widest mb-4">
            Ready to start?
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 leading-tight">
            Your next great experience is one click away
          </h2>
          <p className="text-slate-300 text-base max-w-lg mx-auto mb-8">
            Whether you&apos;re here to discover events or share one — Eventora is the home for people who show up.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/items"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-violet-900/30 focus:outline-none focus:ring-2 focus:ring-violet-400"
            >
              Explore Events
              <ArrowRight size={15} />
            </Link>
            <Link
              href={user ? "/items/add" : "/register"}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-white/30"
            >
              <PlusCircle size={15} />
              {user ? "Create an Event" : "Get started free"}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
