import { Calendar, Heart, Home, Inbox, Search, Settings } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider
} from "@/components/ui/sidebar"


const items = [
  {
    title: "Gestions des projets",
    url: "./projects",
    icon: Inbox,
  },
  {
    title: "Gestion des likes par projets",
    url: "./likes",
    icon: Heart,
  }
]

export function AppSidebar() {
  return (
    <SidebarProvider>
        <Sidebar>
        <SidebarContent>
            <SidebarGroup>
            <SidebarGroupLabel>IW LAB</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                        <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                        </a>
                    </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
                </SidebarMenu>
            </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
        </Sidebar>
    </SidebarProvider>
  )
}
