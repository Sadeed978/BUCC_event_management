import PageHeader from "@/app/_components/PageHeader";
import Badge from "@/app/_components/Badge";
import {
  MdSearch,
  MdEvent,
  MdPeople,
  MdHandshake,
  MdStorefront,
  MdFolder,
  MdCalendarMonth,
} from "react-icons/md";

type ResultType = "event" | "member" | "sponsor" | "vendor" | "document" | "semester";

const typeIcon: Record<ResultType, React.ReactNode> = {
  event: <MdEvent size={14} className="text-indigo-400" />,
  member: <MdPeople size={14} className="text-sky-400" />,
  sponsor: <MdHandshake size={14} className="text-violet-400" />,
  vendor: <MdStorefront size={14} className="text-amber-400" />,
  document: <MdFolder size={14} className="text-emerald-400" />,
  semester: <MdCalendarMonth size={14} className="text-rose-400" />,
};

const typeVariant: Record<ResultType, "indigo" | "info" | "purple" | "warning" | "success" | "danger"> = {
  event: "indigo",
  member: "info",
  sponsor: "purple",
  vendor: "warning",
  document: "success",
  semester: "danger",
};

type SearchResult = {
  type: ResultType;
  title: string;
  subtitle: string;
  meta: string;
};

const results: SearchResult[] = [
  { type: "event", title: "Tech Fest 2027", subtitle: "Competition · Spring 2027", meta: "Status: Approved" },
  { type: "event", title: "Tech Fest 2026", subtitle: "Competition · Fall 2026", meta: "Status: Completed" },
  { type: "member", title: "Tanvir Sarkar", subtitle: "Director · CSE · Fall 2023", meta: "student@g.bracu.ac.bd" },
  { type: "sponsor", title: "TechCorp Bangladesh Ltd.", subtitle: "Platinum Sponsor", meta: "5 events · ৳2,50,000 total" },
  { type: "document", title: "Tech Fest 2027 Proposal.pdf", subtitle: "Proposal · Spring 2027", meta: "Uploaded Mar 1, 2027" },
  { type: "vendor", title: "XYZ Print House", subtitle: "Printing · Rating 4.8", meta: "Last used: Spring 2027" },
];

const categories = [
  { label: "Events", icon: <MdEvent size={14} />, count: 24 },
  { label: "Members", icon: <MdPeople size={14} />, count: 148 },
  { label: "Sponsors", icon: <MdHandshake size={14} />, count: 12 },
  { label: "Vendors", icon: <MdStorefront size={14} />, count: 23 },
  { label: "Documents", icon: <MdFolder size={14} />, count: 87 },
  { label: "Semesters", icon: <MdCalendarMonth size={14} />, count: 12 },
];

export default function SearchPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Search Center"
        description="Find anything across the entire BUCC OS platform instantly."
      />

      {/* Search input */}
      <div className="relative">
        <MdSearch
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8b929e]"
        />
        <input
          type="text"
          placeholder="Search events, members, sponsors, vendors, documents..."
          defaultValue="Tech Fest"
          className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-[#1a1d27] border border-indigo-500/40 text-white text-sm placeholder-[#8b929e] outline-none focus:border-indigo-500 transition-colors"
        />
        <kbd className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] px-1.5 py-0.5 rounded bg-[#2e3248] text-[#8b929e]">
          ⌘K
        </kbd>
      </div>

      {/* Category shortcuts */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
        {categories.map(({ label, icon, count }) => (
          <button
            key={label}
            className="flex flex-col items-center gap-2 p-3 rounded-xl bg-[#1a1d27] border border-[#2e3248] hover:border-indigo-500/30 transition-colors group"
          >
            <div className="w-9 h-9 rounded-lg bg-[#242736] border border-[#2e3248] flex items-center justify-center group-hover:border-indigo-500/30 transition-colors">
              {icon}
            </div>
            <span className="text-xs text-[#8b929e] group-hover:text-white transition-colors">{label}</span>
            <span className="text-xs font-semibold text-white">{count}</span>
          </button>
        ))}
      </div>

      {/* Results */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-semibold text-white">
            Results for <span className="text-indigo-400">&ldquo;Tech Fest&rdquo;</span>
          </p>
          <span className="text-xs text-[#8b929e]">{results.length} results</span>
        </div>

        <div className="space-y-2">
          {results.map((r, i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-4 rounded-xl bg-[#1a1d27] border border-[#2e3248] hover:border-indigo-500/30 transition-colors cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-xl bg-[#242736] border border-[#2e3248] flex items-center justify-center shrink-0">
                {typeIcon[r.type]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white group-hover:text-indigo-300 transition-colors truncate">
                  {r.title}
                </p>
                <p className="text-xs text-[#8b929e] truncate">{r.subtitle}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs text-[#8b929e] hidden sm:block">{r.meta}</span>
                <Badge variant={typeVariant[r.type]}>
                  {r.type.charAt(0).toUpperCase() + r.type.slice(1)}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
