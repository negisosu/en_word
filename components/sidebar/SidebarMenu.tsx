"use client"

import { useState } from "react"
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import Link from "next/link"
import { Folder, Home, Plus } from "lucide-react"
import { Sheet, SheetTrigger } from "@/components/ui/sheet"
import { WordSetForm } from "../WordSetForm"

export function SidebarMyMenu () {

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