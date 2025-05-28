"use client"

import {
  Settings,
  LogOut,
  Plus
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
import { wordSetType } from "@/lib/validators/wordSetSchema"
import { Sheet, SheetTrigger } from "./ui/sheet"
import { useState } from "react"
import { WordSetForm } from "./WordSetForm"

export function DashboardSidebar({ wordSets, ...props }: React.ComponentProps<typeof Sidebar> & { wordSets: wordSetType[] }) {

  const [createWordSetIsOpen, setCreateWordSetIsOpen] = useState(false)

  const { signOut } = useClerk()

  return (
    <Sidebar collapsible="icon" {...props}>

      <SidebarContent>
        {/* メインナビゲーション */}
        <SidebarGroup>
          <SidebarGroupLabel>メニュー</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <Sheet open={createWordSetIsOpen} onOpenChange={setCreateWordSetIsOpen}>
                <SheetTrigger asChild>
                  <SidebarMenuButton>
                    <Plus/>
                    <span>単語帳を作成</span>
                  </SidebarMenuButton>
                </SheetTrigger>
                <WordSetForm/>
              </Sheet>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        {/* プロジェクト */}
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel>単語帳</SidebarGroupLabel>
          <SidebarMenu>
            {wordSets.map((wordSet) => (
              <SidebarMenuItem key={wordSet.id}>
                <SidebarMenuButton asChild>
                  <Link href={`/dashboard/word-set/${wordSet.id}`}>
                    <span>{wordSet.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
          <SidebarGroupLabel>
              <Link href={"/dashboard/word-set"} className="w-full py-2 rounded-lg hover:bg-gray-100">
                <span>もっと見る→</span>
              </Link>
          </SidebarGroupLabel>
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

      {/*Clerkの認証情報 */}
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
