import { getDb } from "@/lib/db";
import { SemesterSchema } from "@/lib/schemas";
import { ok, badRequest, notFound, serverError } from "@/lib/response";
import { writeAuditLog } from "@/lib/audit";
import { ObjectId } from "mongodb";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Params) {
  try {
    const { id } = await params;
    const db = await getDb();
    const doc = await db.collection("semesters").findOne({ _id: new ObjectId(id) });
    if (!doc) return notFound("Semester not found");
    return ok(doc);
  } catch (e) {
    return serverError(e);
  }
}

export async function PATCH(request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const body = await request.json();
    const parsed = SemesterSchema.partial().safeParse(body);
    if (!parsed.success) return badRequest(parsed.error.message);

    const now = new Date().toISOString();
    const db = await getDb();

    if (parsed.data.status === "active") {
      await db
        .collection("semesters")
        .updateMany(
          { status: "active", _id: { $ne: new ObjectId(id) } },
          { $set: { status: "completed", updatedAt: now } }
        );
    }

    const result = await db
      .collection("semesters")
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: { ...parsed.data, updatedAt: now } },
        { returnDocument: "after" }
      );

    if (!result) return notFound("Semester not found");

    await writeAuditLog({
      action: "Updated Semester",
      detail: String(result.name),
      performedBy: "system",
      risk: "medium",
      collection: "semesters",
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
    const doc = await db.collection("semesters").findOne({ _id: new ObjectId(id) });
    if (!doc) return notFound("Semester not found");

    await db.collection("semesters").deleteOne({ _id: new ObjectId(id) });

    await writeAuditLog({
      action: "Deleted Semester",
      detail: String(doc.name),
      performedBy: "system",
      risk: "high",
      collection: "semesters",
      documentId: id,
    });

    return ok({ deleted: true });
  } catch (e) {
    return serverError(e);
  }
}
