"use client";

import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { useFormStore } from "@/store/form.store";

// This is sample data.
const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      url: "#",
      items: [
        {
          title: "Info",
          url: "#",
        },
        {
          title: "Template",
          url: "#",
        },
        {
          title: "Message",
          url: "#",
        },
        {
          title: "Customize",
          url: "#",
        },
        {
          title: "Preview",
          url: "#",
        },
        {
          title: "Share",
          url: "#",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { template, setSteps, steps } = useFormStore();

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <button
          onClick={() => setSteps(steps - 1)}
          className="flex items-center gap-1 text-black px-[10px] py-[6.5px] bg-[#FAF9F5] text-[20px]/[100%] tracking-[2%] font-bold w-fit rounded-[22px]"
        >
          <Image
            src="/assets/left-arrow.svg"
            alt="Back"
            width={17}
            height={17}
            className=""
          />
          Back
        </button>
      </SidebarHeader>
      <SidebarContent>
        {data.navMain.map((item) => (
          <SidebarGroup key={item.url} className="pl-5">
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item, index) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      className={`px-[12.4px] py-[2.5px] rounded-[7.48px] w-fit ${
                        steps === index + 1 ? "bg-[#FAF9F5]" : "bg-white"
                      }`}
                      asChild
                      isActive={steps === index + 1}
                    >
                      <p className="text-[22.45px] text-black font-bold">
                        {item.title}
                      </p>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
