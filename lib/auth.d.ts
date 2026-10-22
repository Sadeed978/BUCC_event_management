/**
 * lib/auth.d.ts — Augment NextAuth types so session.user.id and
 * session.user.role are strongly typed throughout the codebase.
 */

import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface User {
    id:   string;
    role: string;
  }

  interface Session {
    user: {
      id:    string;
      name:  string | null;
      email: string | null;
      image: string | null;
      role:  string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id:   string;
    role: string;
  }
}
