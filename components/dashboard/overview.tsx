"use client";

import { startOfYear } from "date-fns";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { trpc } from "utils/trpc";

interface Props {
  dataKey: string;
}

export function Overview({ dataKey }: Props) {
  const { data: overviewData } = trpc.activity.overview.useQuery({
    from: startOfYear(new Date()).toISOString(),
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
        <Bar dataKey={dataKey} radius={[4, 4, 0, 0]} className="fill-primary" />
      </BarChart>
    </ResponsiveContainer>
  );
}
