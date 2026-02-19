"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

type Point = { month: string; count: number };

const COLORS = ["#0ea5e9", "#06b6d4", "#22d3ee", "#67e8f9", "#a5f3fc", "#cffafe"];

export function ReservationsChart({ data }: { data: Point[] }) {
  const labels = data.map((d) => {
    const [y, m] = d.month.split("-");
    const monthNames = ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"];
    return `${monthNames[parseInt(m, 10) - 1]} ${y}`;
  });
  const chartData = data.map((d, i) => ({ ...d, label: labels[i] ?? d.month }));

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <XAxis dataKey="label" tick={{ fontSize: 12 }} />
          <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
          <Tooltip
            formatter={(value: number) => [value, "Rezervasyon"]}
            labelFormatter={(_, payload) => payload[0]?.payload?.label ?? ""}
          />
          <Bar dataKey="count" radius={[4, 4, 0, 0]}>
            {chartData.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
