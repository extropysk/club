import { SportType } from ".prisma/client";
import { prisma } from "be/prisma";
import { procedure, router } from "be/trpc";
import { z } from "zod";

const DashboardSchema = z.object({
  from: z.string().datetime(),
  to: z.string().datetime().optional(),
  sportType: z.nativeEnum(SportType).optional(),
});

const OverviewSchema = z.object({
  from: z.string().datetime(),
  to: z.string().datetime().optional(),
  sportType: z.nativeEnum(SportType).optional(),
});

const ListSchema = z.object({
  skip: z.number().nonnegative().default(0),
  take: z.number().positive().lte(100).default(100),
  filter: z.string().optional(),
  orderBy: z.record(z.enum(["asc", "desc"])).optional(),
});

export const activityRouter = router({
  list: procedure()
    .input(ListSchema)
    .query(async ({ ctx, input: { filter, orderBy, skip, take } }) => {
      let where;
      if (filter) {
        {
          where = {
            OR: [{ name: { contains: filter } }],
          };
        }
      }

      console.log(filter);

      const [total, data] = await prisma.$transaction([
        prisma.activity.count({ where }),
        prisma.activity.findMany({
          where,
          orderBy,
          skip,
          take,
        }),
      ]);
      return { total, data };
    }),
  dashboard: procedure()
    .input(DashboardSchema)
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
  overview: procedure()
    .input(OverviewSchema)
    .query(async ({ ctx, input }) => {
      return await prisma.activity.groupBy({
        by: ["start_month"],
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
        orderBy: {
          start_month: "asc",
        },
      });
    }),
});
