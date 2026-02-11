"use client";

import React from "react";
import Image from "next/image";
import { useFormStore } from "@/store/form.store";

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
    const { template, setSteps, steps } = useFormStore();
    return (
        <>
            <button
                onClick={() => setSteps(steps + 1)}
                className="absolute cursor-pointer z-[9999] flex items-center self-end gap-1 text-black px-[10px] py-[6.5px] bg-[#FFF3F3] text-[20px]/[100%] tracking-[2%] font-bold w-fit rounded-[22px] mr-5 mt-[35px]"
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
            {children}
        </>
    );
};

export default ClientLayout;

