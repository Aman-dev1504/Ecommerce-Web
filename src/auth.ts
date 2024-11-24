import NextAuth from "next-auth";
import {PrismaAdapter} from '@auth/prisma-adapter'
import { db } from "./lib/db";
import authConfig from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }

      if (session.user) {
        session.user.name = token.name
        session.user.email = token.email! 
      }

      return session
    }
  },
  session: { strategy: 'jwt' },
  ...authConfig,
});
