import { getDb } from "@/lib/db";
import { EventSchema } from "@/lib/schemas";
import { ok, badRequest, notFound, serverError } from "@/lib/response";
import { writeAuditLog } from "@/lib/audit";
import { ObjectId } from "mongodb";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Params) {
  try {
    const { id } = await params;
    const db = await getDb();
    const doc = await db.collection("events").findOne({ _id: new ObjectId(id) });
    if (!doc) return notFound("Event not found");
    return ok(doc);
  } catch (e) {
    return serverError(e);
  }
}

export async function PATCH(request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const body = await request.json();
    const parsed = EventSchema.partial().safeParse(body);
    if (!parsed.success) return badRequest(parsed.error.message);

    const now = new Date().toISOString();
    const db = await getDb();
    const result = await db
      .collection("events")
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: { ...parsed.data, updatedAt: now } },
        { returnDocument: "after" }
      );

    if (!result) return notFound("Event not found");

    await writeAuditLog({
      action: "Updated Event",
      detail: String(result.eventName),
      performedBy: body.updatedBy ?? "system",
      risk: "low",
      collection: "events",
      documentId: id,
    });

    return ok(result);
  } catch (e) {
    return serverError(e);
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  try {
    const { id } = await params;
    const db = await getDb();
    const doc = await db.collection("events").findOne({ _id: new ObjectId(id) });
    if (!doc) return notFound("Event not found");

    await db.collection("events").deleteOne({ _id: new ObjectId(id) });

    await writeAuditLog({
      action: "Deleted Event",
      detail: String(doc.eventName),
      performedBy: "system",
      risk: "medium",
      collection: "events",
      documentId: id,
    });

    return ok({ deleted: true });
  } catch (e) {
    return serverError(e);
  }
}
