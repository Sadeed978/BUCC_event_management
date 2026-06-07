import { MdAdd, MdCalendarMonth } from "react-icons/md";

export default function SemestersPage() {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div />
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1a3353] text-white text-sm font-medium hover:bg-[#142843] transition-colors">
          <MdAdd size={16} />
          + New Semester
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-[#e2e8f0] mb-6">
        {[
          { label: "Active Semester", emoji: "🟢" },
          { label: "Past Semesters", emoji: "📁" },
        ].map((tab, i) => (
          <button
            key={tab.label}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors
              ${i === 0
                ? "border-[#1a3353] text-[#1a3353]"
                : "border-transparent text-[#64748b] hover:text-[#1e293b]"
              }`}
          >
            <span>{tab.emoji}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Empty state */}
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-16 h-16 rounded-2xl bg-[#f1f5f9] border border-[#e2e8f0] flex items-center justify-center mb-4">
          <MdCalendarMonth size={28} className="text-[#94a3b8]" />
        </div>
        <p className="text-sm font-medium text-[#64748b]">No active semester.</p>
        <p className="text-xs text-[#94a3b8] mt-1">Create a semester to get started.</p>
      </div>
    </div>
  );
}
