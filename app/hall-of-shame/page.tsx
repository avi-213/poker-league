"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "@/firebase";

type Player = {
  id: string;
  name: string;
  winnings: number;
  matches: number;
  rank: number;
  image: string;
};

export default function HallOfShamePage() {
  const [player, setPlayer] = useState<Player | null>(null);

  useEffect(() => {
    async function fetchLoser() {
      const q = query(
        collection(db, "Players"),
        orderBy("winnings", "asc"),
        limit(1)
      );

      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        const doc = snapshot.docs[0];
        setPlayer({ id: doc.id, ...(doc.data() as Omit<Player, "id">) });
      }
    }

    fetchLoser();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white px-6 py-16">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-7xl font-black text-red-500 mb-6">
          Hall Of Shame
        </h1>

        <p className="text-2xl text-gray-400 mb-16">
          Biggest losing legend of the poker league.
        </p>

        {player && (
          <div className="flex justify-center">
            <Link href={`/player/${player.id}`}>
              <div className="bg-[#120000] border border-red-500/30 rounded-[32px] overflow-hidden hover:scale-[1.02] transition-all duration-300 cursor-pointer w-full max-w-sm">
                <div className="relative h-[360px] w-full">
                  <Image
                    src={player.image}
                    alt={player.name}
                    fill
                    className="object-cover"
                  />

                  <div className="absolute top-4 right-4 bg-red-500 text-white font-black text-xl w-14 h-14 rounded-full flex items-center justify-center">
                    #1
                  </div>
                </div>

                <div className="p-7">
                  <h2 className="text-4xl font-black text-red-400">
                    {player.name}
                  </h2>

                  <p className="text-gray-400 mt-2">
                    {player.matches} matches played
                  </p>

                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-5xl font-black text-red-400">
                      ₹{player.winnings}
                    </span>

                    <span className="text-red-400 font-bold">
                      Tilt King
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}