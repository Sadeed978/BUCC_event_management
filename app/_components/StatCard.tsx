import { type ReactNode } from "react";

interface StatCardProps {
  label: string;
  value: string | number;
  sub?: string;
  icon: ReactNode;
  trend?: { value: string; up: boolean };
  accent?: string;
}

const accentMap: Record<string, { icon: string; border: string }> = {
  navy:   { icon: "bg-[#1a3353]/10 text-[#1a3353] border-[#1a3353]/20",   border: "border-[#1a3353]/20" },
  emerald:{ icon: "bg-emerald-50 text-emerald-700 border-emerald-200",    border: "border-emerald-200" },
  amber:  { icon: "bg-amber-50 text-amber-700 border-amber-200",          border: "border-amber-200" },
  rose:   { icon: "bg-rose-50 text-rose-700 border-rose-200",             border: "border-rose-200" },
  sky:    { icon: "bg-sky-50 text-sky-700 border-sky-200",                border: "border-sky-200" },
  violet: { icon: "bg-violet-50 text-violet-700 border-violet-200",       border: "border-violet-200" },
};

export default function StatCard({
  label,
  value,
  sub,
  icon,
  trend,
  accent = "navy",
}: StatCardProps) {
  const a = accentMap[accent] ?? accentMap.navy;

  return (
    <div className="bg-white border border-[#e2e8f0] rounded-xl p-5 flex flex-col gap-3 hover:shadow-sm transition-shadow">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-[#64748b] uppercase tracking-wider">
          {label}
        </span>
        <div className={`w-8 h-8 rounded-lg border flex items-center justify-center text-base ${a.icon}`}>
          {icon}
        </div>
      </div>
      <div>
        <p className="text-2xl font-bold text-[#1e293b]">{value}</p>
        {sub && <p className="text-xs text-[#64748b] mt-0.5">{sub}</p>}
      </div>
      {trend && (
        <div className={`text-xs font-medium ${trend.up ? "text-emerald-600" : "text-rose-600"}`}>
          {trend.up ? "↑" : "↓"} {trend.value} vs last semester
        </div>
      )}
    </div>
  );
}
