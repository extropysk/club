import { BySchema, OrderBySchema } from "be/routers/activity";
import { startOfMonth } from "date-fns";
import { useStore } from "hooks/store";
import { DateRange } from "react-day-picker";
import { OrderBy } from "utils/prisma";
import { trpc } from "utils/trpc";
import { z } from "zod";

const START_OF_MONTH = startOfMonth(new Date());

interface ActivityAggregationParams {
  orderBy: z.infer<typeof OrderBySchema>;
  by: z.infer<typeof BySchema>;
  dateRange?: DateRange;
  isPublic?: boolean;
  skip?: number;
  take?: number;
}

export const useActivityAggregation = ({
  orderBy,
  by,
  dateRange,
  isPublic,
  skip,
  take,
}: ActivityAggregationParams) => {
  const sportType = useStore((state) => state.sportType);

  return trpc.activity.aggregation.useQuery({
    from: dateRange?.from?.toISOString() ?? START_OF_MONTH.toISOString(),
    to: dateRange?.to?.toISOString(),
    sportType,
    orderBy,
    by,
    isPublic,
    skip,
    take,
  });
};

interface ActivityListParams {
  orderBy: OrderBy;
  skip: number;
  take: number;
  dateRange?: DateRange;
}

export const useActivityList = ({
  skip,
  take,
  orderBy,
  dateRange,
}: ActivityListParams) => {
  const sportType = useStore((state) => state.sportType);

  return trpc.activity.list.useQuery({
    skip,
    take,
    from: dateRange?.from?.toISOString(),
    to: dateRange?.to?.toISOString(),
    sportType,
    orderBy,
  });
};
