type Variant = "success" | "warning" | "danger" | "info" | "purple" | "neutral" | "indigo";

const variants: Record<Variant, string> = {
  success: "bg-emerald-50 text-emerald-700 border-emerald-200",
  warning: "bg-amber-50 text-amber-700 border-amber-200",
  danger:  "bg-rose-50 text-rose-700 border-rose-200",
  info:    "bg-sky-50 text-sky-700 border-sky-200",
  purple:  "bg-violet-50 text-violet-700 border-violet-200",
  neutral: "bg-slate-100 text-slate-600 border-slate-200",
  indigo:  "bg-[#1a3353]/8 text-[#1a3353] border-[#1a3353]/20",
};

interface BadgeProps {
  children: React.ReactNode;
  variant?: Variant;
}

export default function Badge({ children, variant = "neutral" }: BadgeProps) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${variants[variant]}`}>
      {children}
    </span>
  );
}
