import Link from "next/link";
import {
  Cpu, Music, Briefcase, GraduationCap,
  Heart, Dumbbell, Palette, Utensils,
} from "lucide-react";

const CATEGORIES = [
  { name: "Technology", icon: Cpu,           href: "/items?category=Technology", color: "bg-violet-50 text-violet-700 hover:bg-violet-100" },
  { name: "Music",      icon: Music,         href: "/items?category=Music",      color: "bg-pink-50   text-pink-700   hover:bg-pink-100" },
  { name: "Business",   icon: Briefcase,     href: "/items?category=Business",   color: "bg-sky-50    text-sky-700    hover:bg-sky-100" },
  { name: "Education",  icon: GraduationCap, href: "/items?category=Education",  color: "bg-emerald-50 text-emerald-700 hover:bg-emerald-100" },
  { name: "Lifestyle",  icon: Heart,         href: "/items?category=Lifestyle",  color: "bg-amber-50  text-amber-700  hover:bg-amber-100" },
  { name: "Sports",     icon: Dumbbell,      href: "/items?category=Sports",     color: "bg-orange-50 text-orange-700 hover:bg-orange-100" },
  { name: "Art",        icon: Palette,       href: "/items?category=Art",        color: "bg-rose-50   text-rose-700   hover:bg-rose-100" },
  { name: "Food",       icon: Utensils,      href: "/items?category=Food",       color: "bg-lime-50   text-lime-700   hover:bg-lime-100" },
];

export default function CategorySection() {
  return (
    <section className="bg-white py-20 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold text-violet-600 uppercase tracking-widest mb-2">Browse</p>
          <h2 className="text-3xl font-extrabold text-slate-900">Find events by category</h2>
          <p className="text-slate-500 mt-2">
            Eight curated verticals covering everything from code to cuisine.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {CATEGORIES.map(({ name, icon: Icon, href, color }) => (
            <Link
              key={name}
              href={href}
              className={`flex flex-col items-center gap-2.5 p-4 rounded-2xl border border-transparent transition-all hover:shadow-sm hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 ${color}`}
            >
              <div className="w-10 h-10 rounded-xl bg-white/60 flex items-center justify-center shadow-sm">
                <Icon size={20} strokeWidth={1.75} />
              </div>
              <span className="text-xs font-semibold text-center">{name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
