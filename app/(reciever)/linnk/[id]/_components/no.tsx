import { useFormStore } from "@/store/form.store";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import HeaderIcons from "./header-icons";

const NoPage = () => {
  const { headerIcons } = useFormStore();
  return (
    <section className="px-5 py-[15px] h-screen bg-[#FFF3F3]">
      <div className="relative flex flex-col h-full items-center border border-[#F0F0EF] rounded-[25px] gap-12.5 bg-white max-h-screen">
        <h1 className="text-[42.12px]/[100%] font-normal -tracking-[2%] font-pp-mondwest mt-[45px]">
          Not this <span className="font-bold">time....</span>.
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
            That’s okay—love works in mysterious ways. Maybe there's someone special you'd like to send a special message to instead?
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
          width={133}
          height={133}
          className="absolute bottom-5 left-5 z-[9999999999] "
        />
      </div>
    </section>
  );
};

export default NoPage;
