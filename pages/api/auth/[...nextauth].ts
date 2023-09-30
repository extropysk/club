import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { sync } from "be/utils/strava";
import { ROUTES } from "constants/routes";
import jsonwebtoken from "jsonwebtoken";
import NextAuth, { NextAuthOptions } from "next-auth";
import StravaProvider from "next-auth/providers/strava";

const prisma = new PrismaClient();
// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
  pages: {
    signIn: ROUTES.auth,
  },
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  jwt: {
    encode: async ({ secret, token, maxAge }) => {
      const claims = { ...token, exp: Math.floor(Date.now() / 1000) + maxAge };
      return jsonwebtoken.sign(claims, secret, {
        algorithm: "HS256",
      });
    },
    decode: async ({ secret, token }) => {
      return jsonwebtoken.verify(token, secret);
    },
  },
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    StravaProvider({
      clientId: process.env.STRAVA_ID!,
      clientSecret: process.env.STRAVA_SECRET!,
      authorization: { params: { scope: "activity:read" } },
      token: {
        async request({ client, params, checks, provider }) {
          // remove athlete from response
          const { token_type, expires_at, refresh_token, access_token } =
            await client.oauthCallback(provider.callbackUrl, params, checks);
          return {
            tokens: { token_type, expires_at, refresh_token, access_token },
          };
        },
      },
    }),
  ],
  callbacks: {
    session({ session, token }) {
      session.sub = token.sub ?? "";
      session.roles = token.roles ?? [];
      return session;
    },

    async jwt({ token, account, user }) {
      if (account && user) {
        sync(user.id, account.access_token);
      }

      token.roles = ["admin"];
      return token;
    },
  },
};

export default NextAuth(authOptions);
