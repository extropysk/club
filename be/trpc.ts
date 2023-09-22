import { initTRPC, TRPCError } from "@trpc/server";
import { Context } from "./context";

const t = initTRPC.context<Context>().create();

const isAuthed = (requiredRole?: string) =>
  t.middleware(({ next, ctx }) => {
    if (!ctx.session) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
      });
    }

    if (requiredRole && !ctx.session.roles.includes(requiredRole)) {
      throw new TRPCError({
        code: "FORBIDDEN",
      });
    }

    return next({
      ctx: {
        session: ctx.session,
      },
    });
  });

export const middleware = t.middleware;
export const router = t.router;

/**
 * Unprotected procedure
 */
export const publicProcedure = () => t.procedure;

/**
 * Protected procedure
 */
export const procedure = (requiredRole?: string) =>
  t.procedure.use(isAuthed(requiredRole));
