"use client";

import { useFormStore } from "@/store/form.store";
import { useRecipientStore } from "@/store/recipient.store";
import Image from "next/image";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const MainMessage = () => {
  const { setSteps } = useRecipientStore();
  const { headerIcons, message, signature } = useFormStore();
  const [selectedChoice, setSelectedChoice] = useState<"yes" | "no" | null>(
    null,
  );
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleChoiceClick = (choice: "yes" | "no") => {
    setSelectedChoice(choice);
    setIsConfirmOpen(true);
  };

  const handleConfirm = () => {
    setIsConfirmOpen(false);
    if (selectedChoice === "yes") {
      setSteps(3);
    } else {
      setSteps(4);
    }
  };

  return (
    <section className="px-5 py-3.75 h-screen">
      <div className="relative flex flex-col h-full items-center rounded-[25px] gap-12.5 max-h-screen">
        <h1 className="text-[42.12px]/[100%] font-normal -tracking-[2%] font-pp-mondwest mt-10">
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

        <div className="w-full max-w-118 bg-white min-h-[60%] -rotate-3 rounded-lg p-8 shadow-md flex flex-col justify-between ">
          <div className="text-[16px] leading-6 font-neuemontreal font-medium text-stone-800 whitespace-pre-wrap mb-12">
            {message}
          </div>
          <div className="">
            <div className="flex flex-col gap-6 items-start">
              {signature && (
                <img src={signature} alt="signature" className="w-32 h-20" />
              )}
            </div>

            <div className="mt-8.75 flex justify-end">
              <div className="inline-flex items-center rounded-xl border border-stone-200 bg-[#F6F5F2] p-1 shadow-sm">
                <button
                  type="button"
                  onClick={() => handleChoiceClick("yes")}
                  className="rounded-lg px-4 py-1.5 text-[24px]/[100%] font-bold text-white bg-red-500 hover:bg-red-600 transition-colors"
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => handleChoiceClick("no")}
                  className="rounded-lg px-4 py-1.5 text-[24px]/[100%] font-bold text-stone-400 hover:text-stone-600 transition-colors"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>

        <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-[32px]/[100%] font-pp-mondwest">
                Confirm Choice
              </DialogTitle>
            </DialogHeader>
            <p className="text-[24px]/[110%] text-stone-700">
              {selectedChoice === "yes"
                ? "You selected Yes. Continue?"
                : "You selected No. Continue?"}
            </p>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsConfirmOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleConfirm}>Continue</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default MainMessage;
