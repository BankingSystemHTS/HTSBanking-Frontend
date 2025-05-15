'use client'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { sidebarLinks } from '@/constants'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

const LeftSideBar = ({ user }: SidebarProps) => {
   const pathname = usePathname()
   return (
      <section className="sidebar">
         <nav className="flex flex-col gap-4">
            <Link
               href="/"
               className="flex items-center mb-12 cursor-pointer
              gap-2"
            >
               <Image
                  src="icons/logo.svg"
                  width={34}
                  height={34}
                  alt="logo"
                  className="size-[24px] max-xl:size-14"
               />
               <h1 className="sidebar-logo">
                  HTSBanking
               </h1>
            </Link>
            {sidebarLinks.map((link) => {
               const isActive = pathname === link.route ||
                  pathname.startsWith(`${link.route}/`)
               return (
                  <Link
                     href={link.route}
                     key={link.label}
                     className={clsx(
                        "sidebar-link",
                        isActive && "bg-bank-gradient text-white",
                     )}
                  >
                     <div className="relative size-6">
                        <Image
                           src={link.imgURL}
                           width={24}
                           height={24}
                           alt="icon"
                           className={clsx(isActive && "brightness-[3] invert-0")}
                        />
                     </div>
                        <span className={clsx("text-16 font-semibold text-gray-700",
                           isActive && "text-white"
                        )}>
                           {link.label}
                        </span>

                  </Link>
               )
            })}
            User
         </nav>
         Footer1
      </section>
   )
}

export default LeftSideBar
