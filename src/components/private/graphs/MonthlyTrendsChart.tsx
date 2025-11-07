"use client";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { MonthlyTrend } from "@/lib/services/dashboard.service";

interface MonthlyTrendsChartProps {
  data: MonthlyTrend[];
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
  completedAppointments: {
    label: "Completadas",
    color: "#34D399",
  },
};

export function MonthlyTrendsChart({ data }: MonthlyTrendsChartProps) {
  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-white/10" />
        <XAxis
          dataKey="month"
          tick={{ fill: "#9CA3AF" }}
          axisLine={{ stroke: "#374151" }}
        />
        <YAxis tick={{ fill: "#9CA3AF" }} axisLine={{ stroke: "#374151" }} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Line
          type="monotone"
          dataKey="visitors"
          stroke="var(--color-visitors)"
          strokeWidth={2}
          dot={{ fill: "var(--color-visitors)", r: 3 }}
        />
        <Line
          type="monotone"
          dataKey="appointments"
          stroke="var(--color-appointments)"
          strokeWidth={2}
          dot={{ fill: "var(--color-appointments)", r: 3 }}
        />
        <Line
          type="monotone"
          dataKey="completedAppointments"
          stroke="var(--color-completedAppointments)"
          strokeWidth={2}
          dot={{ fill: "var(--color-completedAppointments)", r: 3 }}
        />
      </LineChart>
    </ChartContainer>
  );
}
