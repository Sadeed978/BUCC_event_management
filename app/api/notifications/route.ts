import { getDb } from "@/lib/db";
import { NotificationSchema } from "@/lib/schemas";
import { ok, created, badRequest, serverError } from "@/lib/response";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const unreadOnly = searchParams.get("unread") === "true";
    const filter = unreadOnly ? { read: false } : {};

    const db = await getDb();
    const notifications = await db
      .collection("notifications")
      .find(filter)
      .sort({ createdAt: -1 })
      .limit(50)
      .toArray();

    const unreadCount = await db
      .collection("notifications")
      .countDocuments({ read: false });

    return ok({ notifications, unreadCount }, { total: notifications.length });
  } catch (e) {
    return serverError(e);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = NotificationSchema.safeParse(body);
    if (!parsed.success) return badRequest(parsed.error.message);

    const now = new Date().toISOString();
    const doc = { ...parsed.data, createdAt: now };
    const db = await getDb();
    const result = await db.collection("notifications").insertOne(doc);

    return created({ _id: result.insertedId, ...doc });
  } catch (e) {
    return serverError(e);
  }
}

// PATCH /api/notifications — mark all as read
export async function PATCH() {
  try {
    const db = await getDb();
    await db
      .collection("notifications")
      .updateMany({ read: false }, { $set: { read: true } });
    return ok({ updated: true });
  } catch (e) {
    return serverError(e);
  }
}
