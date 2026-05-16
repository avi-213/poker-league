"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import Image from "next/image";

import ProfitCurve from "@/components/ProfitCurve";

import {
  doc,
  getDoc,
} from "firebase/firestore";

import { db } from "@/firebase";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";



type Match = {
  amount: number;
  date: string;
};

type Player = {
  name: string;
  image: string;
  winnings: number;
  matches: number;
  rank: number;
  history: Match[];
};

export default function PlayerProfile() {

  const params = useParams();

  const name =
    typeof params.name === "string"
      ? params.name
      : "";

  const [player, setPlayer] =
    useState<Player | null>(null);

  useEffect(() => {

    async function fetchPlayer() {

      if (!name) return;

      const snapshot = await getDoc(
        doc(db, "Players", name)
      );

      if (snapshot.exists()) {
        setPlayer(snapshot.data() as Player);
      }
    }

    fetchPlayer();

  }, [name]);

  if (!player) {
    return (
      <main className="
        min-h-screen
        bg-black
        text-white
        flex
        items-center
        justify-center
        text-3xl
      ">
        Loading Player...
      </main>
    );
  }

  let cumulative = 0;

  const chartData =
    player.history.map((match, index) => {

      cumulative += match.amount;

      return {
        match: index + 1,
        profit: cumulative,
      };
    });

  const avgProfit =
    (
      player.winnings /
      player.matches
    ).toFixed(1);

  const bestSession =
    Math.max(
      ...player.history.map(
        (m) => m.amount
      )
    );

  const worstSession =
    Math.min(
      ...player.history.map(
        (m) => m.amount
      )
    );

  const wins =
    player.history.filter(
      (m) => m.amount > 0
    ).length;

  const winRate =
    (
      (wins / player.matches) * 100
    ).toFixed(0);

  const aggression =
    Math.min(
      100,
      player.matches * 12
    );

  const stability =
    Math.max(
      5,
      100 - aggression
    );

  return (
    <main className="bg-black text-white min-h-screen">

      {/* HERO */}

      <section className="
        relative
        h-[320px]
        overflow-hidden
      ">

        <Image
          src={player.image}
          alt={player.name}
          fill
          className="
            object-cover
            opacity-30
          "
        />

        <div className="
          absolute
          inset-0
          bg-black/70
        " />

        <div className="
          absolute
          bottom-10
          left-10
        ">

          <h1 className="
            text-5xl
            md:text-6xl
            font-black
            text-yellow-400
          ">
            {player.name}
          </h1>

          <p className="
            text-xl
            text-gray-300
            mt-2
          ">
            Rank #{player.rank}
          </p>

        </div>

      </section>

      {/* MAIN */}

      <section className="
        max-w-7xl
        mx-auto
        px-6
        py-12
      ">

        {/* MAIN STATS */}

        <div className="
          grid
          grid-cols-1
          md:grid-cols-3
          gap-8
        ">

          <div className="
            bg-[#080808]
            border
            border-neutral-800
            rounded-[32px]
            p-6
          ">

            <p className="text-gray-400">
              Total Winnings
            </p>

            <h2 className="
              text-4xl
              font-black
              text-green-400
              mt-4
            ">
              ₹{player.winnings}
            </h2>

          </div>

          <div className="
            bg-[#080808]
            border
            border-neutral-800
            rounded-[32px]
            p-6
          ">

            <p className="text-gray-400">
              Matches Played
            </p>

            <h2 className="
              text-4xl
              font-black
              text-yellow-400
              mt-4
            ">
              {player.matches}
            </h2>

          </div>

          <div className="
            bg-[#080808]
            border
            border-neutral-800
            rounded-[32px]
            p-6
          ">

            <p className="text-gray-400">
              Global Rank
            </p>

            <h2 className="
              text-4xl
              font-black
              text-white
              mt-4
            ">
              #{player.rank}
            </h2>

          </div>

        </div>

        {/* ADVANCED ANALYTICS */}

        <section className="
          mt-12
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-4
          gap-6
        ">

          <div className="
            bg-[#080808]
            border
            border-neutral-800
            rounded-[28px]
            p-6
          ">

            <p className="
              text-sm
              text-gray-400
              uppercase
            ">
              Average Profit
            </p>

            <h2 className="
              text-4xl
              font-black
              text-green-400
              mt-4
            ">
              ₹{avgProfit}
            </h2>

          </div>

          <div className="
            bg-[#080808]
            border
            border-neutral-800
            rounded-[28px]
            p-6
          ">

            <p className="
              text-sm
              text-gray-400
              uppercase
            ">
              Best Session
            </p>

            <h2 className="
              text-4xl
              font-black
              text-yellow-400
              mt-4
            ">
              +₹{bestSession}
            </h2>

          </div>

          <div className="
            bg-[#080808]
            border
            border-neutral-800
            rounded-[28px]
            p-6
          ">

            <p className="
              text-sm
              text-gray-400
              uppercase
            ">
              Worst Session
            </p>

            <h2 className="
              text-4xl
              font-black
              text-red-400
              mt-4
            ">
              ₹{worstSession}
            </h2>

          </div>

          <div className="
            bg-[#080808]
            border
            border-neutral-800
            rounded-[28px]
            p-6
          ">

            <p className="
              text-sm
              text-gray-400
              uppercase
            ">
              Win Rate
            </p>

            <h2 className="
              text-4xl
              font-black
              text-blue-400
              mt-4
            ">
              {winRate}%
            </h2>

          </div>

        </section>
        

        <ProfitCurve matches={player.history} />
        {/* HEATMAP */}

        {/* MATCH HISTORY */}

        <section className="mt-12">

          <h2 className="
            text-4xl
            font-black
            text-yellow-400
            mb-8
          ">
            Match History
          </h2>

          <div className="space-y-6">

            {player.history
              .slice()
              .reverse()
              .map((match, index) => (

              <div
                key={index}
                className="
                  bg-[#080808]
                  border
                  border-neutral-800
                  rounded-[32px]
                  p-8
                  flex
                  justify-between
                  items-center
                "
              >

                <div>

                  <h3 className="
                    text-2xl
                    font-bold
                  ">
                    Match #
                    {
                      player.history.length -
                      index
                    }
                  </h3>

                  <p className="
                    text-gray-400
                    mt-2
                  ">
                    {match.date}
                  </p>

                </div>

                <div
                  className={`
                    text-4xl
                    font-black
                    ${
                      match.amount >= 0
                        ? "text-green-400"
                        : "text-red-400"
                    }
                  `}
                >
                  {match.amount >= 0
                    ? "+"
                    : ""}
                  ₹{match.amount}
                </div>

              </div>

            ))}

          </div>

        </section>

      </section>

    </main>
  );
}