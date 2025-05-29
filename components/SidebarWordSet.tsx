"use server"

import { auth } from "@clerk/nextjs/server"
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar"
import clsx from "clsx"
import Link from "next/link"
import { redirect } from "next/navigation"
import { getUserWordSets } from "@/lib/actions/wordSet"

export async function SidebarWordSet() {

    const { userId } = await auth()
    if(!userId){
        redirect("/")
    }

    const wordSets = await getUserWordSets(userId, 5)
    if(!wordSets){
        redirect("/")
    }

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