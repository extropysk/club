import { SportType } from ".prisma/client";
import { prisma } from "be/prisma";
import { procedure, router } from "be/trpc";
import { z } from "zod";

const ListSchema = z.object({
  skip: z.number().nonnegative().default(0),
  take: z.number().positive().lte(100).default(100),
  filter: z.string().optional(),
  orderBy: z.record(z.enum(["asc", "desc"])).optional(),
});

const Schema = z.object({
  from: z.string().datetime(),
  to: z.string().datetime().optional(),
  sportType: z.nativeEnum(SportType).optional(),
});

export const activityRouter = router({
  stats: procedure()
    .input(Schema)
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
