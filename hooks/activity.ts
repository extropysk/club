import { BySchema, OrderBySchema } from "be/routers/activity";
import { startOfMonth } from "date-fns";
import { useDebounce } from "hooks/debounce";
import { useStore } from "hooks/store";
import { DateRange } from "react-day-picker";
import { OrderBy } from "utils/prisma";
import { trpc } from "utils/trpc";
import { z } from "zod";

const START_OF_MONTH = startOfMonth(new Date());

interface AggregationParams {
  orderBy?: z.infer<typeof OrderBySchema>;
  by?: z.infer<typeof BySchema>;
  dateRange?: DateRange;
}

export const useActivityAggregation = ({
  orderBy,
  by,
  dateRange,
}: AggregationParams) => {
  const sportType = useStore((state) => state.sportType);

  return trpc.activity.aggregation.useQuery({
    from: dateRange?.from?.toISOString() ?? START_OF_MONTH.toISOString(),
    to: dateRange?.to?.toISOString(),
    sportType,
    orderBy,
    by,
  });
};

interface ListParams {
  orderBy: OrderBy;
  skip: number;
  take: number;
}

export const useActivityList = ({ skip, take, orderBy }: ListParams) => {
  const filter = useStore((state) => state.filter);
  const sportType = useStore((state) => state.sportType);
  const dateRange = useStore((state) => state.dateRange);
  const debouncedFilter = useDebounce(filter);

  return trpc.activity.list.useQuery({
    filter: debouncedFilter,
    skip,
    take,
    from: dateRange?.from?.toISOString(),
    to: dateRange?.to?.toISOString(),
    sportType,
    orderBy,
  });
};
