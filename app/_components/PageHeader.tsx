import { type ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: ReactNode;
  badge?: string;
}

export default function PageHeader({ title, description, action, badge }: PageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold text-[#1e293b]">{title}</h2>
          {badge && (
            <span className="px-2 py-0.5 rounded-full bg-[#1a3353]/10 text-[#1a3353] text-xs font-medium border border-[#1a3353]/20">
              {badge}
            </span>
          )}
        </div>
        {description && <p className="text-sm text-[#64748b] mt-1">{description}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
