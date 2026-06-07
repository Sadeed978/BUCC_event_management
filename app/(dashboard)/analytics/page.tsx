import PageHeader from "@/app/_components/PageHeader";
import StatCard from "@/app/_components/StatCard";
import { MdBarChart, MdPeople, MdTrendingUp, MdEvent } from "react-icons/md";

const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const eventData = [3, 5, 7, 4, 6, 2, 0, 4, 6, 8, 7, 5];
const attendanceData = [120, 250, 310, 180, 290, 80, 0, 200, 280, 350, 300, 220];
const incomeData = [15000, 28000, 52000, 22000, 38000, 9000, 0, 18000, 42000, 68000, 55000, 32000];

function Bar({ value, max, color }: { value: number; max: number; color: string }) {
  const pct = max > 0 ? (value / max) * 100 : 0;
  return (
    <div className="flex-1 flex flex-col items-center gap-1">
      <div
        className={`w-full rounded-t-sm ${color} hover:opacity-90 transition-opacity cursor-pointer`}
        style={{ height: `${pct}%` }}
        title={`${value}`}
      />
    </div>
  );
}

const topMembers = [
  { name: "Tanvir Sarkar", events: 18, attendance: "94%", dept: "CSE" },
  { name: "Muna Khan", events: 16, attendance: "91%", dept: "CSE" },
  { name: "Nadia Rahman", events: 15, attendance: "88%", dept: "EEE" },
  { name: "Raisa Begum", events: 14, attendance: "85%", dept: "BBA" },
  { name: "Imran Ali", events: 13, attendance: "82%", dept: "CSE" },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Analytics"
        description="Data-driven insights across events, finances, and members."
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Events Per Semester" value="24" sub="Spring 2027 avg" icon={<MdEvent />} trend={{ value: "+4", up: true }} accent="indigo" />
        <StatCard label="Total Attendance" value="2,340" sub="This semester" icon={<MdPeople />} trend={{ value: "+18%", up: true }} accent="sky" />
        <StatCard label="Avg. Budget Use" value="87%" sub="Per event" icon={<MdBarChart />} trend={{ value: "+5%", up: true }} accent="emerald" />
        <StatCard label="Revenue Growth" value="+22%" sub="vs Fall 2026" icon={<MdTrendingUp />} accent="amber" />
      </div>

      {/* Events per month chart */}
      <div className="bg-[#1a1d27] border border-[#2e3248] rounded-xl p-5">
        <div className="flex items-center justify-between mb-1">
          <p className="text-sm font-semibold text-white">Events Per Month</p>
          <span className="text-xs text-[#8b929e]">2027</span>
        </div>
        <p className="text-xs text-[#8b929e] mb-5">Monthly event count across the year</p>
        <div className="flex items-end gap-2 h-36">
          {eventData.map((v, i) => (
            <Bar key={i} value={v} max={Math.max(...eventData)} color="bg-indigo-500/80" />
          ))}
        </div>
        <div className="flex justify-between mt-2 text-[10px] text-[#8b929e]">
          {monthLabels.map((m) => <span key={m}>{m}</span>)}
        </div>
      </div>

      {/* Two charts side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Attendance trend */}
        <div className="bg-[#1a1d27] border border-[#2e3248] rounded-xl p-5">
          <p className="text-sm font-semibold text-white mb-1">Attendance Trend</p>
          <p className="text-xs text-[#8b929e] mb-5">Total attendees per month</p>
          <div className="flex items-end gap-2 h-28">
            {attendanceData.map((v, i) => (
              <Bar key={i} value={v} max={Math.max(...attendanceData)} color="bg-sky-500/70" />
            ))}
          </div>
          <div className="flex justify-between mt-2 text-[10px] text-[#8b929e]">
            {monthLabels.map((m) => <span key={m}>{m}</span>)}
          </div>
        </div>

        {/* Revenue trend */}
        <div className="bg-[#1a1d27] border border-[#2e3248] rounded-xl p-5">
          <p className="text-sm font-semibold text-white mb-1">Income Trend</p>
          <p className="text-xs text-[#8b929e] mb-5">Monthly revenue (BDT)</p>
          <div className="flex items-end gap-2 h-28">
            {incomeData.map((v, i) => (
              <Bar key={i} value={v} max={Math.max(...incomeData)} color="bg-emerald-500/70" />
            ))}
          </div>
          <div className="flex justify-between mt-2 text-[10px] text-[#8b929e]">
            {monthLabels.map((m) => <span key={m}>{m}</span>)}
          </div>
        </div>
      </div>

      {/* Top members */}
      <div className="bg-[#1a1d27] border border-[#2e3248] rounded-xl p-5">
        <p className="text-sm font-semibold text-white mb-4">Attendance Leaderboard</p>
        <div className="space-y-3">
          {topMembers.map((m, i) => (
            <div key={m.name} className="flex items-center gap-4">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0
                ${i === 0 ? "bg-amber-500/20 text-amber-400" : i === 1 ? "bg-[#8b929e]/20 text-[#8b929e]" : i === 2 ? "bg-amber-700/20 text-amber-600" : "bg-[#242736] text-[#8b929e]"}`}>
                {i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm text-white font-medium">{m.name}</p>
                  <p className="text-xs text-[#8b929e]">{m.events} events · {m.attendance}</p>
                </div>
                <div className="h-1.5 rounded-full bg-[#242736] overflow-hidden">
                  <div
                    className={`h-full rounded-full ${i === 0 ? "bg-amber-400" : "bg-indigo-500/60"}`}
                    style={{ width: m.attendance }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Committee growth */}
      <div className="bg-[#1a1d27] border border-[#2e3248] rounded-xl p-5">
        <p className="text-sm font-semibold text-white mb-4">Committee Growth Over Semesters</p>
        <div className="flex items-end gap-4 h-24">
          {[
            { sem: "Sp'24", members: 98 },
            { sem: "Fa'24", members: 108 },
            { sem: "Sp'25", members: 115 },
            { sem: "Fa'25", members: 120 },
            { sem: "Sp'26", members: 128 },
            { sem: "Fa'26", members: 135 },
            { sem: "Sp'27", members: 148, active: true },
          ].map(({ sem, members, active }) => (
            <div key={sem} className="flex-1 flex flex-col items-center gap-2">
              <span className="text-[10px] text-white font-medium">{members}</span>
              <div
                className={`w-full rounded-t-sm ${active ? "bg-indigo-500" : "bg-indigo-500/40"}`}
                style={{ height: `${(members / 150) * 100}%` }}
              />
              <span className="text-[10px] text-[#8b929e]">{sem}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
