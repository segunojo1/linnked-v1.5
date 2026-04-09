"use client";

import { useState } from "react";
import { useFormStore } from "@/store/form.store";
import Image from "next/image";
import SignatureCanvas from "./signature-canvas";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const NewPreview = () => {
  const { message } = useFormStore();
  const [isSignatureOpen, setIsSignatureOpen] = useState(false);
  const [signature, setSignature] = useState<string>("");

  return (
    <section className="flex flex-col items-center gap-[50px] h-full max-h-screen mt-[45px]">
      <h1 className="text-[42.12px]/[100%] font-normal -tracking-[2%] font-pp-mondwest">A little something for you  ;)</h1>

      <span className="flex items-center gap-[25px] ">
        <Image
          src="/assets/preview1.svg"
          alt="first preview image"
          height={90}
          width={66}
        />
        <Image src="/assets/preview2.svg" alt="flower" width={80} height={80} />
        <Image
          src="/assets/preview3.svg"
          alt="third preview image"
          height={76}
          width={89}
        />
        <Image
          src="/assets/preview4.svg"
          alt="fourth preview image"
          height={90}
          width={90}
        />
        <Image
          src="/assets/preview7.svg"
          alt="fifth preview image"
          height={88}
          width={90}
        />
        <Image
          src="/assets/preview6.svg"
          alt="sixth preview image"
          height={76}
          width={76}
        />
      </span>

      <div className="w-full max-w-2xl bg-white rounded-lg p-8 shadow-md">
        <div className="text-[16px] leading-6 font-neuemontreal font-medium text-stone-800 whitespace-pre-wrap mb-12">
          {message}
        </div>

        <div className="flex flex-col gap-6 items-start">
          {signature ? (
            <img src={signature} alt="signature" className="w-32 h-20" />
          ) : (
            <Button onClick={() => setIsSignatureOpen(true)}>
              Add Signature
            </Button>
          )}
        </div>

        <Image src="/assets/yesnoo.svg" alt="yes or no" height={34.9} width={81.5} className="justify-self-end mt-[35px]" />
      </div> 

      <Dialog open={isSignatureOpen} onOpenChange={setIsSignatureOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Sign Here</DialogTitle>
          </DialogHeader>
          <SignatureCanvas
            onSignatureChange={setSignature}
            onClose={() => setIsSignatureOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default NewPreview;
