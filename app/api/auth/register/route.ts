/**
 * app/api/auth/register/route.ts
 *
 * POST /api/auth/register
 * Creates a new BUCC user account.
 *
 * Body (JSON): { name, email, password, role, studentId? }
 *
 * Security:
 * - Validates input with Zod (UserRegisterSchema)
 * - Hashes password with bcryptjs (12 rounds)
 * - Rejects duplicate emails
 * - Never returns passwordHash in the response
 */

import { getDb }           from "@/lib/db";
import { UserRegisterSchema } from "@/lib/schemas";
import { created, badRequest, serverError } from "@/lib/response";
import { writeAuditLog }   from "@/lib/audit";
import bcrypt              from "bcryptjs";

const SALT_ROUNDS = 12;

export async function POST(request: Request) {
  try {
    // ── 1. Parse & validate ────────────────────────────────────────────────
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return badRequest("Request body must be valid JSON.");
    }

    const parsed = UserRegisterSchema.safeParse(body);
    if (!parsed.success) {
      return badRequest(parsed.error.errors.map((e) => e.message).join("; "));
    }

    const { name, email, password, role, studentId } = parsed.data;
    const normalizedEmail = email.toLowerCase().trim();

    // ── 2. Check for duplicate email ───────────────────────────────────────
    const db            = await getDb();
    const existingUser  = await db
      .collection("users")
      .findOne({ email: normalizedEmail });

    if (existingUser) {
      return badRequest("An account with that email already exists.");
    }

    // ── 3. Hash the password ───────────────────────────────────────────────
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    // ── 4. Insert user ─────────────────────────────────────────────────────
    const now  = new Date().toISOString();
    const doc  = {
      name:         name.trim(),
      email:        normalizedEmail,
      passwordHash,
      role,
      studentId:    studentId?.trim() ?? undefined,
      createdAt:    now,
      updatedAt:    now,
    };

    const result = await db.collection("users").insertOne(doc);

    // ── 5. Audit ───────────────────────────────────────────────────────────
    await writeAuditLog({
      action:     "User Registered",
      detail:     `${name} (${normalizedEmail}) registered as ${role}`,
      performedBy: normalizedEmail,
      risk:       "low",
      collection: "users",
      documentId: result.insertedId.toString(),
    });

    // ── 6. Return (never expose passwordHash) ─────────────────────────────
    const { passwordHash: _omit, ...safeDoc } = doc;
    void _omit;

    return created({ _id: result.insertedId, ...safeDoc });
  } catch (e) {
    return serverError(e);
  }
}
