import { Button } from "@/components/ui/button";
import { useFormStore } from "@/store/form.store";
import Image from "next/image";
import { ShareSecond } from "./share";

const NewShare = () => {
  const { formDone } = useFormStore();

  switch (formDone) {
    case false:
      return <NewSharePreview />;
      break;
    case true:
      return <NewShareFinal />;
      break;
    default:
      break;
  }
};

export default NewShare;

export const NewSharePreview = () => {
  const { message, headerIcons, signature, backgroundImage } = useFormStore();

  const submitMessage = () => {

  }
  return (
    <>
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

      <section className="z-[999999] flex flex-col items-center gap-12.5 h-full max-h-screen mt-11.25">
        <h1 className="text-[42.12px]/[100%] font-normal -tracking-[2%] font-pp-mondwest">
          A little something for you ;)
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

        <div className="w-full max-w-[472px] bg-white min-h-[60%] -rotate-3 rounded-lg p-8 shadow-md flex flex-col justify-between ">
          <div className="text-[16px] leading-6 font-neuemontreal font-medium text-stone-800 whitespace-pre-wrap mb-12">
            {message}
          </div>
          <div className="">
            <div className="flex flex-col gap-6 items-start">
              {signature && (
                <img src={signature} alt="signature" className="w-32 h-20" />
              )}
            </div>

            <Image
              src="/assets/yesnoo.svg"
              alt="yes or no"
              height={34.9}
              width={81.5}
              className="justify-self-end mt-8.75"
            />
          </div>

        </div>
        <Button onClick={submitMessage} className='text-black mx-auto mb-[42px] hover:text-white w-[107px] bg-[#d3c2c2] py-[10px] px-5 flex items-center gap-[10px]'>Enter <Image src='/icons/arrow-up.svg' alt='arrow' className='group-hover:rotate-12 transition-all' width={20} height={20} /></Button>
        
      </section>
    </>
  );
};

export const NewShareFinal = () => {
  return (
    <>
      <ShareSecond />
    </>
  );
};
