import { getDb } from "@/lib/db";
import { ok, serverError } from "@/lib/response";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const semesterId = searchParams.get("semesterId");

    const db = await getDb();
    const eventFilter = semesterId ? { semesterId } : {};
    const txFilter = semesterId ? { semesterId } : {};

    const [events, transactions, members] = await Promise.all([
      db.collection("events").find(eventFilter).toArray(),
      db.collection("transactions").find(txFilter).toArray(),
      db.collection("members").find(semesterId ? { semesterId } : {}).toArray(),
    ]);

    // Events by status
    const eventsByStatus = events.reduce((acc: Record<string, number>, e) => {
      acc[e.status] = (acc[e.status] ?? 0) + 1;
      return acc;
    }, {});

    // Events by category
    const eventsByCategory = events.reduce((acc: Record<string, number>, e) => {
      acc[e.eventType] = (acc[e.eventType] ?? 0) + 1;
      return acc;
    }, {});

    // Financial summary
    const income = transactions
      .filter((t) => ["Income", "Membership Fee", "Sponsorship", "Donation"].includes(t.type))
      .reduce((s, t) => s + (t.amount ?? 0), 0);
    const expenses = transactions
      .filter((t) => ["Expense", "Purchase", "Reimbursement"].includes(t.type))
      .reduce((s, t) => s + (t.amount ?? 0), 0);

    // Total attendance
    const totalAttendance = events.reduce((s, e) => s + (e.attendance ?? 0), 0);

    // Members by role
    const membersByRole = members.reduce((acc: Record<string, number>, m) => {
      acc[m.role] = (acc[m.role] ?? 0) + 1;
      return acc;
    }, {});

    return ok({
      events: {
        total: events.length,
        byStatus: eventsByStatus,
        byCategory: eventsByCategory,
        totalAttendance,
        totalBudget: events.reduce((s, e) => s + (e.budget ?? 0), 0),
        totalExpense: events.reduce((s, e) => s + (e.expense ?? 0), 0),
      },
      financial: {
        income,
        expenses,
        net: income - expenses,
        transactionCount: transactions.length,
      },
      members: {
        total: members.length,
        byRole: membersByRole,
        active: members.filter((m) => m.status === "Active").length,
      },
    });
  } catch (e) {
    return serverError(e);
  }
}
