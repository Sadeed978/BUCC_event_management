import PageHeader from "@/app/_components/PageHeader";
import Badge from "@/app/_components/Badge";
import { MdPeople, MdSecurity, MdHistory, MdSettings, MdPersonOutline } from "react-icons/md";

const auditLogs = [
  { action:"Deleted Event",    detail:"CS Networking Night (Draft)",         by:"Sadeed Ahmed", time:"Mar 12, 2027 14:32", risk:"medium" as const },
  { action:"Created Semester", detail:"Spring 2027 — Active",                by:"Sadeed Ahmed", time:"Jan 14, 2027 09:15", risk:"low"    as const },
  { action:"Modified Budget",  detail:"Career Fair: ৳40,000 → ৳45,000",     by:"Muna Khan",    time:"Feb 28, 2027 16:20", risk:"medium" as const },
  { action:"User Role Changed",detail:"Imran Ali: Executive → Director",      by:"Sadeed Ahmed", time:"Feb 25, 2027 11:45", risk:"high"   as const },
  { action:"Document Deleted", detail:"Draft Proposal v1.pdf",               by:"Rifat Hossain",time:"Feb 20, 2027 10:30", risk:"medium" as const },
];

const rv: Record<"low"|"medium"|"high","success"|"warning"|"danger"> = { low:"success", medium:"warning", high:"danger" };

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Admin Panel" description="User roles, permissions, and full system audit trail." />

      {/* Health */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[{l:"System Status",v:"Operational",c:"text-emerald-600"},{l:"Active Users",v:"148",c:"text-[#1e293b]"},{l:"DB Collections",v:"16",c:"text-[#1e293b]"},{l:"Audit Logs",v:"2,841",c:"text-[#1e293b]"}].map(({l,v,c})=>(
          <div key={l} className="bg-white border border-[#e2e8f0] rounded-xl px-4 py-3 shadow-sm">
            <p className={`text-lg font-bold ${c}`}>{v}</p>
            <p className="text-xs text-[#64748b] mt-0.5">{l}</p>
          </div>
        ))}
      </div>

      {/* Permission matrix */}
      <div className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4"><MdSecurity className="text-[#1a3353]" size={16}/><p className="text-sm font-semibold text-[#1e293b]">Permission Matrix</p></div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead><tr className="border-b border-[#e2e8f0] bg-[#f8fafc]">
              <th className="text-left py-2 pr-4 text-[#64748b] font-semibold">Feature</th>
              {["Super Admin","President","Treasurer","Executive"].map(r=><th key={r} className="text-center py-2 px-3 text-[#64748b] font-semibold whitespace-nowrap">{r}</th>)}
            </tr></thead>
            <tbody>
              {[
                {feature:"View Events",       perms:[true,true,true,true]},
                {feature:"Create Events",     perms:[true,true,true,true]},
                {feature:"Approve Events",    perms:[true,true,false,false]},
                {feature:"Manage Users",      perms:[true,false,false,false]},
                {feature:"Financial Reports", perms:[true,true,true,false]},
                {feature:"Semester Creation", perms:[true,true,false,false]},
                {feature:"View Audit Logs",   perms:[true,false,false,false]},
              ].map(({feature,perms})=>(
                <tr key={feature} className="border-b border-[#f1f5f9] last:border-0">
                  <td className="py-2.5 pr-4 text-[#374151]">{feature}</td>
                  {perms.map((p,i)=><td key={i} className="text-center py-2.5 px-3">{p?<span className="text-emerald-600 font-bold">✓</span>:<span className="text-[#cbd5e1]">—</span>}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* User roles */}
      <div className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4"><MdPeople className="text-sky-600" size={16}/><p className="text-sm font-semibold text-[#1e293b]">User Roles</p></div>
        <div className="space-y-2">
          {[
            {role:"Super Admin",   permissions:"Full access — all modules",             count:1},
            {role:"President",     permissions:"Create & approve events, financials",   count:1},
            {role:"Vice President",permissions:"Manage events and members",             count:2},
            {role:"Treasurer",     permissions:"Full financial access, read events",    count:1},
            {role:"Director",      permissions:"Create events, view reports",           count:8},
            {role:"Senior Exec.",  permissions:"Create & view events",                  count:24},
            {role:"Executive",     permissions:"View events and members",               count:95},
          ].map(({role,permissions,count})=>(
            <div key={role} className="flex items-center justify-between py-2.5 border-b border-[#f1f5f9] last:border-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#f4f6f9] border border-[#e2e8f0] flex items-center justify-center"><MdPersonOutline size={14} className="text-[#64748b]"/></div>
                <div><p className="text-sm font-medium text-[#1e293b]">{role}</p><p className="text-[10px] text-[#64748b]">{permissions}</p></div>
              </div>
              <span className="text-xs text-[#64748b] bg-[#f4f6f9] border border-[#e2e8f0] px-2 py-0.5 rounded-full">{count} {count===1?"user":"users"}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Audit logs */}
      <div className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2"><MdHistory className="text-amber-600" size={16}/><p className="text-sm font-semibold text-[#1e293b]">Audit Logs</p></div>
          <span className="text-xs text-[#64748b]">Recent 5 of 2,841</span>
        </div>
        <div className="space-y-2">
          {auditLogs.map((log,i)=>(
            <div key={i} className="flex items-start gap-3 py-2.5 border-b border-[#f1f5f9] last:border-0">
              <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${log.risk==="high"?"bg-rose-500":log.risk==="medium"?"bg-amber-500":"bg-emerald-500"}`}/>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-[#1e293b]">{log.action}</p>
                  <Badge variant={rv[log.risk]}>{log.risk}</Badge>
                </div>
                <p className="text-xs text-[#64748b] mt-0.5">{log.detail}</p>
                <p className="text-[10px] text-[#94a3b8] mt-0.5">By <span className="text-[#1e293b]">{log.by}</span> · {log.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Settings */}
      <div className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4"><MdSettings className="text-[#64748b]" size={16}/><p className="text-sm font-semibold text-[#1e293b]">System Settings</p></div>
        <div className="grid sm:grid-cols-2 gap-3">
          {["Organization Profile","Email Notifications","MongoDB Configuration","Backup & Export","API Keys","Security & 2FA"].map(s=>(
            <button key={s} className="flex items-center justify-between px-4 py-3 rounded-lg bg-[#f8fafc] border border-[#e2e8f0] hover:border-[#1a3353]/30 hover:bg-white transition-colors text-left">
              <span className="text-sm text-[#374151]">{s}</span>
              <span className="text-[#94a3b8] text-xs">→</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
