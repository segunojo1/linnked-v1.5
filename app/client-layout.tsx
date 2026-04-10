"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { useFormStore } from "@/store/form.store";

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const { template, setSteps, steps } = useFormStore();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<string>("");
  console.log(steps, template);

  const handlePickBackground = () => {
    console.log("clicked");
    fileInputRef.current?.click();
  };

  const handleBackgroundChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    setBackgroundImage(objectUrl);
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleBackgroundChange}
      />
      {
        steps == 5 && (
      <button
        onClick={() => setSteps(steps - 1)}
        className=" cursor-pointer absolute z-[9999999] left-0 top-12 left-12 flex items-center  gap-1 text-black px-[10px] py-[6.5px] bg-[#FFF3F3] text-[20px]/[100%] tracking-[2%] font-bold w-fit rounded-[22px] "
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
        )
      }
      {backgroundImage ? (
        <div>
          <Image
            src={backgroundImage}
            alt="Background"
            layout="fill"
            objectFit="cover"
            priority
          />
          <div className="absolute inset-0 bg-white/10" />
        </div>
      ) : null}
      <div className="flex items-center absolute  z-[999] mr-5 mt-[35px] self-end p-4 gap-2">
        {steps == 4 && template == "new" && (
          <button
            onClick={handlePickBackground}
            className="flex  w-fit items-center gap-1 py-[5px] px-[10px] bg-[#FAF9F5] rounded-[22px]"
          >
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
          className=" cursor-pointer flex items-center  gap-1 text-black px-[10px] py-[6.5px] bg-[#FFF3F3] text-[20px]/[100%] tracking-[2%] font-bold w-fit rounded-[22px] "
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
