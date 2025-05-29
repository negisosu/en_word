import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
  } from "@/components/ui/sidebar"
  import { Skeleton } from "@/components/ui/skeleton"
  
  export function SidebarWordSetSkeleton() {
    return (
      <SidebarGroup className="group-data-[collapsible=icon]:hidden">
        <SidebarGroupLabel>単語帳</SidebarGroupLabel>
        <SidebarMenu>
          {/* スケルトン項目を3-4個表示 */}
          {Array.from({ length: 5 }).map((_, index) => (
            <SidebarMenuItem key={index}>
              <SidebarMenuButton>
                <Skeleton className="h-4 w-full max-w-[120px]" />
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        <SidebarGroupLabel>
          <div className="w-full py-2 rounded-lg">
            <Skeleton className="h-4 w-20" />
          </div>
        </SidebarGroupLabel>
      </SidebarGroup>
    )
  }
  