import { getDb } from "@/lib/db";
import { TransactionSchema } from "@/lib/schemas";
import { ok, created, badRequest, serverError } from "@/lib/response";
import { writeAuditLog } from "@/lib/audit";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const semesterId = searchParams.get("semesterId");
    const type = searchParams.get("type");
    const eventId = searchParams.get("eventId");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filter: Record<string, any> = {};
    if (semesterId) filter.semesterId = semesterId;
    if (type) filter.type = type;
    if (eventId) filter.eventId = eventId;

    const db = await getDb();
    const transactions = await db
      .collection("transactions")
      .find(filter)
      .sort({ date: -1 })
      .toArray();

    // Compute summary
    const income = transactions
      .filter((t) => ["Income", "Membership Fee", "Sponsorship", "Donation"].includes(t.type))
      .reduce((s, t) => s + t.amount, 0);
    const expenses = transactions
      .filter((t) => ["Expense", "Purchase", "Reimbursement"].includes(t.type))
      .reduce((s, t) => s + t.amount, 0);

    return ok(
      { transactions, summary: { income, expenses, net: income - expenses } },
      { total: transactions.length }
    );
  } catch (e) {
    return serverError(e);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = TransactionSchema.safeParse(body);
    if (!parsed.success) return badRequest(parsed.error.message);

    const now = new Date().toISOString();
    const doc = { ...parsed.data, createdAt: now, updatedAt: now };
    const db = await getDb();
    const result = await db.collection("transactions").insertOne(doc);

    await writeAuditLog({
      action: `Transaction: ${parsed.data.type}`,
      detail: `${parsed.data.description} — ৳${parsed.data.amount}`,
      performedBy: parsed.data.createdBy,
      risk: "low",
      collection: "transactions",
      documentId: result.insertedId.toString(),
    });

    return created({ _id: result.insertedId, ...doc });
  } catch (e) {
    return serverError(e);
  }
}
