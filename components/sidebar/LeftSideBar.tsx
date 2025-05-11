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
              return (
                 <Link
                    href={link.route}
                    key={link.label}
                    className={clsx(
                       "flex items-center gap-2 rounded-lg p-2",
                       pathname === link.route && "bg-gray-300 text-white"
                    )}
                 >
                    <Image
                       src={link.imgURL}
                       width={24}
                       height={24}
                       alt="icon"
                    />
                    <span className="text-16 font-semibold text-gray-700">
                       {link.label}
                    </span>
                    
                 </Link>
              )
           })}
        </nav>
    </section>
  )
}

export default LeftSideBar
