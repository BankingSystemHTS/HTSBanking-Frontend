import { Heading1 } from 'lucide-react'
import React from 'react'

const HeaderBox = ({ type = "title", title, subtext, user }: HeaderBoxProps) => {
   return (
      <header className="header-box">
         {/* conditional render based on what page we are in */}
         <h1 className="header-box-title">
            {title}
            {type == "greeting" && (
               <span className="text-bankGradient">{user}</span>)
            }
         </h1>
         <p className="header-box-subtext">
            {subtext}
         </p>
      </header>
   )
}

export default HeaderBox
