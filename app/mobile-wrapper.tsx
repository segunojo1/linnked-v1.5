"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

const MOBILE_BREAKPOINT = 768;

const MobileWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
  }, []);

  if (isMobile === null) {
    return <div className="min-h-screen bg-[#FAF9F5]" />;
  }

  if (isMobile) {
    return (
      <section className="min-h-screen px-6 py-10 flex items-center justify-center bg-[radial-gradient(circle_at_top,#fff7f7,transparent_40%),linear-gradient(180deg,#ffffff_0%,#faf9f5_100%)]">
        <div className="w-full max-w-md rounded-[28px] border border-[#f0f0ef] bg-white px-6 py-10 text-center shadow-[0_12px_40px_rgba(0,0,0,0.06)]">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#FFF3F3]">
            <Image
              src="/assets/linnk.svg"
              alt="Linnked"
              width={48}
              height={48}
              priority
            />
          </div>
          <h1 className="font-pp-mondwest text-[34px]/[100%] text-black">
            Mobile not available yet
          </h1>
          <p className="mt-4 font-pp-neuebit text-[18px]/[150%] font-bold text-black/75">
            Linnked is built for a larger screen right now. Please open it on a
            laptop or desktop to continue.
          </p>
        </div>
      </section>
    );
  }

  return <>{children}</>;
};

export default MobileWrapper;