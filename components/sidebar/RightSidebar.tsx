import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import Image from 'next/image'

const RightSidebar = ({ user, transactions, banks}: RightSidebarProps) => {
  return (
     <aside className="right-sidebar">
        {/* Banner and Profile Section */}
        <section className="flex flex-col pb-8">
           <div className="profile-banner" />
           <div className="profile">
              <div className="profile-img">
                 <span className="text-4xl font-bold text-blue-500">{user.firstName[0]}</span>
              </div>
           </div>

           <div className="mt-24 ml-6 gap-4">
              <h1 className="text-xl font-semibold">{user.firstName + " " + user.lastName}</h1>
              <p className="font-light text-gray-700 font-serif">{user.email}</p>
           </div>
        </section>

        {/* Bank Card Section */}
        <section className="w-full ml-6">
           <div className="flex">
              <h2 className="text-lg">My Banks</h2>
              <Link href="/" className="ml-24 flex gap-2 items-center hover:underline hover:decoration-blue-500">
                 <Image
                    src="/icons/plus.svg"
                    alt="plus icon"
                    width="20"
                    height="20"
                 />
                 <span className="text-slate-700">Add Bank</span>
              </Link>
           </div>
        </section>
    </aside>
  )
}

export default RightSidebar
