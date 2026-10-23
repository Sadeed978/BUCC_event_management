/**
 * lib/apiAuth.ts — Firebase server-side auth guard for API routes.
 */

 import { NextResponse } from "next/server";

 export type FirebaseSession = {
   user: {
     id: string;
     email?: string;
     name?: string;
     role?: string;
   };
 };
 
 async function getFirebaseSession(): Promise<FirebaseSession | null> {
  const { headers } = await import("next/headers");
  const authHeader = (await headers()).get("authorization");
 
   if (!authHeader?.startsWith("Bearer ")) {
     return null;
   }
 
   const idToken = authHeader.substring(7);
 
   try {
     const response = await fetch(
       `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`,
       {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify({
           idToken,
         }),
         cache: "no-store",
       }
     );
 
     if (!response.ok) {
       return null;
     }
 
     const data = await response.json();
     const firebaseUser = data.users?.[0];
 
     if (!firebaseUser) {
       return null;
     }
 
     let claims: Record<string, unknown> = {};
 
     try {
       const payload = idToken.split(".")[1];
       if (payload) {
         claims = JSON.parse(
           Buffer.from(payload, "base64url").toString("utf8")
         );
       }
     } catch {
       // Ignore invalid optional claims.
     }
 
     return {
       user: {
         id: firebaseUser.localId,
         email: firebaseUser.email,
         name: firebaseUser.displayName,
         role: typeof claims.role === "string" ? claims.role : "",
       },
     };
   } catch {
     return null;
   }
 }
 
 /**
  * Returns the authenticated Firebase session or a 401 response.
  */
 export async function requireSession(): Promise<
   FirebaseSession | NextResponse
 > {
   const session = await getFirebaseSession();
 
   if (!session) {
     return NextResponse.json(
       { success: false, error: "Unauthorized — please sign in." },
       { status: 401 }
     );
   }
 
   return session;
 }
 
 /**
  * Returns the Firebase session and enforces one of the allowed roles.
  */
 export async function requireRole(
   allowedRoles: string[]
 ): Promise<FirebaseSession | NextResponse> {
   const result = await requireSession();
 
   if (result instanceof NextResponse) {
     return result;
   }
 
   if (!allowedRoles.includes(result.user.role ?? "")) {
     return NextResponse.json(
       {
         success: false,
         error: `Forbidden — requires one of: ${allowedRoles.join(", ")}.`,
       },
       { status: 403 }
     );
   }
 
   return result;
 }