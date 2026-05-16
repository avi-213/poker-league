"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import {
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "@/firebase";

export default function LeaderboardPage() {
  const [players, setPlayers] = useState<any[]>([]);

  useEffect(() => {
    async function fetchPlayers() {
      const snapshot = await getDocs(
        collection(db, "Players")
      );

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      data.sort(
        (a: any, b: any) =>
          b.winnings - a.winnings
      );

      setPlayers(data);
    }

    fetchPlayers();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white px-6 py-10">
      <h1 className="text-5xl font-bold text-yellow-400 mb-10">
        Leaderboard
      </h1>

      <div className="flex flex-col gap-6">
        {players.map((player, index) => (
          <div
            key={player.id}
            className="
              bg-[#0b0b0b]
              border
              border-neutral-800
              rounded-3xl
              p-6
              flex
              items-center
              justify-between
              transition-all
              duration-300
              hover:border-yellow-400
              hover:scale-[1.01]
            "
          >
            <div className="flex items-center gap-6">
              <div className="text-4xl font-bold text-yellow-400 w-20">
                #{index + 1}
              </div>

              <div className="
                relative
                w-20
                h-20
                rounded-full
                overflow-hidden
                border-4
                border-yellow-400
              ">
                <Image
                  src={player.image}
                  alt={player.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <h2 className="text-3xl font-bold">
                  {player.name}
                </h2>

                <p className="text-gray-400 text-lg mt-1">
                  {player.matches} games played
                </p>
              </div>
            </div>

            <div className="text-right">
              <div
                className={`
                  text-3xl
                  font-bold
                  ${
                    player.winnings > 0
                      ? "text-green-400"
                      : "text-red-400"
                  }
                `}
              >
                ₹{player.winnings}
              </div>

              <div className="text-yellow-400 text-lg mt-1">
                Rank #{index + 1}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}