"use client";

import { startOfYear } from "date-fns";
import { useActivityAggregation } from "hooks/activity";
import { useStore } from "hooks/store";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const START_OF_YEAR = {
  from: startOfYear(new Date()),
};

export function Overview() {
  const aggregation = useStore((state) => state.aggregation);
  const { data } = useActivityAggregation({
    dateRange: START_OF_YEAR,
    by: ["start_month"],
    orderBy: {
      start_month: "asc",
    },
  });

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data?.data}>
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
