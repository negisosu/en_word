import { UserButton } from "@clerk/nextjs";
import { SidebarFooter, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";

export function SidebarMyFooter() {
    return(
        <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <div className=" -ml-2 mt-1">
              <UserButton/>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    )
}