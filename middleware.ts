import { withAuth } from "next-auth/middleware";
import { authOptions } from "pages/api/auth/[...nextauth]";

// More on how NextAuth.js middleware works: https://next-auth.js.org/configuration/nextjs#middleware
export default withAuth({
  jwt: { decode: authOptions.jwt },
  callbacks: {
    authorized({ req, token }) {
      // `/admin` requires admin role
      if (req.nextUrl.pathname === "/admin") {
        return token?.roles?.includes("admin");
      }
      // `/me` only requires the user to be logged in
      return !!token;
    },
  },
});

export const config = { matcher: ["/admin", "/me"] };
