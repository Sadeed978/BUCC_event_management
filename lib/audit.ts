/**
 * lib/audit.ts — write audit log entries for every mutating action
 */

import { getDb } from "@/lib/db";
import type { AuditRisk } from "@/lib/types";

export async function writeAuditLog({
  action,
  detail,
  performedBy,
  risk = "low",
  collection,
  documentId,
}: {
  action: string;
  detail: string;
  performedBy: string;
  risk?: AuditRisk;
  collection?: string;
  documentId?: string;
}) {
  try {
    const db = await getDb();
    await db.collection("auditLogs").insertOne({
      action,
      detail,
      performedBy,
      risk,
      collection,
      documentId,
      createdAt: new Date().toISOString(),
    });
  } catch {
    // Audit log failure should never break the main operation
    console.error("[audit] Failed to write audit log:", action);
  }
}
