import { getDb } from "@/lib/db";
import { ok, serverError } from "@/lib/response";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") ?? "50");
    const risk = searchParams.get("risk");
    const collection = searchParams.get("collection");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filter: Record<string, any> = {};
    if (risk) filter.risk = risk;
    if (collection) filter.collection = collection;

    const db = await getDb();
    const logs = await db
      .collection("auditLogs")
      .find(filter)
      .sort({ createdAt: -1 })
      .limit(limit)
      .toArray();

    const total = await db.collection("auditLogs").countDocuments(filter);

    return ok(logs, { total });
  } catch (e) {
    return serverError(e);
  }
}
