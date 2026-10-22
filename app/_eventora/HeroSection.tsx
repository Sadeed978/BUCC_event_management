"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
  "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&q=80",
];

export default function HeroSection() {
  const { user } = useAuth();

  return (
    <section
      className="relative min-h-screen flex items-center pt-16 overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0f0724 0%, #1e0a4a 40%, #2d1060 100%)" }}
    >
      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-violet-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-14 items-center">

        {/* Copy */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/20 border border-violet-400/30 text-violet-300 text-xs font-medium mb-6">
            <Sparkles size={12} />
            The best events in your city
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight mb-6">
            Discover{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-400">
              extraordinary
            </span>{" "}
            experiences
          </h1>

          <p className="text-lg text-slate-300 leading-relaxed mb-8 max-w-lg">
            From tech summits and music festivals to intimate workshops — find the events that move you, or publish your own to the world.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/items"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-violet-900/40 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 focus:ring-offset-transparent"
            >
              Explore Events
              <ArrowRight size={16} />
            </Link>
            <Link
              href={user ? "/items/add" : "/login"}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-white/40"
            >
              Create an Event
            </Link>
          </div>

          {/* Trust signals */}
          <div className="flex items-center gap-6 mt-10 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {["bg-violet-400", "bg-pink-400", "bg-sky-400"].map((c, i) => (
                  <div key={i} className={`w-6 h-6 rounded-full ${c} border-2 border-[#1e0a4a]`} />
                ))}
              </div>
              <span>2,400+ attendees</span>
            </div>
            <div className="w-px h-3 bg-slate-600" />
            <span>50+ events monthly</span>
            <div className="w-px h-3 bg-slate-600" />
            <span>8 categories</span>
          </div>
        </div>

        {/* Image collage */}
        <div className="hidden lg:grid grid-cols-2 gap-3 h-[500px]">
          <div className="flex flex-col gap-3">
            <div className="relative flex-1 rounded-2xl overflow-hidden">
              <Image src={HERO_IMAGES[0]} alt="Tech event" fill className="object-cover" sizes="300px" />
            </div>
            <div className="relative h-36 rounded-2xl overflow-hidden">
              <Image src={HERO_IMAGES[2]} alt="Hackathon" fill className="object-cover" sizes="300px" />
            </div>
          </div>
          <div className="flex flex-col gap-3 mt-10">
            <div className="relative h-36 rounded-2xl overflow-hidden">
              <Image src={HERO_IMAGES[1]} alt="Music festival" fill className="object-cover" sizes="300px" />
            </div>
            <div className="flex-1 rounded-2xl bg-violet-500/20 border border-violet-400/30 flex flex-col items-center justify-center p-6 text-center">
              <p className="text-3xl font-extrabold text-white mb-1">50+</p>
              <p className="text-xs text-violet-300 font-medium">Events This Month</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#fafaf8] to-transparent" />
    </section>
  );
}
