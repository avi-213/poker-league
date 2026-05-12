"use client";

import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";

type Match = {
  date: string;
  amount: number;
};

export default function ProfitHeatmap({ matches }: { matches: Match[] }) {
  const values = matches.map((m) => ({
    date: m.date,
    count: m.amount,
  }));

  return (
    <div className="bg-[#0b0b0b] border border-neutral-800 rounded-[32px] p-8 mt-12 overflow-x-auto">
      <h2 className="text-5xl font-black text-yellow-400 mb-8">
        Profit Heatmap
      </h2>

      <CalendarHeatmap
        startDate={new Date("2026-01-01")}
        endDate={new Date("2026-12-31")}
        values={values}
        classForValue={(value: any) => {
          if (!value || value.count === 0) return "color-empty";
          if (value.count > 100) return "color-green-4";
          if (value.count > 0) return "color-green-2";
          if (value.count < -100) return "color-red-4";
          return "color-red-2";
        }}
        tooltipDataAttrs={(value: any) => {
  return {
    "data-tooltip-content": value?.date
      ? `${value.date}: ₹${value.count}`
      : "No data",
  } as any;
}}
      />
    </div>
  );
}