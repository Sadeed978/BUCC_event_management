import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Zap, Target, Users, Globe, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Eventora — the modern event discovery platform built for curious, connected people.",
};

const FEATURES = [
  "Discover events across 8 categories in seconds",
  "Publish your own event in under 3 minutes",
  "Firebase-powered auth — secure, fast, reliable",
  "Responsive design for every device",
  "Community-first — free to discover, free to list",
  "localStorage event persistence for instant feedback",
];

const TEAM_VALUES = [
  {
    icon: Target,
    title: "Clarity over clutter",
    body: "Every screen is designed to surface the signal and suppress the noise. We cut features that don't serve discovery.",
    color: "bg-violet-100 text-violet-700",
  },
  {
    icon: Users,
    title: "Community first",
    body: "Eventora is built around the people who show up — organisers who care and attendees who are genuinely curious.",
    color: "bg-sky-100 text-sky-700",
  },
  {
    icon: Globe,
    title: "Built for everyone",
    body: "From a 20-person photography walk to a 2,000-seat tech summit, every event deserves a professional home.",
    color: "bg-emerald-100 text-emerald-700",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">

        {/* Hero */}
        <section
          className="py-20 text-center"
          style={{ background: "linear-gradient(135deg, #0f0724 0%, #1e0a4a 50%, #2d1060 100%)" }}
        >
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/20 border border-violet-400/30 text-violet-300 text-xs font-medium mb-6">
              <Zap size={12} />
              About Eventora
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-5 leading-tight">
              We built the event platform we always wanted
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Eventora is a modern event discovery and management platform. We believe every extraordinary experience deserves a clean, trustworthy home on the web.
            </p>
          </div>
        </section>

        {/* What we do */}
        <section className="bg-white py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-14 items-center">
            <div>
              <p className="text-xs font-semibold text-violet-600 uppercase tracking-widest mb-3">What we do</p>
              <h2 className="text-3xl font-extrabold text-slate-900 mb-5 leading-tight">
                One place to discover, share, and experience
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Eventora solves a real problem: finding quality events is still unnecessarily hard. Most platforms bury good events behind ads, confusing UIs, and paywalls. We built something better.
              </p>
              <p className="text-slate-600 leading-relaxed mb-6">
                Our platform is public, fast, and free. Anyone can browse without an account. Organisers can create events in minutes. Attendees get exactly the information they need to decide — nothing more.
              </p>
              <ul className="space-y-2.5">
                {FEATURES.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <CheckCircle size={16} className="text-violet-600 mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Visual */}
            <div className="rounded-3xl overflow-hidden bg-gradient-to-br from-violet-600 to-violet-900 p-8 flex flex-col justify-between min-h-64">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                  <Zap size={18} className="text-white" />
                </div>
                <span className="text-white font-bold text-xl">Eventora</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { v: "50+", l: "Events/month" },
                  { v: "8",    l: "Categories" },
                  { v: "Free", l: "To discover" },
                  { v: "3min", l: "To publish" },
                ].map(({ v, l }) => (
                  <div key={l} className="bg-white/10 rounded-xl p-3">
                    <p className="text-2xl font-extrabold text-white">{v}</p>
                    <p className="text-xs text-violet-200">{l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="bg-[#fafaf8] py-20 border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <p className="text-xs font-semibold text-violet-600 uppercase tracking-widest mb-3">Our Mission</p>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-5">
              Make every event worth finding
            </h2>
            <p className="text-slate-600 leading-relaxed text-lg">
              Great events shape communities. They spark ideas, build friendships, and turn ordinary weekends into memories. Our mission is to make sure the right people find the right events — every single time.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="bg-white py-20 border-t border-slate-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-xs font-semibold text-violet-600 uppercase tracking-widest mb-2">Values</p>
              <h2 className="text-3xl font-extrabold text-slate-900">What guides every decision</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {TEAM_VALUES.map(({ icon: Icon, title, body, color }) => (
                <div key={title} className="bg-[#fafaf8] rounded-2xl border border-slate-100 p-6">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${color}`}>
                    <Icon size={20} strokeWidth={1.75} />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">{title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
