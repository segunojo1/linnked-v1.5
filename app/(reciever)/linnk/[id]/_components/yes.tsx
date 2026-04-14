"use client";

import confetti from "canvas-confetti";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import HeaderIcons from "./header-icons";
import { useFormStore } from "@/store/form.store";

const Yes = () => {
  const { senderFirstName } = useFormStore();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion)return;

    const end = Date.now() + 3500;

    const frame = () => {
        confetti({
            particleCount: 2,
            angle: 60,
            spread: 65,
            origin: { x: 0, y: 0.7 },
            colors: ['#ff4d6d', '#ffd166', '#7bdff2', '#b8f2e6', "#f7aef8"],
        })

        confetti({
            particleCount: 2,
            angle: 120,
            spread: 65,
            origin: { x: 1, y: 0.7 },
            colors: ['#ff4d6d', '#ffd166', '#7bdff2', '#b8f2e6', "#f7aef8"],
        })

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }

    confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#ff4d6d', '#ffd166', '#7bdff2', '#b8f2e6', "#f7aef8"],
    })

    frame();
  }, [])
  return (
    <section className="px-5 py-[15px] h-screen bg-[#FF6565]">
      <div className="relative flex flex-col h-full items-center rounded-[25px] gap-12.5 bg-white max-h-screen">
        <h1 className="text-[42.12px]/[100%] font-normal -tracking-[2%] font-pp-mondwest mt-[45px]">
          It’s a <span className="font-bold">Yes!!</span>.
        </h1>
        {/* <div className="flex items-center gap-6.25">
          {headerIcons.map((icon, index) => (
            <button
              key={`${icon.alt}-${index}`}
              type="button"
              className="relative group"
            >
              <Image
                src={icon.src}
                alt={icon.alt}
                height={icon.height}
                width={icon.width}
              />
              <div className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 flex -translate-x-1/2 flex-col items-center gap-1 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                {icon.note ? (
                  <span className="max-w-56 rounded-[10px] border-[.5px] border-[#E5E5E5] bg-[#FFFFFF1A] px-3 py-2 text-center text-[18px] leading-[1.05] text-stone-900 shadow-sm whitespace-pre-wrap wrap-break-word">
                    {icon.note}
                  </span>
                ) : null}
              </div>
            </button>
          ))}
        </div> */}

        <HeaderIcons />

        <div className="flex flex-col items-center gap-[62px] mt-[62px]">
          <p className="text-[30px]/[100%] font-bold font-pp-neuebit max-w-[500px] text-center">
            Looks like love is in the air! {senderFirstName} will be thrilled to know that
            you said yes! Now, why not make their day even better? Send them a
            sweet message back!
          </p>
          <Link
            href="/form"
            className=" cursor-pointer flex items-center  gap-1 text-black px-[10px] py-[6.5px] bg-[#FFF3F3] text-[20px]/[100%] tracking-[2%] font-bold w-fit rounded-[22px] "
          >
            Send your Linnked
            <Image
              src="/assets/left-arrow.svg"
              alt="Back"
              width={17}
              height={17}
              className="rotate-180"
            />
          </Link>
        </div>

        <Image
          src="/assets/flower.svg"
          alt="flower"
          width={153}
          height={153}
          className="absolute bottom-30 right-10 z-[9999999999] "
        />
        <Image
          src="/assets/love.svg"
          alt="love"
          width={153}
          height={153}
          className="absolute bottom-30 left-10 z-[9999999999] "
        />
      </div>
    </section>
  );
};

export default Yes;
