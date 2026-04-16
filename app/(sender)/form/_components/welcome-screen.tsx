"use client";

import Image from "next/image";
import Link from "next/link";

export const WelcomeScreen = () => {
  const title = "Send a Message they’ll never forget.";
  return (
      <div className="flex flex-col bg-[url('/assets/bg3.webp')] rounded-[24px] bg-cover bg-center relative  h-screen items-center justify-center gap-[35px] w-full ">
        <Image
          src="/assets/circle.svg"
          alt="customize"
          width={80}
          height={80}
          className="top-20 left-20 absolute"
        />
        <Image
          src="/assets/done.svg"
          alt="done"
          width={144}
          height={144}
          className="right-[95px] bottom-[360px] absolute"
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

        <h2 className="text-[119px]/[100%] font-bold font-pp-neuebit -tracking-[2%] text-white">
          Send a Message they’ll never forget.
        </h2>
        <Link
          href="/form"
          className=" z-[9999999] cursor-pointer flex items-center  gap-1 text-black px-[10px] py-[6.5px] bg-[#FFF3F3] text-[20px]/[100%] tracking-[2%] font-bold w-fit rounded-[22px] "
        >
          Send your Linnk
          <Image
            src="/assets/left-arrow.svg"
            alt="Back"
            width={17}
            height={17}
            className="rotate-180"
          />
        </Link>

        <Image
          src="/assets/customize.svg"
          alt="customize"
          width={446}
          height={45}
        />

        <p className="text-[59px]/[100%] font-bold -tracking-[2%] font-pp-neuebit absolute right-[47px] bottom-6 text-white">
          Linnked
        </p>
      </div>
  );
};