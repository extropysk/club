import { BySchema, OrderBySchema } from "be/routers/activity";
import { startOfMonth } from "date-fns";
import { useStore } from "hooks/store";
import { DateRange } from "react-day-picker";
import { trpc } from "utils/trpc";
import { z } from "zod";

const DEFAULT_FROM = startOfMonth(new Date());

interface Params {
  orderBy?: z.infer<typeof OrderBySchema>;
  by?: z.infer<typeof BySchema>;
  dateRange?: DateRange;
}

export const useAggregation = ({ orderBy, by, dateRange }: Params) => {
  const sportType = useStore((state) => state.sportType);

  return trpc.activity.aggregation.useQuery({
    from: dateRange?.from?.toISOString() ?? DEFAULT_FROM.toISOString(),
    to: dateRange?.to?.toISOString(),
    sportType,
    orderBy,
    by,
  });
};
