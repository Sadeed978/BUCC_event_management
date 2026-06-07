import { getDb } from "@/lib/db";
import { SponsorSchema } from "@/lib/schemas";
import { ok, badRequest, notFound, serverError } from "@/lib/response";
import { writeAuditLog } from "@/lib/audit";
import { ObjectId } from "mongodb";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Params) {
  try {
    const { id } = await params;
    const db = await getDb();
    const doc = await db.collection("sponsors").findOne({ _id: new ObjectId(id) });
    if (!doc) return notFound("Sponsor not found");
    return ok(doc);
  } catch (e) {
    return serverError(e);
  }
}

export async function PATCH(request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const body = await request.json();
    const parsed = SponsorSchema.partial().safeParse(body);
    if (!parsed.success) return badRequest(parsed.error.message);

    const now = new Date().toISOString();
    const db = await getDb();
    const result = await db
      .collection("sponsors")
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: { ...parsed.data, updatedAt: now } },
        { returnDocument: "after" }
      );

    if (!result) return notFound("Sponsor not found");

    await writeAuditLog({
      action: "Updated Sponsor",
      detail: String(result.companyName),
      performedBy: "system",
      risk: "low",
      collection: "sponsors",
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
    const doc = await db.collection("sponsors").findOne({ _id: new ObjectId(id) });
    if (!doc) return notFound("Sponsor not found");
    await db.collection("sponsors").deleteOne({ _id: new ObjectId(id) });
    await writeAuditLog({
      action: "Deleted Sponsor",
      detail: String(doc.companyName),
      performedBy: "system",
      risk: "medium",
      collection: "sponsors",
      documentId: id,
    });
    return ok({ deleted: true });
  } catch (e) {
    return serverError(e);
  }
}
