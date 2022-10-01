import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "../../../lib/prisma";
import GitHubProvider from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
  // Useful info: https://github.com/nextauthjs/next-auth/discussions/4394
  adapter: PrismaAdapter(db()),
  // Configure one or more authentication providers
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.username || !credentials.password)
          return null;

        const findUser = await db().user.findFirst({
          where: { email: credentials.username },
        });

        // Add logic here to look up the user from the credentials supplied
        const user =
          findUser ||
          (await db().user.create({
            data: { name: credentials.username, email: credentials.username },
          }));

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return { ...credentials, ...user, password: undefined };
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
    // ...add more providers here
  ],
  // If using "CredentialsProvider", user sessions are not persisted in the database. Ref https://next-auth.js.org/providers/credentials
  // Also next.js edge middlewares for now only works if using jwt strategy
  session: { strategy: "jwt" },
};

export default NextAuth(authOptions);
