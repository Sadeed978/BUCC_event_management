"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, MapPin, Trash2, Eye, PlusCircle, LayoutDashboard } from "lucide-react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/components/auth/AuthProvider";
import { getEventsByOrganizer, deleteUserEvent } from "@/lib/eventora-storage";
import type { EventItem } from "@/lib/eventora-types";
import { toast } from "sonner";

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

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

export default function ManageEventsClient() {
  return (
    <ProtectedRoute>
      <ManageEventsInner />
    </ProtectedRoute>
  );
}

function ManageEventsInner() {
  const { user } = useAuth();
  const [events, setEvents]             = useState<EventItem[]>([]);
  const [deletingId, setDeletingId]     = useState<string | null>(null);
  const [confirmId, setConfirmId]       = useState<string | null>(null);

  useEffect(() => {
    if (user) setEvents(getEventsByOrganizer(user.uid));
  }, [user]);

  function handleDeleteRequest(id: string) {
    setConfirmId(id);
  }

  function handleDeleteConfirm() {
    if (!confirmId) return;
    setDeletingId(confirmId);
    try {
      deleteUserEvent(confirmId);
      setEvents((prev) => prev.filter((e) => e.id !== confirmId));
      toast.success("Event deleted.");
    } catch {
      toast.error("Failed to delete event.");
    } finally {
      setDeletingId(null);
      setConfirmId(null);
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <p className="text-xs font-semibold text-violet-600 uppercase tracking-widest mb-1">Your Events</p>
          <h1 className="text-3xl font-extrabold text-slate-900">Manage Events</h1>
          <p className="text-sm text-slate-500 mt-1">
            {events.length} event{events.length !== 1 ? "s" : ""} published by you
          </p>
        </div>
        <Link
          href="/items/add"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-violet-600 text-white text-sm font-semibold hover:bg-violet-700 transition-colors shadow-sm shrink-0"
        >
          <PlusCircle size={15} />
          Add New Event
        </Link>
      </div>

      {/* Limitation notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-xs text-amber-800 mb-6 flex items-start gap-2">
        <span className="shrink-0 mt-0.5">⚠️</span>
        <p>
          <strong>localStorage limitation:</strong> Events are stored in your browser only. They are not shared across users or devices. Clearing browser data will remove your events.
        </p>
      </div>

      {events.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 p-16 text-center">
          <div className="w-16 h-16 rounded-2xl bg-violet-50 flex items-center justify-center mx-auto mb-4">
            <LayoutDashboard size={24} className="text-violet-400" />
          </div>
          <h2 className="font-semibold text-slate-700 mb-1">No events yet</h2>
          <p className="text-sm text-slate-400 mb-5">Events you create will appear here for management.</p>
          <Link
            href="/items/add"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600 text-white text-sm font-semibold hover:bg-violet-700 transition-colors"
          >
            <PlusCircle size={15} /> Create your first event
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-2xl border border-slate-100 p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 hover:shadow-sm transition-shadow"
            >
              {/* Thumbnail */}
              <div className="relative w-full sm:w-20 h-20 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                <Image
                  src={event.imageUrl || "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=200&q=70"}
                  alt={event.title}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h3 className="font-semibold text-slate-900 text-sm truncate">{event.title}</h3>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${CATEGORY_COLORS[event.category] ?? "bg-slate-100 text-slate-600"}`}>
                    {event.category}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${event.isFree ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>
                    {event.isFree ? "Free" : `৳${event.price.toLocaleString()}`}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1"><Calendar size={11} className="text-violet-400" />{formatDate(event.date)}</span>
                  <span className="flex items-center gap-1"><MapPin size={11} className="text-violet-400" />{event.location}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0">
                <Link
                  href={`/items/${event.id}`}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 border border-slate-200 hover:border-violet-300 hover:text-violet-700 hover:bg-violet-50 transition-colors"
                >
                  <Eye size={13} /> View
                </Link>
                <button
                  onClick={() => handleDeleteRequest(event.id)}
                  disabled={deletingId === event.id}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-rose-600 border border-rose-200 hover:bg-rose-50 transition-colors disabled:opacity-50"
                  aria-label={`Delete ${event.title}`}
                >
                  <Trash2 size={13} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Confirm delete dialog */}
      {confirmId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
          role="dialog" aria-modal="true" aria-label="Confirm delete"
        >
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm">
            <h3 className="font-extrabold text-slate-900 mb-2">Delete event?</h3>
            <p className="text-sm text-slate-500 mb-5">
              This event will be permanently removed from your browser. This cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmId(null)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 text-white text-sm font-semibold hover:bg-rose-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
