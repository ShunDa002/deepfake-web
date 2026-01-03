import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";

// Lightweight auth config for middleware to avoid bundling heavy server-only dependencies
const middlewareAuthConfig: NextAuthConfig = {
  session: { strategy: "jwt" },
  trustHost: true,
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        // Preserve custom fields added during login so downstream middleware consumers keep identity info
        (session.user as any).id = token.sub;
        (session.user as any).role = (token as any).role;
        session.user.name = token.name;
      }
      return session;
    },
  },
};

export const { auth: middlewareAuth } = NextAuth(middlewareAuthConfig);
