"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { PlusCircle, Image as ImageIcon } from "lucide-react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/components/auth/AuthProvider";
import { saveUserEvent, generateEventId } from "@/lib/eventora-storage";
import type { EventCategory, EventItem } from "@/lib/eventora-types";
import { toast } from "sonner";

const CATEGORIES: EventCategory[] = [
  "Technology", "Music", "Business", "Education",
  "Lifestyle", "Sports", "Art", "Food",
];

interface FormState {
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: EventCategory;
  date: string;
  location: string;
  price: string;
  isFree: boolean;
  imageUrl: string;
  venue: string;
  eventType: string;
  organizer: string;
}

const INITIAL: FormState = {
  title: "", shortDescription: "", fullDescription: "",
  category: "Technology", date: "", location: "", price: "",
  isFree: false, imageUrl: "", venue: "", eventType: "In-Person", organizer: "",
};

interface FieldError { [key: string]: string }

function validate(f: FormState): FieldError {
  const errs: FieldError = {};
  if (!f.title.trim())             errs.title = "Title is required.";
  if (!f.shortDescription.trim())  errs.shortDescription = "Short description is required.";
  if (!f.fullDescription.trim())   errs.fullDescription = "Full description is required.";
  if (!f.date)                     errs.date = "Date is required.";
  else if (new Date(f.date) < new Date(new Date().toDateString()))
                                   errs.date = "Date must be today or in the future.";
  if (!f.location.trim())          errs.location = "Location is required.";
  if (!f.isFree) {
    const p = parseFloat(f.price);
    if (isNaN(p) || p < 0)         errs.price = "Enter a valid price (0 or more).";
  }
  if (f.imageUrl && !f.imageUrl.startsWith("http"))
    errs.imageUrl = "Image URL must start with http.";
  return errs;
}

export default function AddEventClient() {
  return (
    <ProtectedRoute>
      <AddEventForm />
    </ProtectedRoute>
  );
}

function AddEventForm() {
  const router = useRouter();
  const { user } = useAuth();

  const [form, setForm]       = useState<FormState>(INITIAL);
  const [errors, setErrors]   = useState<FieldError>({});
  const [loading, setLoading] = useState(false);

  const set = (key: keyof FormState, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setLoading(true);
    try {
      const id = generateEventId(form.title);
      const event: EventItem = {
        id,
        title:            form.title.trim(),
        shortDescription: form.shortDescription.trim(),
        fullDescription:  form.fullDescription.trim(),
        category:         form.category,
        date:             form.date,
        location:         form.location.trim(),
        price:            form.isFree ? 0 : parseFloat(form.price) || 0,
        isFree:           form.isFree,
        imageUrl:         form.imageUrl.trim() || undefined,
        organizerId:      user!.uid,
        organizer:        form.organizer.trim() || user!.displayName || "Unknown",
        venue:            form.venue.trim() || undefined,
        eventType:        form.eventType,
        createdAt:        new Date().toISOString(),
      };
      saveUserEvent(event);
      toast.success("Event published successfully!");
      router.push(`/items/${id}`);
    } catch {
      toast.error("Failed to save event. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const Field = ({
    id, label, required, error, children,
  }: {
    id: string; label: string; required?: boolean; error?: string; children: React.ReactNode;
  }) => (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-slate-700 mb-1.5">
        {label} {required && <span className="text-rose-500">*</span>}
      </label>
      {children}
      {error && <p className="text-xs text-rose-600 mt-1">{error}</p>}
    </div>
  );

  const inputCls = (err?: string) =>
    `w-full px-4 py-2.5 rounded-xl border text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 transition-colors ${
      err ? "border-rose-300 focus:ring-rose-400" : "border-slate-200 focus:ring-violet-500 focus:border-transparent"
    }`;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">

      {/* Header */}
      <div className="mb-8">
        <p className="text-xs font-semibold text-violet-600 uppercase tracking-widest mb-2">Publish</p>
        <h1 className="text-3xl font-extrabold text-slate-900 mb-1">Add a new event</h1>
        <p className="text-slate-500 text-sm">Fill in the details below. Events are saved locally in your browser.</p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-5">

        {/* Title */}
        <Field id="ev-title" label="Event title" required error={errors.title}>
          <input
            id="ev-title" type="text" required placeholder="e.g. Next.js Workshop 2026"
            value={form.title} onChange={(e) => set("title", e.target.value)}
            disabled={loading} className={inputCls(errors.title)}
          />
        </Field>

        {/* Short description */}
        <Field id="ev-short" label="Short description" required error={errors.shortDescription}>
          <input
            id="ev-short" type="text" required placeholder="One compelling sentence about your event"
            value={form.shortDescription} onChange={(e) => set("shortDescription", e.target.value)}
            disabled={loading} className={inputCls(errors.shortDescription)}
            maxLength={140}
          />
          <p className="text-xs text-slate-400 mt-1">{form.shortDescription.length}/140</p>
        </Field>

        {/* Full description */}
        <Field id="ev-full" label="Full description" required error={errors.fullDescription}>
          <textarea
            id="ev-full" required rows={5}
            placeholder="Describe your event in detail — agenda, speakers, what attendees will gain…"
            value={form.fullDescription} onChange={(e) => set("fullDescription", e.target.value)}
            disabled={loading} className={`${inputCls(errors.fullDescription)} resize-none`}
          />
        </Field>

        {/* Category + Event type */}
        <div className="grid grid-cols-2 gap-4">
          <Field id="ev-cat" label="Category" required>
            <select
              id="ev-cat" value={form.category} onChange={(e) => set("category", e.target.value as EventCategory)}
              disabled={loading} className={inputCls()}
            >
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </Field>
          <Field id="ev-type" label="Format" required>
            <select
              id="ev-type" value={form.eventType} onChange={(e) => set("eventType", e.target.value)}
              disabled={loading} className={inputCls()}
            >
              {["In-Person", "Online", "Hybrid"].map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </Field>
        </div>

        {/* Date + Location */}
        <div className="grid grid-cols-2 gap-4">
          <Field id="ev-date" label="Event date" required error={errors.date}>
            <input
              id="ev-date" type="date" required
              min={new Date().toISOString().split("T")[0]}
              value={form.date} onChange={(e) => set("date", e.target.value)}
              disabled={loading} className={inputCls(errors.date)}
            />
          </Field>
          <Field id="ev-loc" label="Location" required error={errors.location}>
            <input
              id="ev-loc" type="text" required placeholder="City or 'Online'"
              value={form.location} onChange={(e) => set("location", e.target.value)}
              disabled={loading} className={inputCls(errors.location)}
            />
          </Field>
        </div>

        {/* Venue + Organizer */}
        <div className="grid grid-cols-2 gap-4">
          <Field id="ev-venue" label="Venue">
            <input
              id="ev-venue" type="text" placeholder="Venue name (optional)"
              value={form.venue} onChange={(e) => set("venue", e.target.value)}
              disabled={loading} className={inputCls()}
            />
          </Field>
          <Field id="ev-org" label="Organiser name">
            <input
              id="ev-org" type="text" placeholder={user?.displayName ?? "Your name"}
              value={form.organizer} onChange={(e) => set("organizer", e.target.value)}
              disabled={loading} className={inputCls()}
            />
          </Field>
        </div>

        {/* Price */}
        <Field id="ev-price" label="Price" required error={errors.price}>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer select-none text-sm text-slate-700">
              <input
                type="checkbox" checked={form.isFree}
                onChange={(e) => set("isFree", e.target.checked)}
                className="w-4 h-4 rounded accent-violet-600"
              />
              Free event
            </label>
            {!form.isFree && (
              <div className="flex-1 relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">৳</span>
                <input
                  id="ev-price" type="number" min="0" step="1" placeholder="500"
                  value={form.price} onChange={(e) => set("price", e.target.value)}
                  disabled={loading} className={`${inputCls(errors.price)} pl-7`}
                />
              </div>
            )}
          </div>
        </Field>

        {/* Image URL */}
        <Field id="ev-img" label="Cover image URL" error={errors.imageUrl}>
          <div className="relative">
            <ImageIcon size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              id="ev-img" type="url" placeholder="https://images.unsplash.com/…"
              value={form.imageUrl} onChange={(e) => set("imageUrl", e.target.value)}
              disabled={loading} className={`${inputCls(errors.imageUrl)} pl-10`}
            />
          </div>
          <p className="text-xs text-slate-400 mt-1">Use an Unsplash or other public image URL. Leave blank for a default.</p>
        </Field>

        {/* Submit */}
        <div className="pt-2">
          <button
            type="submit" disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-violet-600 text-white text-sm font-semibold hover:bg-violet-700 transition-colors shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <><span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" /> Publishing…</>
            ) : (
              <><PlusCircle size={16} /> Publish event</>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
