import Link from "next/link";
import { Zap, Mail } from "lucide-react";

const FOOTER_LINKS = {
  platform: [
    { label: "Explore Events", href: "/items" },
    { label: "Add an Event",   href: "/items/add" },
    { label: "Manage Events",  href: "/items/manage" },
    { label: "About",          href: "/about" },
  ],
  categories: [
    { label: "Technology", href: "/items?category=Technology" },
    { label: "Music",      href: "/items?category=Music" },
    { label: "Business",   href: "/items?category=Business" },
    { label: "Education",  href: "/items?category=Education" },
    { label: "Lifestyle",  href: "/items?category=Lifestyle" },
  ],
  account: [
    { label: "Log in",   href: "/login" },
    { label: "Register", href: "/register" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-8 sm:px-6 lg:px-8">

        {/* Main footer */}
        <div className="mb-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>
            <Link href="/" className="mb-4 flex w-fit items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600">
                <Zap size={16} className="text-white" strokeWidth={2.5} />
              </div>
              <span className="text-lg font-bold text-white">Eventora</span>
            </Link>

            <p className="mb-5 text-sm leading-relaxed text-slate-400">
              Discover and share extraordinary events happening around you,
              from technology summits to music festivals and community experiences.
            </p>

            <a
              href="mailto:hello@eventora.io"
              aria-label="Email Eventora"
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800 transition-colors hover:bg-violet-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
            >
              <Mail size={16} />
            </a>
          </div>

          {/* Platform */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-white">
              Platform
            </h3>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.platform.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-slate-400 transition-colors hover:text-violet-400 focus-visible:outline-none focus-visible:text-violet-400"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-white">
              Browse Categories
            </h3>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.categories.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-slate-400 transition-colors hover:text-violet-400 focus-visible:outline-none focus-visible:text-violet-400"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-white">
              Account
            </h3>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.account.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-slate-400 transition-colors hover:text-violet-400 focus-visible:outline-none focus-visible:text-violet-400"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-800 pt-8 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} Eventora. All rights reserved.
          </p>
          <p className="text-xs leading-relaxed text-slate-500">
            Event data is stored locally in this browser and is not shared across users or devices.
          </p>
        </div>
      </div>
    </footer>
  );
}
