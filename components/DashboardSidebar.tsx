"use client"

import {
  Settings,
  LogOut,
  Plus,
  Home,
  Folder
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
import { userType } from "@/lib/validators/userSchema"
import clsx from "clsx"

export function DashboardSidebar({ wordSets, user, ...props }: React.ComponentProps<typeof Sidebar> & { wordSets: wordSetType[], user: userType }) {

  const { signOut } = useClerk()

  return (
    <Sidebar collapsible="icon" {...props}>

      <SidebarContent>
        {/*メニュー */}
        <MyMenu/>

        {/*単語帳 */}
        <MyWordSet wordSets={wordSets}/>

        {/* その他 */}
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
            <SidebarMenuButton>
              <div className=" -ml-2 mt-1">
              <UserButton/>
              </div>
            <span className="text-lg">{user.name}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

function MyMenu () {

  const [createWordSetIsOpen, setCreateWordSetIsOpen] = useState(false)

  return(
    <SidebarGroup>
      <SidebarGroupLabel>メニュー</SidebarGroupLabel>
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <Link href={"/dashboard"}>
            <Home/>
            <span>ダッシュボード</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <Link href={"/dashboard/word-set"}>
            <Folder/>
            <span>単語帳一覧</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem className="mt-6">
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
  )
}

function MyWordSet({ wordSets }: { wordSets: wordSetType[] }) {
  return(
    <SidebarGroup
    className={clsx(
      wordSets.length === 0 && "hidden",
      "group-data-[collapsible=icon]:hidden"
    )}
    >
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
  )
}