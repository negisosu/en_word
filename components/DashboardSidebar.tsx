"use client"

import type * as React from "react"
import {
  Frame,
  Home,
  Map,
  PieChart,
  Settings,
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
import { SignOutButton, UserButton } from "@clerk/nextjs"
import { Button } from "./ui/button"
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
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem className="flex">
            <UserButton/>
            <div className="flex items-center justify-center w-full">
                <Button asChild variant={"outline"} className="border-red-500 text-red-500 hover:text-red-500">
                    <SignOutButton>
                        ログアウト
                    </SignOutButton>
                </Button>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
