"use client";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { WeeklyStats } from "@/lib/services/dashboard.service";

interface WeeklyStatsChartProps {
  data: WeeklyStats[];
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
  completedVisits: {
    label: "Completadas",
    color: "#34D399",
  },
};

export function WeeklyStatsChart({ data }: WeeklyStatsChartProps) {
  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-white/10" />
        <XAxis
          dataKey="day"
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
        <Bar
          dataKey="completedVisits"
          fill="var(--color-completedVisits)"
          radius={[8, 8, 0, 0]}
        />
      </BarChart>
    </ChartContainer>
  );
}
