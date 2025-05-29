"use server"

import {
  Sidebar,
  SidebarContent,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Suspense } from "react"
import { SidebarWordSet } from "./SidebarWordSet"
import { SidebarOther } from "./SidebarOther"
import { SidebarMyMenu } from "./SidebarMenu"
import { SidebarMyFooter } from "./SidebarFooter"
import { SidebarWordSetSkeleton } from "./skeletons/SidebarWordSetSkeleton"

export async function DashboardSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  return (
    <Sidebar collapsible="icon" {...props}>

      <SidebarContent>
        {/*メニュー */}
        <SidebarMyMenu/>

        {/*単語帳 */}
        <Suspense fallback={<SidebarWordSetSkeleton/>}>
          <SidebarWordSet/>
        </Suspense>

        {/* その他 */}
        <Suspense>
          <SidebarOther/>
        </Suspense>
      </SidebarContent>

      {/*Clerkの認証情報 */}
      <SidebarMyFooter/>
      <SidebarRail />
    </Sidebar>
  )
}

