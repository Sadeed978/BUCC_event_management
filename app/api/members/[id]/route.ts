import { getDb } from "@/lib/db";
import { MemberSchema } from "@/lib/schemas";
import { ok, badRequest, notFound, serverError } from "@/lib/response";
import { writeAuditLog } from "@/lib/audit";
import { ObjectId } from "mongodb";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Params) {
  try {
    const { id } = await params;
    const db = await getDb();
    const doc = await db.collection("members").findOne({ _id: new ObjectId(id) });
    if (!doc) return notFound("Member not found");
    return ok(doc);
  } catch (e) {
    return serverError(e);
  }
}

export async function PATCH(request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const body = await request.json();
    const parsed = MemberSchema.partial().safeParse(body);
    if (!parsed.success) return badRequest(parsed.error.message);

    const now = new Date().toISOString();
    const db = await getDb();
    const result = await db
      .collection("members")
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: { ...parsed.data, updatedAt: now } },
        { returnDocument: "after" }
      );

    if (!result) return notFound("Member not found");

    if (body.role) {
      await writeAuditLog({
        action: "User Role Changed",
        detail: `${result.name}: → ${body.role}`,
        performedBy: "system",
        risk: "high",
        collection: "members",
        documentId: id,
      });
    }

    return ok(result);
  } catch (e) {
    return serverError(e);
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  try {
    const { id } = await params;
    const db = await getDb();
    const doc = await db.collection("members").findOne({ _id: new ObjectId(id) });
    if (!doc) return notFound("Member not found");

    await db.collection("members").deleteOne({ _id: new ObjectId(id) });

    await writeAuditLog({
      action: "Removed Member",
      detail: `${doc.name} (${doc.studentId})`,
      performedBy: "system",
      risk: "medium",
      collection: "members",
      documentId: id,
    });

    return ok({ deleted: true });
  } catch (e) {
    return serverError(e);
  }
}
