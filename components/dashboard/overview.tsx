"use client";

import { startOfYear } from "date-fns";
import { useActivityAggregation } from "hooks/activity";
import { useStore } from "hooks/store";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { round } from "utils/num";

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

  const formatValue = (value: any) => {
    switch (aggregation) {
      case "_sum.distance":
        return round(value / 1000, 1);
      case "_sum.total_elevation_gain":
        return round(value);
      case "_sum.moving_time":
        return round(value / 60);
      default:
        return value;
    }
  };

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
          tickFormatter={formatValue}
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
