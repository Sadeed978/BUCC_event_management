"use client";

import { useState, useEffect, use } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";
import EventCard from "@/components/events/EventCard";
import { getAllEvents } from "@/lib/eventora-storage";
import type { EventItem, EventCategory } from "@/lib/eventora-types";

const CATEGORIES: EventCategory[] = [
  "Technology", "Music", "Business", "Education",
  "Lifestyle", "Sports", "Art", "Food",
];

const PRICE_FILTERS = [
  { label: "All",  value: "all" },
  { label: "Free", value: "free" },
  { label: "Paid", value: "paid" },
];

const SORT_OPTIONS = [
  { label: "Newest first", value: "newest" },
  { label: "Oldest first", value: "oldest" },
  { label: "Price: low → high", value: "price-asc" },
  { label: "Price: high → low", value: "price-desc" },
];

export default function EventsClient() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") ?? "all";

  const [events, setEvents]         = useState<EventItem[]>([]);
  const [query, setQuery]           = useState("");
  const [category, setCategory]     = useState(initialCategory);
  const [priceFilter, setPriceFilter] = useState("all");
  const [sort, setSort]             = useState("newest");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setEvents(getAllEvents());
  }, []);

  // Sync URL category param
  useEffect(() => {
    const cat = searchParams.get("category") ?? "all";
    setCategory(cat);
  }, [searchParams]);

  const filtered = events
    .filter((e) => {
      const q = query.toLowerCase();
      const matchSearch =
        !q ||
        e.title.toLowerCase().includes(q) ||
        e.shortDescription.toLowerCase().includes(q) ||
        e.category.toLowerCase().includes(q) ||
        e.location.toLowerCase().includes(q);
      const matchCategory = category === "all" || e.category === category;
      const matchPrice =
        priceFilter === "all" ||
        (priceFilter === "free" && e.isFree) ||
        (priceFilter === "paid" && !e.isFree);
      return matchSearch && matchCategory && matchPrice;
    })
    .sort((a, b) => {
      if (sort === "oldest")     return new Date(a.date).getTime() - new Date(b.date).getTime();
      if (sort === "newest")     return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (sort === "price-asc")  return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      return 0;
    });

  const hasFilters = query || category !== "all" || priceFilter !== "all";

  const clearFilters = () => {
    setQuery("");
    setCategory("all");
    setPriceFilter("all");
    setSort("newest");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

      {/* Header */}
      <div className="mb-10">
        <p className="text-xs font-semibold text-violet-600 uppercase tracking-widest mb-2">Discover</p>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-2">Explore Events</h1>
        <p className="text-slate-500 max-w-xl">
          {events.length} events across 8 categories — search, filter, and find something worth your time.
        </p>
      </div>

      {/* Search + controls */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        {/* Search bar */}
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            placeholder="Search events, categories, locations…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
          />
        </div>

        {/* Sort */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-violet-500 cursor-pointer"
          aria-label="Sort events"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>

        {/* Mobile filter toggle */}
        <button
          onClick={() => setShowFilters((v) => !v)}
          className="sm:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-700"
        >
          <SlidersHorizontal size={15} />
          Filters
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-6">

        {/* Sidebar filters */}
        <aside className={`${showFilters ? "block" : "hidden"} sm:block sm:w-52 shrink-0`}>
          <div className="bg-white rounded-2xl border border-slate-100 p-5 space-y-6 sticky top-20">

            {/* Category filter */}
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">Category</p>
              <div className="space-y-1">
                <button
                  onClick={() => setCategory("all")}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-sm transition-colors ${
                    category === "all"
                      ? "bg-violet-50 text-violet-700 font-semibold"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  All Categories
                </button>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-sm transition-colors ${
                      category === cat
                        ? "bg-violet-50 text-violet-700 font-semibold"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Price filter */}
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">Price</p>
              <div className="space-y-1">
                {PRICE_FILTERS.map(({ label, value }) => (
                  <button
                    key={value}
                    onClick={() => setPriceFilter(value)}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-sm transition-colors ${
                      priceFilter === value
                        ? "bg-violet-50 text-violet-700 font-semibold"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Clear */}
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1.5 text-xs text-rose-600 hover:text-rose-700 font-medium"
              >
                <X size={13} /> Clear all filters
              </button>
            )}
          </div>
        </aside>

        {/* Grid */}
        <div className="flex-1">
          {/* Active filter pills */}
          {hasFilters && (
            <div className="flex flex-wrap gap-2 mb-5">
              {query && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-violet-50 text-violet-700 text-xs font-medium border border-violet-200">
                  "{query}"
                  <button onClick={() => setQuery("")} aria-label="Remove search filter"><X size={11} /></button>
                </span>
              )}
              {category !== "all" && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-violet-50 text-violet-700 text-xs font-medium border border-violet-200">
                  {category}
                  <button onClick={() => setCategory("all")} aria-label="Remove category filter"><X size={11} /></button>
                </span>
              )}
              {priceFilter !== "all" && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-violet-50 text-violet-700 text-xs font-medium border border-violet-200">
                  {priceFilter === "free" ? "Free" : "Paid"}
                  <button onClick={() => setPriceFilter("all")} aria-label="Remove price filter"><X size={11} /></button>
                </span>
              )}
            </div>
          )}

          <p className="text-xs text-slate-400 mb-5 font-medium">
            {filtered.length} result{filtered.length !== 1 ? "s" : ""}
          </p>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
                <Search size={24} className="text-slate-400" />
              </div>
              <p className="font-semibold text-slate-700 mb-1">No events found</p>
              <p className="text-sm text-slate-400 mb-4">Try adjusting your search or clearing filters.</p>
              <button
                onClick={clearFilters}
                className="px-4 py-2 rounded-lg bg-violet-600 text-white text-sm font-medium hover:bg-violet-700 transition-colors"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
