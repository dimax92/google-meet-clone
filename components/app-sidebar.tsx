import * as React from "react"
import { ChevronUp, LogOut, Trash } from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { TbBrandTabler } from "react-icons/tb"
import { MdOutlineVideocam } from "react-icons/md"
import Link from "next/link"
import Image from "next/image"
import Logo from "./Logo"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@radix-ui/react-dropdown-menu"
import logout from "@/lib/logout"
import { DropdownMenuSeparator } from "./ui/dropdown-menu"
import DeleteAccountModal from "@/features/user/components/DeleteAccountModal"

// This is sample data.
const items = [
    {
        label: "Dashboard",
        url: "/dashboard",
        icon: TbBrandTabler
    },
    {
        label: "Join Meeting",
        url: "/join-meeting",
        icon: MdOutlineVideocam
    }
]
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const [open, setOpen] = React.useState<boolean>(false)
    return (
        <>
            <Sidebar {...props}>
                <SidebarContent>
                    <SidebarGroup>
                        <Logo />
                        <SidebarGroupContent className="mt-4">
                            <SidebarMenu>
                                {items.map((item, index) => (
                                    <SidebarMenuItem key={index}>
                                        <SidebarMenuButton asChild size={"lg"}>
                                            <Link href={item.url}>
                                                <item.icon className="h-5 w-5 flex-shrink-0 text-neutral-700" />
                                                <span>{item.label}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarFooter>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuButton>
                                        <Image
                                            src={"/logo.svg"}
                                            alt={"Logo"}
                                            width={50}
                                            height={50}
                                            className="rounded-full h-7 w-7 flex-shrink-0"
                                        /> Username
                                        <ChevronUp className="ml-auto" />
                                    </SidebarMenuButton>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    className="w-[--radix-popper-anchor-width] z-[200]"
                                >
                                    <DropdownMenuItem
                                        onClick={async () => {
                                            await logout()
                                        }}
                                        className="flex items-center cursor-pointer"
                                    >
                                        <LogOut className="h-4 w-4 mr-1 c" />
                                        Logout
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        className="text-destructive cursor-pointer flex items-center"
                                        onClick={() => {
                                            setOpen(true)
                                        }}
                                    >
                                        <Trash className="h-4 w-4 mr-1"/>
                                        Delete account
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarFooter>
            </Sidebar>
            {open && <DeleteAccountModal open={open} setOpen={setOpen} />}
        </>
    )
}
