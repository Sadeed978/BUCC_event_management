import { getDb } from "@/lib/db";
import { CommitteeSchema } from "@/lib/schemas";
import { ok, created, badRequest, serverError } from "@/lib/response";
import { writeAuditLog } from "@/lib/audit";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const semesterId = searchParams.get("semesterId");
    const filter = semesterId ? { semesterId } : {};

    const db = await getDb();
    const committees = await db
      .collection("committees")
      .find(filter)
      .sort({ createdAt: -1 })
      .toArray();

    return ok(committees, { total: committees.length });
  } catch (e) {
    return serverError(e);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = CommitteeSchema.safeParse(body);
    if (!parsed.success) return badRequest(parsed.error.message);

    const db = await getDb();
    const exists = await db
      .collection("committees")
      .findOne({ semesterId: parsed.data.semesterId });
    if (exists) return badRequest("Committee for this semester already exists");

    const now = new Date().toISOString();
    const doc = { ...parsed.data, createdAt: now, updatedAt: now };
    const result = await db.collection("committees").insertOne(doc);

    await writeAuditLog({
      action: "Created Committee",
      detail: parsed.data.semesterName,
      performedBy: "system",
      risk: "low",
      collection: "committees",
      documentId: result.insertedId.toString(),
    });

    return created({ _id: result.insertedId, ...doc });
  } catch (e) {
    return serverError(e);
  }
}
