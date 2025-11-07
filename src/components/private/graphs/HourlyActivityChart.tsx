"use client";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { HourlyActivity } from "@/lib/services/dashboard.service";

interface HourlyActivityChartProps {
  data: HourlyActivity[];
}

const chartConfig = {
  visitors: {
    label: "Visitantes",
    color: "#07D9D9",
  },
  appointments: {
    label: "Citas",
    color: "#60A5FA",
  },
};

export function HourlyActivityChart({ data }: HourlyActivityChartProps) {
  const formattedData = data.map((item) => ({
    ...item,
    hour: `${item.hour}:00`,
  }));

  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <BarChart data={formattedData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-white/10" />
        <XAxis
          dataKey="hour"
          tick={{ fill: "#9CA3AF" }}
          axisLine={{ stroke: "#374151" }}
        />
        <YAxis tick={{ fill: "#9CA3AF" }} axisLine={{ stroke: "#374151" }} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar
          dataKey="visitors"
          fill="var(--color-visitors)"
          radius={[8, 8, 0, 0]}
        />
        <Bar
          dataKey="appointments"
          fill="var(--color-appointments)"
          radius={[8, 8, 0, 0]}
        />
      </BarChart>
    </ChartContainer>
  );
}
