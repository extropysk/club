/**
 * This file contains the root router of your tRPC-backend
 */
import { activityRouter } from "be/routers/activity";
import { userRouter } from "be/routers/user";
import { publicProcedure, router } from "../trpc";

export const appRouter = router({
  healthcheck: publicProcedure().query(() => "yay!"),
  user: userRouter,
  activity: activityRouter,
});

export type AppRouter = typeof appRouter;
