import { SportType } from ".prisma/client";
import { prisma } from "be/prisma";
import { procedure, router } from "be/trpc";
import { processOrderBy } from "utils/prisma";
import { z } from "zod";

export const BySchema = z.array(z.enum(["start_month", "user_id"]));
export const OrderBySchema = z.record(z.enum(["asc", "desc"]));
const SkipSchema = z.number().nonnegative().default(0);
const TakeSchema = z.number().positive().lte(100).default(100);

const AggregationSchema = z.object({
  from: z.string().datetime(),
  to: z.string().datetime().optional(),
  sportType: z.nativeEnum(SportType).optional(),
  orderBy: OrderBySchema,
  by: BySchema,
  isPublic: z.boolean().default(false),
  skip: SkipSchema,
  take: TakeSchema,
});

const ListSchema = z.object({
  skip: SkipSchema,
  take: TakeSchema,
  filter: z.string().optional(),
  sportType: z.nativeEnum(SportType).optional(),
  from: z.string().datetime().optional(),
  to: z.string().datetime().optional(),
  orderBy: OrderBySchema,
  isPublic: z.boolean().default(false),
});

export const activityRouter = router({
  list: procedure()
    .input(ListSchema)
    .query(async ({ ctx, input }) => {
      const where = {
        OR: [{ name: { contains: input.filter } }],
        sport_type: input.sportType,
        user_id: input.isPublic ? undefined : ctx.session.sub,
        start_date: {
          gte: input.from,
          lte: input.to,
        },
      };

      const orderBy = processOrderBy(input.orderBy);
      const [total, data] = await prisma.$transaction([
        prisma.activity.count({ where }),
        prisma.activity.findMany({
          where,
          orderBy,
          skip: input.skip,
          take: input.take,
        }),
      ]);
      return { total, data };
    }),
  aggregation: procedure()
    .input(AggregationSchema)
    .query(async ({ ctx, input }) => {
      const where = {
        user_id: input.isPublic ? undefined : ctx.session.sub,
        sport_type: input.sportType,
        start_date: {
          gte: input.from,
          lte: input.to,
        },
      };

      const orderBy = processOrderBy(input.orderBy);
      const [totalData, data] = await prisma.$transaction([
        prisma.activity.findMany({ distinct: input.by, where }),
        prisma.activity.groupBy({
          by: input.by,
          where,
          _sum: {
            distance: true,
            total_elevation_gain: true,
            moving_time: true,
          },
          _count: {
            id: true,
          },
          orderBy,
          skip: input.skip,
          take: input.take,
        }),
      ]);

      return { data, total: totalData.length };
    }),
});
