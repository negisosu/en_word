import type React from "react"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { DashboardSidebar } from "@/components/DashboardSidebar"
import { MyBreadcrumb } from "@/components/MyBreadcrumb"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { isUserExist } from "@/lib/actions/user"

export const experimental_ppr = true

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {

  //ユーザーの新規登録を認識する処理
  const clerkUser = await currentUser()
  if(!clerkUser){
    redirect("/")
  }

  const isUser = await isUserExist(clerkUser.id)
  if(!isUser){
    redirect("/onboarding")
  }

  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <MyBreadcrumb/>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
