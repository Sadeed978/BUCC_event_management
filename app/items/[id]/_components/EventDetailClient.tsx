"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, Tag, ArrowLeft, User, Layers, Building } from "lucide-react";
import { getEventById } from "@/lib/eventora-storage";
import type { EventItem } from "@/lib/eventora-types";

const CATEGORY_COLORS: Record<string, string> = {
  Technology: "bg-violet-100 text-violet-700",
  Music:      "bg-pink-100   text-pink-700",
  Business:   "bg-sky-100    text-sky-700",
  Education:  "bg-emerald-100 text-emerald-700",
  Lifestyle:  "bg-amber-100  text-amber-700",
  Sports:     "bg-orange-100 text-orange-700",
  Art:        "bg-rose-100   text-rose-700",
  Food:       "bg-lime-100   text-lime-700",
};

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-US", {
    weekday: "long", month: "long", day: "numeric", year: "numeric",
  });
}

export default function EventDetailClient({ id }: { id: string }) {
  const [event, setEvent] = useState<EventItem | null | undefined>(undefined);

  useEffect(() => {
    const found = getEventById(id);
    setEvent(found ?? null);
  }, [id]);

  if (event === undefined) {
    // Loading state
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 rounded-full border-2 border-violet-600 border-t-transparent animate-spin" />
      </div>
    );
  }

  if (event === null) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <p className="text-5xl mb-4">🔍</p>
        <h1 className="text-2xl font-extrabold text-slate-900 mb-3">Event not found</h1>
        <p className="text-slate-500 mb-6">
          This event doesn&apos;t exist or may have been removed.
        </p>
        <Link
          href="/items"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600 text-white text-sm font-semibold hover:bg-violet-700 transition-colors"
        >
          <ArrowLeft size={14} /> Back to Events
        </Link>
      </div>
    );
  }

  const categoryStyle = CATEGORY_COLORS[event.category] ?? "bg-slate-100 text-slate-600";
  const fallbackImg = "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=80";

  return (
    <>
      {/* Hero image */}
      <div className="relative w-full h-72 sm:h-96 bg-slate-200">
        <Image
          src={event.imageUrl || fallbackImg}
          alt={event.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
          <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold mb-3 ${categoryStyle}`}>
            {event.category}
          </span>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
            {event.title}
          </h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Link
          href="/items"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-violet-700 mb-8 transition-colors"
        >
          <ArrowLeft size={14} /> Back to Events
        </Link>

        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <p className="text-lg text-slate-600 mb-6 leading-relaxed font-medium">
              {event.shortDescription}
            </p>
            <div className="text-slate-700 leading-relaxed space-y-4">
              {event.fullDescription.split("\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>

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
                <div className="flex items-start gap-3">
                  <Calendar size={16} className="text-violet-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-slate-400 mb-0.5">Date</p>
                    <p className="font-medium text-slate-800">{formatDate(event.date)}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="text-violet-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-slate-400 mb-0.5">Location</p>
                    <p className="font-medium text-slate-800">{event.location}</p>
                  </div>
                </div>
                {event.venue && (
                  <div className="flex items-start gap-3">
                    <Building size={16} className="text-violet-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-slate-400 mb-0.5">Venue</p>
                      <p className="font-medium text-slate-800">{event.venue}</p>
                    </div>
                  </div>
                )}
                {event.organizer && (
                  <div className="flex items-start gap-3">
                    <User size={16} className="text-violet-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-slate-400 mb-0.5">Organiser</p>
                      <p className="font-medium text-slate-800">{event.organizer}</p>
                    </div>
                  </div>
                )}
                {event.eventType && (
                  <div className="flex items-start gap-3">
                    <Layers size={16} className="text-violet-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-slate-400 mb-0.5">Format</p>
                      <p className="font-medium text-slate-800">{event.eventType}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-start gap-3">
                  <Tag size={16} className="text-violet-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-slate-400 mb-0.5">Category</p>
                    <p className="font-medium text-slate-800">{event.category}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-100">
                <Link
                  href="/items"
                  className="block w-full text-center px-4 py-2.5 rounded-xl bg-violet-600 text-white text-sm font-semibold hover:bg-violet-700 transition-colors"
                >
                  Browse more events
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
