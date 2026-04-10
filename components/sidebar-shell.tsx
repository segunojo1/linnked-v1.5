"use client"

import { useFormStore } from "@/store/form.store";
import React from "react";
import { SidebarInset, SidebarProvider } from "./ui/sidebar";
import { AppSidebar } from "./app-sidebar";

export default function SidebarShell({children}: {children: React.ReactNode}) {
    const { steps } = useFormStore();

    const sidebarOpen = steps < 5;

    return (
        <SidebarProvider open={sidebarOpen} onOpenChange={() => {}}>
            <AppSidebar />
            <SidebarInset>{children}</SidebarInset>
        </SidebarProvider>
    )
}