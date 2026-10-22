import { Search, ShieldCheck, Zap, Users } from "lucide-react";

const BENEFITS = [
  {
    icon: Search,
    title: "Discover with ease",
    description:
      "Smart search and category filters surface the right events instantly — no digging through endless feeds.",
    color: "bg-violet-100 text-violet-700",
  },
  {
    icon: Zap,
    title: "Publish in minutes",
    description:
      "Our streamlined event creation form gets your event live in under three minutes. No complex setup, no fees.",
    color: "bg-pink-100 text-pink-700",
  },
  {
    icon: Users,
    title: "Built for community",
    description:
      "From intimate 20-person workshops to 2,000-attendee summits — every scale is welcome on Eventora.",
    color: "bg-sky-100 text-sky-700",
  },
  {
    icon: ShieldCheck,
    title: "Your data, your control",
    description:
      "Manage, edit, and delete your events at any time. Firebase authentication keeps your account secure.",
    color: "bg-emerald-100 text-emerald-700",
  },
];

export default function WhyEventoraSection() {
  return (
    <section className="bg-[#fafaf8] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-14">
          <p className="text-xs font-semibold text-violet-600 uppercase tracking-widest mb-2">
            Why Eventora
          </p>
          <h2 className="text-3xl font-extrabold text-slate-900">
            Everything you need to connect
          </h2>
          <p className="text-slate-500 mt-2 max-w-xl mx-auto">
            We built the platform we wished existed — a clean, fast, and honest place for discovering and sharing real events.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BENEFITS.map(({ icon: Icon, title, description, color }) => (
            <div
              key={title}
              className="bg-white rounded-2xl border border-slate-100 p-6 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${color}`}>
                <Icon size={20} strokeWidth={1.75} />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">{title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
