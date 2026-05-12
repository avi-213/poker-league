"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "@/firebase";

export default function HallOfFamePage() {
  const [player, setPlayer] = useState<any>(null);

  useEffect(() => {
    async function fetchWinner() {
      const q = query(
        collection(db, "Players"),
        orderBy("winnings", "desc"),
        limit(1)
      );

      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        const doc = snapshot.docs[0];
        setPlayer({ id: doc.id, ...doc.data() });
      }
    }

    fetchWinner();
  }, []);

  if (!player) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-10 flex flex-col items-center">
      <h1 className="text-5xl font-bold text-yellow-400 mb-3">
        Hall Of Fame
      </h1>

      <p className="text-gray-400 text-lg mb-12">
        Top player with the highest winnings
      </p>

      <div className="w-full max-w-2xl bg-[#0b0b0b] border border-yellow-500/40 rounded-3xl overflow-hidden">
        <div className="relative h-[500px] w-full">
          <Image
            src={player.image}
            alt={player.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="p-8">
          <div className="flex items-center justify-between">
            <h2 className="text-5xl font-bold text-yellow-400">
              {player.name}
            </h2>

            <div className="bg-yellow-400 text-black font-bold px-4 py-2 rounded-full text-xl">
              MVP
            </div>
          </div>

          <p className="text-gray-400 mt-3 text-xl">
            {player.matches} matches played
          </p>

          <div className="mt-8 text-6xl font-bold text-green-400">
            ₹{player.winnings}
          </div>
        </div>
      </div>
    </main>
  );
}