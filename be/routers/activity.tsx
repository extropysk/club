import { SportType } from ".prisma/client";
import { prisma } from "be/prisma";
import { procedure, router } from "be/trpc";
import { z } from "zod";

const StatsSchema = z.object({
  from: z.string().datetime(),
  to: z.string().datetime().optional(),
  sportType: z.nativeEnum(SportType).optional(),
});

export const activityRouter = router({
  stats: procedure()
    .input(StatsSchema)
    .query(async ({ ctx, input }) => {
      return await prisma.activity.aggregate({
        where: {
          user_id: ctx.session.sub,
          sport_type: input.sportType,
          start_date: {
            gte: input.from,
            lte: input.to,
          },
        },
        _sum: {
          distance: true,
          total_elevation_gain: true,
          moving_time: true,
        },
        _count: {
          id: true,
        },
      });
    }),
});
