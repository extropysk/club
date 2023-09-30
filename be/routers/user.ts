import { TRPCError } from "@trpc/server";
import { prisma } from "be/prisma";
import { procedure, router } from "be/trpc";
import { z } from "zod";

const ListSchema = z.object({
  skip: z.number().nonnegative().default(0),
  take: z.number().positive().lte(100).default(100),
  filter: z.string().optional(),
  orderBy: z.record(z.enum(["asc", "desc"])).optional(),
});

const UserUpdateSchema = z.object({
  email: z.string().email(),
});

export const userRouter = router({
  update: procedure()
    .input(UserUpdateSchema)
    .mutation(async ({ input, ctx }) => {
      const user = await prisma.user.findUnique({
        where: { email: input.email },
      });

      if (user && user.id !== ctx.session.sub) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Email already taken.",
        });
      }

      return await prisma.user.update({
        where: {
          id: ctx.session.sub,
        },
        data: input,
      });
    }),
  current: procedure().query(async ({ ctx }) => {
    return await prisma.user.findUnique({ where: { id: ctx.session.sub } });
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
