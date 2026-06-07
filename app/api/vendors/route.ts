import { getDb } from "@/lib/db";
import { VendorSchema } from "@/lib/schemas";
import { ok, created, badRequest, serverError } from "@/lib/response";
import { writeAuditLog } from "@/lib/audit";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const status = searchParams.get("status");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filter: Record<string, any> = {};
    if (category) filter.category = category;
    if (status) filter.status = status;

    const db = await getDb();
    const vendors = await db
      .collection("vendors")
      .find(filter)
      .sort({ rating: -1 })
      .toArray();

    return ok(vendors, { total: vendors.length });
  } catch (e) {
    return serverError(e);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = VendorSchema.safeParse(body);
    if (!parsed.success) return badRequest(parsed.error.message);

    const now = new Date().toISOString();
    const doc = { ...parsed.data, createdAt: now, updatedAt: now };
    const db = await getDb();
    const result = await db.collection("vendors").insertOne(doc);

    await writeAuditLog({
      action: "Added Vendor",
      detail: parsed.data.vendorName,
      performedBy: "system",
      risk: "low",
      collection: "vendors",
      documentId: result.insertedId.toString(),
    });

    return created({ _id: result.insertedId, ...doc });
  } catch (e) {
    return serverError(e);
  }
}
