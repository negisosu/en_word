"use client"

import type * as React from "react"
import {
  Frame,
  Home,
  Map,
  PieChart,
  Settings,
  LogOut
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { UserButton, useClerk } from "@clerk/nextjs"
import Link from "next/link"

// メインナビゲーション項目
const data = {
  navMain: [
    {
      title: "ダッシュボード",
      url: "/dashboard",
      icon: Home,
      isActive: true,
    },
  ],
  projects: [
    {
      name: "プロジェクト A",
      url: "/dashboard/projects/project-a",
      icon: Frame,
    },
    {
      name: "プロジェクト B",
      url: "/dashboard/projects/project-b",
      icon: PieChart,
    },
    {
      name: "プロジェクト C",
      url: "/dashboard/projects/project-c",
      icon: Map,
    },
  ],
}

console.log(data)

export function DashboardSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const { signOut } = useClerk()

  return (
    <Sidebar collapsible="icon" {...props}>

      <SidebarContent>
        {/* メインナビゲーション */}
        <SidebarGroup>
          <SidebarGroupLabel>メニュー</SidebarGroupLabel>
          <SidebarMenu>
          </SidebarMenu>
        </SidebarGroup>

        {/* プロジェクト */}
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel>単語帳</SidebarGroupLabel>
          <SidebarMenu>
          </SidebarMenu>
        </SidebarGroup>

        {/* 設定 */}
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
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <UserButton/>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
