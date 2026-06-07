"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MdDashboard,
  MdEvent,
  MdPeople,
  MdGroups,
  MdAccountBalance,
  MdCalendarMonth,
  MdHandshake,
  MdStorefront,
  MdFolder,
  MdSwapHoriz,
  MdSchool,
  MdBarChart,
  MdNotifications,
  MdSearch,
  MdAdminPanelSettings,
  MdLogout,
  MdPersonOutline,
} from "react-icons/md";
import { useState, useEffect } from "react";

const navGroups = [
  {
    label: "MAIN",
    items: [
      { label: "Dashboard",   href: "/",          icon: MdDashboard },
      { label: "Semesters",   href: "/semesters", icon: MdCalendarMonth },
      { label: "Analytics",   href: "/analytics", icon: MdBarChart },
      { label: "Search",      href: "/search",    icon: MdSearch },
      { label: "Notifications", href: "/notifications", icon: MdNotifications },
    ],
  },
  {
    label: "MEMBERS",
    items: [
      { label: "Panel Member Info",    href: "/members",    icon: MdPersonOutline },
      { label: "Senior Executive Info",href: "/committees", icon: MdGroups },
      { label: "Alumni Archive",       href: "/alumni",     icon: MdSchool },
    ],
  },
  {
    label: "EVENTS",
    items: [
      { label: "Event Control Center", href: "/events",    icon: MdEvent },
      { label: "Financial",            href: "/financial", icon: MdAccountBalance },
      { label: "Sponsors",             href: "/sponsors",  icon: MdHandshake },
      { label: "Vendors",              href: "/vendors",   icon: MdStorefront },
      { label: "Documents",            href: "/documents", icon: MdFolder },
      { label: "Handover",             href: "/handover",  icon: MdSwapHoriz },
      { label: "Admin Panel",          href: "/admin",     icon: MdAdminPanelSettings },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <aside className="flex flex-col shrink-0 w-56 h-screen bg-[#1a3353] overflow-hidden">

      {/* Brand */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-white/10">
        <div className="w-9 h-9 rounded-xl bg-[#234571] flex items-center justify-center text-white font-bold text-sm shrink-0 border border-white/20">
          CC
        </div>
        <div>
          <p className="font-semibold text-white text-sm leading-tight">BRACU Computer</p>
          <p className="text-[11px] text-blue-300 leading-tight">Club</p>
          <p className="text-[10px] text-blue-400/70 leading-tight mt-0.5">Event Management</p>
        </div>
      </div>

      {/* User */}
      <div className="flex items-center gap-3 px-4 py-4 border-b border-white/10">
        <div className="w-8 h-8 rounded-full bg-[#234571] border border-white/20 flex items-center justify-center text-xs font-bold text-white shrink-0">
          SA
        </div>
        <div className="overflow-hidden">
          <p className="text-sm font-medium text-white truncate">Sadeed Ahmed</p>
          <p className="text-[10px] text-blue-300 truncate">Admin</p>
        </div>
      </div>

      {/* Nav groups */}
      <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-5">
        {navGroups.map((group) => (
          <div key={group.label}>
            <p className="text-[10px] font-semibold text-blue-400/60 uppercase tracking-widest px-2 mb-1.5">
              {group.label}
            </p>
            <div className="space-y-0.5">
              {group.items.map(({ label, href, icon: Icon }) => {
                const active = mounted && pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`
                      flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors duration-100
                      ${active
                        ? "bg-white/15 text-white font-medium"
                        : "text-blue-200/80 hover:bg-white/10 hover:text-white"
                      }
                    `}
                  >
                    <Icon size={16} className="shrink-0" />
                    <span className="truncate">{label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Logout */}
      <div className="px-3 pb-4 border-t border-white/10 pt-3">
        <button className="flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-sm text-blue-200/80 hover:bg-white/10 hover:text-white transition-colors">
          <MdLogout size={16} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
