const STATS = [
  { value: "50+",    label: "Events Monthly" },
  { value: "2,400+", label: "Happy Attendees" },
  { value: "8",      label: "Event Categories" },
  { value: "100%",   label: "Free to Discover" },
];

export default function StatsSection() {
  return (
    <section className="bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center text-center">
              <p className="text-3xl font-extrabold text-slate-900 mb-0.5">{value}</p>
              <p className="text-sm text-slate-500">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
