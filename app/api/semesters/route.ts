import { getDb } from "@/lib/db";
import { SemesterSchema } from "@/lib/schemas";
import { ok, created, badRequest, serverError } from "@/lib/response";
import { writeAuditLog } from "@/lib/audit";

export async function GET() {
  try {
    const db = await getDb();
    const semesters = await db
      .collection("semesters")
      .find({})
      .sort({ year: -1, startDate: -1 })
      .toArray();
    return ok(semesters, { total: semesters.length });
  } catch (e) {
    return serverError(e);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = SemesterSchema.safeParse(body);
    if (!parsed.success) return badRequest(parsed.error.message);

    const now = new Date().toISOString();
    const db = await getDb();

    // Only one semester can be active at a time
    if (parsed.data.status === "active") {
      await db
        .collection("semesters")
        .updateMany({ status: "active" }, { $set: { status: "completed", updatedAt: now } });
    }

    const doc = { ...parsed.data, createdAt: now, updatedAt: now };
    const result = await db.collection("semesters").insertOne(doc);

    await writeAuditLog({
      action: "Created Semester",
      detail: parsed.data.name,
      performedBy: "system",
      risk: "low",
      collection: "semesters",
      documentId: result.insertedId.toString(),
    });

    return created({ _id: result.insertedId, ...doc });
  } catch (e) {
    return serverError(e);
  }
}
