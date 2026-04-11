"use client";
import { useFormStore } from "@/store/form.store";
import Image from "next/image";

const LinnkPage = () => {
  const { headerIcons } = useFormStore();
  return (
    <section className="relative z-[999999] h-screen flex flex-col items-center gap-12.5  max-h-screen mt-11.25">
      <h1 className="text-[42.12px]/[100%] font-normal -tracking-[2%] font-pp-mondwest">
        Heyy Hasbiy
      </h1>
      <div className="flex items-center gap-6.25">
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
      </div>

      <div className="flex flex-col items-center gap-[62px] mt-[62px]">
        <p className="text-[30px]/[100%] font-bold font-pp-neuebit max-w-[500px] text-center">
          Harry has created something special just for you!. They’ve sent you a
          heartfelt note, and now it’s time to read it. ✨
        </p>
        <button className=" cursor-pointer flex items-center  gap-1 text-black px-[10px] py-[6.5px] bg-[#FFF3F3] text-[20px]/[100%] tracking-[2%] font-bold w-fit rounded-[22px] ">
          Read Message
          <Image
            src="/assets/left-arrow.svg"
            alt="Back"
            width={17}
            height={17}
            className="rotate-180"
          />
        </button>
      </div>

      <Image src="/assets/flower.svg"
            alt="flower"
            width={153}
            height={153}
            className="absolute bottom-30 right-10 z-[9999999999] "
          />
          <Image src="/assets/love.svg"
            alt="love"
            width={153}
            height={153}
            className="absolute top-30 left-10 z-[9999999999] "
          />
    </section>
  );
};

export default LinnkPage;
