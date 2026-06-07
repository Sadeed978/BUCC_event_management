import { getDb } from "@/lib/db";
import { MemberSchema } from "@/lib/schemas";
import { ok, created, badRequest, serverError } from "@/lib/response";
import { writeAuditLog } from "@/lib/audit";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const semesterId = searchParams.get("semesterId");
    const role = searchParams.get("role");
    const status = searchParams.get("status");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filter: Record<string, any> = {};
    if (semesterId) filter.semesterId = semesterId;
    if (role) filter.role = role;
    if (status) filter.status = status;

    const db = await getDb();
    const members = await db
      .collection("members")
      .find(filter)
      .sort({ name: 1 })
      .toArray();

    return ok(members, { total: members.length });
  } catch (e) {
    return serverError(e);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = MemberSchema.safeParse(body);
    if (!parsed.success) return badRequest(parsed.error.message);

    const db = await getDb();
    const exists = await db
      .collection("members")
      .findOne({ studentId: parsed.data.studentId, semesterId: parsed.data.semesterId });
    if (exists) return badRequest("Member with this student ID already exists for this semester");

    const now = new Date().toISOString();
    const doc = { ...parsed.data, createdAt: now, updatedAt: now };
    const result = await db.collection("members").insertOne(doc);

    await writeAuditLog({
      action: "Added Member",
      detail: `${parsed.data.name} (${parsed.data.studentId})`,
      performedBy: "system",
      risk: "low",
      collection: "members",
      documentId: result.insertedId.toString(),
    });

    return created({ _id: result.insertedId, ...doc });
  } catch (e) {
    return serverError(e);
  }
}
