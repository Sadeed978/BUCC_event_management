import { MdEvent } from "react-icons/md";

export default function DashboardPage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#1e293b]">
          Welcome to BUCC Event Management 👋
        </h2>
        <p className="text-sm text-[#64748b] mt-1">
          BRAC University Computer Club — Event Management Department. Here&apos;s a look at our past events.
        </p>
      </div>

      <h3 className="text-base font-semibold text-[#1e293b] mb-4">Past Events Highlights</h3>

      {/* Empty state */}
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 rounded-2xl bg-[#f1f5f9] border border-[#e2e8f0] flex items-center justify-center mb-4">
          <MdEvent size={28} className="text-[#94a3b8]" />
        </div>
        <p className="text-sm font-medium text-[#64748b]">No past events yet.</p>
        <p className="text-xs text-[#94a3b8] mt-1">Events will appear here once they are completed.</p>
      </div>
    </div>
  );
}
