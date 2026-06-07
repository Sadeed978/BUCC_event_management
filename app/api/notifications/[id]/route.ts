import { getDb } from "@/lib/db";
import { ok, notFound, serverError } from "@/lib/response";
import { ObjectId } from "mongodb";

type Params = { params: Promise<{ id: string }> };

// PATCH /api/notifications/:id — mark single as read
export async function PATCH(_req: Request, { params }: Params) {
  try {
    const { id } = await params;
    const db = await getDb();
    const result = await db
      .collection("notifications")
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: { read: true } },
        { returnDocument: "after" }
      );
    if (!result) return notFound("Notification not found");
    return ok(result);
  } catch (e) {
    return serverError(e);
  }
}
