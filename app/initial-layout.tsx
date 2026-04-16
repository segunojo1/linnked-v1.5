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

export default function InitialLoadGate({ children, delayMs = 23000 }: Props) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), delayMs);
    return () => window.clearTimeout(timer);
  }, [delayMs]);

  if (!ready) {
    return <WelcomeScreen />;
  }

  return (
    <SidebarShell>
      <ClientLayout>{children}</ClientLayout>
    </SidebarShell>
  );
}