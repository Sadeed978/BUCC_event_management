import Link from "next/link";
import Image from "next/image";
import { Calendar, MapPin, Tag, ArrowRight } from "lucide-react";
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

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

interface EventCardProps {
  event: EventItem;
}

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80";

export default function EventCard({ event }: EventCardProps) {
  const categoryStyle =
    CATEGORY_COLORS[event.category] ?? "bg-slate-100 text-slate-600";
  const imgSrc = event.imageUrl || FALLBACK_IMAGE;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">

      {/* Image */}
      <div className="relative h-48 w-full shrink-0 overflow-hidden bg-slate-100">
        <Image
          src={imgSrc}
          alt={event.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          unoptimized={imgSrc.startsWith("https://images.unsplash.com") ? false : true}
        />
        {/* Category badge */}
        <span
          className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-semibold ${categoryStyle}`}
        >
          {event.category}
        </span>
        {/* Price badge */}
        <span
          className={`absolute right-3 top-3 rounded-full px-2.5 py-1 text-xs font-bold ${
            event.isFree
              ? "bg-emerald-100 text-emerald-700"
              : "bg-white text-slate-800 shadow-sm"
          }`}
        >
          {event.isFree ? "Free" : `৳${event.price.toLocaleString()}`}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        <h3 className="line-clamp-2 text-base font-semibold leading-snug text-slate-900">
          {event.title}
        </h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-slate-500">
          {event.shortDescription}
        </p>

        {/* Meta */}
        <div className="mt-auto flex flex-col gap-1.5 border-t border-slate-50 pt-2">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Calendar size={13} className="shrink-0 text-violet-500" />
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <MapPin size={13} className="shrink-0 text-violet-500" />
            <span className="truncate">{event.location}</span>
          </div>
          {event.organizer && (
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Tag size={13} className="shrink-0 text-violet-500" />
              <span className="truncate">{event.organizer}</span>
            </div>
          )}
        </div>

        {/* CTA */}
        <Link
          href={`/items/${event.id}`}
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-violet-50 py-2.5 text-sm font-semibold text-violet-700 transition-colors hover:bg-violet-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
        >
          View Details
          <ArrowRight size={14} />
        </Link>
      </div>
    </article>
  );
}
