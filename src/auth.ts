import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import type { UserRole } from "@prisma/client";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt", // JWT is better for Neon serverless
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const submittedEmail = credentials.email as string;

        // 🔍 Check BOTH personal email and org/student email
        const user = await prisma.user.findFirst({
          where: {
            OR: [
              { email: submittedEmail },
              { orgEmail: submittedEmail }
            ]
          },
          include: { profile: true },
        });

        if (!user || !user.passwordHash) return null;
        if (!user.isActive) throw new Error("Account deactivated.");

        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.passwordHash
        );

        if (!isValid) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.profile ? `${user.profile.firstName} ${user.profile.lastName}` : user.email,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    // Store role in JWT when user signs in
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        if (typeof user.id === "string") token.id = user.id;
      }
      return token;
    },
    // Expose role in session
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as UserRole;
      }
      return session;
    },
  },
});