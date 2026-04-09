"use client";

import React from "react";
import Image from "next/image";
import { useFormStore } from "@/store/form.store";

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const { template, setSteps, steps } = useFormStore();
  console.log(steps, template);
  
  return (
    <>
      <div className="flex items-center absolute mr-5 mt-[35px] self-end p-4 gap-2">
        {steps == 4 && template == "new" && (
          <button className="flex  w-fit items-center gap-1 py-[5px] px-[10px] bg-[#FAF9F5] rounded-[22px]">
            <p>Add background image</p>
            <Image
              src="icons/arrow-up.svg"
              alt="arrow up"
              height={17}
              width={17}
            />
          </button>
        )}
        <button
          onClick={() => setSteps(steps + 1)}
          className=" cursor-pointer z-[9999] flex items-center  gap-1 text-black px-[10px] py-[6.5px] bg-[#FFF3F3] text-[20px]/[100%] tracking-[2%] font-bold w-fit rounded-[22px] "
        >
          Next
          <Image
            src="/assets/left-arrow.svg"
            alt="Back"
            width={17}
            height={17}
            className="rotate-180"
          />
        </button>
      </div>
      {children}
    </>
  );
};

export default ClientLayout;
