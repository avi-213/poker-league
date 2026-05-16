"use client";

import { useEffect, useState } from "react";

import TrashTalk from "@/components/TrashTalk";

import Link from "next/link";

import Image from "next/image";

import {
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";

import { db } from "@/firebase";

type Player = {
  id: string;
  name: string;
  winnings: number;
  matches: number;
  rank: number;
  image: string;
};

export default function HomePage() {
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    async function fetchPlayers() {
      const q = query(
        collection(db, "Players"),
        orderBy("winnings", "desc")
      );

      const snapshot = await getDocs(q);

      const data: Player[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Player, "id">),
      }));

      setPlayers(data);
    }

    fetchPlayers();
  }, []);

  const totalPlayers = players.length;

  const totalMatches =
    players.length > 0
      ? Math.max(...players.map((p) => p.matches))
      : 0;

  const topPlayer = players[0];

  return (
    <main className="min-h-screen bg-black text-white">
      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-8 py-6 border-b border-neutral-900">
        <h1 className="text-5xl font-black tracking-widest text-yellow-400">
          UTILITY MAXIMIZERS
        </h1>

        <div className="flex items-center gap-8 text-xl font-semibold">
          <Link
            href="/leaderboard"
            className="hover:text-yellow-400 transition"
          >
            Leaderboard
          </Link>

          <Link
            href="/hall-of-fame"
            className="hover:text-yellow-400 transition"
          >
            Hall Of Fame
          </Link>

          <Link
            href="/hall-of-shame"
            className="hover:text-red-500 transition"
          >
            Hall Of Shame
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="flex flex-col items-center justify-center text-center py-32 px-6">
        <h1 className="text-[120px] leading-none font-black">
          <span className="text-yellow-400">
            Poker
          </span>

          <br />

          <span className="text-white">
            Rankings
          </span>
        </h1>

        <p className="text-3xl text-gray-400 mt-8 max-w-4xl">
          Tracking degeneracy, emotional damage and
          bad bluffs since first year.
        </p>

    
      </section>


      <TrashTalk />

    
      

      

      {/* STATS */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-[#0b0b0b] border border-neutral-800 rounded-[32px] p-10">
          <p className="text-gray-400 text-2xl">
            Players
          </p>

          <h2 className="text-6xl font-black text-yellow-400 mt-6">
            {totalPlayers}
          </h2>
        </div>

        <div className="bg-[#0b0b0b] border border-neutral-800 rounded-[32px] p-10">
          <p className="text-gray-400 text-2xl">
            Matches
          </p>

          <h2 className="text-6xl font-black text-yellow-400 mt-6">
            {totalMatches}
          </h2>
        </div>

        <div className="bg-[#0b0b0b] border border-neutral-800 rounded-[32px] p-10">
          <p className="text-gray-400 text-2xl">
            Top Shark
          </p>

          <h2 className="text-6xl font-black text-yellow-400 mt-6">
            {topPlayer?.name || "-"}
          </h2>
        </div>
      </section>

      {/* ALL PLAYERS */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-6xl font-black text-yellow-400 mb-14">
          All Players
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {players.map((player, index) => (
            <Link
              key={player.id}
              href={`/player/${player.id}`}
            >
              <div className="bg-[#0b0b0b] border border-neutral-800 rounded-[32px] overflow-hidden hover:scale-[1.02] transition-all duration-300 cursor-pointer">
                <div className="relative h-[360px] w-full">
                  <Image
                    src={player.image}
                    alt={player.name}
                    fill
                    className="object-cover"
                  />

                  <div className="absolute top-4 right-4 bg-yellow-400 text-black font-black text-xl w-14 h-14 rounded-full flex items-center justify-center">
                    #{index + 1}
                  </div>
                </div>

                <div className="p-7">
                  <h2 className="text-4xl font-black text-white">
                    {player.name}
                  </h2>

                  <div className="mt-6 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">
                        Total Winning
                      </span>

                    <span
  className={`
    font-bold
    ${
      player.winnings > 0
        ? "text-green-400"
        : "text-red-400"
    }
  `}
>
  ₹{player.winnings}
</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-400">
                        Matches
                      </span>

                      <span className="font-bold">
                        {player.matches}
                      </span>
                    </div>
                  </div>

                  <button className="mt-8 w-full bg-yellow-400 text-black font-black py-4 rounded-2xl hover:bg-yellow-300 transition">
                    View Profile
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* TOP 3 WINNERS */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <h2 className="text-6xl font-black text-green-400 mb-14">
          Top 3 Winners
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[...players]
            .sort((a, b) => b.winnings - a.winnings)
            .slice(0, 3)
            .map((player, index) => (
              <Link
                key={player.id}
                href={`/player/${player.id}`}
              >
                <div className="bg-[#001108] border border-green-500/30 rounded-[32px] overflow-hidden hover:scale-[1.02] transition-all duration-300 cursor-pointer">
                  <div className="relative h-[360px] w-full">
                    <Image
                      src={player.image}
                      alt={player.name}
                      fill
                      className="object-cover"
                    />

                    <div className="absolute top-4 right-4 bg-green-500 text-black font-black text-xl w-14 h-14 rounded-full flex items-center justify-center">
                      #{index + 1}
                    </div>
                  </div>

                  <div className="p-7">
                    <h2 className="text-4xl font-black text-green-400">
                      {player.name}
                    </h2>

                    <p className="text-gray-400 mt-2">
                      {player.matches} matches played
                    </p>

                    <div className="mt-6 flex items-center justify-between">
                      <span className="text-5xl font-black text-green-400">
                        ₹{player.winnings}
                      </span>

                      <span className="text-green-400 font-bold">
  {
    index === 0
      ? "Profit Machine"
      : index === 1
      ? "Gambling Consultant"
      : "Hope Destroyer"
  }
</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </section>

      {/* TOP 3 LOSERS */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <h2 className="text-6xl font-black text-red-500 mb-14">
          Top 3 Losers
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[...players]
            .sort((a, b) => a.winnings - b.winnings)
            .slice(0, 3)
            .map((player, index) => (
              <Link
                key={player.id}
                href={`/player/${player.id}`}
              >
                <div className="bg-[#120000] border border-red-500/30 rounded-[32px] overflow-hidden hover:scale-[1.02] transition-all duration-300 cursor-pointer">
                  <div className="relative h-[360px] w-full">
                    <Image
                      src={player.image}
                      alt={player.name}
                      fill
                      className="object-cover"
                    />

                    <div className="absolute top-4 right-4 bg-red-500 text-white font-black text-xl w-14 h-14 rounded-full flex items-center justify-center">
                      #{index + 1}
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
  {
    index === 0
      ? "Chip Donation Foundation"
      : index === 1
      ? "All-In Without Consent"
      : "Emotionally Bankrupt"
  }
</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </section>
    </main>
  );
}