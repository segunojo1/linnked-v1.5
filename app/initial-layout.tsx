// InitialLoadGate.tsx
"use client";

import React, { useEffect, useState } from "react";
import SidebarShell from "@/components/sidebar-shell";
import ClientLayout from "@/app/client-layout";
import { WelcomeScreen } from "@/app/(sender)/form/_components/welcome-screen";

type Props = {
  children: React.ReactNode;
  delayMs?: number;
};

export default function InitialLoadGate({ children, delayMs = 4000 }: Props) {
  const [ready, setReady] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(Math.ceil(delayMs / 1000));

  useEffect(() => {
    const endAt = Date.now() + delayMs;

    const tick = window.setInterval(() => {
        const remaining = Math.max(0, endAt - Date.now());
        setSecondsLeft(Math.ceil(remaining / 1000));
    }, 100);

    const done = window.setTimeout(() => {
        setReady(true);
        setSecondsLeft(0);
    }, delayMs);

    return () => {
        window.clearInterval(tick);
        window.clearTimeout(done);
    }
  }, [delayMs]);

  if (!ready) {
    return (
        <div className="p-3">
            <WelcomeScreen secondsLeft={secondsLeft}/>
        </div>
    )
  }

  return (
    <SidebarShell>
      <ClientLayout>{children}</ClientLayout>
    </SidebarShell>
  );
}