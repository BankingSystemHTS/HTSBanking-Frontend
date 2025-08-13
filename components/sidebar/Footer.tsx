import { signOut } from '@/lib/actions/user.actions'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import React from 'react'


interface FooterProps {
   user: User
   type?: 'mobile' | 'desktop'
}

const Footer = ({ user, type = 'desktop' }: FooterProps) => {
   const handleLogOut = async () => {
      try {
         await signOut();
         redirect("/sign-in");
      } catch (error) {
         console.error("Error during logout:", error);
      }
   }
   return (
      <footer className="footer">
         <div className={type === "mobile"
            ? "footer_name-mobile"
            : "footer_name"
         }>
            <p className="text-xl font-bold text-gray-700">
               {user?.firstName || "G"}
            </p>
         </div>
         <div className={type === "mobile"
            ? "footer_email-mobile"
            : "footer_email"
         }>
            <h1 className="text-14 truncate font-normal text-gray-700 font-semibold ">
               {user?.firstName || "Guest User"}
            </h1>
            <p className="text-14 truncate font-normal text-gray-600">
               {user?.email}
            </p>
         </div>
         <div className="footer_image" onClick={handleLogOut}>
            <Image
               src="/icons/logout.svg"
               fill
               alt="logout icon"
            />
         </div>
      </footer>
   )
}

export default Footer
