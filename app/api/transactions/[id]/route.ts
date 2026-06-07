import { getDb } from "@/lib/db";
import { TransactionSchema } from "@/lib/schemas";
import { ok, badRequest, notFound, serverError } from "@/lib/response";
import { writeAuditLog } from "@/lib/audit";
import { ObjectId } from "mongodb";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Params) {
  try {
    const { id } = await params;
    const db = await getDb();
    const doc = await db.collection("transactions").findOne({ _id: new ObjectId(id) });
    if (!doc) return notFound("Transaction not found");
    return ok(doc);
  } catch (e) {
    return serverError(e);
  }
}

export async function PATCH(request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const body = await request.json();
    const parsed = TransactionSchema.partial().safeParse(body);
    if (!parsed.success) return badRequest(parsed.error.message);

    const now = new Date().toISOString();
    const db = await getDb();
    const result = await db
      .collection("transactions")
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: { ...parsed.data, updatedAt: now } },
        { returnDocument: "after" }
      );

    if (!result) return notFound("Transaction not found");

    await writeAuditLog({
      action: "Modified Transaction",
      detail: String(result.description),
      performedBy: "system",
      risk: "medium",
      collection: "transactions",
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
    const doc = await db.collection("transactions").findOne({ _id: new ObjectId(id) });
    if (!doc) return notFound("Transaction not found");

    await db.collection("transactions").deleteOne({ _id: new ObjectId(id) });

    await writeAuditLog({
      action: "Deleted Transaction",
      detail: String(doc.description),
      performedBy: "system",
      risk: "high",
      collection: "transactions",
      documentId: id,
    });

    return ok({ deleted: true });
  } catch (e) {
    return serverError(e);
  }
}
