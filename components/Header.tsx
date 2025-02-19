"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"
import Link from 'next/link'
import { Button } from './ui/button'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from 'lucide-react'
import useCurrentUser from '@/hooks/use-current-user'


const navItems = ["Home", "About", "Services", "Contact"]

const Header = () => {
    const user = useCurrentUser()
    const [isOpen, setIsOpen] = useState<boolean>(false)
    return (
        <header className='sticky top-4 z-50 w-full px-4 sm:px-6 lg:px-8'>
            <div className='flex max-w-xl mx-auto items-center justify-between'>
                <Image
                    src={'/logo.svg'}
                    alt={'Logo'}
                    width={50}
                    height={50}
                    className='cursor-pointer'
                />
                <NavigationMenu className='hidden md:block'>
                    <NavigationMenuList className='gap-1 rounded-full bg-background shadow-sm px-2 py-1'>
                        {
                            navItems.map((item, index) => (
                                <NavigationMenuItem key={index}>
                                    <NavigationMenuLink
                                        asChild
                                        className='group inline-flex h-9 w-max items-center justify-center rounded-full bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground'
                                    >
                                        <Link href={"#"}>
                                            {item}
                                        </Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            ))
                        }
                    </NavigationMenuList>
                </NavigationMenu>
                <div className='hidden md:flex items-center gap-2'>
                    {/* TODO: sign-in */}
                    <Link href={user ? "/dashboard" : "/sign-in"}>
                        <Button className='rounded-full' variant={"outline"}>
                            {user ? "Go to Dashboard": "Get Started"}
                        </Button>
                    </Link>
                </div>
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <Button
                            size={"icon"}
                            variant={"ghost"}
                            className='md:hidden'
                        >
                            <Menu className='w-6 h-6' />
                        </Button>
                    </SheetTrigger>
                    <SheetContent className='w-64' side={"right"}>
                        <SheetHeader>
                            <SheetTitle className='text-2xl font-bold text-primary'>Menu latéral</SheetTitle>
                        </SheetHeader>
                        <nav className='flex flex-col space-y-4 mt-8'>
                            {
                                navItems.map((item, index) => (
                                    <Link
                                        href={"#"}
                                        key={index}
                                        className='text-lg font-medium hover:text-primary'
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {item}
                                    </Link>
                                ))
                            }
                            <Link href={"/sign-in"}>
                                <Button
                                    className='w-full mt-4 rounded-full'
                                    variant={"outline"}
                                    onClick={() => setIsOpen(false)}
                                >
                                    {user ? "Go to Dashboard": "Get Started"}
                                </Button>
                            </Link>
                        </nav>
                    </SheetContent>
                </Sheet>

            </div>
        </header>
    )
}

export default Header