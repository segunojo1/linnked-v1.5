"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRecipientStore } from "@/store/recipient.store";

const ReceiverLayout = ({ children }: { children: React.ReactNode }) => {
  const { setSteps, steps } = useRecipientStore();

  return (
    <>
      <div className="">
        {steps !== 2 && (
          <>
          {steps !== 1 && (
            <button
              onClick={() => setSteps(steps - 1)}
              className=" cursor-pointer absolute z-[9999999] left-5 top-[35px] left-12 flex items-center  gap-1 text-black px-[10px] py-[6.5px] bg-[#FFF3F3] text-[20px]/[100%] tracking-[2%] font-bold w-fit rounded-[22px] "
            >
              <Image
                src="/assets/left-arrow.svg"
                alt="Back"
                width={17}
                height={17}
                className=""
              />
              Back
            </button>
            )}

            <Link
              href="/form"
              className="absolute right-12 z-[9999999] top-[35px] cursor-pointer flex items-center  gap-1 text-black px-[10px] py-[6.5px] bg-[#FFF3F3] text-[20px]/[100%] tracking-[2%] font-bold w-fit rounded-[22px] "
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
          </>
        )}
        {children}
      </div>
    </>
  );
};

export default ReceiverLayout;
