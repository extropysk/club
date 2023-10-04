import { prisma } from "be/prisma";
import { format, startOfYear } from "date-fns";
import { dateToEpoch } from "utils/date";

export const sync = async (userId: string, token: string | undefined) => {
  const lastActivity = await prisma.activity.findFirst({
    where: {
      user_id: userId,
    },
    orderBy: {
      start_date: "desc",
    },
    select: { start_date: true },
  });

  const lastActivityStartDate =
    lastActivity?.start_date ?? startOfYear(new Date());

  let page = 1;
  let hasNextPage = false;
  try {
    do {
      const url = `https://www.strava.com/api/v3/athlete/activities?after=${dateToEpoch(
        lastActivityStartDate
      )}&per_page=${100}&page=${page}`;
      const res = await fetch(url, {
        method: "GET",
        headers: {
          authorization: "Bearer " + token,
        },
      });

      const data = (await res.json()).map((a: any) => {
        a.id = a.id.toString();
        a.resource_state = undefined;
        a.athlete_id = a.athlete?.id;
        a.athlete = undefined;
        a.map_id = a.map?.id;
        a.map_summary_polyline = a.map?.summary_polyline;
        a.map = undefined;
        a.user_id = userId;
        a.start_date_local = new Date(a.start_date_local);
        a.start_date = new Date(a.start_date);
        a.start_year = +format(a.start_date, "yyyy");
        a.start_month = +format(a.start_date, "yyyyMM");
        return a;
      });

      if (data.length > 0) {
        hasNextPage = true;
        const r = await prisma.activity.createMany({
          data: data,
          skipDuplicates: true,
        });
        console.log("SYNC:" + r.count);
      } else {
        hasNextPage = false;
      }
      page++;
    } while (hasNextPage);
  } catch (error) {
    console.error(error);
  }
};
