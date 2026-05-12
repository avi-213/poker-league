"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const trashTalks = [


  "BREAKING: Taran all-in again. Risk management still missing.",

  "Taran and Akshay rivalry now affecting hostel GDP.",

  "Taran raises first and thinks later. Mostly never thinks later.",

  "Vikash believed in the river again. The river did not believe back.",

  "Vikash bluffing like nobody can see visible panic.",

  "Vikash putting money in purely on spiritual optimism.",



  "Bhaskar treats every chip like generational wealth.",

  "Bhaskar waiting 4 business days before entering a pot.",

  "Nobody understands Swetank’s strategy. Including Swetank.",

  "Ayush acting weak again with suspicious Oscar-level performance.",

  "Ayush pretending he has nothing while holding nuclear weapons.",

  "Ayush started crying about bad cards. Pocket aces detected immediately.",

  "Vinit shouting at everyone after losing mathematically legal pots.",

  "Silence detected from Vinit. Financial damage confirmed.",

  "Vinit volume directly proportional to confidence levels.",

  "Akshay playing balanced poker while surrounded by terrorists.",


  "Manish folded 97% of hands and still ended profitable.",

  "Manish waiting silently like a retired assassin.",

  "Manish only plays premium hands and somehow everyone still pays him.",

  "Avish currently farming aggressive players for passive income.",



  "The table fears Avish. Mostly financially.",

  "Hostel liquidity shifted immediately after Taran raised preflop.",



  "Ayush emotionally manipulating the entire table again.",


  "Vikash all-in on hope and unsupported theories.",

  "Manish folded so long people forgot he was at the table.",


  "Vinit entered commentary mode immediately after losing chips.",

];

export default function TrashTalk() {

  const [randomTalk, setRandomTalk] = useState("");

useEffect(() => {
  setRandomTalk(
    trashTalks[
      Math.floor(Math.random() * trashTalks.length)
    ]
  );
}, []);

  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 60,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 1,
      }}
      viewport={{
        once: true,
      }}
      className="
        relative
        mt-28
        max-w-7xl
        mx-auto
        overflow-hidden
        rounded-[42px]
        border
        border-yellow-500/20
        bg-black
        px-10
        py-20
      "
    >

      {/* MASSIVE GLOW */}
      <div className="
        absolute
        -top-32
        right-0
        w-[500px]
        h-[500px]
        bg-yellow-500/10
        blur-[140px]
        rounded-full
      " />

      <div className="
        absolute
        bottom-0
        left-0
        w-[400px]
        h-[400px]
        bg-red-500/10
        blur-[120px]
        rounded-full
      " />

      {/* FLOATING CHIPS */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 8, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 5,
        }}
        className="
          absolute
          top-10
          right-10
          text-[120px]
          opacity-10
        "
      >
        ♠
      </motion.div>

      <motion.div
        animate={{
          y: [0, 15, 0],
          rotate: [0, -10, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 6,
        }}
        className="
          absolute
          bottom-10
          left-10
          text-[100px]
          opacity-10
        "
      >
        ♥
      </motion.div>

      {/* CONTENT */}
      <div className="relative z-10">

        {/* TOP LABEL */}
        <motion.div
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
          }}
          className="
            inline-flex
            items-center
            gap-3
            border
            border-red-500/30
            bg-red-500/10
            px-5
            py-2
            rounded-full
            mb-8
          "
        >

          <div className="
            w-3
            h-3
            rounded-full
            bg-red-500
          " />

          <p className="
            uppercase
            tracking-[0.25em]
            text-red-400
            text-sm
            font-black
          ">
            LIVE TABLE INTELLIGENCE
          </p>

        </motion.div>

        {/* MAIN TEXT */}
        <motion.h2
          initial={{
            opacity: 0,
            scale: 0.95,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.8,
            delay: 0.2,
          }}
          className="
            text-5xl
            md:text-7xl
            font-black
            leading-[1.05]
            text-white
            max-w-5xl
          "
        >
          {randomTalk}
        </motion.h2>

    

      </div>

    </motion.section>
  );
}