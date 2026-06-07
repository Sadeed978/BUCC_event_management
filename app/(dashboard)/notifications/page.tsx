import PageHeader from "@/app/_components/PageHeader";
import Badge from "@/app/_components/Badge";
import {
  MdEvent,
  MdAccountBalance,
  MdGroups,
  MdCalendarMonth,
  MdCheckCircle,
  MdNotificationsActive,
  MdDeleteSweep,
} from "react-icons/md";

type NotificationType = "event" | "budget" | "meeting" | "semester" | "approval";

const typeIcon: Record<NotificationType, React.ReactNode> = {
  event: <MdEvent size={15} className="text-indigo-400" />,
  budget: <MdAccountBalance size={15} className="text-emerald-400" />,
  meeting: <MdGroups size={15} className="text-amber-400" />,
  semester: <MdCalendarMonth size={15} className="text-sky-400" />,
  approval: <MdNotificationsActive size={15} className="text-rose-400" />,
};

const typeVariant: Record<NotificationType, "indigo" | "success" | "warning" | "info" | "danger"> = {
  event: "indigo",
  budget: "success",
  meeting: "warning",
  semester: "info",
  approval: "danger",
};

type Notification = {
  id: number;
  type: NotificationType;
  title: string;
  body: string;
  time: string;
  read: boolean;
};

const notifications: Notification[] = [
  { id: 1, type: "approval", title: "Event Approval Required", body: "Tech Fest 2027 is awaiting your approval.", time: "2 hours ago", read: false },
  { id: 2, type: "budget", title: "Budget Approved", body: "Career Fair budget of ৳45,000 has been approved by Treasurer.", time: "5 hours ago", read: false },
  { id: 3, type: "event", title: "New Event Submitted", body: "Python Bootcamp has been submitted for review.", time: "1 day ago", read: false },
  { id: 4, type: "meeting", title: "Meeting Reminder", body: "Monthly committee meeting tomorrow at 5:00 PM — SAC Room 204", time: "1 day ago", read: true },
  { id: 5, type: "semester", title: "Semester Deadline", body: "Spring 2027 ends in 68 days. Start planning semester close.", time: "2 days ago", read: true },
  { id: 6, type: "approval", title: "Vendor Invoice Pending", body: "XYZ Print House invoice ৳8,500 needs Treasurer confirmation.", time: "3 days ago", read: true },
  { id: 7, type: "event", title: "Event Completed", body: "ML Workshop marked as Completed with 85 attendees.", time: "5 days ago", read: true },
  { id: 8, type: "budget", title: "Budget Alert", body: "Career Fair expense has reached 71% of allocated budget.", time: "6 days ago", read: true },
];

export default function NotificationsPage() {
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Notifications"
        description="Stay updated on events, approvals, budgets, and meetings."
        badge={unread > 0 ? `${unread} unread` : undefined}
        action={
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#242736] border border-[#2e3248] text-xs text-[#8b929e] hover:text-white transition-colors">
            <MdDeleteSweep size={14} />
            Mark all read
          </button>
        }
      />

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {["All", "Unread", "Events", "Budget", "Meetings", "Approvals"].map((tab) => (
          <button
            key={tab}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors
              ${tab === "All"
                ? "bg-indigo-500/20 text-indigo-400 border-indigo-500/30"
                : "bg-[#1a1d27] text-[#8b929e] border-[#2e3248] hover:text-white hover:border-[#3e4258]"
              }`}
          >
            {tab}
            {tab === "Unread" && unread > 0 && (
              <span className="ml-1.5 px-1.5 py-0.5 rounded-full bg-rose-500/20 text-rose-400 text-[10px]">
                {unread}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Notification list */}
      <div className="space-y-2">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`flex gap-4 p-4 rounded-xl border transition-colors cursor-pointer
              ${n.read
                ? "bg-[#1a1d27] border-[#2e3248] hover:border-[#3e4258]"
                : "bg-indigo-500/5 border-indigo-500/20 hover:border-indigo-500/40"
              }`}
          >
            <div className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 mt-0.5
              ${n.read ? "bg-[#242736] border-[#2e3248]" : "bg-indigo-500/10 border-indigo-500/20"}`}>
              {typeIcon[n.type]}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <p className={`text-sm font-medium ${n.read ? "text-[#c9d1d9]" : "text-white"}`}>
                      {n.title}
                    </p>
                    {!n.read && <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />}
                  </div>
                  <p className="text-xs text-[#8b929e] mt-0.5">{n.body}</p>
                </div>
                <Badge variant={typeVariant[n.type]}>
                  {n.type.charAt(0).toUpperCase() + n.type.slice(1)}
                </Badge>
              </div>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-[10px] text-[#8b929e]">{n.time}</span>
                {!n.read && (
                  <button className="flex items-center gap-1 text-[10px] text-indigo-400 hover:text-indigo-300">
                    <MdCheckCircle size={11} />
                    Mark as read
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
