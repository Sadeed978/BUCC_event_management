import Link from "next/link";
import { ArrowRight } from "lucide-react";
import EventCard from "@/components/events/EventCard";
import { SEED_EVENTS } from "@/lib/eventora-seed";

// Show the non-featured events (upcoming / community picks)
const UPCOMING = SEED_EVENTS.filter((e) => !e.featured).slice(0, 3);

export default function UpcomingEventsSection() {
  return (
    <section className="bg-white py-20 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-semibold text-violet-600 uppercase tracking-widest mb-2">
              Community Picks
            </p>
            <h2 className="text-3xl font-extrabold text-slate-900">
              More events you&apos;ll love
            </h2>
            <p className="text-slate-500 mt-2 max-w-md">
              Beyond the spotlight — a mix of workshops, festivals, and meetups worth your time.
            </p>
          </div>
          <Link
            href="/items"
            className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-violet-700 hover:text-violet-900 transition-colors"
          >
            Browse all <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {UPCOMING.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/items"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-violet-600 text-white text-sm font-semibold hover:bg-violet-700 transition-colors shadow-sm"
          >
            Explore all events
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
