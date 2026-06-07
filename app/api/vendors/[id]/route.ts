import { getDb } from "@/lib/db";
import { VendorSchema } from "@/lib/schemas";
import { ok, badRequest, notFound, serverError } from "@/lib/response";
import { writeAuditLog } from "@/lib/audit";
import { ObjectId } from "mongodb";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Params) {
  try {
    const { id } = await params;
    const db = await getDb();
    const doc = await db.collection("vendors").findOne({ _id: new ObjectId(id) });
    if (!doc) return notFound("Vendor not found");
    return ok(doc);
  } catch (e) {
    return serverError(e);
  }
}

export async function PATCH(request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const body = await request.json();
    const parsed = VendorSchema.partial().safeParse(body);
    if (!parsed.success) return badRequest(parsed.error.message);

    const now = new Date().toISOString();
    const db = await getDb();
    const result = await db
      .collection("vendors")
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: { ...parsed.data, updatedAt: now } },
        { returnDocument: "after" }
      );

    if (!result) return notFound("Vendor not found");
    return ok(result);
  } catch (e) {
    return serverError(e);
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  try {
    const { id } = await params;
    const db = await getDb();
    const doc = await db.collection("vendors").findOne({ _id: new ObjectId(id) });
    if (!doc) return notFound("Vendor not found");
    await db.collection("vendors").deleteOne({ _id: new ObjectId(id) });
    await writeAuditLog({
      action: "Deleted Vendor",
      detail: String(doc.vendorName),
      performedBy: "system",
      risk: "low",
      collection: "vendors",
      documentId: id,
    });
    return ok({ deleted: true });
  } catch (e) {
    return serverError(e);
  }
}
