import { Button } from "@/components/ui/button";
import { useFormStore } from "@/store/form.store";
import Image from "next/image";

const NewShare = () => {
 const { formDone } = useFormStore();
 
     switch (formDone) {
         case false:
             return (<NewSharePreview />)
             break;
         case true:
             return (<NewShareFinal />)
             break;
         default:
             break;
     }
}

export default NewShare

export const NewSharePreview = () => {
    const { message, headerIcons, signature } = useFormStore();
  return (
    <section className="flex flex-col items-center gap-12.5 h-full max-h-screen mt-11.25">
          <h1 className="text-[42.12px]/[100%] font-normal -tracking-[2%] font-pp-mondwest">
            A little something for you ;)
          </h1>
    
          <div className="flex items-center gap-6.25">
            {headerIcons.map((icon, index) => (
                <Image
                  src={icon.src}
                  alt={icon.alt}
                  height={icon.height}
                  width={icon.width}
                />
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
        </section>
  )
}


export const NewShareFinal = () => {
  return (
    <div>NewShare</div>
  )
}

