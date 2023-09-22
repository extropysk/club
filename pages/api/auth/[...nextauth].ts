import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import jsonwebtoken from "jsonwebtoken";
import NextAuth, { NextAuthOptions } from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";
import FacebookProvider from "next-auth/providers/facebook";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";

const prisma = new PrismaClient();
// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
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
    Auth0Provider({
      clientId: process.env.AUTH0_ID,
      clientSecret: process.env.AUTH0_SECRET,
      issuer: process.env.AUTH0_ISSUER,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_ID,
      clientSecret: process.env.TWITTER_SECRET,
      version: "2.0",
    }),
  ],
  callbacks: {
    session({ session, token }) {
      session.sub = token.sub ?? "";
      session.roles = token.roles ?? [];
      return session;
    },

    async jwt({ token }) {
      token.roles = ["admin"];
      return token;
    },
  },
};

export default NextAuth(authOptions);
