"use client"

import Link from "next/link"
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar"
import { LogOut, Settings } from "lucide-react"
import { useClerk } from "@clerk/nextjs"

export function SidebarOther() {

    const { signOut } = useClerk()

    return(
        <SidebarGroup>
        <SidebarGroupLabel>その他</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/dashboard/settings">
                <Settings />
                <span>設定</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton className="text-red-500 hover:text-red-500" onClick={() => signOut()}>
              <LogOut/>
              <span>ログアウト</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    )
}