"use client";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { VisitorTrend } from "@/lib/services/dashboard.service";

interface VisitorTrendsChartProps {
  data: VisitorTrend[];
}

const chartConfig = {
  checkIns: {
    label: "Check-ins",
    color: "#07D9D9",
  },
  checkOuts: {
    label: "Check-outs",
    color: "#F59E0B",
  },
  activeVisitors: {
    label: "Activos",
    color: "#34D399",
  },
};

export function VisitorTrendsChart({ data }: VisitorTrendsChartProps) {
  // Formatear las fechas para mostrar solo el día
  const formattedData = data.map((item) => ({
    ...item,
    date: new Date(item.date).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
    }),
  }));

  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <LineChart
        data={formattedData}
        margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" className="stroke-white/10" />
        <XAxis
          dataKey="date"
          tick={{ fill: "#9CA3AF" }}
          axisLine={{ stroke: "#374151" }}
        />
        <YAxis tick={{ fill: "#9CA3AF" }} axisLine={{ stroke: "#374151" }} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Line
          type="monotone"
          dataKey="checkIns"
          stroke="var(--color-checkIns)"
          strokeWidth={2}
          dot={{ fill: "var(--color-checkIns)", r: 4 }}
        />
        <Line
          type="monotone"
          dataKey="checkOuts"
          stroke="var(--color-checkOuts)"
          strokeWidth={2}
          dot={{ fill: "var(--color-checkOuts)", r: 4 }}
        />
        <Line
          type="monotone"
          dataKey="activeVisitors"
          stroke="var(--color-activeVisitors)"
          strokeWidth={2}
          dot={{ fill: "var(--color-activeVisitors)", r: 4 }}
        />
      </LineChart>
    </ChartContainer>
  );
}
