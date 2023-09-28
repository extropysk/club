"use client";

import { startOfYear } from "date-fns";
import { useStore } from "hooks/store";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { trpc } from "utils/trpc";

const DEFAULT_FROM = startOfYear(new Date());

export function Overview() {
  const aggregation = useStore((state) => state.aggregation);
  const { data: overviewData } = trpc.activity.overview.useQuery({
    from: DEFAULT_FROM.toISOString(),
  });

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={overviewData}>
        <XAxis
          dataKey="start_month"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Bar
          dataKey={aggregation}
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
