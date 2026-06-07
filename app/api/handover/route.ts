import { getDb } from "@/lib/db";
import { HandoverSchema } from "@/lib/schemas";
import { ok, created, badRequest, serverError } from "@/lib/response";
import { writeAuditLog } from "@/lib/audit";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const semesterId = searchParams.get("semesterId");
    const filter = semesterId ? { semesterId } : {};

    const db = await getDb();
    const notes = await db
      .collection("handoverNotes")
      .find(filter)
      .sort({ createdAt: -1 })
      .toArray();

    return ok(notes, { total: notes.length });
  } catch (e) {
    return serverError(e);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = HandoverSchema.safeParse(body);
    if (!parsed.success) return badRequest(parsed.error.message);

    const now = new Date().toISOString();
    const doc = { ...parsed.data, createdAt: now, updatedAt: now };
    const db = await getDb();
    const result = await db.collection("handoverNotes").insertOne(doc);

    await writeAuditLog({
      action: "Created Handover Note",
      detail: `${parsed.data.eventName} — ${parsed.data.semesterName}`,
      performedBy: parsed.data.author,
      risk: "low",
      collection: "handoverNotes",
      documentId: result.insertedId.toString(),
    });

    return created({ _id: result.insertedId, ...doc });
  } catch (e) {
    return serverError(e);
  }
}
