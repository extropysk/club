import { prisma } from "be/prisma";
import { procedure, router } from "be/trpc";
import { z } from "zod";

const ListSchema = z.object({
  skip: z.number().nonnegative().default(0),
  take: z.number().positive().lte(100).default(100),
  filter: z.string().optional(),
  orderBy: z.record(z.enum(["asc", "desc"])).optional(),
});

export const userRouter = router({
  current: procedure().query(({ ctx }) => {
    return ctx.session;
  }),
  list: procedure("admin")
    .input(ListSchema)
    .query(async ({ input: { filter, orderBy, skip, take } }) => {
      let where;
      if (filter) {
        {
          where = {
            OR: [{ email: filter }, { name: { contains: filter } }],
          };
        }
      }
      return await prisma.user.findMany({
        where,
        orderBy,
        skip,
        take,
      });
    }),
});
