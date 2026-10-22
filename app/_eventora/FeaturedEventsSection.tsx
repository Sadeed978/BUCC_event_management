import Link from "next/link";
import { ArrowRight } from "lucide-react";
import EventCard from "@/components/events/EventCard";
import { SEED_EVENTS } from "@/lib/eventora-seed";

const FEATURED = SEED_EVENTS.filter((e) => e.featured).slice(0, 3);

export default function FeaturedEventsSection() {
  return (
    <section className="bg-[#fafaf8] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-semibold text-violet-600 uppercase tracking-widest mb-2">Featured</p>
            <h2 className="text-3xl font-extrabold text-slate-900">Don&apos;t miss these</h2>
            <p className="text-slate-500 mt-2 max-w-md">
              Hand-picked events happening soon — from flagship tech conferences to free community nights.
            </p>
          </div>
          <Link
            href="/items"
            className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-violet-700 hover:text-violet-900 transition-colors"
          >
            See all events <ArrowRight size={14} />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURED.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        <div className="mt-8 flex sm:hidden justify-center">
          <Link href="/items" className="flex items-center gap-1.5 text-sm font-semibold text-violet-700 hover:text-violet-900">
            See all events <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
