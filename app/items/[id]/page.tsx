import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, Tag, ArrowLeft, User, Layers, Building } from "lucide-react";
import Navbar  from "@/components/layout/Navbar";
import Footer  from "@/components/layout/Footer";
import EventCard from "@/components/events/EventCard";
import EventDetailClient from "@/app/items/[id]/_components/EventDetailClient";
import { SEED_EVENTS } from "@/lib/eventora-seed";

export async function generateStaticParams() {
  return SEED_EVENTS.map((e) => ({ id: e.id }));
}

export async function generateMetadata(
  props: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await props.params;
  const event = SEED_EVENTS.find((e) => e.id === id);
  if (!event) return { title: "Event" };
  return { title: event.title, description: event.shortDescription };
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-US", {
    weekday: "long", month: "long", day: "numeric", year: "numeric",
  });
}

const CAT_COLORS: Record<string, string> = {
  Technology: "bg-violet-100 text-violet-700",
  Music:      "bg-pink-100   text-pink-700",
  Business:   "bg-sky-100    text-sky-700",
  Education:  "bg-emerald-100 text-emerald-700",
  Lifestyle:  "bg-amber-100  text-amber-700",
  Sports:     "bg-orange-100 text-orange-700",
  Art:        "bg-rose-100   text-rose-700",
  Food:       "bg-lime-100   text-lime-700",
};

export default async function EventDetailPage(
  props: { params: Promise<{ id: string }> }
) {
  const { id } = await props.params;
  const event = SEED_EVENTS.find((e) => e.id === id);

  // User-created events live in localStorage — render client component
  if (!event) {
    return (
      <>
        <Navbar />
        <main className="pt-16 min-h-screen bg-[#fafaf8]">
          <EventDetailClient id={id} />
        </main>
        <Footer />
      </>
    );
  }

  const related = SEED_EVENTS.filter((e) => e.category === event.category && e.id !== event.id).slice(0, 3);
  const catStyle = CAT_COLORS[event.category] ?? "bg-slate-100 text-slate-600";
  const fallback = "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=80";

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-[#fafaf8]">

        {/* Hero */}
        <div className="relative w-full h-72 sm:h-96 bg-slate-200">
          <Image
            src={event.imageUrl || fallback}
            alt={event.title}
            fill priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
            <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold mb-3 ${catStyle}`}>
              {event.category}
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
              {event.title}
            </h1>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Link href="/items" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-violet-700 mb-8 transition-colors">
            <ArrowLeft size={14} /> Back to Events
          </Link>

          <div className="grid lg:grid-cols-3 gap-10">

            {/* Content */}
            <div className="lg:col-span-2">
              <p className="text-lg text-slate-600 mb-6 leading-relaxed font-medium">{event.shortDescription}</p>
              <div className="text-slate-700 leading-relaxed space-y-4">
                {event.fullDescription.split("\n").map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </div>

            {/* Sidebar */}
            <aside>
              <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm sticky top-20">
                <div className="mb-5 pb-5 border-b border-slate-100">
                  {event.isFree ? (
                    <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-bold">Free Entry</span>
                  ) : (
                    <div>
                      <p className="text-xs text-slate-400 mb-1">Ticket price</p>
                      <p className="text-2xl font-extrabold text-slate-900">৳{event.price.toLocaleString()}</p>
                    </div>
                  )}
                </div>

                <div className="space-y-4 text-sm">
                  {[
                    { icon: Calendar, label: "Date",     value: formatDate(event.date) },
                    { icon: MapPin,   label: "Location", value: event.location },
                    event.venue   && { icon: Building, label: "Venue",     value: event.venue },
                    event.organizer && { icon: User,   label: "Organiser", value: event.organizer },
                    event.eventType && { icon: Layers, label: "Format",    value: event.eventType },
                    { icon: Tag,   label: "Category", value: event.category },
                  ].filter(Boolean).map((item) => {
                    if (!item) return null;
                    const { icon: Icon, label, value } = item as { icon: React.ElementType; label: string; value: string };
                    return (
                      <div key={label} className="flex items-start gap-3">
                        <Icon size={16} className="text-violet-500 mt-0.5 shrink-0" />
                        <div>
                          <p className="text-xs text-slate-400 mb-0.5">{label}</p>
                          <p className="font-medium text-slate-800">{value}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 pt-5 border-t border-slate-100">
                  <Link href="/items" className="block w-full text-center px-4 py-2.5 rounded-xl bg-violet-600 text-white text-sm font-semibold hover:bg-violet-700 transition-colors">
                    Browse more events
                  </Link>
                </div>
              </div>
            </aside>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <section className="mt-16">
              <h2 className="text-xl font-extrabold text-slate-900 mb-6">More {event.category} events</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {related.map((e) => <EventCard key={e.id} event={e} />)}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
