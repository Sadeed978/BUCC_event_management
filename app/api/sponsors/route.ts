import { getDb } from "@/lib/db";
import { SponsorSchema } from "@/lib/schemas";
import { ok, created, badRequest, serverError } from "@/lib/response";
import { writeAuditLog } from "@/lib/audit";

export async function GET() {
  try {
    const db = await getDb();
    const sponsors = await db
      .collection("sponsors")
      .find({})
      .sort({ totalValue: -1 })
      .toArray();
    return ok(sponsors, { total: sponsors.length });
  } catch (e) {
    return serverError(e);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = SponsorSchema.safeParse(body);
    if (!parsed.success) return badRequest(parsed.error.message);

    const now = new Date().toISOString();
    const doc = { ...parsed.data, createdAt: now, updatedAt: now };
    const db = await getDb();
    const result = await db.collection("sponsors").insertOne(doc);

    await writeAuditLog({
      action: "Added Sponsor",
      detail: parsed.data.companyName,
      performedBy: "system",
      risk: "low",
      collection: "sponsors",
      documentId: result.insertedId.toString(),
    });

    return created({ _id: result.insertedId, ...doc });
  } catch (e) {
    return serverError(e);
  }
}
