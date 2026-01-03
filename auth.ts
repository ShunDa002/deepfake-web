import NextAuth from "next-auth";
import { prisma } from "@/db/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import { compareSync } from "bcrypt-ts-edge";
import type { NextAuthConfig } from "next-auth";
import { logInFormSchema } from "./lib/validators";
import GoogleProvider from "next-auth/providers/google";

export const config = {
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 1 day
  },
  // Note: PrismaAdapter is removed when using JWT strategy
  // Only use adapter for database sessions (strategy: "database")
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        const validatedData = logInFormSchema.safeParse(credentials);
        if (!validatedData.success) return null;

        const { email, password } = validatedData.data;

        // Find user in database
        const user = await prisma.user.findFirst({
          where: {
            email,
          },
        });

        if (!user || !user.password || !user.email) return null;

        // Check if user exists and if the password matches
        const passwordMatch = compareSync(password, user.password);

        // If password is correct, return user
        if (passwordMatch) {
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          };
        }

        // If user does not exist or password is wrong, return null
        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, user, trigger, token }: any) {
      // Set the user ID from the token
      session.user.id = token.sub;
      session.user.role = token.role;
      session.user.name = token.name;

      // If there is an update, set the user name
      if (trigger === "update") {
        session.user.name = user.name;
      }

      return session;
    },

    async jwt({ token, user, trigger, session }: any) {
      // Assign user fields to token
      if (user) {
        // If user has no name or name is "NO_NAME", use email prefix
        if (!user.name || user.name === "NO_NAME") {
          token.name = user.email!.split("@")[0];
        } else {
          token.name = user.name;
        }

        // For OAuth users (like Google), we need to ensure they exist in the database
        // Use upsert to create the user if they don't exist (first-time OAuth login)
        const dbUser = await prisma.user.upsert({
          where: { email: user.email! },
          update: {
            name: token.name,
            image: user.image,
          },
          create: {
            email: user.email!,
            name: token.name,
            image: user.image,
            role: "user",
          },
        });

        // Set the database user ID and role on the token
        token.sub = dbUser.id;
        token.role = dbUser.role;
      }

      return token;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
