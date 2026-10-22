/**
 * lib/auth.ts — NextAuth v4 configuration shared between the route handler
 * and any server component that calls getServerSession().
 *
 * Strategy: Credentials-only (email + bcrypt password) backed by MongoDB.
 * The JWT carries { id, name, email, role } so every page/layout can
 * read the role without an extra DB round-trip.
 */

import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { getDb } from "@/lib/db";
import type { BuccUser } from "@/lib/types";

export const authOptions: NextAuthOptions = {
  // ── Providers ──────────────────────────────────────────────────────────────
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email:    { label: "Email",    type: "email"    },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required.");
        }

        const db   = await getDb();
        const user = await db
          .collection<BuccUser>("users")
          .findOne({ email: credentials.email.toLowerCase().trim() });

        if (!user) throw new Error("No account found with that email.");

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.passwordHash
        );
        if (!passwordMatch) throw new Error("Incorrect password.");

        // Return the shape NextAuth expects — never include passwordHash
        return {
          id:    user._id!.toString(),
          name:  user.name,
          email: user.email,
          role:  user.role,
        };
      },
    }),
  ],

  // ── Session & JWT ──────────────────────────────────────────────────────────
  session: { strategy: "jwt" },

  callbacks: {
    /** Persist custom fields into the JWT token on first sign-in */
    async jwt({ token, user }) {
      if (user) {
        token.id   = user.id;
        token.role = (user as { id: string; role: string }).role;
      }
      return token;
    },

    /** Expose custom fields in the client-accessible Session object */
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id   = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },

  // ── Pages ──────────────────────────────────────────────────────────────────
  pages: {
    signIn: "/login",
    error:  "/login", // Auth errors redirect back to /login with ?error=
  },

  // ── Secret ─────────────────────────────────────────────────────────────────
  secret: process.env.NEXTAUTH_SECRET,

  // ── Debug ──────────────────────────────────────────────────────────────────
  debug: process.env.NODE_ENV === "development",
};
