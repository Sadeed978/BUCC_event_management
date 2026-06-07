import { getDb } from "@/lib/db";
import { ok, badRequest, serverError } from "@/lib/response";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q")?.trim();
    if (!q || q.length < 2) return badRequest("Query must be at least 2 characters");

    const regex = { $regex: q, $options: "i" };
    const db = await getDb();

    const [events, members, sponsors, vendors, semesters] = await Promise.all([
      db.collection("events").find({ eventName: regex }).limit(5).toArray(),
      db.collection("members").find({ name: regex }).limit(5).toArray(),
      db.collection("sponsors").find({ companyName: regex }).limit(5).toArray(),
      db.collection("vendors").find({ vendorName: regex }).limit(5).toArray(),
      db.collection("semesters").find({ name: regex }).limit(3).toArray(),
    ]);

    const results = [
      ...events.map((e) => ({ type: "event", title: e.eventName, subtitle: `${e.eventType} · ${e.semesterName}`, meta: `Status: ${e.status}` })),
      ...members.map((m) => ({ type: "member", title: m.name, subtitle: `${m.role} · ${m.department} · ${m.batch}`, meta: m.email })),
      ...sponsors.map((s) => ({ type: "sponsor", title: s.companyName, subtitle: `${s.tier} Sponsor`, meta: `${s.sponsoredEvents?.length ?? 0} events · ৳${s.totalValue?.toLocaleString()}` })),
      ...vendors.map((v) => ({ type: "vendor", title: v.vendorName, subtitle: `${v.category} · Rating ${v.rating}`, meta: `Last used: ${v.lastUsed}` })),
      ...semesters.map((s) => ({ type: "semester", title: s.name, subtitle: s.status, meta: `${s.startDate} → ${s.endDate}` })),
    ];

    return ok(results, { total: results.length });
  } catch (e) {
    return serverError(e);
  }
}
