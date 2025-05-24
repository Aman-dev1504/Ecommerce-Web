import { compare } from "bcryptjs";
import { NextAuthConfig } from "next-auth";
import { LoginSchema } from "./zod-schemas";
import Credentials from "next-auth/providers/credentials";

import { getUserByEmail } from "./lib/helpers/authHelper";

export default {
  trustHost: true,
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;

          const isPasswordValid = await compare(password, user.password);
          if (isPasswordValid) return user;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
