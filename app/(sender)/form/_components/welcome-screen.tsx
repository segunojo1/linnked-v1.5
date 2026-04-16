"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";

type WelcomeScreenProps = {
  secondsLeft?: number;
};

export const WelcomeScreen = ({ secondsLeft = 0 }: WelcomeScreenProps) => {
  const title = "Send a Message they’ll never forget.";
  const shouldReduceMotion = useReducedMotion();

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.12,
      },
    },
  };

  const word = {
    hidden: { opacity: 0, y: 12, filter: "blur(2px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)" },
  };

  const reducedWord = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  };

  const iconBurst = [
    {
      src: "/assets/circle.svg",
      size: 44,
      fromX: -230,
      fromY: -90,
      delay: 0.0,
    },
    { src: "/assets/leaf.svg", size: 52, fromX: 220, fromY: -70, delay: 0.14 },
    {
      src: "/assets/popcorn.svg",
      size: 58,
      fromX: -240,
      fromY: 95,
      delay: 0.28,
    },
    { src: "/assets/stand.svg", size: 56, fromX: 235, fromY: 110, delay: 0.42 },
    { src: "/assets/done.svg", size: 62, fromX: 0, fromY: -140, delay: 0.56 },
  ];

  return (
    <div className="flex flex-col bg-[url('/assets/bg3.webp')] bg-gray-500 rounded-[24px] bg-cover bg-center relative  h-screen items-center justify-center gap-[35px] w-full ">
      <Image
        src="/assets/circle.svg"
        alt="customize"
        width={80}
        height={80}
        className="top-20 left-20 absolute"
      />
      <Image
        src="/assets/stand.svg"
        alt="stand"
        width={141}
        height={133}
        className="absolute bottom-0 left-0"
      />
      <Image
        src="/assets/popcorn.svg"
        alt="popcorn"
        width={144}
        height={144}
        className="right-[398px] bottom-0 absolute"
      />
      <Image
        src="/assets/leaf.svg"
        alt="leaf"
        width={111}
        height={111}
        className="right-0 bottom-[145px] absolute"
      />

      <motion.h2
        className="text-[119px]/[100%] z-[100000] font-bold font-pp-neuebit -tracking-[2%] text-white text-center"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {title.split(" ").map((w, i) => (
          <motion.span
            key={`${w}-${i}`}
            variants={shouldReduceMotion ? reducedWord : word}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block mr-[0.25em] will-change-transform"
          >
            {w}
          </motion.span>
        ))}
      </motion.h2>

      <div className="relative mt-2 h-[170px] w-[446px]">
        {iconBurst.map((icon, i) => (
          <motion.div
            key={icon.src + i}
            className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
            initial={{
              x: icon.fromX,
              y: icon.fromY,
              scale: 0.45,
              rotate: -18,
              opacity: 0,
              filter: "blur(3px)",
            }}
            animate={{
              x: 0,
              y: 0,
              scale: [0.45, 1.05, 0.85],
              rotate: [0, 6, 0],
              opacity: [0, 1, 0],
              filter: ["blur(3px)", "blur(0px)", "blur(2px)"],
            }}
            transition={{
              duration: 1.1,
              delay: icon.delay,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Image
              src={icon.src}
              alt=""
              width={icon.size}
              height={icon.size}
              aria-hidden
            />
          </motion.div>
        ))}

        <motion.div
          className="relative z-20"
          initial={{
            clipPath: "inset(0 100% 0 0 round 8px)",
            opacity: 0,
            filter: "blur(8px)",
            scale: 0.985,
          }}
          animate={{
            clipPath: "inset(0 0% 0 0 round 8px)",
            opacity: 1,
            filter: "blur(0px)",
            scale: 1,
          }}
          transition={{
            duration: 0.95,
            delay: 0.72,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <Image
            src="/assets/customize.svg"
            alt="customize"
            width={446}
            height={45}
            className="drop-shadow-[0_10px_24px_rgba(0,0,0,0.22)]"
            priority
          />
        </motion.div>

        <motion.div
          className="pointer-events-none absolute inset-y-0 left-0 z-30 w-24 bg-gradient-to-r from-white/0 via-white/70 to-white/0 mix-blend-screen"
          initial={{ x: -120, opacity: 0 }}
          animate={{ x: 520, opacity: [0, 1, 0] }}
          transition={{
            duration: 0.9,
            delay: 1.05,
            ease: [0.16, 1, 0.3, 1],
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-6 right-6 rounded-full bg-[#FFF3F3] px-4 py-2 text-[22px]/[100%] font-bold font-pp-neuebit text-black"
      >
        Loading in {secondsLeft}s
      </motion.div>

      <p className="text-[59px]/[100%] font-bold -tracking-[2%] font-pp-neuebit absolute right-[47px] bottom-6 text-white">
        Linnked
      </p>
    </div>
  );
};
