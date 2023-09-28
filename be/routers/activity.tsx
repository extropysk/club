import { SportType } from ".prisma/client";
import { prisma } from "be/prisma";
import { procedure, router } from "be/trpc";
import { processOrderBy } from "be/utils/prisma";
import { z } from "zod";

export const BySchema = z.array(z.enum(["start_month", "user_id"])).optional();
export const OrderBySchema = z.record(z.enum(["asc", "desc"])).optional();

const AggregationSchema = z.object({
  from: z.string().datetime(),
  to: z.string().datetime().optional(),
  sportType: z.nativeEnum(SportType).optional(),
  orderBy: OrderBySchema,
  by: BySchema,
});

const ListSchema = z.object({
  skip: z.number().nonnegative().default(0),
  take: z.number().positive().lte(100).default(100),
  filter: z.string().optional(),
  sportType: z.nativeEnum(SportType).optional(),
  from: z.string().datetime().optional(),
  to: z.string().datetime().optional(),
  orderBy: OrderBySchema,
});

export const activityRouter = router({
  list: procedure()
    .input(ListSchema)
    .query(async ({ input }) => {
      const where = {
        OR: [{ name: { contains: input.filter } }],
        sport_type: input.sportType,
        start_date: {
          gte: input.from,
          lte: input.to,
        },
      };

      const [total, data] = await prisma.$transaction([
        prisma.activity.count({ where }),
        prisma.activity.findMany({
          where,
          orderBy: input.orderBy,
          skip: input.skip,
          take: input.take,
        }),
      ]);
      return { total, data };
    }),
  aggregation: procedure()
    .input(AggregationSchema)
    .query(async ({ ctx, input }) => {
      const orderBy = processOrderBy(input.orderBy);

      return await prisma.activity.groupBy({
        by: input.by ?? ["user_id"],
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
        orderBy,
      });
    }),
});
