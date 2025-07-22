"use client"
import React from 'react'
import {
   Sheet,
   SheetClose,
   SheetContent,
   SheetDescription,
   SheetHeader,
   SheetTitle,
   SheetTrigger,
} from "@/components/ui/sheet"
import Image from "next/image";
import Link from 'next/link';
import { sidebarLinks } from '@/constants';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import Footer from './Footer';


const MobileNavBar = ({ user }: SidebarProps) => {
   const pathname = usePathname();
   return (
      <section className="w-full max-w-[264px]">
         <Sheet>
            <SheetTrigger>
               <Image
                  src="/icons/hamburger.svg"
                  width={30}
                  height={30}
                  alt="menu"
                  className="cursor-pointer "
               />
            </SheetTrigger>
            <SheetContent side="right" className="bg-white w-2/5 border-none">
               {/* navigation section */}
               <nav className="flex flex-col gap-4 h-full">
                  {/* Logo and brand name */}
                  <Link
                     href="/"
                     className="flex items-center mb-6 cursor-pointer
              gap-2 px-4"
                  >
                     <Image
                        src="icons/logo.svg"
                        width={34}
                        height={34}
                        alt="logo"
                        className="pt-4"
                     />
                     <h1 className="pt-4 text-26 font-ibm-plex-serif font-bold text-black-1">
                        HTSBanking
                     </h1>
                  </Link>

                  {/* Navigation links section */}
                  <div className="mobilenav-sheet">
                     <SheetClose asChild>
                        <div
                           className="flex h-full flex-col gap-6 pt-6 text-white"
                        >
                           {sidebarLinks.map((link) => {
                              const isActive = pathname === link.route ||
                                 pathname.startsWith(`${link.route}/`)
                              return (
                                 <SheetClose asChild key={link.route}>
                                    <Link
                                       href={link.route}
                                       key={link.label}
                                       className={clsx(
                                          "mobilenav-sheet_close w-full",
                                          isActive && "bg-bank-gradient text-white",
                                       )}
                                    >

                                       <Image
                                          src={link.imgURL}
                                          width={20}
                                          height={20}
                                          alt="icon"
                                          className={clsx(isActive && "brightness-[3] invert-0")}
                                       />

                                       <span className={clsx("text-16 font-semibold text-gray-700",
                                          isActive && "text-white"
                                       )}>
                                          {link.label}
                                       </span>
                                    </Link>
                                 </SheetClose>
                              )
                           })}
                           User
                        </div>
                     </SheetClose>
                     {/* <Footer user={user} /> */}
                  </div>
                  User
               </nav>

            </SheetContent>
         </Sheet>

      </section>
   )
}

export default MobileNavBar
