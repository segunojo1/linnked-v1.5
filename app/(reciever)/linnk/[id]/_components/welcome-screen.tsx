import { useFormStore } from '@/store/form.store';
import { useRecipientStore } from '@/store/recipient.store';
import Image from 'next/image';
import React from 'react'
import HeaderIcons from './header-icons';

const WelcomeScreen = () => {
      const { headerIcons } = useFormStore();
      const { setSteps, messageDetails } = useRecipientStore();
    
  return (
    <section className="relative z-[999999] h-screen flex flex-col items-center gap-12.5  max-h-screen ">
      <h1 className="text-[42.12px]/[100%] font-normal -tracking-[2%] font-pp-mondwest mt-11.25">
        Heyy {messageDetails?.recipientName || "there"}
      </h1>
      {/* <div className="flex items-center gap-6.25">
        {messageDetails?.icons.map((icon, index) => (
          <button
            key={`${icon.position}-${index}`}
            type="button"
            className="relative group"
          >
            <Image
              src={icon.iconSrc}
              alt={icon.iconNote || `icon-${index}`}
              height={80}
              width={80}
            />
            <div className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 flex -translate-x-1/2 flex-col items-center gap-1 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
              {icon.iconNote ? (
                <span className="max-w-56 rounded-[10px] border-[.5px] border-[#E5E5E5] bg-[#FFFFFF1A] px-3 py-2 text-center text-[18px] leading-[1.05] text-stone-900 shadow-sm whitespace-pre-wrap wrap-break-word">
                  {icon.iconNote}
                </span>
              ) : null}
            </div>
          </button>
        ))}
      </div> */}
      <HeaderIcons />
      <div className="flex flex-col items-center gap-[62px] mt-[62px]">
        <p className="text-[30px]/[100%] font-bold font-pp-neuebit max-w-[500px] text-center">
          {messageDetails?.senderName || "Someone"} has created something special just for you!. They’ve sent you a
          heartfelt note, and now it’s time to read it. ✨
        </p>
        <button onClick={() => setSteps(2)} className=" cursor-pointer flex items-center  gap-1 text-black px-[10px] py-[6.5px] bg-[#FFF3F3] text-[20px]/[100%] tracking-[2%] font-bold w-fit rounded-[22px] ">
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
            className="absolute bottom-30 left-10 z-[9999999999] "
          />
    </section>
  )
}

export default WelcomeScreen