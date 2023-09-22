/**
 * This file contains the root router of your tRPC-backend
 */
import { userRouter } from "be/routers/user";
import { publicProcedure, router } from "../trpc";

export const appRouter = router({
  healthcheck: publicProcedure().query(() => "yay!"),
  user: userRouter,
});

export type AppRouter = typeof appRouter;
