"use client";

import {

  Chart as ChartJS,

  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,

  Tooltip,
  Legend,

  Filler,

} from "chart.js";

import { Chart } from "react-chartjs-2";

ChartJS.register(

  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,

  Tooltip,
  Legend,

  Filler
);

type Match = {

  amount: number;
  date: string;
};

export default function ProfitCurve({

  matches,

}: {

  matches: Match[];
}) {

  const raw = matches.map(
    (m) => m.amount
  );

  const labels = matches.map(
    (_, i) => `M${i + 1}`
  );

  let running = 0;

  const cumulative = raw.map((v) => {

    running += v;

    return running;
  });

  const data = {

    labels,

    datasets: [

      {

        type: "bar" as const,

        label: "Profit Per Match",

        data: raw,

        borderRadius: 10,

        backgroundColor: raw.map((v) =>

          v >= 0

            ? "rgba(250,204,21,0.85)"

            : "rgba(239,68,68,0.85)"
        ),

        borderColor: raw.map((v) =>

          v >= 0

            ? "#facc15"

            : "#ef4444"
        ),

        borderWidth: 1,
      },

      {

        type: "line" as const,

        label: "Cumulative Profit",

        data: cumulative,

        borderColor: "#22c55e",

        backgroundColor:
          "rgba(34,197,94,0.08)",

        fill: true,

        tension: 0.4,

        borderWidth: 4,

        pointRadius: 5,

        pointBackgroundColor:
          "#22c55e",

        yAxisID: "y1",
      },
    ],
  };

  const options = {

    responsive: true,

    maintainAspectRatio: false,

    plugins: {

      legend: {

        labels: {

          color: "#999",
        },
      },

      tooltip: {

        backgroundColor: "#000",

        borderColor: "#222",

        borderWidth: 1,
      },
    },

    scales: {

      x: {

        ticks: {

          color: "#777",
        },

        grid: {

          color: "rgba(255,255,255,0.05)",
        },
      },

      y: {

        ticks: {

          color: "#888",

          callback: (value: any) =>
            `₹${value}`,
        },

        grid: {

          color: "rgba(255,255,255,0.05)",
        },
      },

      y1: {

        position: "right" as const,

        ticks: {

          color: "#22c55e",

          callback: (value: any) =>
            `₹${value}`,
        },

        grid: {

          display: false,
        },
      },
    },
  };

  return (

    <section
      className="
        mt-12
        relative
        overflow-hidden
        bg-[#080808]
        border
        border-neutral-800
        rounded-[36px]
        p-8
      "
    >

      <div
        className="
          absolute
          top-0
          right-0
          w-[300px]
          h-[300px]
          bg-yellow-500/10
          blur-[120px]
          rounded-full
        "
      />

      <div className="relative z-10">

        <p
          className="
            uppercase
            tracking-[0.3em]
            text-xs
            text-neutral-500
            mb-3
          "
        >
          Performance Analytics
        </p>

        <h2
          className="
            text-5xl
            font-black
            text-yellow-400
            mb-8
          "
        >
          Profit Curve
        </h2>

        <div className="h-[420px]">

          <Chart
            type="bar"
            data={data}
            options={options}
          />

        </div>

      </div>

    </section>
  );
}