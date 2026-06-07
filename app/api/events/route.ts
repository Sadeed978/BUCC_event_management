import { getDb } from "@/lib/db";
import { EventSchema } from "@/lib/schemas";
import { ok, created, badRequest, serverError } from "@/lib/response";
import { writeAuditLog } from "@/lib/audit";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const semesterId = searchParams.get("semesterId");
    const status = searchParams.get("status");
    const category = searchParams.get("category");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filter: Record<string, any> = {};
    if (semesterId) filter.semesterId = semesterId;
    if (status) filter.status = status;
    if (category) filter.eventType = category;

    const db = await getDb();
    const events = await db
      .collection("events")
      .find(filter)
      .sort({ date: -1 })
      .toArray();

    return ok(events, { total: events.length });
  } catch (e) {
    return serverError(e);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = EventSchema.safeParse(body);
    if (!parsed.success) return badRequest(parsed.error.message);

    const now = new Date().toISOString();
    const doc = { ...parsed.data, createdAt: now, updatedAt: now };
    const db = await getDb();
    const result = await db.collection("events").insertOne(doc);

    await writeAuditLog({
      action: "Created Event",
      detail: parsed.data.eventName,
      performedBy: parsed.data.createdBy,
      risk: "low",
      collection: "events",
      documentId: result.insertedId.toString(),
    });

    return created({ _id: result.insertedId, ...doc });
  } catch (e) {
    return serverError(e);
  }
}
