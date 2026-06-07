"use client";

import { MdSearch, MdNotifications, MdAddCircleOutline } from "react-icons/md";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";

const pageTitles: Record<string, string> = {
  "/":             "Dashboard",
  "/semesters":    "Semester Management",
  "/events":       "Event Management",
  "/financial":    "Financial Management",
  "/committees":   "Committee Management",
  "/members":      "Member Database",
  "/sponsors":     "Sponsor CRM",
  "/vendors":      "Vendor CRM",
  "/documents":    "Document Repository",
  "/handover":     "Handover System",
  "/alumni":       "Alumni Archive",
  "/analytics":    "Analytics",
  "/notifications":"Notifications",
  "/search":       "Search Center",
  "/admin":        "System Administration",
};

export default function Topbar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const title = mounted ? (pageTitles[pathname] ?? "BUCC OS") : "Dashboard";

  return (
    <header className="h-14 shrink-0 flex items-center justify-between px-6 bg-white border-b border-[#e2e8f0]">
      <h1 className="text-base font-semibold text-[#1e293b]">{title}</h1>

      <div className="flex items-center gap-2">
        {/* Search */}
        <Link
          href="/search"
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#f4f6f9] border border-[#e2e8f0] text-[#64748b] text-xs hover:border-[#1a3353]/30 hover:text-[#1a3353] transition-colors"
        >
          <MdSearch size={14} />
          <span>Search...</span>
          <kbd className="ml-1 text-[10px] px-1 py-0.5 rounded bg-[#e2e8f0]">⌘K</kbd>
        </Link>

        {/* Semester badge */}
        <div className="px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium">
          Spring 2027
        </div>

        {/* Notifications */}
        <Link
          href="/notifications"
          className="relative p-2 rounded-lg text-[#64748b] hover:text-[#1a3353] hover:bg-[#f4f6f9] transition-colors"
          aria-label="Notifications"
        >
          <MdNotifications size={18} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#1a3353]" />
        </Link>

        {/* Role badge */}
        <div className="px-3 py-1.5 rounded-lg bg-[#1a3353] text-white text-xs font-medium">
          Admin
        </div>

        {/* Quick add */}
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1a3353] text-white text-xs font-medium hover:bg-[#142843] transition-colors">
          <MdAddCircleOutline size={14} />
          <span className="hidden sm:inline">New Event</span>
        </button>
      </div>
    </header>
  );
}
