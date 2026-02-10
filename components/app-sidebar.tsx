import * as React from "react"

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
} from "@/components/ui/sidebar"
import Image from "next/image"

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
          title: "Message",
          url: "#",
        },
        {
          title: "Template",
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
        }
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-1 text-black px-[10px] py-[6.5px] bg-[#FAF9F5] text-[20px] tracking-[2%] font-bold w-fit rounded-[22px]">
          <Image src="/assets/left-arrow.svg" alt="Back" width={17} height={17} className="" />
          Back
        </div>
      </SidebarHeader>
      <SidebarContent>
        {data.navMain.map((item) => (
          <SidebarGroup key={item.url}>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton className="px-[12.4px] py-[2.5px] rounded-[7.48px] bg-[red] w-fit" asChild isActive={item.isActive}>
                      <p className="text-[22.45px] font-bold">{item.title}</p>
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
  )
}
